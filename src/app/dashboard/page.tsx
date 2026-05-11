"use server";
import Search from "@/components/Search";


export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; category?: string }>;
}) {
  const params = await searchParams;
  const query = params?.query || "";
  const category = params?.category || "";

  return (
    <div className="p-8 bg-neutral-950 min-h-screen text-neutral-100 pt-24">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-amber-500 rounded-full inline-block" />
            Gestión de Inventario
          </h1>
          <p className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1 ml-5">
            Control de Stock y Operaciones
          </p>
        </div>
      
      </div>

      {/* FILTROS Y BÚSQUEDA */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Search className="w-full" />
        </div>
      </div>
    </div>
  );
}