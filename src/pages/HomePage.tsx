import { Link } from "react-router-dom"
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/hooks/useProducts"
import ProductCard from "@/components/products/ProductCard"

// Feature highlights
const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders over $50",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% protected transactions",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
]

export default function HomePage() {
  const { data: products, isLoading } = useProducts()

  // Show 4 featured products — slice is fine here, no need for a separate API call
  const featured = products?.slice(0, 4)

  return (
    <div className="flex flex-col gap-16">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 py-16 text-center">
        <h1 className="max-w-xl text-5xl leading-tight font-bold tracking-tight">
          Shop the things you actually need
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          Quality products across electronics, jewelry, and clothing — all in
          one place.
        </p>
        <Link to="/products">
          <Button size="lg" className="gap-2">
            Browse Products
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex flex-col items-center gap-2 rounded-xl border p-6 text-center"
          >
            <f.icon className="h-8 w-8 text-primary" />
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.description}</p>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link
            to="/products"
            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading featured products...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
