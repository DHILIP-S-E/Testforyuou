import 'package:freezed_annotation/freezed_annotation.dart';

part 'task.freezed.dart';
part 'task.g.dart';

enum TaskPriority {
  @JsonValue('high')
  high,
  @JsonValue('medium')
  medium,
  @JsonValue('low')
  low,
  @JsonValue('none')
  none,
}

@freezed
class Task with _$Task {
  const factory Task({
    required String id,
    required String title,
    DateTime? dueDate,
    @Default(false) bool isCompleted,
    @Default(TaskPriority.none) TaskPriority priority,
    String? project,
    @Default([]) List<String> tags,
  }) = _Task;

  factory Task.fromJson(Map<String, dynamic> json) => _$TaskFromJson(json);
}
