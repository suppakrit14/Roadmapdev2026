# Interactive Roadmap Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Next.js starter screen with a Thai-first interactive AI-powered software-developer learning roadmap that saves checklist progress and theme locally.

**Architecture:** Keep `app/page.tsx` as a small server route that renders one interactive client dashboard. Put the roadmap and supporting card data in a typed, static module; the dashboard owns expandable phases, completion IDs, and theme state, restoring and persisting browser values only after mount. Use global Tailwind CSS for the focused single-page visual system.

**Tech Stack:** Next.js 16.2.12 App Router, React 19.2.4, TypeScript 5, Tailwind CSS 4, browser `localStorage`.

## Global Constraints

- Thai is the primary language; product and programming terms such as Git, Docker, API, and Next.js remain English.
- Do not add dependencies, a backend, database, authentication, AI API, or external network calls.
- Store only completed topic IDs and the selected theme in `localStorage`.
- The interactive component must begin with `'use client'`; metadata remains in the server `app/layout.tsx`.
- All interactive controls need native button/checkbox semantics and keyboard-visible focus states.
- Support a narrow mobile viewport without horizontal scrolling and honor `prefers-reduced-motion`.

---

## File Structure

- Modify `app/layout.tsx` — Thai document language, website title and description, global body treatment.
- Modify `app/page.tsx` — server route that renders the client dashboard.
- Create `app/data/roadmap.ts` — typed Phase, prompt, and project-idea data with stable topic IDs.
- Create `app/components/roadmap-dashboard.tsx` — all client-side controls, persistence, progress calculation, and page sections.
- Modify `app/globals.css` — custom visual tokens, soft background treatment, responsive details, and reduced-motion rule.

## Task 1: Define the static learning content

**Files:**
- Create: `app/data/roadmap.ts`

**Interfaces:**
- Produces: `RoadmapPhase`, `PromptItem`, `ProjectIdea` types and `roadmapPhases`, `promptLibrary`, `projectIdeas` readonly arrays.
- Consumes: no runtime data or browser APIs.

- [ ] **Step 1: Create typed content contracts and six roadmap phases**

```ts
export type RoadmapTopic = {
  id: string;
  title: string;
  description: string;
};

export type RoadmapPhase = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  topics: readonly RoadmapTopic[];
};

export const roadmapPhases: readonly RoadmapPhase[] = [
  { id: "foundations", number: "01", title: "Computer Science Basics", tagline: "วางรากฐานให้เขียนโค้ดได้มั่นใจ", topics: [
    { id: "programming", title: "Programming Fundamentals", description: "ตัวแปร, control flow และ functions" },
    { id: "git-github", title: "Git & GitHub", description: "version control และการทำงานร่วมกัน" },
    { id: "linux-cli", title: "Linux & CLI", description: "คำสั่งพื้นฐานสำหรับนักพัฒนา" },
  ] },
  { id: "ai-development", number: "02", title: "AI-Assisted Development", tagline: "ใช้ AI เป็นคู่คิดในการพัฒนา", topics: [
    { id: "ai-tools", title: "AI Development Tools", description: "ChatGPT, GitHub Copilot, Claude และ Gemini" },
    { id: "prompt-engineering", title: "Prompt Engineering", description: "เขียน prompt ให้ได้คำตอบที่นำไปใช้ต่อได้" },
    { id: "ai-workflow", title: "AI Workflow", description: "วาง workflow สำหรับวิเคราะห์และสร้างโค้ด" },
  ] },
  { id: "specialization", number: "03", title: "Build Your Direction", tagline: "เลือกสายที่อยากสร้างให้ชัดเจน", topics: [
    { id: "frontend", title: "Frontend", description: "สร้าง UI ที่ responsive และ accessible" },
    { id: "backend", title: "Backend", description: "ออกแบบ server และ business logic" },
    { id: "mobile", title: "Mobile", description: "พัฒนา mobile applications" },
    { id: "quality", title: "Clean Code & Testing", description: "เขียนโค้ดที่ดูแลง่ายและทดสอบได้" },
  ] },
  { id: "data-api", number: "04", title: "Data & API", tagline: "เชื่อมข้อมูลกับผลิตภัณฑ์ของคุณ", topics: [
    { id: "database", title: "Database Design", description: "ออกแบบข้อมูลให้รองรับการใช้งานจริง" },
    { id: "sql", title: "SQL", description: "query และจัดการข้อมูลอย่างมั่นใจ" },
    { id: "rest-api", title: "REST API", description: "ออกแบบ API contract ที่ชัดเจน" },
    { id: "api-auth", title: "Authentication", description: "เข้าใจการปกป้อง route และข้อมูล" },
  ] },
  { id: "devops", number: "05", title: "Cloud & DevOps Basics", tagline: "ส่งงานขึ้น production ได้ด้วยตัวเอง", topics: [
    { id: "docker", title: "Docker", description: "จัดสภาพแวดล้อมให้เหมือนกันทุกเครื่อง" },
    { id: "cicd", title: "CI/CD", description: "ตรวจสอบและ deploy โค้ดอย่างเป็นระบบ" },
    { id: "deployment", title: "Deployment", description: "นำแอปขึ้น cloud platform" },
    { id: "monitoring", title: "Monitoring", description: "ติดตามปัญหาหลัง deploy" },
  ] },
  { id: "career", number: "06", title: "Portfolio & Career", tagline: "เปลี่ยนทักษะให้กลายเป็นโอกาส", topics: [
    { id: "portfolio", title: "Portfolio Projects", description: "คัดผลงานที่แสดงทักษะได้จริง" },
    { id: "resume", title: "Resume", description: "สื่อสารประสบการณ์อย่างกระชับ" },
    { id: "interview", title: "Technical Interview", description: "ฝึกตอบและอธิบายแนวคิด" },
    { id: "job-search", title: "Internship / Job", description: "วางแผนหางานและสร้าง connection" },
  ] },
];
```

