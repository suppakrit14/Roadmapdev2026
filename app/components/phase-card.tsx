"use client";

import type { RoadmapPhase } from "../data/roadmap";

type PhaseCardProps = {
  phase: RoadmapPhase;
  isOpen: boolean;
  done: string[];
  onTogglePhase: (id: string) => void;
  onToggleTopic: (id: string) => void;
};

export default function PhaseCard({
  phase,
  isOpen,
  done,
  onTogglePhase,
  onToggleTopic,
}: PhaseCardProps) {
  const completedCount = phase.topics.filter((t) => done.includes(t.id)).length;

  return (
    <article className={`phase-card ${isOpen ? "is-open" : ""}`}>
      <button
        className="phase-btn"
        onClick={() => onTogglePhase(phase.id)}
        aria-expanded={isOpen}
      >
        <span className="phase-num">{phase.number}</span>

        <div className="phase-titles">
          <div className="phase-main-title">
            <strong>{phase.titleThai}</strong>
            <span className="en-sub">{phase.title}</span>
          </div>
          <span className="phase-tagline">{phase.tagline}</span>
        </div>

        <div className="phase-end">
          <span className="phase-count-pill">
            {completedCount}/{phase.topics.length}
          </span>
          <span className="toggle-indicator">{isOpen ? "−" : "+"}</span>
        </div>
      </button>

      {isOpen && (
        <div className="topics-body">
          {phase.topics.map((topic) => {
            const checked = done.includes(topic.id);
            return (
              <label
                key={topic.id}
                className={`topic-row ${checked ? "is-done" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleTopic(topic.id)}
                />
                <span className="cyber-check">{checked ? "✓" : ""}</span>

                <div className="topic-text">
                  <strong>{topic.title}</strong>
                  <p>{topic.description}</p>
                  {topic.techStack && topic.techStack.length > 0 && (
                    <div className="topic-tech-list">
                      {topic.techStack.map((tech) => (
                        <span key={tech} className="topic-tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      )}
    </article>
  );
}
