# Real-Time Filtering - User Guide

## What is Real-Time Filtering?

Real-time filtering means the results update **automatically** as you type or select options. No need to click a "Search" button!

## How to Use Filters

### 1. Search Box
```
┌─────────────────────────────────────┐
│ 🔍 Title, Author, or keyword       │
└─────────────────────────────────────┘
```
- **What it does**: Searches in paper titles, author names, and fields
- **How it works**: Start typing, results update after you stop (400ms delay)
- **Example**: Type "IoT" to find all papers related to IoT

### 2. Fields Dropdown
```
┌─────────────────────────────────────┐
│ All Fields                      ▼  │
├─────────────────────────────────────┤
│ All Fields                          │
│ IoT                                 │
│ Database                            │
└─────────────────────────────────────┘
```
- **What it does**: Filters papers by specific field
- **How it works**: Select a field, results update instantly
- **Example**: Select "IoT" to see only IoT papers

### 3. Year Range
```
From Year:
┌─────────────────────────────────────┐
│ 2020                            ▼  │
└─────────────────────────────────────┘

To Year:
┌─────────────────────────────────────┐
│ 2024                            ▼  │
└─────────────────────────────────────┘
```
- **What it does**: Filters papers by year range
- **How it works**: Select years, results update instantly
- **Examples**:
  - From 2020, To 2024: Shows papers from 2020-2024
  - From 2023 only: Shows papers from 2023 onwards
  - To 2022 only: Shows papers up to 2022

### 4. Reset Filter Button
```
┌─────────────────────────────────────┐
│         Reset Filter                │
└─────────────────────────────────────┘
```
- **What it does**: Clears all filters and shows all papers
- **How it works**: Click once, all filters clear instantly

## Combining Filters

You can use multiple filters together! They all work at the same time.

### Example 1: Find Recent IoT Papers
1. Select Field: "IoT"
2. Set From Year: "2023"
3. Results: Only IoT papers from 2023 onwards

### Example 2: Search Within a Field
1. Type in Search: "smart"
2. Select Field: "IoT"
3. Results: Only IoT papers with "smart" in title/author

### Example 3: Specific Year Range Search
1. Type in Search: "database"
2. Set From Year: "2020"
3. Set To Year: "2022"
4. Results: Papers with "database" from 2020-2022

## What You'll See

### While Loading
```
⏳ Loading...
```
A spinner appears while fetching results.

### When Results Found
```
Capstone Papers
5 papers found

[Paper 1]  [Paper 2]  [Paper 3]
[Paper 4]  [Paper 5]
```
Papers display in a grid with count shown.

### When No Results
```
No papers found matching your criteria

Try adjusting your filters or click Reset Filter
```
A helpful message appears with suggestions.

## Tips for Best Results

### ✅ DO:
- Use specific keywords in search
- Combine filters for precise results
- Use Reset Filter to start fresh
- Wait a moment after typing (400ms)

### ❌ DON'T:
- Don't type too fast and expect instant results (there's a small delay)
- Don't forget to clear filters when done
- Don't use special characters in search

## Available on These Pages

1. **Admin Dashboard** - Manage all papers
2. **Guest Projects** - Browse papers (no login needed)
3. **Student Dashboard** - Browse papers (logged in)
4. **Student Saved Projects** - Filter your saved papers

## Troubleshooting

### "No results found" but I know papers exist
- Click "Reset Filter" to clear all filters
- Check if you have typos in search
- Try broader search terms

### Results not updating
- Wait 400ms after typing (less than half a second)
- Check your internet connection
- Refresh the page

### Filters not clearing
- Click "Reset Filter" button
- Refresh the page if needed

## Need Help?

If filtering isn't working:
1. Try refreshing the page
2. Clear your browser cache
3. Check if backend server is running
4. Contact system administrator

---

**Remember**: Filtering is automatic - just type or select, and results update on their own! 🎉
