# AI-Powered Software Developer Roadmap — Design

## Product contract

- **Primary user:** ผู้เริ่มต้นหรือผู้พัฒนาที่ต้องการเส้นทางพัฒนาทักษะ Software Developer ในปี 2026
- **Job to be done:** ดูเส้นทางการเรียนที่เป็นลำดับ ติดตามหัวข้อที่เรียนแล้ว และเลือกสิ่งที่จะเรียนหรือทำโปรเจกต์ถัดไป
- **Primary flow:** เปิดหน้าเว็บ → ดูสถานะความคืบหน้า → เลื่อนดู Phase ตามลำดับ → เปิด Phase → ติ๊ก checklist → เห็น progress อัปเดตทันที
- **Success signal:** ผู้ใช้ติ๊กหัวข้อในหนึ่ง Phase แล้วแถบความคืบหน้าและสถานะ Phase อัปเดต รวมถึงคงอยู่เมื่อเปิดหน้าใหม่
- **Non-goals:** ไม่มีบัญชีผู้ใช้, backend, database, authentication, AI API, coding playground หรือการซิงก์ข้ามอุปกรณ์

## Experience and visual direction

เว็บเป็น single-page interactive learning dashboard ภาษาไทยเป็นหลัก โดยรักษาชื่อเทคโนโลยีและคำเทคนิคเป็นภาษาอังกฤษ เช่น Git, Docker, API และ Next.js

ภาพรวมใช้ธีม modern developer workspace: พื้นผิวสะอาด อ่านง่าย มีสี accent สำหรับสถานะ progress และรองรับ dark/light mode จากปุ่มในแถบด้านบน ผู้ใช้เห็น CTA และภาพรวม roadmap ในส่วนแรกโดยไม่ต้องเลื่อนมาก

บนมือถือ roadmap จะแสดงเป็นเส้นทางแนวตั้ง ส่วนการ์ดใช้พื้นที่เต็มความกว้างและมี hit targets ที่แตะง่าย

## Information architecture

1. **Top bar:** โลโก้, ลิงก์เลื่อนไปยัง Roadmap/Prompts/Projects, progress summary และ theme toggle
2. **Hero:** ชื่อ “AI-Powered Software Developer 2026”, คำอธิบาย, ปุ่ม “เริ่มเรียน”, ปุ่มเลื่อนไปดู roadmap และสถิติ 6 Phases / topics / projects / AI tools
3. **Progress panel:** เปอร์เซ็นต์รวม, แถบ progress และสถานะ Phase ปัจจุบัน
4. **Interactive roadmap:** timeline ที่ประกอบด้วย Phase แบบ expandable
5. **Prompt library:** prompt ที่นำไปใช้ได้สำหรับ Debug, Code Review, Test, SQL และ API
6. **Project ideas:** แนวคิดโปรเจกต์ระดับ Beginner, Intermediate และ Advanced
7. **Footer:** ข้อความสรุปและปุ่มกลับขึ้นด้านบน

## Roadmap content

| Phase | Theme | Representative topics |
| --- | --- | --- |
| 01 | Computer Science Basics | Programming, Git/GitHub, Linux & CLI |
| 02 | AI-Assisted Development | ChatGPT, GitHub Copilot, Claude, Gemini, Prompt Engineering |
| 03 | Build Your Direction | Frontend, Backend, Mobile, Clean Code, Testing, Debugging |
| 04 | Data & API | Database, SQL, REST API, Authentication |
| 05 | Cloud & DevOps Basics | Docker, CI/CD, Deployment, Monitoring |
| 06 | Portfolio & Career | Portfolio Projects, Resume, Interview, Internship / Job |

## Components and state

- `RoadmapPage` composes all sections and owns the canonical roadmap data.
- `ProgressSummary` receives computed completion values and presents total status.
- `PhaseCard` presents one phase, its expandable details and checklist controls.
- `PromptLibrary` and `ProjectIdeas` render static curated learning aids.
- A client-side progress provider stores completed topic IDs and the selected theme in `localStorage`.

When browser storage is unavailable or malformed, the page starts with an empty completion set and the system theme. The UI must remain usable without stored state.

## Interaction and accessibility

- Checklist controls use native checkbox semantics with visible labels.
- Expand/collapse controls are keyboard accessible and expose expanded state.
- Progress communicates both a visual bar and text count/percentage.
- Theme toggle has an accessible name and honors the current persisted choice.
- Motion is subtle and disabled/reduced when `prefers-reduced-motion` is set.

## Error and empty states

- First-time visitors see 0% and a clear next action in the hero.
- No network data is required, so there is no remote loading/error state.
- Invalid local storage is ignored safely and replaced by default client state.

## Verification

- Production build and lint succeed.
- Manual desktop check: expand a Phase, toggle a checklist item, verify progress changes and survives refresh, toggle theme.
- Manual mobile check: verify timeline, cards, navigation and checklist fit a narrow viewport without horizontal scrolling.
