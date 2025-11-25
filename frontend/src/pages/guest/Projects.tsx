import { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { FilterSidebar, FilterValues } from '../../components/FilterSidebar';
import { CapstoneCard } from '../../components/CapstoneCard';
import { useDebounce } from '../../hooks/useDebounce';
import { api } from '../../services/api';
import { Loader2 } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  author: string;
  year: number;
  field: string;
  fileUrl: string;
}

export default function GuestProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterValues>({
    search: '',
    field: '',
    fromYear: '',
    toYear: ''
  });

  const debouncedSearch = useDebounce(filters.search, 400);

  useEffect(() => {
    fetchProjects();
  }, [debouncedSearch, filters.field, filters.fromYear, filters.toYear]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      
      if (debouncedSearch) {
        params.append('search', debouncedSearch);
      }
      
      if (filters.field && filters.field !== 'all') {
        params.append('field', filters.field);
      }
      
      if (filters.fromYear) {
        params.append('yearFrom', filters.fromYear);
      }
      
      if (filters.toYear) {
        params.append('yearTo', filters.toYear);
      }

      const response = await api.get<{ projects: Project[] }>(`/projects?${params.toString()}`);
      
      if (response.data?.projects) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <Navbar role="guest" />

      <div className="container mx-auto px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-[300px] flex-shrink-0">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-['Poppins'] text-[32px] text-black">Capstone Papers</h1>
              <p className="font-['Poppins'] text-[20px] text-[#929292]">
                {projects.length} papers found
              </p>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#1a1851]" />
              </div>
            ) : (
              <>
                {/* Projects Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <CapstoneCard
                      key={project.id}
                      title={project.title}
                      author={project.author}
                      year={project.year}
                      field={project.field}
                    />
                  ))}
                </div>

                {/* Empty State */}
                {projects.length === 0 && (
                  <div className="text-center py-20">
                    <p className="font-['Poppins'] text-[20px] text-[#929292]">
                      No papers found matching your criteria
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
