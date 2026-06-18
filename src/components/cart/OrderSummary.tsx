import { Link } from "react-router-dom"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/store/cartStore"

export default function OrderSummary() {
  const totalPrice = useCartStore((state) => state.totalPrice)
  const totalItems = useCartStore((state) => state.totalItems)
  const clearCart = useCartStore((state) => state.clearCart)

  const subtotal = totalPrice()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="sticky top-24 flex h-fit flex-col gap-4 rounded-xl border p-6">
      <h2 className="text-lg font-bold">Order Summary</h2>

      <Separator />

      {/* Line Items */}
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Subtotal ({totalItems()} {totalItems() === 1 ? "item" : "items"})
          </span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          {shipping === 0 ? (
            <span className="font-medium text-green-600">Free</span>
          ) : (
            <span>${shipping.toFixed(2)}</span>
          )}
        </div>

        {shipping > 0 && (
          <p className="rounded-lg bg-muted p-2 text-xs text-muted-foreground">
            Add ${(50 - subtotal).toFixed(2)} more to get free shipping
          </p>
        )}

        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <Separator />

      {/* Total */}
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {/* Checkout Button */}
      <Button size="lg" className="w-full gap-2">
        <ShoppingBag className="h-5 w-5" />
        Checkout
      </Button>

      {/* Clear Cart */}
      <Button
        variant="ghost"
        size="sm"
        className="w-full text-muted-foreground transition-colors hover:text-destructive"
        onClick={clearCart}
      >
        Clear cart
      </Button>

      <Link to="/products">
        <Button variant="outline" size="sm" className="w-full">
          Continue Shopping
        </Button>
      </Link>
    </div>
  )
}
