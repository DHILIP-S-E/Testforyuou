import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:app/main.dart';
import 'package:app/features/tasks/presentation/widgets/task_card.dart';

void main() {
  testWidgets('Inbox screen renders with mock tasks', (
    WidgetTester tester,
  ) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const ProviderScope(child: MyApp()));

    // Verify that we are on the Inbox screen (AppBar title).
    expect(find.widgetWithText(AppBar, 'Inbox'), findsOneWidget);

    // Verify that mock tasks are displayed.
    expect(find.text('Complete Project Plan'), findsOneWidget);
    expect(find.text('Buy Groceries'), findsOneWidget);

    // Verify FAB exists.
    expect(find.byIcon(Icons.add), findsOneWidget);
  });

  testWidgets('Swipe to delete shows confirmation dialog', (
    WidgetTester tester,
  ) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const ProviderScope(child: MyApp()));

    // Find the task card for "Complete Project Plan".
    final taskCardFinder = find.widgetWithText(
      TaskCard,
      'Complete Project Plan',
    );
    expect(taskCardFinder, findsOneWidget);

    // Swipe to delete (left).
    await tester.drag(taskCardFinder, const Offset(-500.0, 0.0));
    await tester.pumpAndSettle();

    // Verify confirmation dialog appears.
    expect(find.text('Delete Task?'), findsOneWidget);
    expect(
      find.text('Are you sure you want to delete "Complete Project Plan"?'),
      findsOneWidget,
    );

    // Cancel deletion.
    await tester.tap(find.text('Cancel'));
    await tester.pumpAndSettle();

    // Verify task is still there.
    expect(find.text('Complete Project Plan'), findsOneWidget);

    // Swipe to delete again.
    await tester.drag(taskCardFinder, const Offset(-500.0, 0.0));
    await tester.pumpAndSettle();

    // Confirm deletion.
    await tester.tap(find.text('Delete'));
    await tester.pumpAndSettle();

    // Verify task is gone.
    expect(find.text('Complete Project Plan'), findsNothing);
  });
}
