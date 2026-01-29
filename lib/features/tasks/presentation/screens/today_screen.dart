import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import '../../data/tasks_provider.dart';
import '../widgets/task_card.dart';

class TodayScreen extends ConsumerWidget {
  const TodayScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final tasks = ref.watch(tasksProvider);
    final today = DateTime.now();

    // Filter tasks for today
    final todayTasks = tasks.where((task) {
      if (task.dueDate == null) return false;
      return DateUtils.isSameDay(task.dueDate!, today);
    }).toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Today'),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  DateFormat('EEEE, MMM d').format(today),
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${todayTasks.length} tasks scheduled',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.grey,
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: todayTasks.isEmpty
                ? const Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.calendar_today, size: 64, color: Colors.grey),
                        SizedBox(height: 16),
                        Text('No tasks for today',
                            style: TextStyle(fontSize: 18, color: Colors.grey)),
                      ],
                    ),
                  )
                : ListView.separated(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    itemCount: todayTasks.length,
                    separatorBuilder: (context, index) => const SizedBox(height: 12),
                    itemBuilder: (context, index) {
                      final task = todayTasks[index];
                      return TaskCard(
                        task: task,
                        onToggleComplete: () {
                          ref.read(tasksProvider.notifier).toggleComplete(task.id);
                        },
                        onDelete: () {
                          ref.read(tasksProvider.notifier).removeTask(task.id);
                        },
                        onStart: () {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text('Started: ${task.title}')),
                          );
                        },
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}
