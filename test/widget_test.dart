import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:app/main.dart';

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
}
