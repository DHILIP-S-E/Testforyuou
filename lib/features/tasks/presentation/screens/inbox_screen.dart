import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/tasks_provider.dart';
import '../widgets/task_card.dart';

class InboxScreen extends ConsumerWidget {
  const InboxScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final tasks = ref.watch(tasksProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Inbox'),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {
              // TODO: Search
            },
          ),
        ],
        leading: IconButton(
          icon: const Icon(Icons.menu),
          onPressed: () {
             // TODO: Drawer or Menu
          },
        ),
      ),
      body: tasks.isEmpty
          ? const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.inbox, size: 64, color: Colors.grey),
                  SizedBox(height: 16),
                  Text('Your inbox is empty',
                      style: TextStyle(fontSize: 18, color: Colors.grey)),
                ],
              ),
            )
          : ListView.separated(
              padding: const EdgeInsets.all(16),
              itemCount: tasks.length,
              separatorBuilder: (context, index) => const SizedBox(height: 12),
              itemBuilder: (context, index) {
                final task = tasks[index];
                return TaskCard(
                  task: task,
                  onToggleComplete: () {
                    ref.read(tasksProvider.notifier).toggleComplete(task.id);
                  },
                  onDelete: () {
                    ref.read(tasksProvider.notifier).removeTask(task.id);
                  },
                  onStart: () {
                    // TODO: Start execution
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Started: ${task.title}')),
                    );
                  },
                  onReschedule: () {
                    // TODO: Reschedule
                  },
                );
              },
            ),
    );
  }
}
