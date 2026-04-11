// src/services/productService.ts

/**
 * Kiểu dữ liệu cho một sản phẩm trả về từ DummyJSON API.
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
  brand: string;
  discountPercentage: number;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const API_URL = "https://dummyjson.com/products/category/mens-shirts";

/**
 * Lấy toàn bộ danh sách sản phẩm từ DummyJSON API (không cache – SSR mỗi request).
 * Sau đó chọn ngẫu nhiên 1 sản phẩm bằng Math.random() và trả về.
 *
 * @returns Một sản phẩm ngẫu nhiên từ danh mục "mens-shirts".
 */
export async function getRandomMensShirt(): Promise<Product> {
  const res = await fetch(API_URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Không thể lấy dữ liệu từ API: ${res.status} ${res.statusText}`);
  }

  const data: ProductsResponse = await res.json();
  const products = data.products;

  if (!products || products.length === 0) {
    throw new Error("Danh sách sản phẩm rỗng.");
  }

  // Chọn ngẫu nhiên 1 sản phẩm
  const randomIndex = Math.floor(Math.random() * products.length);
  return products[randomIndex];
}
