'use client'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { defaultLocale, isValidLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/getDictionary"

export function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const routeParams = useParams<{ locale?: string }>()
  const locale = isValidLocale(routeParams.locale) ? routeParams.locale : defaultLocale
  const dictionary = getDictionary(locale)

  useEffect(() => setMounted(true), [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
      aria-label={dictionary.common.toggleTheme}
    >
      {mounted && resolvedTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
