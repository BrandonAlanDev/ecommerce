"use client";

import React from 'react';
import { Edit2, Trash2, Eye, EyeOff, MoreVertical } from 'lucide-react';
import { toggleGarmentStatus, deleteGarment } from '@/actions/garments';

export function GarmentTable({ garments }: { garments: any[] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-widest font-bold">
            <th className="px-6 py-4">Producto</th>
            <th className="px-6 py-4">Categoría</th>
            <th className="px-6 py-4">Precio / Costo</th>
            <th className="px-6 py-4 text-center">Estado</th>
            <th className="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {garments.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                    {item.images?.[0] ? (
                      <img src={item.images[0].srcImage} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">IMG</div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.description || "Sin descripción"}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                  {item.category?.name}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm">
                  <p className="font-bold text-slate-900">${Number(item.price).toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400">Costo: ${Number(item.cost).toLocaleString()}</p>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <button 
                  onClick={() => toggleGarmentStatus(item.id, item.active)}
                  className={`p-1.5 rounded-lg transition-colors ${item.active ? 'text-emerald-500 hover:bg-emerald-50' : 'text-slate-300 hover:bg-slate-100'}`}
                >
                  {item.active ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => { if(confirm('¿Eliminar producto?')) deleteGarment(item.id) }}
                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}