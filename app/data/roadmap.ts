export type RoadmapTopic = {
  id: string;
  title: string;
  description: string;
};

export type RoadmapPhase = {
  id: string;
  number: string;
  title: string;
  titleThai: string;
  tagline: string;
  icon: string;
  accent: "violet" | "sky" | "amber" | "rose" | "emerald" | "orange";
  topics: readonly RoadmapTopic[];
};

export type PromptItem = {
  category: string;
  icon: string;
  prompt: string;
};

export type ProjectIdea = {
  level: "Beginner" | "Intermediate" | "Advanced";
  title: string;
  description: string;
  stack: string;
};

export const roadmapPhases: readonly RoadmapPhase[] = [
  {
    id: "foundations",
    number: "01",
    title: "Computer Science Basics",
    titleThai: "สร้างรากฐานให้แน่น",
    tagline: "ก่อนใช้ AI ต้องเข้าใจหลักคิดของโค้ด",
    icon: "⌘",
    accent: "violet",
    topics: [
      { id: "programming", title: "Programming Fundamentals", description: "ตัวแปร, control flow และ functions" },
      { id: "git-github", title: "Git & GitHub", description: "version control และการทำงานร่วมกัน" },
      { id: "linux-cli", title: "Linux & CLI", description: "คำสั่งพื้นฐานสำหรับนักพัฒนา" },
    ],
  },
  {
    id: "ai-development",
    number: "02",
    title: "AI-Assisted Development",
    titleThai: "ใช้ AI ให้เป็นคู่คิด",
    tagline: "เปลี่ยน AI tools ให้เป็น workflow ที่ไว้ใจได้",
    icon: "✦",
    accent: "sky",
    topics: [
      { id: "ai-tools", title: "AI Development Tools", description: "ChatGPT, GitHub Copilot, Claude และ Gemini" },
      { id: "prompt-engineering", title: "Prompt Engineering", description: "เขียน prompt ให้ได้คำตอบที่นำไปใช้ต่อได้" },
      { id: "ai-workflow", title: "AI Workflow", description: "วาง workflow สำหรับวิเคราะห์และสร้างโค้ด" },
    ],
  },
  {
    id: "specialization",
    number: "03",
    title: "Build Your Direction",
    titleThai: "เลือกสายที่อยากสร้าง",
    tagline: "สร้างของจริง พร้อมมาตรฐานคุณภาพ",
    icon: "↗",
    accent: "amber",
    topics: [
      { id: "frontend", title: "Frontend", description: "สร้าง UI ที่ responsive และ accessible" },
      { id: "backend", title: "Backend", description: "ออกแบบ server และ business logic" },
      { id: "framework", title: "Framework", description: "ใช้ framework ในการพัฒนา backend เช่น Next.js, React" },
      { id: "mobile", title: "Mobile", description: "พัฒนา mobile applications" },
      { id: "quality", title: "Clean Code & Testing", description: "เขียนโค้ดที่ดูแลง่ายและทดสอบได้" },
    ],
  },
  {
    id: "data-api",
    number: "04",
    title: "Data & API",
    titleThai: "เชื่อมข้อมูลเข้ากับผลิตภัณฑ์",
    tagline: "ออกแบบข้อมูลและ API ที่ต่อยอดได้",
    icon: "◫",
    accent: "rose",
    topics: [
      { id: "database", title: "Database Design", description: "ออกแบบข้อมูลให้รองรับการใช้งานจริง" },
      { id: "sql", title: "SQL", description: "query และจัดการข้อมูลอย่างมั่นใจ" },
      { id: "rest-api", title: "REST API", description: "ออกแบบ API contract ที่ชัดเจน" },
      { id: "api-auth", title: "Authentication", description: "เข้าใจการปกป้อง route และข้อมูล" },
    ],
  },
  {
    id: "devops",
    number: "05",
    title: "Cloud & DevOps Basics",
    titleThai: "ส่งงานขึ้น production",
    tagline: "ทำให้แอปพร้อมใช้งานนอกเครื่องของเรา",
    icon: "☁",
    accent: "emerald",
    topics: [
      { id: "docker", title: "Docker", description: "จัดสภาพแวดล้อมให้เหมือนกันทุกเครื่อง" },
      { id: "cicd", title: "CI/CD", description: "ตรวจสอบและ deploy โค้ดอย่างเป็นระบบ" },
      { id: "deployment", title: "Deployment", description: "นำแอปขึ้น cloud platform" },
      { id: "monitoring", title: "Monitoring", description: "ติดตามปัญหาหลัง deploy" },
    ],
  },
  {
    id: "career",
    number: "06",
    title: "Portfolio & Career",
    titleThai: "เปลี่ยนทักษะเป็นโอกาส",
    tagline: "เล่าเรื่องงานของคุณให้คนอื่นเห็นภาพ",
    icon: "◎",
    accent: "orange",
    topics: [
      { id: "portfolio", title: "Portfolio Projects", description: "คัดผลงานที่แสดงทักษะได้จริง" },
      { id: "resume", title: "Resume", description: "สื่อสารประสบการณ์อย่างกระชับ" },
      { id: "interview", title: "Technical Interview", description: "ฝึกตอบและอธิบายแนวคิด" },
      { id: "job-search", title: "Internship / Job", description: "วางแผนหางานและสร้าง connection" },
    ],
  },
];

export const promptLibrary: readonly PromptItem[] = [
  { category: "Debug", icon: "⌁", prompt: "ช่วยวิเคราะห์ error นี้ บอกสาเหตุที่เป็นไปได้ เรียงลำดับวิธีตรวจสอบ และเสนอวิธีแก้ที่เล็กที่สุด" },
  { category: "Code Review", icon: "◈", prompt: "ช่วย review โค้ดนี้ โดยแยกปัญหาเป็น correctness, security, readability และเสนอ patch ที่จำเป็น" },
  { category: "Test", icon: "✓", prompt: "ช่วยออกแบบ test cases สำหรับฟังก์ชันนี้ โดยครอบคลุม happy path, edge case และ invalid input" },
  { category: "SQL", icon: "▤", prompt: "ช่วยเขียน SQL query สำหรับ schema นี้ พร้อมอธิบาย index ที่ควรมีและเหตุผล" },
  { category: "API", icon: "⇄", prompt: "ช่วยออกแบบ REST API สำหรับ feature นี้ พร้อม routes, request/response example และ validation" },
];

export const projectIdeas: readonly ProjectIdea[] = [
  { level: "Beginner", title: "Personal Task Tracker", description: "จัดการงานส่วนตัวพร้อมสถานะ", stack: "HTML, CSS, JavaScript" },
  { level: "Beginner", title: "Study Timer", description: "จับเวลา Pomodoro และบันทึก session", stack: "TypeScript, Local Storage" },
  { level: "Intermediate", title: "Expense Tracker API", description: "บันทึกรายรับรายจ่ายพร้อมรายงาน", stack: "Next.js, REST API, SQL" },
  { level: "Intermediate", title: "Issue Triage Board", description: "จัดลำดับและติดตาม bug", stack: "TypeScript, API, Docker" },
  { level: "Advanced", title: "AI Code Review Assistant", description: "วิเคราะห์ pull request และสรุปข้อเสนอแนะ", stack: "Next.js, AI API, PostgreSQL" },
  { level: "Advanced", title: "Deployment Control Center", description: "ดูสถานะ build และ release", stack: "CI/CD, Docker, Monitoring" },
];
