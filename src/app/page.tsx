"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { products } from "@/components/catalogo/data";
import { PromotionBanner, FeaturedSection } from "@/components/catalogo/HomeSections";
import Hero from "@/components/catalogo/Hero";
export default function HomePage() {
  const [homeCategory, setHomeCategory] = useState("Todos");
  const { addToCart } = useCart(); // ¡Obtenemos la función del contexto!

  return (
    <div className="min-h-screen justify-center items-center mx-auto bg-blue-50 overflow-hidden max-w-dvw">
      <Hero setActiveCategory={setHomeCategory} />
      <FeaturedSection 
         activeCategory={homeCategory} 
         setActiveCategory={setHomeCategory}
         products={products}
         addToCart={addToCart} // La pasamos como prop
      />
      <PromotionBanner />
    </div>
  );
}