"use client";

import { useEffect, useMemo, useState } from "react";
import { projectIdeas, promptLibrary, roadmapPhases } from "../data/roadmap";
import {
  calculateCompletion,
  sanitizeCompletedTopicIds,
  toggleCompletedTopic,
} from "../lib/progress";

type Theme = "dark" | "light";

const allPhaseIds = roadmapPhases.map((p) => p.id);
const allTopics = roadmapPhases.flatMap((p) => p.topics);

export default function RoadmapDashboard() {
  const [done, setDone] = useState<string[]>([]);
  const [openPhases, setOpenPhases] = useState<string[]>([roadmapPhases[0].id]);
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);
  const [copiedCategory, setCopiedCategory] = useState<string | null>(null);

  /* ---- Restore from localStorage ---- */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem("ai-roadmap-completed-topic-ids");
        setDone(sanitizeCompletedTopicIds(JSON.parse(raw ?? "[]")));
      } catch {
        setDone([]);
      }

      const saved = localStorage.getItem("ai-roadmap-theme");
      setTheme(saved === "light" || saved === "dark" ? saved : "dark");
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  /* ---- Persist ---- */
  useEffect(() => {
    if (ready) localStorage.setItem("ai-roadmap-completed-topic-ids", JSON.stringify(done));
  }, [done, ready]);

  useEffect(() => {
    if (ready) localStorage.setItem("ai-roadmap-theme", theme);
  }, [theme, ready]);

  /* ---- Derived ---- */
  const progress = useMemo(() => calculateCompletion(done, allTopics.length), [done]);

  const nextPhase = useMemo(
    () => roadmapPhases.find((p) => p.topics.some((t) => !done.includes(t.id))),
    [done],
  );

  /* ---- Handlers ---- */
  const togglePhase = (id: string) =>
    setOpenPhases((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const expandAll = () => setOpenPhases([...allPhaseIds]);
  const collapseAll = () => setOpenPhases([]);

  const copyPrompt = async (cat: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCategory(cat);
      setTimeout(() => setCopiedCategory(null), 2000);
    } catch {
      /* noop */
    }
  };

  /* ================================================================
     RENDER
     ================================================================ */
  return (
    <div className="app" data-theme={theme}>
      {/* ---- HEADER ---- */}
      <header className="header-nav">
        <a className="brand" href="#top" aria-label="devpath home">
          <span className="slash">//</span> devpath
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#roadmap">Roadmap</a>
          <a href="#prompts">Prompts</a>
          <a href="#projects">Projects</a>
        </nav>

        <div className="header-actions">
          <div className="progress-pill">
            <span className="live-dot" />
            <span>{progress.percentage}%</span>
          </div>

          <button
            className="theme-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </div>
      </header>

      <main id="top">
        {/* ---- HERO ---- */}
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

          {/* Cyber Progress Terminal */}
          <div className="hero-right">
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
                  <span className="terminal-stat-number">{progress.percentage}</span>
                  <span className="terminal-stat-unit">%</span>
                </div>

                <div className="cyber-progress-bar">
                  <div
                    className="cyber-progress-fill"
                    style={{ width: `${progress.percentage}%` }}
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
          </div>
        </section>

        {/* ---- STATS ---- */}
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
              <span className="stat-num">{allTopics.length}</span>
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

        {/* ---- ROADMAP ---- */}
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
              <button className="ctrl-btn" onClick={expandAll}>
                ⊕ เปิดทั้งหมด
              </button>
              <button className="ctrl-btn" onClick={collapseAll}>
                ⊖ พับทั้งหมด
              </button>
            </div>
          </div>

          <div className="roadmap-list">
            {roadmapPhases.map((phase) => {
              const cnt = phase.topics.filter((t) => done.includes(t.id)).length;
              const isOpen = openPhases.includes(phase.id);

              return (
                <article
                  key={phase.id}
                  className={`phase-card ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    className="phase-btn"
                    onClick={() => togglePhase(phase.id)}
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
                        {cnt}/{phase.topics.length}
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
                              onChange={() =>
                                setDone((v) => toggleCompletedTopic(v, topic.id))
                              }
                            />
                            <span className="cyber-check">{checked ? "✓" : ""}</span>

                            <div className="topic-text">
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

        {/* ---- AI PROMPT LIBRARY ---- */}
        <section className="prompts-section" id="prompts">
          <div className="shell">
            <div className="section-header">
              <div>
                <div className="section-kicker">AI PROMPT LIBRARY</div>
                <h2 className="section-title">
                  ถามให้ดี
                  <br />
                  AI ก็ช่วยได้ไกล
                </h2>
              </div>
            </div>

            <div className="prompt-grid">
              {promptLibrary.map((item) => (
                <article className="prompt-card" key={item.category}>
                  <span className="prompt-badge">
                    {item.icon} {item.category}
                  </span>

                  <div className="prompt-body">"{item.prompt}"</div>

                  <button
                    className={`copy-btn ${copiedCategory === item.category ? "is-copied" : ""}`}
                    onClick={() => copyPrompt(item.category, item.prompt)}
                  >
                    {copiedCategory === item.category ? "✓ คัดลอกแล้ว" : "Copy Prompt →"}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---- PROJECT IDEAS ---- */}
        <section className="shell section" id="projects">
          <div className="section-header">
            <div>
              <div className="section-kicker">BUILD TO LEARN</div>
              <h2 className="section-title">
                ผลงานที่บอกได้ว่า
                <br />
                คุณทำอะไรเป็น
              </h2>
            </div>
          </div>

          <div className="project-grid">
            {projectIdeas.map((proj, i) => (
              <article className="project-card" key={proj.title}>
                <div className="project-card-top">
                  <span className={`level-tag ${proj.level.toLowerCase()}`}>{proj.level}</span>
                  <span className="project-idx">0{i + 1}</span>
                </div>
                <h3 className="project-title">{proj.title}</h3>
                <p className="project-desc">{proj.description}</p>
                <span className="project-stack">⚡ {proj.stack}</span>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* ---- FOOTER ---- */}
      <footer className="site-footer">
        <div className="shell footer-row">
          <a className="brand" href="#top">
            <span className="slash">//</span> devpath
          </a>

          <span className="footer-tagline">Build. Learn. Repeat. — 2026</span>

          <a className="back-top-btn" href="#top">
            Back to top ↑
          </a>
        </div>
      </footer>

      {/* Toast */}
      {copiedCategory && (
        <div className="toast" role="status">
          คัดลอก Prompt «{copiedCategory}» สำเร็จ
        </div>
      )}
    </div>
  );
}
