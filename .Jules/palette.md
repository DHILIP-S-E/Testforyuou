## 2025-02-14 - Delete Confirmation Dialog Pattern
**Learning:** Native `window.confirm` is confusing and lacks proper accessibility for destructive actions. A custom MUI Dialog provides better context and safety.
**Action:** Use the reusable `DeleteConfirmationDialog` component for all delete actions. Ensure the 'Cancel' button is auto-focused to prevent accidental deletions via keyboard.
