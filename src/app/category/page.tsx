import { prisma } from "@/lib/prisma";
import { CategoryManager } from "@/components/admin/category/CategoryManager";
import { FolderTree } from "lucide-react";

export default async function CategoriesPage() {
  // Traemos las categorías con su relación de talles y los tipos de talles disponibles
  const [categories, sizeTypes] = await Promise.all([
    prisma.category.findMany({
      include: {
        sizeType: true, // Para saber qué sistema de talles usa cada categoría
        _count: {
          select: { garments: true } // Para mostrar cuántos productos tiene cada una
        }
      },
      orderBy: { name: 'asc' }
    }),
    prisma.sizeType.findMany({
      orderBy: { name: 'asc' }
    })
  ]);

  return (
    <div className="space-y-8 p-6">
      {/* Header Estilo SCAlquila */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <FolderTree size={20} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">
              Gestión de Categorías
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            Define la estructura de tu inventario y asigna reglas de talles.
          </p>
        </div>
      </div>

      {/* El Manager maneja toda la interacción */}
      <CategoryManager 
        initialCategories={categories} 
        sizeTypes={sizeTypes} 
      />
    </div>
  );
}