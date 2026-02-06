## 2024-05-22 - Icon-Only Buttons Accessibility
**Learning:** Icon-only buttons (like Edit/Delete) are a common accessibility gap in data tables. Adding ARIA labels with context (e.g., "Edit [Name]") significantly improves screen reader experience compared to generic labels.
**Action:** Always check `IconButton` usage in tables and wrap them in Tooltips with descriptive ARIA labels including the row identifier.
