## 2025-05-23 - Delete Confirmation Pattern
**Learning:** Destructive actions like user deletion require explicit confirmation to prevent data loss. `window.confirm` is inaccessible and jarring. A custom `DeleteConfirmationDialog` provides better context and safety (auto-focus on Cancel).
**Action:** Use `src/components/common/DeleteConfirmationDialog` for all future destructive actions instead of native confirm.
