# Year Filter - Quick Guide

## What Changed?

### Before ❌
Year dropdowns were hardcoded to 2024:
```
From Year: 2024, 2023, 2022, ..., 2015
To Year:   2024, 2023, 2022, ..., 2015
```
Problem: In 2025, users couldn't select 2025!

### After ✅
Year dropdowns now use current year automatically:
```
From Year: 2025, 2024, 2023, ..., 2016
To Year:   2025, 2024, 2023, ..., 2016
```
Solution: Always shows current year as the latest option!

---

## How It Works

The system automatically detects the current year from your computer's date:

```
Current Year = 2025
↓
Dropdown shows: 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016
```

Next year (2026), it will automatically update:
```
Current Year = 2026
↓
Dropdown shows: 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017
```

---

## Pages Affected

✅ **Admin Dashboard** - Last 10 years
✅ **Guest Projects** - Last 20 years (already was dynamic!)
✅ **Student Dashboard** - Last 10 years
✅ **Student Saved Projects** - Last 10 years

---

## Example Usage

### Filter papers from 2023 to current year (2025)
1. From Year: Select "2023"
2. To Year: Select "2025" ← Now available!
3. Results: Shows all papers from 2023, 2024, and 2025

### Filter papers from last year only
1. From Year: Select "2024"
2. To Year: Select "2024"
3. Results: Shows only 2024 papers

### Filter papers from current year only
1. From Year: Select "2025"
2. To Year: Select "2025"
3. Results: Shows only 2025 papers

---

## Benefits

🎯 **Always Current** - No outdated year ranges
🔄 **Auto-Updates** - Changes automatically each new year
🚀 **Future-Proof** - Works forever without code changes
👥 **User-Friendly** - Users can always filter to current year

---

## Status
🟢 **LIVE** - All year filters are now dynamic and will update automatically!
