## 2025-02-18 - Delete Confirmation Pattern
**Learning:** Destructive actions should always use a confirmation dialog instead of `window.confirm`. This dialog should auto-focus the "Cancel" button to prevent accidental deletions via keyboard (e.g., hitting Enter).
**Action:** Use the shared `DeleteConfirmationDialog` component for all delete actions. Ensure `autoFocus` is on the Cancel button.
