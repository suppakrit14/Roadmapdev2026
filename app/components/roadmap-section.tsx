"use client";

import { roadmapPhases } from "../data/roadmap";
import PhaseCard from "./phase-card";

type RoadmapSectionProps = {
  done: string[];
  openPhases: string[];
  onTogglePhase: (id: string) => void;
  onToggleTopic: (id: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
};

export default function RoadmapSection({
  done,
  openPhases,
  onTogglePhase,
  onToggleTopic,
  onExpandAll,
  onCollapseAll,
}: RoadmapSectionProps) {
  return (
    <section className="shell section" id="roadmap">
      <div className="section-header">
        <div>
          <div className="section-kicker">THE ROADMAP</div>
          <h2 className="section-title">
            เดินทีละ Phase
            <br />
            ไปให้ถึงสิ่งที่อยากเป็น
          </h2>
        </div>

        <div className="controls-row">
          <button className="ctrl-btn" onClick={onExpandAll}>
            ⊕ เปิดทั้งหมด
          </button>
          <button className="ctrl-btn" onClick={onCollapseAll}>
            ⊖ พับทั้งหมด
          </button>
        </div>
      </div>

      <div className="roadmap-list">
        {roadmapPhases.map((phase) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            isOpen={openPhases.includes(phase.id)}
            done={done}
            onTogglePhase={onTogglePhase}
            onToggleTopic={onToggleTopic}
          />
        ))}
      </div>
    </section>
  );
}
