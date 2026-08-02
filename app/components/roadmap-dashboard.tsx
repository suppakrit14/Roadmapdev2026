"use client";

import { useEffect, useMemo, useState } from "react";
import { projectIdeas, promptLibrary, roadmapPhases } from "../data/roadmap";
import { calculateCompletion, sanitizeCompletedTopicIds, toggleCompletedTopic } from "../lib/progress";

type Theme = "light" | "dark";

const allPhaseIds = roadmapPhases.map((phase) => phase.id);
const allTopics = roadmapPhases.flatMap((phase) => phase.topics);

export default function RoadmapDashboard() {
  const [done, setDone] = useState<string[]>([]);
  const [openPhases, setOpenPhases] = useState<string[]>([roadmapPhases[0].id]);
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);
  const [copiedCategory, setCopiedCategory] = useState<string | null>(null);

  // Restore saved state from LocalStorage on mount
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const savedDone = localStorage.getItem("ai-roadmap-completed-topic-ids");
        setDone(sanitizeCompletedTopicIds(JSON.parse(savedDone ?? "[]")));
      } catch {
        setDone([]);
      }

      const savedTheme = localStorage.getItem("ai-roadmap-theme");
      setTheme(savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light");
      setReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  // Save state back to LocalStorage
  useEffect(() => {
    if (ready) {
      localStorage.setItem("ai-roadmap-completed-topic-ids", JSON.stringify(done));
    }
  }, [done, ready]);

  useEffect(() => {
    if (ready) {
      localStorage.setItem("ai-roadmap-theme", theme);
    }
  }, [theme, ready]);

  const progress = useMemo(() => calculateCompletion(done, allTopics.length), [done]);

  const togglePhaseOpen = (id: string) => {
    setOpenPhases((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const expandAllPhases = () => setOpenPhases([...allPhaseIds]);
  const collapseAllPhases = () => setOpenPhases([]);

  const copyPrompt = async (category: string, promptText: string) => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopiedCategory(category);
      setTimeout(() => setCopiedCategory(null), 2000);
    } catch {
      setCopiedCategory(null);
    }
  };

  const nextPhase = useMemo(() => {
    return roadmapPhases.find((phase) => phase.topics.some((topic) => !done.includes(topic.id)));
  }, [done]);

  return (
    <div className="app" data-theme={theme}>
      {/* Header Navigation */}
      <header className="header-nav">
        <a className="brand" href="#top" aria-label="devpath home">
          <b>/</b>
          <span>devpath</span>
        </a>

        <nav className="desktop-nav" aria-label="Main Navigation">
          <a href="#roadmap">Roadmap</a>
          <a href="#prompts">Prompts</a>
          <a href="#projects">Projects</a>
        </nav>

        <div className="header-actions">
          <div className="progress-pill-badge" title="คะแนนรวมความคืบหน้า">
            <span className="dot" />
            <span>{progress.percentage}% Completed</span>
          </div>

          <button
            className="theme-toggle-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="สลับโหมดมืด/โหมดสว่าง"
          >
            <span>{theme === "dark" ? "☀️ Light" : "🌙 Dark"}</span>
          </button>
        </div>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="hero shell">
          <div>
            <span className="section-pill-kicker">● YOUR 2026 LEARNING SYSTEM</span>
            <h1 className="hero-title">
              สร้างเส้นทาง <br />
              <span className="highlight-text">Software Developer</span> <br />
              ยุค AI ของคุณเอง
            </h1>
            <p className="hero-subtitle">
              Roadmap สำหรับคนที่อยากใช้ AI เป็นคู่คิดเพื่อสร้างของจริงได้อย่างมั่นใจ
              ครอบคลุมทักษะสำคัญตั้งแต่พื้นฐานไปจนถึงงาน Production
            </p>
            <a className="cta-button" href="#roadmap">
              <span>เริ่มเรียนเลย</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <aside className="progress-card">
            <div className="progress-card-header">
              <span className="status-badge">
                <span className="live-dot" />
                Learning Status
              </span>
              <span style={{ fontSize: "12px", fontWeight: 700, opacity: 0.8 }}>● Active</span>
            </div>

            <div className="progress-card-stat">
              <span className="progress-card-number">{progress.percentage}</span>
              <span className="progress-card-unit">%</span>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progress.percentage}%` }} />
            </div>

            <div className="progress-card-next">
              <small>UP NEXT TO LEARN</small>
              <b>
                {nextPhase ? `Phase ${nextPhase.number} — ${nextPhase.titleThai}` : "✓ เรียนครบทุก Phase แล้ว!"}
              </b>
            </div>
          </aside>
        </section>

        {/* Stats Bar */}
        <section className="stats-bar">
          <div className="shell stats-grid">
            <div className="stat-item">
              <span className="stat-number">06</span>
              <div className="stat-label">
                <strong>Learning Phases</strong>
                <span>ครอบคลุมทุกสเต็ป</span>
              </div>
            </div>

            <div className="stat-item">
              <span className="stat-number">{allTopics.length}</span>
              <div className="stat-label">
                <strong>Core Topics</strong>
                <span>หัวข้อทักษะสำคัญ</span>
              </div>
            </div>

            <div className="stat-item">
              <span className="stat-number">05</span>
              <div className="stat-label">
                <strong>AI Prompts</strong>
                <span>คลังคำสั่งช่วยเขียนโค้ด</span>
              </div>
            </div>

            <div className="stat-item">
              <span className="stat-number">06</span>
              <div className="stat-label">
                <strong>Project Ideas</strong>
                <span>ไอเดียสร้างผลงานจริง</span>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="shell section" id="roadmap">
          <div className="section-header">
            <div className="section-header-left">
              <span className="section-pill-kicker">THE ROADMAP</span>
              <h2>
                เดินทีละ Phase <br />
                ไปให้ถึงสิ่งที่อยากเป็น
              </h2>
            </div>

            <div className="controls-group">
              <button className="control-btn" onClick={expandAllPhases} title="เปิดดูรายละเอียดทุก Phase">
                <span>⊕ เปิดทั้งหมด</span>
              </button>
              <button className="control-btn" onClick={collapseAllPhases} title="พับปิดทุก Phase">
                <span>⊖ พับทั้งหมด</span>
              </button>
            </div>
          </div>

          <div className="roadmap-phases">
            {roadmapPhases.map((phase) => {
              const completedCount = phase.topics.filter((topic) => done.includes(topic.id)).length;
              const isExpanded = openPhases.includes(phase.id);

              return (
                <article
                  key={phase.id}
                  className={`phase-card phase-card--${phase.accent} ${isExpanded ? "expanded" : ""}`}
                >
                  <button
                    className="phase-header-btn"
                    onClick={() => togglePhaseOpen(phase.id)}
                    aria-expanded={isExpanded}
                  >
                    <div className="phase-number-badge">{phase.number}</div>

                    <div className="phase-title-group">
                      <div className="phase-title-main">
                        <strong>{phase.titleThai}</strong>
                        <span className="phase-en">({phase.title})</span>
                      </div>
                      <p className="phase-tagline">{phase.tagline}</p>
                    </div>

                    <div className="phase-meta">
                      <span className="phase-progress-pill">
                        {completedCount} / {phase.topics.length} สำเร็จแล้ว
                      </span>
                      <div className="toggle-icon-badge" aria-hidden="true">
                        {isExpanded ? "−" : "+"}
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="topics-container">
                      {phase.topics.map((topic) => {
                        const isChecked = done.includes(topic.id);

                        return (
                          <label
                            key={topic.id}
                            className={`topic-item-label ${isChecked ? "checked" : ""}`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() =>
                                setDone((current) => toggleCompletedTopic(current, topic.id))
                              }
                            />
                            <div className="custom-checkbox">{isChecked ? "✓" : ""}</div>

                            <div className="topic-info">
                              <strong>{topic.title}</strong>
                              <p>{topic.description}</p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* AI Prompt Library Section */}
        <section className="prompts-section" id="prompts">
          <div className="shell">
            <div className="section-header">
              <div className="section-header-left">
                <span className="section-pill-kicker">AI PROMPT LIBRARY</span>
                <h2>
                  ถามให้ดี <br />
                  AI ก็ช่วยได้ไกล
                </h2>
              </div>
            </div>

            <div className="cards-grid">
              {promptLibrary.map((item) => (
                <article className="prompt-card" key={item.category}>
                  <div className="prompt-card-top">
                    <span className="prompt-category-badge">
                      <span>{item.icon}</span>
                      <span>{item.category}</span>
                    </span>
                  </div>

                  <p className="prompt-text">“{item.prompt}”</p>

                  <button
                    className="copy-prompt-btn"
                    onClick={() => copyPrompt(item.category, item.prompt)}
                  >
                    <span>{copiedCategory === item.category ? "คัดลอกแล้ว ✓" : "Copy Prompt ↗"}</span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Project Ideas Section */}
        <section className="shell section projects-section" id="projects">
          <div className="section-header">
            <div className="section-header-left">
              <span className="section-pill-kicker">BUILD TO LEARN</span>
              <h2>
                ผลงานที่บอกได้ว่า <br />
                คุณทำอะไรเป็น
              </h2>
            </div>
          </div>

          <div className="cards-grid">
            {projectIdeas.map((project, idx) => (
              <article className="project-card" key={project.title}>
                <div>
                  <div className="project-card-header">
                    <span className={`level-badge ${project.level.toLowerCase()}`}>
                      {project.level}
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--muted)" }}>
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                </div>

                <span className="project-stack-tag">🛠 {project.stack}</span>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer-nav">
        <div className="shell footer-container">
          <a className="brand" href="#top">
            <b>/</b>
            <span>devpath</span>
          </a>

          <span>Build. Learn. Repeat. — AI Developer Roadmap 2026</span>

          <a className="back-top" href="#top">
            <span>Back to top ↑</span>
          </a>
        </div>
      </footer>

      {/* Toast alert on copied prompt */}
      {copiedCategory && (
        <div className="toast-copy" role="status">
          ✓ คัดลอก Prompt หมวด {copiedCategory} เรียบร้อยแล้ว!
        </div>
      )}
    </div>
  );
}
