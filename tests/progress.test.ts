import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateCompletion,
  sanitizeCompletedTopicIds,
  toggleCompletedTopic,
} from "../app/lib/progress.ts";

test("calculates a rounded completion percentage from completed topics", () => {
  assert.deepEqual(calculateCompletion(["programming", "git-github"], 6), {
    completedCount: 2,
    percentage: 33,
  });
});

test("returns zero completion when the roadmap has no topics", () => {
  assert.deepEqual(calculateCompletion(["programming"], 0), {
    completedCount: 0,
    percentage: 0,
  });
});

test("adds or removes exactly one completed topic", () => {
  assert.deepEqual(toggleCompletedTopic(["programming"], "git-github"), [
    "programming",
    "git-github",
  ]);
  assert.deepEqual(toggleCompletedTopic(["programming", "git-github"], "programming"), [
    "git-github",
  ]);
});

test("rejects malformed browser storage values", () => {
  assert.deepEqual(sanitizeCompletedTopicIds(["programming", 3, null]), []);
  assert.deepEqual(sanitizeCompletedTopicIds(["programming", "git-github"]), [
    "programming",
    "git-github",
  ]);
});
