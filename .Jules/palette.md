## 2024-05-22 - Confirmation for Destructive Swipe Actions
**Learning:** Swipe-to-delete patterns in Flutter using `Dismissible` are dangerous without `confirmDismiss`. Users can accidentally delete items with a simple gesture.
**Action:** Always implement `confirmDismiss` for destructive directions (like `endToStart`) and show a confirmation dialog explaining the action and its irreversibility. Use `AppTheme.errorRed` for the destructive action button.