- [ ] **Step 2: Add five Thai prompt entries and three project ideas for each learning level**

```ts
export const promptLibrary: readonly PromptItem[] = [
  { category: "Debug", prompt: "ช่วยวิเคราะห์ error นี้ บอกสาเหตุที่เป็นไปได้ เรียงลำดับวิธีตรวจสอบ และเสนอวิธีแก้ที่เล็กที่สุด" },
  { category: "Code Review", prompt: "ช่วย review โค้ดนี้ โดยแยกปัญหาเป็น correctness, security, readability และเสนอ patch ที่จำเป็น" },
  { category: "Test", prompt: "ช่วยออกแบบ test cases สำหรับฟังก์ชันนี้ โดยครอบคลุม happy path, edge case และ invalid input" },
  { category: "SQL", prompt: "ช่วยเขียน SQL query สำหรับ schema นี้ พร้อมอธิบาย index ที่ควรมีและเหตุผล" },
  { category: "API", prompt: "ช่วยออกแบบ REST API สำหรับ feature นี้ พร้อม routes, request/response example และ validation" },
];

export const projectIdeas: readonly ProjectIdea[] = [
  { level: "Beginner", title: "Personal Task Tracker", description: "จัดการงานส่วนตัวพร้อมสถานะ", stack: "HTML, CSS, JavaScript" },
  { level: "Beginner", title: "Weather Dashboard", description: "แสดงสภาพอากาศจากข้อมูลตัวอย่าง", stack: "React, CSS" },
  { level: "Beginner", title: "Study Timer", description: "จับเวลา Pomodoro และบันทึก session", stack: "TypeScript, Local Storage" },
  { level: "Intermediate", title: "Expense Tracker API", description: "บันทึกรายรับรายจ่ายพร้อมรายงาน", stack: "Next.js, REST API, SQL" },
  { level: "Intermediate", title: "Team Knowledge Base", description: "รวบรวมบทความและค้นหาข้อมูล", stack: "React, Node.js, Database" },
  { level: "Intermediate", title: "Issue Triage Board", description: "จัดลำดับและติดตาม bug", stack: "TypeScript, API, Docker" },
  { level: "Advanced", title: "AI Code Review Assistant", description: "วิเคราะห์ pull request และสรุปข้อเสนอแนะ", stack: "Next.js, AI API, PostgreSQL" },
  { level: "Advanced", title: "Realtime Collaboration App", description: "แก้ไขเอกสารร่วมกันแบบสด", stack: "WebSocket, React, Cloud" },
  { level: "Advanced", title: "Deployment Control Center", description: "ดูสถานะ build และ release", stack: "CI/CD, Docker, Monitoring" },
];
```

- [ ] **Step 3: Run static validation**

Run: `npm run lint`

Expected: ESLint exits with code 0 and does not report type or syntax errors in the data module.

- [ ] **Step 4: Commit the content model**

```bash
git add app/data/roadmap.ts
git commit -m "feat: add roadmap learning content"
```

## Task 2: Implement interactive dashboard and durable browser state

**Files:**
- Create: `app/components/roadmap-dashboard.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `roadmapPhases`, `promptLibrary`, `projectIdeas`, and their types from `@/app/data/roadmap`.
- Produces: default-exported `RoadmapDashboard` rendered by the root page.
- Browser keys: `ai-roadmap-completed-topic-ids` contains a JSON string array of topic IDs; `ai-roadmap-theme` contains exactly `"light"` or `"dark"`.

- [ ] **Step 1: Create the client state boundary with safe restore logic**

```tsx
"use client";

type Theme = "light" | "dark";

const COMPLETED_TOPICS_KEY = "ai-roadmap-completed-topic-ids";
const THEME_KEY = "ai-roadmap-theme";

const readCompletedTopicIds = (): string[] => {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(COMPLETED_TOPICS_KEY) ?? "[]");
    return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
  } catch {
    return [];
  }
};
```

- [ ] **Step 2: Implement progress calculation and checklist interaction**

```tsx
const allTopics = roadmapPhases.flatMap((phase) => phase.topics);
const completedCount = completedTopicIds.length;
const completionPercent = Math.round((completedCount / allTopics.length) * 100);

