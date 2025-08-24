import { api } from '../api/client'

export interface Product {
  id: number
  sku: string
  name: string
  category?: string
  price?: number
  stock?: number
}

export interface ProductCreate {
  sku: string
  name: string
  category?: string
  price?: number
  stock?: number
}

export interface ProductUpdate {
  name?: string
  category?: string
  price?: number
  stock?: number
}

export async function listProducts(q?: string): Promise<Product[]> {
  const params = q ? { q } : undefined
  const { data } = await api.get<Product[]>('/products/', { params })
  return data
}

export async function createProduct(payload: ProductCreate): Promise<Product> {
  const { data } = await api.post<Product>('/products/', payload)
  return data
}

export async function updateProduct(id: number, payload: ProductUpdate): Promise<Product> {
  const { data } = await api.patch<Product>(`/products/${id}`, payload)
  return data
}

export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`/products/${id}`)
}
