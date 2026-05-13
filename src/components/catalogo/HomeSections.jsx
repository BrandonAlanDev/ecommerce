"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { categories } from './data';
import ProductCard from './ProductCard';

// --- COMPONENTE: BANNER PROMOCIONAL ---
export const PromotionBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-16 mt-16">
      <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
        
        {/* Fondo abstracto decorativo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-cyan-500 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold mb-6 tracking-wider uppercase">
            Equipo Pro
          </span>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Pasión por el Mar.
          </h3>
          <p className="text-slate-300 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
            Explorá nuestra selección técnica de tablas y trajes de alta gama, diseñados para resistir las condiciones más exigentes del Atlántico. Equipamiento probado en los picos locales.
          </p>
          <a href="/productos">
            <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto">
              Ver Equipamiento de Surf
              <ArrowRight className="w-4 h-4" />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTE AUXILIAR: BOTÓN CON DESPLEGABLE ---
const CategoryDropdown = ({ cat, activeCategory, setActiveCategory, setActiveSubcategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  const isSelected = activeCategory === cat.name;

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => {
          setActiveCategory(cat.name);
          setActiveSubcategory("Todas");
        }}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all text-sm font-semibold border ${
          isSelected 
            ? "bg-slate-900 text-white shadow-lg border-slate-900" 
            : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
        }`}
      >
        {cat.name}
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden"
          >
            <button
              onClick={() => {
                setActiveCategory(cat.name);
                setActiveSubcategory("Todas");
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-xs font-bold text-slate-400 hover:bg-slate-50 uppercase tracking-widest"
            >
              Ver Todo {cat.name}
            </button>
            <div className="h-[1px] bg-slate-100 my-1" />
            {cat.subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => {
                  setActiveCategory(cat.name);
                  setActiveSubcategory(sub);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
              >
                {sub}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- COMPONENTE: SECCIÓN DESTACADA (Con Filtros Dropdown) ---
export const FeaturedSection = ({ activeCategory, setActiveCategory, products, addToCart }) => {
  const [activeSubcategory, setActiveSubcategory] = useState("Todas");

  // Filtrado lógico
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "Todos" || p.category === activeCategory;
    const matchesSubcategory = activeSubcategory === "Todas" || p.subcategory === activeSubcategory;
    return matchesCategory && matchesSubcategory;
  });

  return (
    <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className='flex flex-col'>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Equipamiento Destacado</h2>
          <p className="text-slate-500 mt-2 text-lg font-medium">
            {activeCategory === "Todos" 
              ? "Lo mejor de nuestra tienda en Santa Clara." 
              : `Explorando ${activeCategory} ${activeSubcategory !== "Todas" ? `> ${activeSubcategory}` : ""}`}
          </p>
        </div>
        
        {/* Contenedor de filtros: IMPORTANTE el overflow-visible para el dropdown */}
        <div className="flex gap-3 overflow-visible p-2">
          <button 
            onClick={() => {
              setActiveCategory("Todos");
              setActiveSubcategory("Todas");
            }}
            className={`px-5 py-2.5 rounded-full transition-all text-sm font-semibold border ${
              activeCategory === "Todos" 
                ? "bg-slate-900 text-white shadow-lg border-slate-900" 
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
            }`}
          >
            Todos
          </button>

          {categories.map((cat) => (
            <CategoryDropdown 
              key={cat.id}
              cat={cat}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              setActiveSubcategory={setActiveSubcategory}
            />
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="w-full py-20 text-center text-slate-400">
          No hay productos disponibles en esta subcategoría actualmente.
        </div>
      )}
    </section>
  );
};