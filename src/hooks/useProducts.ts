import { useQuery } from "@tanstack/react-query"
import { productsApi } from "@/api/products"

//Query Keys

export const productKeys = {
  all: ["products"] as const,
  byId: (id: number) => ["products", id] as const,
  categories: ["products", "categories"] as const,
  byCategory: (category: string) => ["products", "category", category] as const,
}

export function useProducts() {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: productsApi.getAll,
    staleTime: 1000 * 60 * 5, //Data stays fresh for 5 mins
  })
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: productKeys.byId(id),
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: productKeys.categories,
    queryFn: productsApi.getCategories,
    staleTime: 1000 * 60 * 10,
  })
}

export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: productKeys.byCategory(category),
    queryFn: () => productsApi.getByCategory(category),
    enabled: !!category,
    staleTime: 1000 * 60 * 5,
  })
}
