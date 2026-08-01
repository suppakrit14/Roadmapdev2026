export type Completion = {
  completedCount: number;
  percentage: number;
};

export function calculateCompletion(
  completedTopicIds: readonly string[],
  totalTopics: number,
): Completion {
  if (totalTopics <= 0) {
    return { completedCount: 0, percentage: 0 };
  }

  const completedCount = Math.min(completedTopicIds.length, totalTopics);

  return {
    completedCount,
    percentage: Math.round((completedCount / totalTopics) * 100),
  };
}

export function toggleCompletedTopic(
  completedTopicIds: readonly string[],
  topicId: string,
): string[] {
  return completedTopicIds.includes(topicId)
    ? completedTopicIds.filter((id) => id !== topicId)
    : [...completedTopicIds, topicId];
}

export function sanitizeCompletedTopicIds(value: unknown): string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? value
    : [];
}
