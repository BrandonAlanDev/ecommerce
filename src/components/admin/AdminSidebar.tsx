"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tags, 
  Layers, 
  Box, 
  ArrowLeftRight, 
  Truck, 
  Palette, 
  Ruler, 
  Users,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Database
} from 'lucide-react';

// Agrupación basada en tu Schema de Prisma
const MENU_GROUPS = [
  {
    title: "Principal",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ]
  },
  {
    title: "Catálogo",
    items: [
      { name: "Productos", href: "/admin/garments", icon: Tags },
      { name: "Categorías", href: "/admin/categories", icon: Layers },
    ]
  },
  {
    title: "Stock & Logística",
    items: [
      { name: "Variantes", href: "/admin/variants", icon: Box },
      { name: "Movimientos", href: "/admin/movements", icon: ArrowLeftRight },
      { name: "Proveedores", href: "/admin/providers", icon: Truck },
    ]
  },
  {
    title: "Atributos",
    items: [
      { name: "Colores", href: "/admin/colors", icon: Palette },
      { name: "Talles", href: "/admin/sizes", icon: Ruler },
    ]
  },
  {
    title: "Sistema",
    items: [
      { name: "Usuarios", href: "/admin/users", icon: Users },
      { name: "Base de Datos", href: "/admin/db", icon: Database },
    ]
  }
];

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="h-screen sticky top-0 bg-slate-950 text-slate-400 flex flex-col border-r border-slate-800 transition-all duration-300 ease-in-out z-50 shadow-2xl"
    >
      {/* HEADER: Logo y Toggle */}
      <div className="p-6 flex items-center justify-between border-b border-slate-900">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <ShieldCheck className="text-white" size={20} />
              </div>
              <span className="font-black italic text-xl text-white tracking-tighter">
                NSB<span className="text-blue-500 underline decoration-2 underline-offset-4">ADMIN</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-800"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* NAVEGACIÓN SCROLLABLE */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
        {MENU_GROUPS.map((group, idx) => (
          <div key={idx} className="space-y-2">
            {!isCollapsed && (
              <motion.h3 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-2"
              >
                {group.title}
              </motion.h3>
            )}
            
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={isCollapsed ? item.name : ""}
                    className={`
                      relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
                      ${isActive 
                        ? 'bg-blue-600/10 text-blue-400 font-semibold' 
                        : 'hover:bg-slate-900 hover:text-slate-100'}
                    `}
                  >
                    {/* Indicador activo lateral */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
                      />
                    )}

                    <item.icon 
                      size={20} 
                      className={`${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`} 
                    />
                    
                    {!isCollapsed && (
                      <motion.span 
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* FOOTER: Versión y Localidad */}
      <div className="p-4 border-t border-slate-900">
        {!isCollapsed ? (
          <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800/50">
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest text-center">
              NewSurfBoard v1.0.0
            </p>
            <p className="text-[9px] text-blue-500/60 font-medium text-center mt-1">
              Santa Clara del Mar, ARG
            </p>
          </div>
        ) : (
          <div className="text-center text-[10px] font-bold text-slate-700 uppercase">
            v1.0
          </div>
        )}
      </div>
    </motion.aside>
  );
}