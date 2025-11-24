import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Edit, Save, X, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { toast } from 'sonner';

export default function AboutEditable() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({
    title: '',
    subtitle: '',
    mission: '',
    contactEmail: ''
  });
  const [originalContent, setOriginalContent] = useState({
    title: '',
    subtitle: '',
    mission: '',
    contactEmail: ''
  });

  // Fetch about content on page load
  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      const response = await api.get('/about');
      
      console.log('Fetch response:', response); // Debug log
      
      if (response.error) {
        toast.error(response.error);
        return;
      }
      
      // The API service wraps the backend response in response.data
      // Backend returns { content: {...}, status: 200 }
      // So we access response.data.content
      if (response.data?.content) {
        const fetchedContent = {
          title: response.data.content.title,
          subtitle: response.data.content.subtitle,
          mission: response.data.content.mission,
          contactEmail: response.data.content.contactEmail
        };
        setContent(fetchedContent);
        setOriginalContent(fetchedContent);
      }
    } catch (error) {
      console.error('Error fetching about content:', error);
      toast.error('Failed to load about content');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      console.log('Saving content:', content); // Debug log
      
      const response = await api.put('/about', content);
      
      console.log('Save response:', response); // Debug log
      
      if (response.error) {
        toast.error(response.error);
        return;
      }
      
      // The API service wraps the backend response in response.data
      // Backend returns { message: '...', content: {...}, status: 200 }
      if (response.data?.content) {
        const updatedContent = {
          title: response.data.content.title,
          subtitle: response.data.content.subtitle,
          mission: response.data.content.mission,
          contactEmail: response.data.content.contactEmail
        };
        setContent(updatedContent);
        setOriginalContent(updatedContent);
        toast.success(response.data.message || 'About content updated successfully');
        setIsEditing(false);
      } else {
        toast.error('Failed to update content - invalid response');
      }
    } catch (error: any) {
      console.error('Error updating about content:', error);
      toast.error('Failed to update about content');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setContent(originalContent);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8]">
        <Navbar role="admin" onLogout={handleLogout} />
        <div className="container mx-auto px-8 py-12 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#1a1851]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <Navbar role="admin" onLogout={handleLogout} />

      <div className="container mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-['Poppins'] text-[32px] text-black">
            Edit About Page
          </h1>
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-[#1a1851] hover:bg-[#0B1441] text-white rounded-[8px] gap-2"
            >
              <Edit size={20} />
              Edit Content
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                onClick={handleSave}
                disabled={saving}
                className="bg-[#34c759] hover:bg-[#2da84a] text-white rounded-[8px] gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Save Changes
                  </>
                )}
              </Button>
              <Button 
                onClick={handleCancel}
                disabled={saving}
                variant="outline"
                className="rounded-[8px] gap-2"
              >
                <X size={20} />
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Title Section */}
          <Card className="rounded-[15px]">
            <CardContent className="p-6">
              <Label className="font-['Poppins'] text-[16px] text-black mb-2 block">
                Page Title
              </Label>
              {isEditing ? (
                <Input
                  value={content.title}
                  onChange={(e) => setContent({ ...content, title: e.target.value })}
                  className="rounded-[8px] text-[24px]"
                />
              ) : (
                <h2 className="font-['Poppins'] text-[32px] text-[#1a1851]">
                  {content.title}
                </h2>
              )}
            </CardContent>
          </Card>

          {/* Subtitle Section */}
          <Card className="rounded-[15px]">
            <CardContent className="p-6">
              <Label className="font-['Poppins'] text-[16px] text-black mb-2 block">
                Subtitle
              </Label>
              {isEditing ? (
                <Input
                  value={content.subtitle}
                  onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                  className="rounded-[8px]"
                />
              ) : (
                <p className="font-['Poppins'] text-[20px] text-[#1e1e1e]">
                  {content.subtitle}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Mission Section */}
          <Card className="rounded-[15px]">
            <CardContent className="p-6">
              <Label className="font-['Poppins'] text-[16px] text-black mb-2 block">
                Mission Statement
              </Label>
              {isEditing ? (
                <Textarea
                  value={content.mission}
                  onChange={(e) => setContent({ ...content, mission: e.target.value })}
                  className="rounded-[8px] min-h-[150px]"
                />
              ) : (
                <p className="font-['Poppins'] text-[18px] text-[#1e1e1e] leading-relaxed">
                  {content.mission}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="rounded-[15px]">
            <CardContent className="p-6">
              <Label className="font-['Poppins'] text-[16px] text-black mb-2 block">
                Contact Email
              </Label>
              {isEditing ? (
                <Input
                  type="email"
                  value={content.contactEmail}
                  onChange={(e) => setContent({ ...content, contactEmail: e.target.value })}
                  className="rounded-[8px]"
                />
              ) : (
                <p className="font-['Poppins'] text-[18px] text-[#1e1e1e]">
                  {content.contactEmail}
                </p>
              )}
            </CardContent>
          </Card>

        </div>

        {/* Preview Section */}
        {isEditing && (
          <Card className="rounded-[15px] mt-6 bg-[#fff9e6]">
            <CardContent className="p-6">
              <p className="font-['Poppins'] text-[14px] text-[#1a1851]">
                💡 <strong>Tip:</strong> Changes will be visible to all users after saving.
                Make sure to review your content before publishing.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
