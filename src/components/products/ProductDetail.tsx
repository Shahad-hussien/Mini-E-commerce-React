import { ShoppingCart, Star, ArrowLeft, Package } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/store/cartStore"
import type { Product } from "@/types"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const addItem = useCartStore((state) => state.addItem)
  const items = useCartStore((state) => state.items)

  const cartItem = items.find((i) => i.id === product.id)
  const isInCart = !!cartItem

  return (
    <div className="flex flex-col gap-6">
      {/* Back Button */}
      <Link
        to="/products"
        className="flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Left — Image */}
        <div className="flex items-center justify-center rounded-xl border bg-white p-10">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-80 object-contain"
          />
        </div>

        {/* Right — Info */}
        <div className="flex flex-col gap-4">
          {/* Category */}
          <Badge variant="secondary" className="w-fit capitalize">
            {product.category}
          </Badge>

          {/* Title */}
          <h1 className="text-2xl leading-snug font-bold">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product.rating.rate)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating.rate} · {product.rating.count} reviews
            </span>
          </div>

          <Separator />

          {/* Price */}
          <span className="text-3xl font-bold">
            ${product.price.toFixed(2)}
          </span>

          {/* Description */}
          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <Separator />

          {/* Stock indicator */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>In stock · Free shipping on orders over $50</span>
          </div>

          {/* Actions */}
          <div className="mt-2 flex flex-col gap-3">
            <Button
              size="lg"
              onClick={() => addItem(product)}
              className="w-full"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {isInCart
                ? `Add More (${cartItem.quantity} in cart)`
                : "Add to Cart"}
            </Button>

            {isInCart && (
              <Link to="/cart">
                <Button size="lg" variant="outline" className="w-full">
                  View Cart
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