const toggleTopic = (topicId: string) => {
  setCompletedTopicIds((current) =>
    current.includes(topicId)
      ? current.filter((id) => id !== topicId)
      : [...current, topicId],
  );
};
```

- [ ] **Step 3: Render the accessible page sections and responsive phase cards**

```tsx
<section id="roadmap" aria-labelledby="roadmap-title">
  <h2 id="roadmap-title">เส้นทางการเรียนของคุณ</h2>
  {roadmapPhases.map((phase) => (
    <article key={phase.id}>
      <button aria-expanded={expandedPhaseIds.includes(phase.id)} onClick={() => togglePhase(phase.id)}>
        <span>Phase {phase.number}</span><span>{phase.title}</span>
      </button>
      {expandedPhaseIds.includes(phase.id) && phase.topics.map((topic) => (
        <label key={topic.id}><input type="checkbox" checked={completedTopicIds.includes(topic.id)} onChange={() => toggleTopic(topic.id)} />{topic.title}</label>
      ))}
    </article>
  ))}
</section>
```

- [ ] **Step 4: Add the hero, sticky progress bar, theme toggle, prompt library, project ideas, and footer**

Use semantic `header`, `main`, `section`, `article`, and `footer` elements. Make the “เริ่มเรียน” link target `#roadmap`; add top navigation links to `#roadmap`, `#prompts`, and `#projects`. Theme state applies a `data-theme` value on the dashboard root and its icon/text reflects the current state.

- [ ] **Step 5: Replace the starter page with the dashboard**

```tsx
import RoadmapDashboard from "./components/roadmap-dashboard";

export default function Home() {
  return <RoadmapDashboard />;
}
```

- [ ] **Step 6: Run the interaction smoke check**

Run: `npm run dev`

Expected: On `http://localhost:3000`, a user can expand a phase, check a topic, observe a changed count and percentage, refresh without losing the check, and switch the theme.

- [ ] **Step 7: Commit the interactive experience**

```bash
git add app/page.tsx app/components/roadmap-dashboard.tsx
git commit -m "feat: build interactive roadmap dashboard"
```

## Task 3: Apply visual system, metadata, and responsive behavior

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `data-theme="light" | "dark"` placed on the dashboard root by `RoadmapDashboard`.
- Produces: global color tokens and metadata for the page.

- [ ] **Step 1: Replace starter globals with page tokens and base styles**

```css
:root {
  --canvas: #f4f7fb;
  --surface: #ffffff;
  --ink: #182230;
  --muted: #64748b;
  --accent: #6d5efc;
}

[data-theme="dark"] {
  --canvas: #10131c;
  --surface: #191e2b;
  --ink: #f7f8fb;
  --muted: #a3afc4;
}
```

- [ ] **Step 2: Style content hierarchy and controls for desktop and mobile**

Use a constrained centered content column, a grid for summary cards and secondary cards, a left timeline marker for Phase cards, strong `:focus-visible` outlines, and a `@media (max-width: 640px)` rule that collapses multi-column sections to one column. Add `@media (prefers-reduced-motion: reduce)` to disable nonessential transitions and smooth scrolling.

- [ ] **Step 3: Localize the document and metadata**

```tsx
export const metadata: Metadata = {
  title: "AI-Powered Software Developer Roadmap 2026",
  description: "เส้นทางเรียน Software Developer พร้อม checklist และ progress tracker",
};

<html lang="th" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
```

- [ ] **Step 4: Run lint and production build**

Run: `npm run lint && npm run build`

Expected: both commands exit with code 0; Next.js builds the `/` route without server/client boundary errors.

- [ ] **Step 5: Inspect desktop and mobile visual flows**

Run: `npm run dev`

Expected: at desktop width, all six phase cards and secondary cards align without collisions; at 390px width, no horizontal scroll occurs and checkboxes/buttons remain easy to tap.

- [ ] **Step 6: Commit the polish**

```bash
git add app/globals.css app/layout.tsx
git commit -m "style: polish responsive roadmap experience"
```

## Task 4: Release proof and cleanup

**Files:**
- Modify: `.eniac-plan.md` (mark milestones complete during execution; remove after verified completion)

**Interfaces:**
- Consumes: completed application files and production commands.
- Produces: a clean verified worktree without the disposable execution plan.

- [ ] **Step 1: Inspect the final diff and scan for residual debug code**

Run: `git diff --check HEAD~3..HEAD && rg -n "console\\.log|debugger|TODO|TBD" app`

Expected: no whitespace errors, debug statements, or unfinished placeholders in changed app code.

- [ ] **Step 2: Re-run release verification**

Run: `npm run lint && npm run build`

Expected: both commands exit with code 0.

- [ ] **Step 3: Remove the disposable execution plan and commit it only if it was tracked intentionally**

Run: `git status --short`

Expected: `.eniac-plan.md` is removed; final status contains only intentional website changes or is clean after commits.
