import { ShoppingCart, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/store/cartStore"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem)
  const items = useCartStore((state) => state.items)

  const isInCart = items.some((i) => i.id === product.id)

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow duration-200 hover:shadow-lg">
      <Link to={`/products/${product.id}`} className="block bg-white p-6">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Category bagde */}
        <Badge variant="secondary" className="w-fit text-xs capitalize">
          {product.category}
        </Badge>

        {/* Title */}
        <Link to={`/products/${product.id}`}>
          <h3 className="line-clamp-2 text-sm leading-snug font-medium transition-colors hover:text-primary">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{product.rating.rate}</span>
          <span>{product.rating.count}</span>
        </div>

        {/* Price + Button - pushed to bottom with mt-auto */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold">{product.price.toFixed(2)}</span>
          <Button
            size="sm"
            variant={isInCart ? "secondary" : "default"}
            onClick={() => addItem(product)}
          >
            <ShoppingCart className="mr-1 h-4 w-4" />
            {isInCart ? "Add More" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
