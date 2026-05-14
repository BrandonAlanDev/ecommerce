import { prisma } from "@/lib/prisma";
import { GarmentTable } from "@/components/admin/garment/GarmentTable";
import { CreateGarmentClient } from "@/components/admin/garment/CreateGarmentClient";
import { Search, Filter, Tags } from "lucide-react";

export default async function GarmentsPage() {
  // Traemos productos y categorías en paralelo para mejorar el performance
  const [garments, categories] = await Promise.all([
    prisma.garment.findMany({
      include: {
        category: true,
        images: { orderBy: { order: 'asc' }, take: 1 }
      },
      orderBy: { updatedAt: 'desc' }
    }),
    prisma.category.findMany({
      where: { active: true },
      select: { id: true, name: true }
    })
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Inventario de Garments</h1>
          <p className="text-slate-500 text-sm">Gestiona los productos de NewSurfBoard.</p>
        </div>

        {/* Usamos el componente de cliente en lugar del Link */}
        <CreateGarmentClient categories={categories} />
      </div>

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

      {garments.length > 0 ? (
        // PASA LAS CATEGORÍAS AQUÍ:
        <GarmentTable garments={garments} categories={categories} />
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