# Real-Time Filtering - Quick Reference

## How It Works

### For Users
1. **Search Box**: Start typing - results update automatically after you stop typing (400ms delay)
2. **Field Dropdown**: Select a field - results update instantly
3. **Year Range**: Select from/to years - results update instantly
4. **Reset Filter**: Click to clear all filters and show all papers

### For Developers

#### Backend API
```javascript
// Get filtered projects
GET /api/projects?search=keyword&field=IoT&yearFrom=2020&yearTo=2024

// Get filtered saved projects (requires auth)
GET /api/saved-projects?search=keyword&field=IoT&yearFrom=2020&yearTo=2024
```

#### Frontend Hook
```typescript
import { useDebounce } from '../../hooks/useDebounce';

// In component
const debouncedSearch = useDebounce(filters.search, 400);

useEffect(() => {
  fetchProjects();
}, [debouncedSearch, filters.field, filters.fromYear, filters.toYear]);
```

## Pages with Filtering

1. ✅ **Admin Dashboard** (`/admin/dashboard`)
2. ✅ **Guest Projects** (`/guest/Projects`)
3. ✅ **Student Dashboard** (`/student/dashboard`)
4. ✅ **Student Saved Projects** (`/student/saved-projects`)

## Filter Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `search` | string | Search in title, author, field | `?search=IoT` |
| `field` | string | Exact field match | `?field=IoT` |
| `yearFrom` | number | Minimum year (>=) | `?yearFrom=2020` |
| `yearTo` | number | Maximum year (<=) | `?yearTo=2024` |

## Testing

Run backend filtering tests:
```bash
cd backend
node scripts/test-filtering.js
```

Expected output: All 6 tests pass ✅

## Status
🟢 **LIVE AND WORKING** - All filtering functionality is implemented and tested.
