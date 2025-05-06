"use client"

import { useState } from "react"
import { Menu, X, Filter, Home, Settings } from "lucide-react"
import { cn } from "~/lib/utils"

interface MobileNavbarProps {
  title: string
  onFilterClick: () => void
}

export default function MobileNavbar({ title, onFilterClick }: MobileNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {/* Top Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-white dark:bg-card border-b border-border shadow-sm h-14 md:hidden">
        <div className="flex items-center justify-between px-4 h-full">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg text-foreground hover:bg-secondary"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <h1 className="text-lg font-bold gradient-text">{title}</h1>

          <button
            onClick={onFilterClick}
            className="p-2 rounded-lg text-foreground hover:bg-secondary"
            aria-label="Open filters"
          >
            <Filter size={22} />
          </button>
        </div>
      </div>

      {/* Slide-out menu */}
      <div
        className={cn(
          "fixed top-14 left-0 bottom-0 z-20 w-64 bg-white dark:bg-card border-r border-border shadow-lg transition-transform duration-300 transform md:hidden",
          isMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-4">
          <nav className="space-y-1">
            <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary text-foreground">
              <Home size={20} />
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary text-foreground">
              <Settings size={20} />
              <span>Settings</span>
            </a>
            {/* Add more menu items as needed */}
          </nav>
        </div>
      </div>

      {/* Overlay for when menu is open */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/20 z-10 md:hidden" onClick={toggleMenu} aria-hidden="true" />
      )}
    </>
  )
}
