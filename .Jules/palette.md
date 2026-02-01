# Palette's Journal

## 2025-02-01 - Delete Confirmation Dialog
**Learning:** Swipe-to-dismiss actions are efficient but dangerous without confirmation. Users can accidentally lose data. A confirmation dialog for destructive actions (like delete) balances efficiency with safety.
**Action:** Always add a `confirmDismiss` callback to `Dismissible` widgets when the action is destructive.
