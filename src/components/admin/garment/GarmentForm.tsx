"use client";

import React, { useState } from 'react';
import { createGarment } from '@/actions/garments';
import { toast } from 'sonner'; // O la librería de notificaciones que uses

interface Props {
  categories: { id: string; name: string }[];
  onClose: () => void;
}

export function GarmentForm({ categories, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    
    // Preparar array de imágenes (máximo 4 según tu esquema)
    const images = [
      { srcImage: formData.get('img0') as string, order: 0, alt: 'Principal' },
      { srcImage: formData.get('img1') as string, order: 1, alt: 'Vista 2' },
      { srcImage: formData.get('img2') as string, order: 2, alt: 'Vista 3' },
      { srcImage: formData.get('img3') as string, order: 3, alt: 'Vista 4' },
    ].filter(img => img.srcImage); // Solo enviamos las que tengan URL

    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      cost: parseFloat(formData.get('cost') as string),
      categoryId: formData.get('categoryId') as string,
      images: images
    };

    const result = await createGarment(data);

    if (result.success) {
      toast.success("Producto creado exitosamente");
      onClose();
    } else {
      toast.error(result.error || "Ocurrió un error");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sección: Info Básica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase">Nombre del Producto</label>
          <input required name="name" type="text" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm" placeholder="Ej: Tabla Shortboard 6'0" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase">Categoría</label>
          <select required name="categoryId" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm bg-white">
            <option value="">Seleccionar...</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase">Descripción</label>
        <textarea name="description" rows={3} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm resize-none" placeholder="Detalles de la prenda o tabla..."></textarea>
      </div>

      {/* Sección: Precios */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase text-blue-600">Precio Venta (ARS)</label>
          <input required name="price" type="number" step="0.01" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm" placeholder="0.00" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase">Costo Incurrido</label>
          <input required name="cost" type="number" step="0.01" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm" placeholder="0.00" />
        </div>
      </div>

      {/* Sección: Imágenes (URLs) */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2">
          Imágenes del Producto <span className="text-[10px] text-slate-400 font-normal">(URLs de las fotos)</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <input 
              key={i} 
              name={`img${i}`} 
              type="url" 
              placeholder={i === 0 ? "URL Foto Principal (Obligatoria)" : `URL Foto ${i+1}`}
              required={i === 0}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:border-blue-400" 
            />
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex gap-3">
        <button 
          type="button" 
          onClick={onClose}
          className="flex-1 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="flex-1 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Crear Producto"}
        </button>
      </div>
    </form>
  );
}