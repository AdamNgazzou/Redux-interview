"use client"

import { Home, Heart, ShoppingCart, User } from "lucide-react"

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-card border-t border-border shadow-lg h-16 md:hidden">
      <div className="grid grid-cols-4 h-full">
        <button className="flex flex-col items-center justify-center space-y-1 text-primary">
          <Home size={20} />
          <span className="text-xs font-medium">Home</span>
        </button>

        <button className="flex flex-col items-center justify-center space-y-1 text-muted-foreground hover:text-primary">
          <Heart size={20} />
          <span className="text-xs font-medium">Favorites</span>
        </button>

        <button className="flex flex-col items-center justify-center space-y-1 text-muted-foreground hover:text-primary">
          <ShoppingCart size={20} />
          <span className="text-xs font-medium">Cart</span>
        </button>

        <button className="flex flex-col items-center justify-center space-y-1 text-muted-foreground hover:text-primary">
          <User size={20} />
          <span className="text-xs font-medium">Account</span>
        </button>
      </div>
    </div>
  )
}
