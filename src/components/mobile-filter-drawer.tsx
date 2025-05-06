"use client"

import type React from "react"

import { X } from "lucide-react"
import { cn } from "~/lib/utils"

interface MobileFilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function MobileFilterDrawer({ isOpen, onClose, children }: MobileFilterDrawerProps) {
  return (
    <>
      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-full sm:w-80 bg-white dark:bg-card shadow-xl transform transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary" aria-label="Close filters">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">{children}</div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={onClose} aria-hidden="true" />}
    </>
  )
}
