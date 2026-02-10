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
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}