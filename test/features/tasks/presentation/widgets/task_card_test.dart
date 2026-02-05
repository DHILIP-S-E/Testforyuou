import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:app/features/tasks/presentation/widgets/task_card.dart';
import 'package:app/features/tasks/domain/task.dart';
import 'package:app/core/theme/app_theme.dart';

void main() {
  const task = Task(
    id: '1',
    title: 'Test Task',
    priority: TaskPriority.medium,
    isCompleted: false,
  );

  Widget createSubject({
    VoidCallback? onDelete,
    VoidCallback? onToggleComplete,
  }) {
    return MaterialApp(
      theme: AppTheme.lightTheme,
      home: Scaffold(
        body: TaskCard(
          task: task,
          onDelete: onDelete,
          onToggleComplete: onToggleComplete,
        ),
      ),
    );
  }

  testWidgets(
    'swiping left shows confirmation dialog and delete when confirmed',
    (tester) async {
      bool deleteCalled = false;

      await tester.pumpWidget(
        createSubject(onDelete: () => deleteCalled = true),
      );

      // Find the Dismissible widget
      final dismissibleFinder = find.byType(Dismissible);
      expect(dismissibleFinder, findsOneWidget);

      // Swipe left (Delete direction)
      await tester.drag(dismissibleFinder, const Offset(-500, 0));
      await tester.pumpAndSettle();

      // Verify dialog appears
      expect(find.text('Delete Task'), findsOneWidget);
      expect(
        find.text(
          'Are you sure you want to delete this task? This action cannot be undone.',
        ),
        findsOneWidget,
      );

      // Tap Cancel
      await tester.tap(find.text('Cancel'));
      await tester.pumpAndSettle();

      // Verify dialog closed and delete NOT called
      expect(find.text('Delete Task'), findsNothing);
      expect(deleteCalled, isFalse);

      // Swipe left again
      await tester.drag(dismissibleFinder, const Offset(-500, 0));
      await tester.pumpAndSettle();

      // Verify dialog appears
      expect(find.text('Delete Task'), findsOneWidget);

      // Tap Delete
      await tester.tap(find.text('Delete'));
      await tester.pumpAndSettle();

      // Verify delete WAS called
      expect(deleteCalled, isTrue);
    },
  );

  testWidgets('swiping right toggles completion without confirmation', (
    tester,
  ) async {
    bool toggleCalled = false;
    bool deleteCalled = false;

    await tester.pumpWidget(
      createSubject(
        onToggleComplete: () => toggleCalled = true,
        onDelete: () => deleteCalled = true,
      ),
    );

    // Find the Dismissible widget
    final dismissibleFinder = find.byType(Dismissible);

    // Swipe right (Complete direction)
    await tester.drag(dismissibleFinder, const Offset(500, 0));
    await tester.pumpAndSettle(); // Allow animation to complete

    // Verify NO dialog appears
    expect(find.text('Delete Task'), findsNothing);

    // Verify toggle WAS called
    expect(toggleCalled, isTrue);
    expect(deleteCalled, isFalse);
  });
}
