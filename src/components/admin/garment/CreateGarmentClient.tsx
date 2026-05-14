"use client";

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GarmentForm } from './GarmentForm';

export function CreateGarmentClient({ categories }: { categories: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20"
      >
        <Plus size={20} />
        Nuevo Producto
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
            />

            {/* Contenedor del Modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Nuevo Garment</h2>
                  <p className="text-sm text-slate-500 font-medium">Define los detalles técnicos y visuales.</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400 hover:text-slate-900 border border-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cuerpo del Formulario con Scroll */}
              <div className="p-8 overflow-y-auto scrollbar-hide">
                <GarmentForm 
                  categories={categories} 
                  onClose={() => setIsOpen(false)} 
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}