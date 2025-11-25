# Saved Projects - Quick Reference

## For Students

### Save a Paper
```
Dashboard → View Paper → Add to Saved Projects
```

### View Saved Papers
```
Navigation → Saved Projects
```

### Remove Saved Paper
```
Saved Projects → Remove from Saved
```

---

## For Developers

### API Endpoints

**Save Project**
```bash
POST /api/saved-projects
Authorization: Bearer <token>
Body: { "projectId": 8 }
```

**Get Saved Projects**
```bash
GET /api/saved-projects?search=keyword&field=IoT&yearFrom=2020&yearTo=2024
Authorization: Bearer <token>
```

**Unsave Project**
```bash
DELETE /api/saved-projects/:projectId
Authorization: Bearer <token>
```

---

## Frontend Implementation

### Save Paper (Student Dashboard)
```typescript
const handleSavePaper = async () => {
  const response = await api.post('/saved-projects', {
    projectId: selectedPaper.id
  });
  
  if (response.status === 201) {
    toast.success('Paper added to Saved Projects');
  }
};
```

### Unsave Paper (Saved Projects Page)
```typescript
const handleRemoveFromSaved = async (projectId: number) => {
  const response = await api.delete(`/saved-projects/${projectId}`);
  
  if (response.status === 200) {
    toast.success('Removed from saved projects');
    fetchSavedProjects(); // Refresh list
  }
};
```

---

## Database Schema

```prisma
model SavedProject {
  id        Int      @id @default(autoincrement())
  userId    Int
  projectId Int
  createdAt DateTime @default(now())
  
  @@unique([userId, projectId])
}
```

---

## Testing

### Run Backend Tests
```bash
cd backend
node scripts/test-saved-projects.js
```

### Expected Results
- ✅ Student authentication working
- ✅ Save project working
- ✅ Get saved projects working
- ✅ Filter saved projects working
- ✅ Unsave project working

---

## Features

✅ Save papers to personal collection
✅ View all saved papers
✅ Filter saved papers (search, field, year)
✅ Remove papers from saved
✅ Duplicate detection
✅ Real-time updates
✅ Toast notifications
✅ Loading states
✅ Empty states
✅ Authentication required

---

## Status
🟢 **LIVE** - Fully functional and tested
