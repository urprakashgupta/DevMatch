import { useEffect, useState } from "react";

const getPreferredTheme = () => {
  if (typeof window === "undefined") return "light";

  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button className={`btn btn-outline ${className}`} onClick={toggleTheme}>
      Switch to {theme === "dark" ? "light" : "dark"}
    </button>
  );
}

export default ThemeToggle;
