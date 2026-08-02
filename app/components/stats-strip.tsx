"use client";

type StatsStripProps = {
  totalTopics: number;
};

export default function StatsStrip({ totalTopics }: StatsStripProps) {
  return (
    <section className="stats-strip">
      <div className="shell stats-grid">
        <div className="stat-cell">
          <span className="stat-num">06</span>
          <div className="stat-info">
            <strong>Learning Phases</strong>
            <span>ครอบคลุมทุกสเต็ป</span>
          </div>
        </div>
        <div className="stat-cell">
          <span className="stat-num">{totalTopics}</span>
          <div className="stat-info">
            <strong>Core Topics</strong>
            <span>หัวข้อทักษะสำคัญ</span>
          </div>
        </div>
        <div className="stat-cell">
          <span className="stat-num">05</span>
          <div className="stat-info">
            <strong>AI Prompts</strong>
            <span>คลังคำสั่งช่วยเขียนโค้ด</span>
          </div>
        </div>
        <div className="stat-cell">
          <span className="stat-num">06</span>
          <div className="stat-info">
            <strong>Project Ideas</strong>
            <span>ไอเดียสร้างผลงานจริง</span>
          </div>
        </div>
      </div>
    </section>
  );
}
