import { Link } from "react-router-dom"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cartStore"
import CartItem from "@/components/cart/CartItem"
import OrderSummary from "@/components/cart/OrderSummary"

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24">
      <div className="rounded-full bg-muted p-6">
        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="mt-1 text-muted-foreground">
          Looks like you haven't added anything yet.
        </p>
      </div>
      <Link to="/products">
        <Button size="lg">Start Shopping</Button>
      </Link>
    </div>
  )
}

export default function CartPage() {
  const items = useCartStore((state) => state.items)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/products"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>

      <h1 className="text-3xl font-bold">
        Your Cart
        {items.length > 0 && (
          <span className="ml-2 text-xl font-normal text-muted-foreground">
            ({items.length} {items.length === 1 ? "item" : "items"})
          </span>
        )}
      </h1>

      {/* Empty State */}
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items — takes 2/3 of the width */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary — takes 1/3 of the width */}
          <div>
            <OrderSummary />
          </div>
        </div>
      )}
    </div>
  )
}
