import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:uuid/uuid.dart';
import '../domain/task.dart';

part 'tasks_provider.g.dart';

@riverpod
class Tasks extends _$Tasks {
  @override
  List<Task> build() {
    // Initial mock data
    return [
      Task(
        id: const Uuid().v4(),
        title: 'Complete Project Plan',
        dueDate: DateTime.now().add(const Duration(hours: 2)),
        priority: TaskPriority.high,
        project: 'Work',
      ),
      Task(
        id: const Uuid().v4(),
        title: 'Buy Groceries',
        dueDate: DateTime.now().add(const Duration(days: 1)),
        priority: TaskPriority.medium,
        project: 'Personal',
      ),
      Task(
        id: const Uuid().v4(),
        title: 'Call Mom',
        dueDate: DateTime.now().add(const Duration(days: 2)),
        priority: TaskPriority.low,
        project: 'Personal',
      ),
      Task(
        id: const Uuid().v4(),
        title: 'Read a book',
        priority: TaskPriority.none,
      ),
    ];
  }

  void addTask(Task task) {
    state = [...state, task];
  }

  void removeTask(String id) {
    state = state.where((t) => t.id != id).toList();
  }

  void toggleComplete(String id) {
    state = state.map((t) {
      if (t.id == id) {
        return t.copyWith(isCompleted: !t.isCompleted);
      }
      return t;
    }).toList();
  }
}
