"use client";

import type { RoadmapPhase } from "../data/roadmap";

type ProgressTerminalProps = {
  percentage: number;
  nextPhase?: RoadmapPhase;
};

export default function ProgressTerminal({
  percentage,
  nextPhase,
}: ProgressTerminalProps) {
  return (
    <div className="terminal-card">
      <div className="terminal-bar">
        <div className="terminal-dots">
          <span />
          <span />
          <span />
        </div>
        <span className="terminal-bar-title">progress.terminal</span>
      </div>

      <div className="terminal-body">
        <div className="terminal-stat-label">Learning Progress</div>
        <div className="terminal-stat">
          <span className="terminal-stat-number">{percentage}</span>
          <span className="terminal-stat-unit">%</span>
        </div>

        <div className="cyber-progress-bar">
          <div
            className="cyber-progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="terminal-next">
          <div className="terminal-next-label">▸ up_next</div>
          <div className="terminal-next-value">
            {nextPhase
              ? `Phase ${nextPhase.number} — ${nextPhase.titleThai}`
              : "✓ เรียนครบทุก Phase แล้ว!"}
          </div>
        </div>
      </div>
    </div>
  );
}
