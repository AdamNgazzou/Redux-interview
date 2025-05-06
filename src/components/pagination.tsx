"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const itemsPerPageOptions = [4, 8, 12]

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 sm:mt-10 gap-4 bg-white dark:bg-card rounded-xl shadow-md p-4 border border-border">
      {/* Items per page selector */}
      <div className="flex items-center space-x-3 w-full sm:w-auto justify-center sm:justify-start">
        <span className="text-sm text-muted-foreground">Items per page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border border-border rounded-lg px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 min-w-16"
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination controls - larger touch targets for mobile */}
      <div className="flex items-center space-x-1 w-full sm:w-auto justify-center sm:justify-start">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors duration-200 disabled:hover:bg-transparent min-w-10 min-h-10 flex items-center justify-center"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} className="text-foreground" />
        </button>

        <div className="flex items-center bg-secondary rounded-lg px-4 py-2 min-w-24 justify-center">
          <span className="text-sm font-medium">
            {currentPage} / {totalPages}
          </span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors duration-200 disabled:hover:bg-transparent min-w-10 min-h-10 flex items-center justify-center"
          aria-label="Next page"
        >
          <ChevronRight size={20} className="text-foreground" />
        </button>
      </div>
    </div>
  )
}
