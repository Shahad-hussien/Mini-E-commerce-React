import { useState } from "react"
import { useProducts, useProductsByCategory } from "@/hooks/useProducts"
import ProductGrid from "@/components/products/ProductGrid"
import CategoryFilter from "@/components/products/CategoryFilter"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const allProducts = useProducts()
  const categoryProducts = useProductsByCategory(selectedCategory)

  const { data, isLoading, isError } =
    selectedCategory === "all" ? allProducts : categoryProducts

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="mt-1 text-muted-foreground">
          {data?.length ?? "..."} products available
        </p>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Product Grid */}
      <ProductGrid products={data} isLoading={isLoading} isError={isError} />
    </div>
  )
}
