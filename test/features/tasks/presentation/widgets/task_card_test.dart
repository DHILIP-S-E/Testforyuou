import 'package:app/features/tasks/domain/task.dart';
import 'package:app/features/tasks/presentation/widgets/task_card.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('TaskCard shows confirmation dialog on delete swipe', (
    WidgetTester tester,
  ) async {
    bool deleted = false;
    const task = Task(
      id: '1',
      title: 'Test Task',
      priority: TaskPriority.medium,
    );

    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: TaskCard(task: task, onDelete: () => deleted = true),
        ),
      ),
    );

    // Verify task is displayed
    expect(find.text('Test Task'), findsOneWidget);

    // Swipe left (end to start) to delete
    await tester.drag(find.byType(TaskCard), const Offset(-500, 0));
    await tester.pumpAndSettle();

    // Verify dialog appears
    // Note: The text might be slightly different depending on implementation,
    // but we expect 'Delete Task?' as title and 'This action cannot be undone.' as content.
    expect(find.text('Delete Task?'), findsOneWidget);
    expect(find.text('This action cannot be undone.'), findsOneWidget);

    // Tap Cancel
    await tester.tap(find.text('Cancel'));
    await tester.pumpAndSettle();

    // Verify not deleted
    expect(deleted, isFalse);
    expect(find.byType(TaskCard), findsOneWidget);
    expect(find.text('Delete Task?'), findsNothing);

    // Swipe left again
    await tester.drag(find.byType(TaskCard), const Offset(-500, 0));
    await tester.pumpAndSettle();

    // Verify dialog appears again
    expect(find.text('Delete Task?'), findsOneWidget);

    // Tap Delete
    await tester.tap(find.text('Delete'));
    await tester.pumpAndSettle();

    // Verify deleted
    expect(deleted, isTrue);
  });
}
