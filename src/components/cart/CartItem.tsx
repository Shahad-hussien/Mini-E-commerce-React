import { Trash2, Plus, Minus } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/store/cartStore"
import type { CartItem as CartItemType } from "@/types"

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        {/* Image */}
        <Link
          to={`/products/${item.id}`}
          className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border bg-white p-3"
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-contain"
          />
        </Link>

        {/* Details */}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <Link
            to={`/products/${item.id}`}
            className="line-clamp-2 text-sm leading-snug font-medium transition-colors hover:text-primary"
          >
            {item.title}
          </Link>

          <span className="text-xs text-muted-foreground capitalize">
            {item.category}
          </span>

          <span className="mt-1 font-semibold">
            ${(item.price * item.quantity).toFixed(2)}
          </span>

          {/* Quantity + Remove */}
          <div className="mt-auto flex items-center gap-3">
            {/* Quantity Controls */}
            <div className="flex items-center overflow-hidden rounded-lg border">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>

              <span className="w-8 text-center text-sm font-medium">
                {item.quantity}
              </span>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            {/* Remove */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground transition-colors hover:text-destructive"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Separator />
    </div>
  )
}
