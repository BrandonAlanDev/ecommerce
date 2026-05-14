"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Calendar,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- DATOS SIMULADOS PARA EL DASHBOARD ---
const STATS = [
  { label: "Ventas Totales", value: "$425.000", change: "+12.5%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Pedidos Nuevos", value: "24", change: "+4 hoy", icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Stock Bajo", value: "5", change: "Requiere atención", icon: Package, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Turnos Escuela", value: "12", change: "Para mañana", icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Encabezado del Panel */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Panel de Control</h1>
        <p className="text-slate-500 text-sm">Bienvenido a la gestión central de NewSurfBoard.</p>
      </div>

      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-medium ${stat.color}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Sección Inferior: Tablas Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Últimas Ventas */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-bottom border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Ventas Recientes</h3>
            <button className="text-xs text-blue-600 font-semibold hover:underline flex items-center">
              Ver todas <ChevronRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-3">Cliente</th>
                  <th className="px-6 py-3">Producto</th>
                  <th className="px-6 py-3">Monto</th>
                  <th className="px-6 py-3">Estado</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {[1, 2, 3].map((_, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">Usuario {i + 1}</td>
                    <td className="px-6 py-4 text-slate-500">Tabla Shortboard 6'0</td>
                    <td className="px-6 py-4 font-bold text-slate-900">$180.000</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase">Pagado</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="font-bold mb-4">Acciones Rápidas</h3>
            <div className="grid gap-3">
              <button className="w-full bg-white/10 hover:bg-white/20 py-2.5 px-4 rounded-xl text-sm font-medium transition-all text-left flex items-center justify-between group">
                Cargar nuevo producto
                <Package size={16} className="opacity-50 group-hover:opacity-100" />
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 py-2.5 px-4 rounded-xl text-sm font-medium transition-all text-left flex items-center justify-between group">
                Gestionar turnos
                <Calendar size={16} className="opacity-50 group-hover:opacity-100" />
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-500 py-2.5 px-4 rounded-xl text-sm font-bold transition-all text-center">
                Generar Reporte Mensual
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}