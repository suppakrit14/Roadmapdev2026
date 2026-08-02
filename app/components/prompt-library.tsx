"use client";

import { useState } from "react";
import { promptLibrary } from "../data/roadmap";

export default function PromptLibrary() {
  const [copiedCategory, setCopiedCategory] = useState<string | null>(null);

  const copyPrompt = async (cat: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCategory(cat);
      setTimeout(() => setCopiedCategory(null), 2000);
    } catch {
      /* noop */
    }
  };

  return (
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
                className={`copy-btn ${
                  copiedCategory === item.category ? "is-copied" : ""
                }`}
                onClick={() => copyPrompt(item.category, item.prompt)}
              >
                {copiedCategory === item.category
                  ? "✓ คัดลอกแล้ว"
                  : "Copy Prompt →"}
              </button>
            </article>
          ))}
        </div>
      </div>

      {copiedCategory && (
        <div className="toast" role="status">
          คัดลอก Prompt «{copiedCategory}» สำเร็จ
        </div>
      )}
    </section>
  );
}
