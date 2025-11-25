# Analytics Page - Restore Original Design Plan

## Issue
The Analytics page design was changed to a modern layout, but the requirement is to keep the ORIGINAL Figma design while connecting to the database.

## Original Design Features
- Absolute positioning layout
- Figma asset imports for icons
- Specific color scheme (#c9c7ff, #34c759, #ffcc00)
- Fixed dimensions and positions
- Custom SVG paths for pie chart
- Specific typography (Poppins font family)

## Solution
Keep the EXACT original design from `frontend/src/imports/AnalyticsAdmin.tsx` but:
1. Replace mock data with real database data
2. Keep all styling, positioning, and layout unchanged
3. Keep Figma asset imports
4. Only update the data values, not the design

## Backend (Already Complete) ✅
- All endpoints working
- Data fetching logic complete
- No changes needed

## Frontend Changes Needed
1. Restore original layout structure
2. Keep Figma imports
3. Inject real data into existing design
4. Maintain all absolute positioning
5. Keep original color scheme
6. Preserve SVG paths and styling

## Data Mapping
- Total Projects → `summary.totalProjects`
- Active Students → `summary.activeStudents`
- Total Saves → `summary.totalSaves`
- Most Viewed Project → `summary.mostViewedProject`
- Bar Chart → `projectsByYear` data
- Pie Chart → `fieldDistribution` data
- Top 5 List → `topSavedProjects` data

## Next Steps
1. Revert Analytics.tsx to original design
2. Add data fetching hooks
3. Map database data to original UI elements
4. Test with real data
5. Ensure no design changes

---

**Important**: The design must remain EXACTLY as it was in the Figma import. Only the data source changes from mock to database.
