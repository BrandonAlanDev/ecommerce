import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from './data';
import  ProductCard  from './ProductCard';

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
            Explorá nuestra selección técnica de tablas y trajes de alta gama, diseñados para resistir las condiciones más exigentes del Atlántico. Equipamiento probado en los picos locales para que solo te preocupes por la próxima serie.
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

// --- COMPONENTE: SECCIÓN DESTACADA (Con Filtros) ---
export const FeaturedSection = ({ activeCategory, setActiveCategory, products, addToCart }) => {
  
  // Filtramos productos para el Home
  const filteredProducts = activeCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className='flex flex-col p-5'>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Lo Nuevo en la Costa</h2>
          <p className="text-slate-500 mt-2 text-lg">La mejor tecnología para tu sesión de surf.</p>
        </div>
        
        {/* Filtros de Categoría */}
        <div className="flex gap-3 overflow-x-auto p-5 no-scrollbar">
          <button 
            onClick={() => setActiveCategory("Todos")}
            className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all text-sm font-semibold ${
              activeCategory === "Todos" 
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:bg-slate-50"
            }`}
          >
            Todos los Productos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all text-sm font-semibold ${
                activeCategory === cat.name 
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:bg-slate-50"
              }`}
            >
              {cat.name}
            </button>
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
    </section>
  );
};