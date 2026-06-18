import { useParams, Link } from "react-router-dom"
import { useProduct } from "@/hooks/useProducts"
import ProductDetail from "@/components/products/ProductDetail"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <Skeleton className="h-96 w-full rounded-xl" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const { data: product, isLoading, isError } = useProduct(Number(id))

  if (isLoading) return <ProductDetailSkeleton />

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-xl font-semibold">Product not found</p>
        <p className="text-muted-foreground">
          This product may have been removed or doesn't exist.
        </p>
        <Link to="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    )
  }
  return <ProductDetail product={product} />
}
