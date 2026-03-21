'use client'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeSwitch() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      {theme === 'dark' ? <Sun size={16} suppressHydrationWarning /> : <Moon size={16} suppressHydrationWarning />}
    </button>
  )
}