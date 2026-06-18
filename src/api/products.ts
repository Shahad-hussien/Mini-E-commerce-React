import type { Product } from "@/types"

const BASE_URL = "https://fakestoreapi.com"

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const res = await fetch(`${BASE_URL}/products`)
    if (!res.ok) throw new Error("Faild to fetch products")
    return res.json()
  },

  getById: async (id: number): Promise<Product> => {
    const res = await fetch(`${BASE_URL}/products/${id}`)
    if (!res.ok) throw new Error("Product not found")
    return res.json()
  },
  getCategories: async (): Promise<string[]> => {
    const res = await fetch(`${BASE_URL}/products/categories`)
    if (!res.ok) throw new Error("Faild to fetch categories")
    return res.json()
  },
  getByCategory: async (category: string): Promise<Product[]> => {
    const res = await fetch(`${BASE_URL}/products/category/${category}`)
    if (!res.ok) throw new Error("Faild to fetch category")
    return res.json()
  },
}
