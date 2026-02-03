import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:app/features/tasks/domain/task.dart';
import 'package:app/features/tasks/presentation/widgets/task_card.dart';
import 'package:app/core/theme/app_theme.dart';

void main() {
  const task = Task(
    id: '1',
    title: 'Test Task',
    priority: TaskPriority.medium,
  );

  Widget createSubject({
    VoidCallback? onDelete,
    VoidCallback? onToggleComplete,
  }) {
    return MaterialApp(
      theme: AppTheme.lightTheme,
      home: Scaffold(
        body: ListView(
          children: [
            TaskCard(
              task: task,
              onDelete: onDelete,
              onToggleComplete: onToggleComplete,
            ),
          ],
        ),
      ),
    );
  }

  testWidgets('Swiping left shows delete confirmation dialog', (tester) async {
    await tester.pumpWidget(createSubject());

    // Swipe left (endToStart)
    await tester.drag(find.byType(TaskCard), const Offset(-500, 0));
    await tester.pumpAndSettle();

    // Verify dialog appears
    expect(find.text('Delete Task?'), findsOneWidget);
    expect(find.text('Are you sure you want to delete this task? This action cannot be undone.'), findsOneWidget);
    expect(find.text('Cancel'), findsOneWidget);
    expect(find.text('Delete'), findsOneWidget);
  });

  testWidgets('Cancel in delete dialog dismisses dialog and keeps task', (tester) async {
    bool deleted = false;
    await tester.pumpWidget(createSubject(onDelete: () => deleted = true));

    // Swipe left
    await tester.drag(find.byType(TaskCard), const Offset(-500, 0));
    await tester.pumpAndSettle();

    // Tap Cancel
    await tester.tap(find.text('Cancel'));
    await tester.pumpAndSettle();

    // Verify dialog gone
    expect(find.text('Delete Task?'), findsNothing);
    // Verify task is still there (since onDelete was not called and Dismissible not dismissed)
    expect(find.byType(TaskCard), findsOneWidget);
    expect(deleted, isFalse);
  });

  testWidgets('Confirm in delete dialog calls onDelete', (tester) async {
    bool deleted = false;
    await tester.pumpWidget(createSubject(onDelete: () => deleted = true));

    // Swipe left
    await tester.drag(find.byType(TaskCard), const Offset(-500, 0));
    await tester.pumpAndSettle();

    // Tap Delete
    await tester.tap(find.text('Delete'));
    await tester.pumpAndSettle();

    // Verify onDelete called
    expect(deleted, isTrue);
    // Verify task is gone from the tree (Dismissible completed)
    expect(find.byType(TaskCard), findsNothing);
  });

  testWidgets('Swiping right toggles complete without dialog', (tester) async {
    bool toggled = false;
    await tester.pumpWidget(createSubject(onToggleComplete: () => toggled = true));

    // Swipe right (startToEnd)
    await tester.drag(find.byType(TaskCard), const Offset(500, 0));
    await tester.pumpAndSettle(); // Pump and settle to allow animation

    // Verify onToggleComplete called
    expect(toggled, isTrue);
    // Verify no dialog
    expect(find.text('Delete Task?'), findsNothing);
    // Verify task is still there (since we returned false in confirmDismiss)
    expect(find.byType(TaskCard), findsOneWidget);
  });
}
