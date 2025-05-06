import { Product } from "~/data/products"
import ProductCard from "./product-card"

interface ProductGridProps {
  products: Product[]
  onRemove: (id: number) => void
  handleToggleInteraction: (id: number, prevStatus: "liked" | "disliked" | "none", action: "like" | "dislike") => void
}

export default function ProductGrid({ products, onRemove, handleToggleInteraction }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {products.map((product, index) => (
        <div key={product.id} style={{ animationDelay: `${index * 0.05}s` }}>
          <ProductCard product={product} onRemove={onRemove} handleToggleInteraction={handleToggleInteraction} />
        </div>
      ))}
    </div>
  )
}
