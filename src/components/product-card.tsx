"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, Trash2 } from "lucide-react"
import { Product } from "~/data/products"
import { removeLike, likeProduct, disLikeProduct } from "~/store/like-slice"
import { useDispatch, useSelector } from "react-redux";


interface ProductCardProps {
  product: Product
  onRemove: (id: number) => void
  handleToggleInteraction: (id: number, prevStatus: "liked" | "disliked" | "none", action: "like" | "dislike") => void
}

export default function ProductCard({ product, onRemove, handleToggleInteraction  }: ProductCardProps) {
  const dispatch = useDispatch()
  const likeStatus = useSelector((state : any) => state.likes[product.id] ?? "none")

  const [isAnimating, setIsAnimating] = useState(false)

  const totalInteractions = product.likes + product.dislikes
  const likePercentage = totalInteractions > 0 ? (product.likes / totalInteractions) * 100 : 50

  const handleLike = () => {
    animateInteraction()
    if (likeStatus === "liked") {
      dispatch(removeLike(product.id.toString()));
      handleToggleInteraction(Number(product.id), "liked", "like");
    } else if (likeStatus === "disliked") {
      dispatch(likeProduct(product.id.toString()));
      handleToggleInteraction(Number(product.id), "disliked", "like");
    } else {
      dispatch(likeProduct(product.id.toString()));
      handleToggleInteraction(Number(product.id), "none", "like");
    }
  };
  
  const handleDislike = () => {
    animateInteraction()
    if (likeStatus === "disliked") {
      dispatch(removeLike(product.id.toString()));
      handleToggleInteraction(Number(product.id), "disliked", "dislike");
    } else if (likeStatus === "liked") {
      dispatch(disLikeProduct(product.id.toString()));
      handleToggleInteraction(Number(product.id), "liked", "dislike");
    } else {
      dispatch(disLikeProduct(product.id.toString()));
      handleToggleInteraction(Number(product.id), "none", "dislike");
    }
  };

  
  const animateInteraction = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <div className="animate-fade-in bg-white dark:bg-card rounded-xl shadow-md overflow-hidden card-hover border border-border">
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-1 text-foreground line-clamp-1">{product.title}</h2>
            <span className="inline-block bg-secondary text-secondary-foreground rounded-full px-2.5 py-0.5 text-sm font-medium">
              {product.category}
            </span>
          </div>
          <button
            onClick={() => onRemove(Number(product.id))}
            className="text-muted-foreground hover:text-destructive transition-colors duration-200 p-1.5 rounded-full hover:bg-destructive/10"
            aria-label="Remove product"
          >
            <Trash2 size={18} />
          </button>
        </div>


        {/* Popularity Gauge (YouTube-like) */}
        <div className="mb-4 sm:mb-5">
          <div className="flex items-center text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2 justify-between">
            <span className="font-medium">{product.likes} likes</span>
            <span className="font-medium">{product.dislikes} dislikes</span>
          </div>
          <div className="h-2 sm:h-2.5 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${isAnimating ? "animate-pulse-once" : ""}`}
              style={{
                width: `${likePercentage}%`,
                background: "linear-gradient(90deg, #8b5cf6 0%, #6d28d9 100%)",
              }}
            ></div>
          </div>
        </div>

        {/* Like/Dislike Buttons - Responsive touch targets */}
        <div className="flex space-x-2 sm:space-x-3">
          <button
            onClick={handleLike}
            className={`flex items-center justify-center space-x-1.5 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 min-h-10 ${
              likeStatus === "liked"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
            aria-label="Like product"
          >
            <ThumbsUp size={16} className={likeStatus === "liked" ? "animate-pulse-once" : ""} />
            <span className="text-sm sm:text-base">Like</span>
          </button>

          <button
            onClick={handleDislike}
            className={`flex items-center justify-center space-x-1.5 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 min-h-10 ${
              likeStatus === "disliked"
                ? "bg-destructive text-destructive-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
            aria-label="Dislike product"
          >
            <ThumbsDown size={16} className={likeStatus === "disliked" ? "animate-pulse-once" : ""} />
            <span className="text-sm sm:text-base">Dislike</span>
          </button>
        </div>
      </div>
    </div>
  )
}
