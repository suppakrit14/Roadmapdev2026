"use client";
import { useEffect, useMemo, useState } from "react";
import { projectIdeas, promptLibrary, roadmapPhases } from "../data/roadmap";
import { calculateCompletion, sanitizeCompletedTopicIds, toggleCompletedTopic } from "../lib/progress";
type Theme = "light" | "dark";
const topics = roadmapPhases.flatMap((phase) => phase.topics);

export default function RoadmapDashboard() {
  const [done, setDone] = useState<string[]>([]);
  const [open, setOpen] = useState<string[]>([roadmapPhases[0].id]);
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  useEffect(() => {
    const restore = window.setTimeout(() => {
      try { setDone(sanitizeCompletedTopicIds(JSON.parse(localStorage.getItem("ai-roadmap-completed-topic-ids") ?? "[]"))); } catch { setDone([]); }
      const saved = localStorage.getItem("ai-roadmap-theme");
      setTheme(saved === "dark" || saved === "light" ? saved : "light");
      setReady(true);
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("ai-roadmap-completed-topic-ids", JSON.stringify(done)); }, [done, ready]);
  useEffect(() => { if (ready) localStorage.setItem("ai-roadmap-theme", theme); }, [ready, theme]);
  const progress = useMemo(() => calculateCompletion(done, topics.length), [done]);
  const toggleOpen = (id: string) => setOpen((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const copy = async (name: string, prompt: string) => { try { await navigator.clipboard.writeText(prompt); setCopied(name); setTimeout(() => setCopied(null), 1500); } catch { setCopied(null); } };
  return <div className="app" data-theme={theme}>
    <header><a className="brand" href="#top"><b>/</b>dev<span>path</span></a><nav><a href="#roadmap">Roadmap</a><a href="#prompts">Prompts</a><a href="#projects">Projects</a></nav><div><small>{progress.percentage}% complete</small><button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="สลับธีม">{theme === "dark" ? "☀" : "☾"}</button></div></header>
    <main id="top"><section className="hero shell"><div><p className="kicker">● YOUR 2026 LEARNING SYSTEM</p><h1>สร้างเส้นทาง<br /><i>Software Developer</i><br />ของคุณเอง</h1><p>Roadmap สำหรับคนที่อยากใช้ AI เป็นเครื่องมือ<br />แล้วสร้างของจริงได้ด้วยตัวเอง</p><a className="button" href="#roadmap">เริ่มเรียนเลย ↓</a></div><aside><small>LEARNING STATUS · ● Active</small><strong>{progress.percentage}<em>%</em></strong><span>completed</span><div className="track"><i style={{width:`${progress.percentage}%`}} /></div><p>UP NEXT<br /><b>Phase {roadmapPhases.find((phase) => phase.topics.some((topic) => !done.includes(topic.id)))?.number ?? "✓"}</b></p></aside></section>
    <section className="stats"><div className="shell"><p><b>06</b>Learning Phases</p><p><b>{topics.length}</b>Core Topics</p><p><b>06</b>Project Ideas</p><p><b>05</b>AI Prompts</p></div></section>
    <section className="shell progress"><div><p className="kicker">YOUR PROGRESS</p><h2>ทุกครั้งที่ติ๊ก คือหนึ่งก้าว<br />ที่ชัดเจนขึ้น</h2></div><div><b>{progress.completedCount}<small>/{topics.length}</small></b><span>หัวข้อที่เรียนแล้ว</span></div><div className="track"><i style={{width:`${progress.percentage}%`}} /></div></section>
    <section className="shell section" id="roadmap"><p className="kicker">THE ROADMAP</p><h2>เดินทีละ Phase<br />ไปให้ถึงสิ่งที่อยากเป็น</h2><div className="phases">{roadmapPhases.map((phase) => { const count=phase.topics.filter((topic)=>done.includes(topic.id)).length; const expanded=open.includes(phase.id); return <article className={`phase phase--${phase.accent}`} key={phase.id}><button className="phase-head" onClick={()=>toggleOpen(phase.id)} aria-expanded={expanded}><span>{phase.number}</span><b>{phase.icon}</b><div><small>PHASE {phase.number}</small><strong>{phase.titleThai}</strong><em>{phase.title}</em></div><i>{count}/{phase.topics.length} {expanded ? "−" : "+"}</i></button><p>{phase.tagline}</p>{expanded && <div className="topics">{phase.topics.map((topic)=>{const checked=done.includes(topic.id); return <label className={checked?"checked":""} key={topic.id}><input type="checkbox" checked={checked} onChange={()=>setDone((value)=>toggleCompletedTopic(value,topic.id))}/><b>✓</b><span><strong>{topic.title}</strong><small>{topic.description}</small></span></label>})}</div>}</article>})}</div></section>
    <section className="prompt-section" id="prompts"><div className="shell section"><p className="kicker">AI PROMPT LIBRARY</p><h2>ถามให้ดี<br />AI ก็ช่วยได้ไกล</h2><div className="cards">{promptLibrary.map((item)=><article key={item.category}><b>{item.icon} {item.category}</b><p>“{item.prompt}”</p><button onClick={()=>copy(item.category,item.prompt)}>{copied===item.category?"คัดลอกแล้ว ✓":"Copy prompt"}</button></article>)}</div></div></section>
    <section className="shell section" id="projects"><p className="kicker">BUILD TO LEARN</p><h2>ผลงานที่บอกได้ว่า<br />คุณทำอะไรเป็น</h2><div className="cards projects">{projectIdeas.map((item,index)=><article key={item.title}><small>{item.level} · 0{index+1}</small><h3>{item.title}</h3><p>{item.description}</p><b>{item.stack}</b></article>)}</div></section></main>
    <footer className="shell"><a className="brand" href="#top"><b>/</b>dev<span>path</span></a><span>Build. Learn. Repeat.</span><a href="#top">Back to top ↑</a></footer>
  </div>;
}
