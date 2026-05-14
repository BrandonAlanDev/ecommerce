import { prisma } from "@/lib/prisma";
import { GarmentTable } from "@/components/admin/garment/GarmentTable";
import { Plus, Search, Filter,Tags } from "lucide-react";
import Link from "next/link";

export default async function GarmentsPage() {
  // Obtenemos los productos con sus relaciones de categoría e imágenes
  const garments = await prisma.garment.findMany({
    include: {
      category: true,
      images: {
        orderBy: { order: 'asc' },
        take: 1
      }
    },
    orderBy: { updatedAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      {/* Header de Sección */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Inventario de Garments</h1>
          <p className="text-slate-500 text-sm">Gestiona los productos de NewSurfBoard.</p>
        </div>
        
        <Link 
          href="/admin/garments/new"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20"
        >
          <Plus size={20} />
          Nuevo Producto
        </Link>
      </div>

      {/* Barra de Filtros */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre o descripción..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all">
          <Filter size={18} />
          Filtros
        </button>
      </div>

      {/* Lista de Productos */}
      {garments.length > 0 ? (
        <GarmentTable garments={garments} />
      ) : (
        <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-slate-300">
          <div className="inline-flex p-4 rounded-full bg-slate-100 text-slate-400 mb-4">
            <Tags size={32} />
          </div>
          <h3 className="text-slate-900 font-bold">No hay productos cargados</h3>
          <p className="text-slate-500 text-sm">Comienza agregando tu primer prenda o accesorio.</p>
        </div>
      )}
    </div>
  );
}