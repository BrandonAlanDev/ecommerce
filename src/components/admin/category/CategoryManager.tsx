"use client";

import React, { useState } from 'react';
import { X, FolderTree, Edit3, Trash2, CheckCircle2, XCircle, LayoutGrid, Plus, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { updateCategory, deleteCategory, createCategory } from '@/actions/category';
import { toast } from 'sonner';

interface Props {
  initialCategories: any[];
  sizeTypes: any[];
}

export function CategoryManager({ initialCategories, sizeTypes }: Props) {
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, id?: string) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      sizeTypeId: formData.get('sizeTypeId') || null,
      active: formData.get('active') === 'true',
    };

    // Llamada al Server Action con tipado de respuesta corregido
    const res = id ? await updateCategory(id, data) : await createCategory(data);
    
    // Verificación segura para evitar el error de 'void'
    if (res?.success) {
      toast.success(id ? "Categoría actualizada con éxito" : "Nueva categoría creada");
      setEditingCategory(null);
      setIsCreating(false);
    } else {
      toast.error(res?.error || "Ocurrió un error inesperado");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (cat: any) => {
    // Validación de seguridad para no romper la integridad de datos
    if (cat._count?.garments > 0) {
      toast.error(`La categoría "${cat.name}" tiene productos. No se puede eliminar.`);
      return;
    }

    if (confirm(`¿Estás seguro de eliminar "${cat.name}"?`)) {
      const res = await deleteCategory(cat.id);
      if (res?.success) {
        toast.success("Categoría eliminada correctamente");
        setEditingCategory(null);
      } else {
        toast.error(res?.error || "Error al intentar eliminar");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Barra de Herramientas */}
      <div className="flex justify-end">
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-xl hover:bg-orange-600 transition-all active:scale-95 uppercase italic tracking-tight"
        >
          <Plus size={22} strokeWidth={3} />
          Nueva Categoría
        </button>
      </div>

      {/* Grid de Visualización */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {initialCategories.map((cat) => (
          <motion.div
            key={cat.id}
            whileHover={{ y: -8 }}
            onClick={() => setEditingCategory(cat)}
            className="group cursor-pointer bg-white p-7 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-orange-200 transition-all flex flex-col justify-between min-h-[200px]"
          >
            <div>
              <div className="flex justify-between items-start mb-5">
                <div className="p-3.5 rounded-2xl bg-orange-50 text-orange-500 group-hover:scale-110 transition-transform duration-300">
                  <FolderTree size={26} />
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                  cat.active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {cat.active ? <CheckCircle2 size={10}/> : <XCircle size={10}/>}
                  {cat.active ? 'Activa' : 'Pausada'}
                </div>
              </div>

              <h3 className="font-bold text-slate-900 text-xl leading-tight mb-2 uppercase italic">{cat.name}</h3>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                <Package size={14} className="text-orange-200" />
                {cat._count?.garments || 0} Artículos
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-300 group-hover:text-orange-400 transition-colors uppercase tracking-widest">
                SISTEMA: {cat.sizeType?.name || 'ESTÁNDAR'}
              </span>
              <Edit3 size={18} className="text-slate-200 group-hover:text-orange-500 transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal CRUD Integrado */}
      <AnimatePresence>
        {(editingCategory || isCreating) && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && (setEditingCategory(null) || setIsCreating(false))}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              {/* Header Modal */}
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-200">
                    <LayoutGrid size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 italic tracking-tight uppercase">
                      {isCreating ? 'Nueva Categoría' : 'Editar Categoría'}
                    </h2>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Control de Inventario Santa Clara</p>
                  </div>
                </div>
                <button 
                  onClick={() => {setEditingCategory(null); setIsCreating(false)}} 
                  className="text-slate-400 hover:bg-slate-100 p-3 rounded-full transition-colors"
                >
                  <X size={24}/>
                </button>
              </div>

              {/* Formulario */}
              <form onSubmit={(e) => handleSubmit(e, editingCategory?.id)} className="p-9 space-y-7">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Nombre de la Categoría</label>
                  <input 
                    name="name" 
                    defaultValue={editingCategory?.name || ""} 
                    placeholder="Ej: Accesorios, Tablas, Wetsuits..."
                    className="w-full px-7 py-5 rounded-[1.5rem] border border-slate-200 outline-none focus:ring-4 focus:ring-orange-500/10 font-bold text-slate-800 transition-all text-lg" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Dependencia de Talles</label>
                  <select 
                    name="sizeTypeId" 
                    defaultValue={editingCategory?.sizeTypeId || ""} 
                    className="w-full px-7 py-5 rounded-[1.5rem] border border-slate-200 bg-white outline-none font-bold text-slate-700 appearance-none focus:ring-4 focus:ring-orange-500/10"
                  >
                    <option value="">Talles Estándar (Único)</option>
                    {sizeTypes.map(st => (
                      <option key={st.id} value={st.id}>{st.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Estado del Canal</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center justify-center gap-3 p-5 rounded-[1.5rem] border-2 cursor-pointer transition-all border-slate-100 has-[:checked]:border-green-500 has-[:checked]:bg-green-50 has-[:checked]:text-green-700 font-bold text-slate-400 text-sm">
                      <input type="radio" name="active" value="true" defaultChecked={isCreating ? true : editingCategory?.active} className="hidden" />
                      <CheckCircle2 size={20} /> ACTIVA
                    </label>
                    <label className="flex items-center justify-center gap-3 p-5 rounded-[1.5rem] border-2 cursor-pointer transition-all border-slate-100 has-[:checked]:border-red-500 has-[:checked]:bg-red-50 has-[:checked]:text-red-700 font-bold text-slate-400 text-sm">
                      <input type="radio" name="active" value="false" defaultChecked={isCreating ? false : !editingCategory?.active} className="hidden" />
                      <XCircle size={20} /> PAUSADA
                    </label>
                  </div>
                </div>

                {/* Footer del Modal */}
                <div className="pt-6 border-t border-slate-50 flex gap-4">
                  {!isCreating && (
                    <button 
                      type="button" 
                      onClick={() => handleDelete(editingCategory)}
                      className="p-5 rounded-[1.5rem] border border-red-50 text-red-500 hover:bg-red-50 transition-all hover:scale-105 active:scale-95"
                      title="Eliminar categoría"
                    >
                      <Trash2 size={24} />
                    </button>
                  )}
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="flex-1 py-5 rounded-[1.5rem] bg-slate-900 text-white font-black shadow-xl shadow-slate-100 hover:bg-orange-600 transition-all disabled:opacity-50 uppercase italic tracking-tighter"
                  >
                    {isSubmitting ? "Procesando..." : (isCreating ? "Guardar Nueva Categoría" : "Actualizar Cambios")}
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