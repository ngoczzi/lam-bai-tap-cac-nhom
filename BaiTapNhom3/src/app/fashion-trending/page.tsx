import React from "react";
import { getRandomMensShirt } from "@/services/productService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fashion Trending 2026 | New Arrival",
  description: "Khám phá những mẫu thời trang nam mới nhất năm 2026. Mỗi lần F5 là một phong cách hoàn toàn mới.",
};

export default async function FashionTrendingPage() {
  // SSR: Fetch dữ liệu trực tiếp trong Server Component
  // Hàm này đã bao gồm logic { cache: 'no-store' } và Math.random()
  const product = await getRandomMensShirt();

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Tiêu đề trang */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 tracking-wide">
        Fashion Trending 2026
      </h1>

      {/* Card sản phẩm */}
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
        
        {/* Khung ảnh sản phẩm */}
        <div className="p-6">
          <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden flex items-center justify-center relative group">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="px-8 pb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-blue-100">
              New Arrival
            </span>
            <span className="text-red-500 font-bold text-xl">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-6 truncate" title={product.title}>
            {product.title}
          </h2>

          {/* Nút thêm vào giỏ hàng */}
          <button className="w-full bg-black text-white py-4 rounded-2xl font-medium transition-all duration-200 active:scale-[0.98] hover:bg-gray-800 flex items-center justify-center gap-2 group">
            <span>Thêm vào giỏ hàng</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Ghi chú nhấn F5 */}
      <p className="mt-8 text-gray-400 text-sm italic">
        * Nhấn <span className="font-bold text-gray-500">F5 (Refresh)</span> để khám phá mẫu thời trang khác.
      </p>
    </main>
  );
}
