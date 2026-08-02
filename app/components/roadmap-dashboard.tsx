"use client";

import { useEffect, useMemo, useState } from "react";
import { roadmapPhases } from "../data/roadmap";
import {
  calculateCompletion,
  sanitizeCompletedTopicIds,
  toggleCompletedTopic,
} from "../lib/progress";

import HeaderNav from "./header-nav";
import HeroSection from "./hero-section";
import StatsStrip from "./stats-strip";
import RoadmapSection from "./roadmap-section";
import PromptLibrary from "./prompt-library";
import ProjectIdeas from "./project-ideas";
import SiteFooter from "./site-footer";

type Theme = "dark" | "light";

const allPhaseIds = roadmapPhases.map((p) => p.id);
const allTopics = roadmapPhases.flatMap((p) => p.topics);

export default function RoadmapDashboard() {
  const [done, setDone] = useState<string[]>([]);
  const [openPhases, setOpenPhases] = useState<string[]>([roadmapPhases[0].id]);
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  /* ---- Restore state from localStorage & sync DOM attribute ---- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem("ai-roadmap-completed-topic-ids");
      setDone(sanitizeCompletedTopicIds(JSON.parse(raw ?? "[]")));
    } catch {
      setDone([]);
    }

    const saved = localStorage.getItem("ai-roadmap-theme");
    const initialTheme: Theme = saved === "light" || saved === "dark" ? saved : "dark";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    setReady(true);
  }, []);

  /* ---- Persist state updates ---- */
  useEffect(() => {
    if (ready) {
      localStorage.setItem("ai-roadmap-completed-topic-ids", JSON.stringify(done));
    }
  }, [done, ready]);

  useEffect(() => {
    if (ready) {
      localStorage.setItem("ai-roadmap-theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, ready]);

  /* ---- Derived calculations ---- */
  const progress = useMemo(() => calculateCompletion(done, allTopics.length), [done]);

  const nextPhase = useMemo(
    () => roadmapPhases.find((p) => p.topics.some((t) => !done.includes(t.id))),
    [done],
  );

  /* ---- Handlers ---- */
  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const togglePhase = (id: string) =>
    setOpenPhases((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const toggleTopic = (topicId: string) =>
    setDone((v) => toggleCompletedTopic(v, topicId));

  const expandAll = () => setOpenPhases([...allPhaseIds]);
  const collapseAll = () => setOpenPhases([]);

  return (
    <div className="app" data-theme={theme}>
      <HeaderNav
        percentage={progress.percentage}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main id="top">
        <HeroSection percentage={progress.percentage} nextPhase={nextPhase} />

        <StatsStrip totalTopics={allTopics.length} />

        <RoadmapSection
          done={done}
          openPhases={openPhases}
          onTogglePhase={togglePhase}
          onToggleTopic={toggleTopic}
          onExpandAll={expandAll}
          onCollapseAll={collapseAll}
        />

        <PromptLibrary />

        <ProjectIdeas />
      </main>

      <SiteFooter />
    </div>
  );
}
