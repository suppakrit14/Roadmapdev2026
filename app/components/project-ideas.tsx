"use client";

import { projectIdeas } from "../data/roadmap";

export default function ProjectIdeas() {
  return (
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
              <span className={`level-tag ${proj.level.toLowerCase()}`}>
                {proj.level}
              </span>
              <span className="project-idx">0{i + 1}</span>
            </div>
            <h3 className="project-title">{proj.title}</h3>
            <p className="project-desc">{proj.description}</p>
            <span className="project-stack">⚡ {proj.stack}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
