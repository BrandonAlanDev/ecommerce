"use client";

import React, { useState } from 'react';
import { X, Image as ImageIcon, Tags, Edit2, Trash2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { deleteGarment, updateGarment } from '@/actions/garments';
import { toast } from 'sonner';

interface Props {
  garments: any[];
  categories: any[];
}

export function GarmentTable({ garments, categories }: Props) {
  const [editingGarment, setEditingGarment] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    // Procesamos las 4 imágenes para NewSurfBoard
    const images = [
      { srcImage: formData.get('img0') as string, order: 0, alt: 'Principal' },
      { srcImage: formData.get('img1') as string, order: 1, alt: 'Vista 2' },
      { srcImage: formData.get('img2') as string, order: 2, alt: 'Vista 3' },
      { srcImage: formData.get('img3') as string, order: 3, alt: 'Vista 4' },
    ].filter(img => img.srcImage && img.srcImage.trim() !== "");

    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price') as string),
      cost: parseFloat(formData.get('cost') as string),
      categoryId: formData.get('categoryId'),
      images: images
    };

    const res = await updateGarment(editingGarment.id, data);
    
    if (res.success) {
      toast.success("Producto actualizado correctamente");
      setEditingGarment(null);
    } else {
      toast.error("Error al guardar cambios");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      const res = await deleteGarment(id);
      if (res.success) {
        toast.success("Producto eliminado");
        setEditingGarment(null);
      } else {
        toast.error("Error al eliminar");
      }
    }
  };

  return (
    <div className="w-full">
      {/* GRID DE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {garments.map((item) => (
          <motion.div
            key={item.id}
            layoutId={item.id}
            whileHover={{ y: -8 }}
            onClick={() => setEditingGarment(item)}
            className="group cursor-pointer bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all duration-300 flex flex-col"
          >
            {/* Contenedor de Imagen */}
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
              {item.images?.[0]?.srcImage ? (
                <img 
                  src={item.images[0].srcImage} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <ImageIcon size={48} strokeWidth={1} />
                </div>
              )}
              
              {/* Precio Flotante */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-white/20">
                <p className="text-sm font-black text-slate-900 tracking-tight">
                  ${Number(item.price).toLocaleString('es-AR')}
                </p>
              </div>
            </div>

            {/* Información Inferior */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.1em] text-blue-500 bg-blue-50 px-2 py-1 rounded-lg">
                    {item.category?.name || 'General'}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition-colors mb-2">
                  {item.name}
                </h3>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-slate-400">
                <span className="text-[10px] font-medium italic">Click para editar</span>
                <Edit2 size={14} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL DE EDICIÓN / DETALLE */}
      <AnimatePresence>
        {editingGarment && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setEditingGarment(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-slate-50 flex justify-between items-center sticky top-0 bg-white z-20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Info size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 italic tracking-tight">Gestionar Producto</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Panel de Control Santa Clara</p>
                  </div>
                </div>
                <button onClick={() => setEditingGarment(null)} className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400"><X size={24}/></button>
              </div>

              <form onSubmit={handleEditSubmit} className="p-8 overflow-y-auto space-y-8 scrollbar-hide">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Campos principales */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Nombre Comercial</label>
                      <input name="name" defaultValue={editingGarment.name} className="w-full px-6 py-4 rounded-[1.25rem] border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-semibold text-slate-800" required />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Categoría</label>
                      <select name="categoryId" defaultValue={editingGarment.categoryId} className="w-full px-6 py-4 rounded-[1.25rem] border border-slate-200 bg-white outline-none focus:ring-4 focus:ring-blue-500/5 font-semibold">
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Descripción</label>
                      <textarea name="description" defaultValue={editingGarment.description} rows={3} className="w-full px-6 py-4 rounded-[1.25rem] border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-600 resize-none" />
                    </div>
                  </div>

                  {/* Precios e Imágenes */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-blue-600 ml-1">Precio Venta</label>
                        <input name="price" type="number" step="0.01" defaultValue={Number(editingGarment.price)} className="w-full px-5 py-4 rounded-[1.25rem] border-blue-50 bg-blue-50/30 font-black text-blue-600 outline-none" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Costo</label>
                        <input name="cost" type="number" step="0.01" defaultValue={Number(editingGarment.cost)} className="w-full px-5 py-4 rounded-[1.25rem] border-slate-100 bg-slate-50 font-black text-slate-600 outline-none" required />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Galería de Imágenes (URLs)</label>
                      <div className="grid grid-cols-1 gap-3">
                        {[0, 1, 2, 3].map((i) => (
                          <div key={i} className="flex gap-2 items-center">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">{i+1}</div>
                            <input 
                              name={`img${i}`} 
                              type="url" 
                              placeholder={i === 0 ? "Imagen Principal" : `Imagen opcional ${i+1}`}
                              defaultValue={editingGarment.images?.[i]?.srcImage || ""}
                              className="flex-1 px-4 py-2.5 text-[11px] rounded-xl border border-slate-100 outline-none focus:border-blue-200 transition-all" 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer del Modal */}
                <div className="pt-6 border-t border-slate-50 flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => handleDelete(editingGarment.id)}
                    className="p-4 rounded-2xl border border-red-50 text-red-500 hover:bg-red-50 transition-all flex items-center justify-center"
                    title="Eliminar producto"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setEditingGarment(null)} 
                    className="px-8 py-4 rounded-2xl border border-slate-200 font-bold text-slate-500 hover:bg-slate-50 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}