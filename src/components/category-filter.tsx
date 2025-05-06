"use client"

import { useDispatch, useSelector } from "react-redux"
import { toggleCategory, clearCategories, initializeCategories } from "~/store/filter-slice"
import type { RootState } from "~/store"
import { setCurrentPage } from "~/store/pagination-slice"
import { useState, useEffect, useRef } from "react"
import { Check, ChevronDown, Filter, Search, X } from "lucide-react"
import { cn } from "~/lib/utils"

interface CategoryFilterProps {
  categories: string[]
  isMobile?: boolean
}

export default function CategoryFilter({ categories, isMobile = false }: CategoryFilterProps) {
  const dispatch = useDispatch()
  const { selectedCategories, initialized } = useSelector((state: RootState) => state.filter)
  const [searchQuery, setSearchQuery] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [filteredCategories, setFilteredCategories] = useState(categories)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize all categories as selected on first load
  useEffect(() => {
    if (categories.length > 0 && !initialized) {
      dispatch(initializeCategories(categories))
    }
  }, [categories, dispatch, initialized])

  // Filter categories based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCategories(categories)
    } else {
      const filtered = categories.filter((category) => category.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredCategories(filtered)
    }
  }, [searchQuery, categories])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleCategoryChange = (category: string) => {
    dispatch(toggleCategory(category))
    dispatch(setCurrentPage(1))
  }

  const handleClearAll = () => {
    dispatch(clearCategories())
    dispatch(setCurrentPage(1))
    setSearchQuery("")
  }

  const handleSelectAll = () => {
    // If all categories are already selected, do nothing
    if (selectedCategories.length === categories.length) return

    // Otherwise, select all categories
    categories.forEach((category) => {
      if (!selectedCategories.includes(category)) {
        dispatch(toggleCategory(category))
      }
    })
    dispatch(setCurrentPage(1))
  }

  const containerClasses = isMobile
    ? "w-full"
    : "mb-8 bg-white dark:bg-card rounded-xl shadow-md p-5 border border-border"

  return (
    <div className={containerClasses} ref={containerRef}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Filter by Category</h2>
        </div>

        {!isMobile && selectedCategories.length > 0 && (
          <span className="text-sm px-2 py-1 bg-primary/10 text-primary rounded-full">
            {selectedCategories.length} selected
          </span>
        )}
      </div>

      {/* Desktop View - Always expanded */}
      {!isMobile && (
        <>
          {/* Search and action buttons */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <X size={16} className="text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={handleSelectAll}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors duration-200"
            >
              Select All
            </button>
            <button
              onClick={handleClearAll}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors duration-200"
            >
              Clear All
            </button>
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {filteredCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-left",
                  selectedCategories.includes(category)
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                )}
              >
                <span
                  className={cn(
                    "flex-shrink-0 w-4 h-4 rounded-sm border flex items-center justify-center transition-colors",
                    selectedCategories.includes(category) ? "bg-white border-white" : "border-muted-foreground",
                  )}
                >
                  {selectedCategories.includes(category) && <Check size={12} className="text-primary" />}
                </span>
                <span className="truncate">{category}</span>
              </button>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No categories match your search</p>
          )}
        </>
      )}

      {/* Mobile View - Collapsible */}
      {isMobile && (
        <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          {/* Dropdown header */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-3 text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {selectedCategories.length > 0
                  ? `${selectedCategories.length} categories selected`
                  : "Select categories"}
              </span>
            </div>
            <ChevronDown
              size={18}
              className={cn(
                "text-muted-foreground transition-transform duration-200",
                isExpanded && "transform rotate-180",
              )}
            />
          </button>

          {/* Dropdown content */}
          {isExpanded && (
            <div className="p-3 border-t border-border animate-accordion-down">
              {/* Search input */}
              <div className="relative mb-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X size={16} className="text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 mb-3">
                <button
                  onClick={handleSelectAll}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors duration-200"
                >
                  Select All
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>

              {/* Category list */}
              <div className="max-h-[200px] overflow-y-auto pr-1 space-y-1.5">
                {filteredCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={cn(
                      "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-left",
                      selectedCategories.includes(category)
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    )}
                  >
                    <span
                      className={cn(
                        "flex-shrink-0 w-4 h-4 rounded-sm border flex items-center justify-center transition-colors",
                        selectedCategories.includes(category) ? "bg-white border-white" : "border-muted-foreground",
                      )}
                    >
                      {selectedCategories.includes(category) && <Check size={12} className="text-primary" />}
                    </span>
                    <span className="truncate">{category}</span>
                  </button>
                ))}

                {filteredCategories.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-2">No categories match your search</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
