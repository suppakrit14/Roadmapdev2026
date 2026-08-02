"use client";

type Theme = "dark" | "light";

type HeaderNavProps = {
  percentage: number;
  theme: Theme;
  onToggleTheme: () => void;
};

export default function HeaderNav({
  percentage,
  theme,
  onToggleTheme,
}: HeaderNavProps) {
  return (
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
          <span>{percentage}%</span>
        </div>

        <button
          className="theme-btn"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>
      </div>
    </header>
  );
}
