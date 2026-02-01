import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../../../core/theme/app_theme.dart';
import '../../domain/task.dart';

class TaskCard extends StatelessWidget {
  const TaskCard({
    required this.task,
    this.onToggleComplete,
    this.onStart,
    this.onReschedule,
    this.onDelete,
    super.key,
  });

  final Task task;
  final VoidCallback? onToggleComplete;
  final VoidCallback? onStart;
  final VoidCallback? onReschedule;
  final VoidCallback? onDelete;

  Color _getPriorityColor(TaskPriority priority) {
    switch (priority) {
      case TaskPriority.high:
        return AppTheme.priorityHigh;
      case TaskPriority.medium:
        return AppTheme.priorityMedium;
      case TaskPriority.low:
        return AppTheme.priorityLow;
      case TaskPriority.none:
        return AppTheme.priorityNone;
    }
  }

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('MMM d, h:mm a');

    return Dismissible(
      key: ValueKey(task.id),
      background: Container(
        color: AppTheme.successGreen,
        alignment: Alignment.centerLeft,
        padding: const EdgeInsets.only(left: 20),
        child: const Icon(Icons.check, color: Colors.white),
      ),
      secondaryBackground: Container(
        color: AppTheme.errorRed,
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 20),
        child: const Icon(Icons.delete, color: Colors.white),
      ),
      confirmDismiss: (direction) async {
        if (direction == DismissDirection.endToStart) {
          return await showDialog<bool>(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                title: const Text('Delete Task'),
                content:
                    const Text('Are you sure you want to delete this task?'),
                actions: <Widget>[
                  TextButton(
                    onPressed: () => Navigator.of(context).pop(false),
                    child: const Text('Cancel'),
                  ),
                  TextButton(
                    onPressed: () => Navigator.of(context).pop(true),
                    child: const Text(
                      'Delete',
                      style: TextStyle(color: AppTheme.errorRed),
                    ),
                  ),
                ],
              );
            },
          );
        }
        return true;
      },
      onDismissed: (direction) {
        if (direction == DismissDirection.endToStart) {
          onDelete?.call();
        } else {
          onToggleComplete?.call();
        }
      },
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Priority Indicator
                  Padding(
                    padding: const EdgeInsets.only(top: 6, right: 12),
                    child: Container(
                      width: 8,
                      height: 8,
                      decoration: BoxDecoration(
                        color: _getPriorityColor(task.priority),
                        shape: BoxShape.circle,
                      ),
                    ),
                  ),
                  // Title
                  Expanded(
                    child: Text(
                      task.title,
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            decoration: task.isCompleted
                                ? TextDecoration.lineThrough
                                : null,
                            color: task.isCompleted
                                ? AppTheme.textSecondary
                                : AppTheme.textPrimary,
                          ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  const SizedBox(width: 12),
                  // Checkbox
                  SizedBox(
                    width: 24,
                    height: 24,
                    child: Checkbox(
                      value: task.isCompleted,
                      onChanged: (_) => onToggleComplete?.call(),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(4),
                      ),
                      activeColor: AppTheme.successGreen,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              // Metadata
              if (task.dueDate != null || task.project != null)
                Row(
                  children: [
                    if (task.dueDate != null) ...[
                      const SizedBox(width: 20), // Align with text
                      Icon(Icons.access_time,
                          size: 14, color: AppTheme.textTertiary),
                      const SizedBox(width: 4),
                      Text(
                        dateFormat.format(task.dueDate!),
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                      const SizedBox(width: 12),
                    ],
                    if (task.project != null) ...[
                      Icon(Icons.folder_outlined,
                          size: 14, color: AppTheme.textTertiary),
                      const SizedBox(width: 4),
                      Text(
                        task.project!,
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ],
                ),
              // Quick Actions (only if not completed)
              if (!task.isCompleted) ...[
                const SizedBox(height: 12),
                const Divider(),
                const SizedBox(height: 8),
                Row(
                  children: [
                    TextButton.icon(
                      onPressed: onStart,
                      icon: const Icon(Icons.play_arrow, size: 16),
                      label: const Text('Start'),
                      style: TextButton.styleFrom(
                        foregroundColor: AppTheme.primaryBlue,
                        textStyle: const TextStyle(fontWeight: FontWeight.w500),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 8),
                        backgroundColor: const Color(0xFFEFF6FF), // Light blue
                      ),
                    ),
                    const SizedBox(width: 8),
                    TextButton.icon(
                      onPressed: onReschedule,
                      icon: const Icon(Icons.calendar_today, size: 16),
                      label: const Text('Reschedule'),
                      style: TextButton.styleFrom(
                        foregroundColor: AppTheme.textSecondary,
                        textStyle: const TextStyle(fontWeight: FontWeight.w500),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 8),
                        backgroundColor: AppTheme.backgroundLightGray,
                      ),
                    ),
                  ],
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
