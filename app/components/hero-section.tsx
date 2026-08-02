"use client";

import type { RoadmapPhase } from "../data/roadmap";
import ProgressTerminal from "./progress-terminal";

type HeroSectionProps = {
  percentage: number;
  nextPhase?: RoadmapPhase;
};

export default function HeroSection({ percentage, nextPhase }: HeroSectionProps) {
  return (
    <section className="hero-section shell">
      <div className="hero-left">
        <div className="hero-kicker">YOUR 2026 LEARNING SYSTEM</div>

        <h1 className="hero-title">
          สร้างเส้นทาง
          <br />
          <span className="accent-word">Software Developer</span>
          <br />
          ยุค AI ของคุณเอง
        </h1>

        <p className="hero-desc">
          Roadmap สำหรับคนที่อยากใช้ AI เป็นคู่คิด เพื่อสร้างของจริงได้อย่างมั่นใจ
          ครอบคลุมทักษะสำคัญตั้งแต่พื้นฐานไปจนถึงงาน Production
        </p>

        <a className="cta-btn" href="#roadmap">
          เริ่มเรียนเลย <span className="arrow">↓</span>
        </a>
      </div>

      <div className="hero-right">
        <ProgressTerminal percentage={percentage} nextPhase={nextPhase} />
      </div>
    </section>
  );
}
