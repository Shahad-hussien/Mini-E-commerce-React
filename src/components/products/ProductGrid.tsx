import { Skeleton } from "@/components/ui/skeleton"
import ProductCard from "./ProductCard"
import type { Product } from "@/types"

interface ProductGridProps {
  products: Product[] | undefined
  isLoading: boolean
  isError: boolean
}

// Separate skeleton component for clean code
function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border">
      <Skeleton className="h-60 w-full" />
      <div className="flex flex-col gap-3 p-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="mt-2 flex items-center justify-between">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
    </div>
  )
}

export default function ProductGrid({
  products,
  isLoading,
  isError,
}: ProductGridProps) {
  if (isError) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-muted-foreground">Something went wrong.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Please try refreshing the page.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        : products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  )
}
