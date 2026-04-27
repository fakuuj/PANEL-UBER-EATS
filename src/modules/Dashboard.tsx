import { useState, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  DollarSign, ShoppingBag, TrendingUp, Users, ArrowUpRight,
  Star, ChevronRight, X, Check,
  MoreHorizontal
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { revenueData, weeklyOrders, topProducts, liveOrders, branchMetrics, hourlyTraffic } from '../data/mockData';

// --- Region-aware KPI data ---
const regionStats = {
  consolidated: {
    ventas: '$188,600', ventasTrend: 18.4, ventasBadge: 'Récord',
    pedidos: '482', pedidosTrend: 8.2, pedidosBadge: '12 activos',
    ganancia: '$114,360', gananciaTrend: 22.1, gananciaBadge: '↑ 22.1%',
    clientes: '3,841', clientesTrend: 5.8, clientesBadge: '48 VIP',
  },
  uy: {
    ventas: '$103,200', ventasTrend: 21.3, ventasBadge: 'Récord UY',
    pedidos: '274', pedidosTrend: 11.4, pedidosBadge: '7 activos',
    ganancia: '$62,900', gananciaTrend: 19.8, gananciaBadge: '↑ 19.8%',
    clientes: '2,184', clientesTrend: 6.2, clientesBadge: '31 VIP',
  },
  es: {
    ventas: '€85,400', ventasTrend: 14.7, ventasBadge: '↑ Tendencia',
    pedidos: '208', pedidosTrend: 4.9, pedidosBadge: '5 activos',
    ganancia: '€51,460', gananciaTrend: 24.6, gananciaBadge: '↑ 24.6%',
    clientes: '1,657', clientesTrend: 5.1, clientesBadge: '17 VIP',
  },
};

// --- Simulated modal component ---
type ModalType = 'pedido' | 'empleado' | 'campana' | 'inventario' | null;

function ActionModal({ type, onClose }: { type: ModalType; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  if (!type) return null;

  const configs: Record<NonNullable<ModalType>, { title: string; icon: string; color: string; steps: { label: string; fields: { name: string; type: string; placeholder: string }[] }[] }> = {
    pedido: {
      title: 'Nuevo Pedido', icon: '🛒', color: '#3B82F6',
      steps: [
        { label: 'Datos del pedido', fields: [{ name: 'Mesa / Canal', type: 'text', placeholder: 'Mesa 4 / Uber Eats / WhatsApp' }, { name: 'Cliente', type: 'text', placeholder: 'Nombre del cliente' }] },
        { label: 'Productos', fields: [{ name: 'Platos', type: 'text', placeholder: 'Ej: Asado x2, Ensalada x1' }, { name: 'Observaciones', type: 'text', placeholder: 'Sin sal, sin gluten...' }] },
      ],
    },
    empleado: {
      title: 'Nuevo Empleado', icon: '👤', color: '#10B981',
      steps: [
        { label: 'Datos personales', fields: [{ name: 'Nombre completo', type: 'text', placeholder: 'Ej: María González' }, { name: 'Email', type: 'email', placeholder: 'empleado@gastroos.com' }] },
        { label: 'Rol y sucursal', fields: [{ name: 'Cargo', type: 'text', placeholder: 'Chef, Mozo, Delivery...' }, { name: 'Sucursal', type: 'text', placeholder: 'Uruguay / España' }] },
      ],
    },
    campana: {
      title: 'Campaña Email', icon: '📧', color: '#7C3AED',
      steps: [
        { label: 'Configurar campaña', fields: [{ name: 'Asunto', type: 'text', placeholder: 'Ej: ¡Oferta especial este fin de semana!' }, { name: 'Segmento', type: 'text', placeholder: 'VIP, Gold, Todos...' }] },
        { label: 'Contenido', fields: [{ name: 'Mensaje', type: 'text', placeholder: 'Escribí el mensaje principal...' }, { name: 'CTA', type: 'text', placeholder: 'Reservar ahora / Ver menú' }] },
      ],
    },
    inventario: {
      title: 'Pedir Inventario', icon: '📦', color: '#F59E0B',
      steps: [
        { label: 'Insumo a pedir', fields: [{ name: 'Producto', type: 'text', placeholder: 'Ej: Harina 000' }, { name: 'Cantidad', type: 'text', placeholder: 'Ej: 50 kg' }] },
        { label: 'Proveedor y entrega', fields: [{ name: 'Proveedor', type: 'text', placeholder: 'Ej: Distribuidora Norte' }, { name: 'Fecha estimada', type: 'text', placeholder: 'Ej: 27/04/2025' }] },
      ],
    },
  };

  const cfg = configs[type];
  const currentStep = cfg.steps[step];
  const isLast = step === cfg.steps.length - 1;

  if (done) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
        <div className="card-premium p-8 w-full max-w-sm text-center animate-fade-up">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${cfg.color}20`, border: `1px solid ${cfg.color}50` }}>
            <Check size={28} style={{ color: cfg.color }} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">¡{cfg.title} creado!</h3>
          <p className="text-sm text-slate-400 mb-6">La acción fue registrada exitosamente en el sistema.</p>
          <button onClick={onClose} className="btn-primary w-full justify-center">Cerrar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
      <div className="card-premium p-6 w-full max-w-md animate-fade-up" style={{ border: `1px solid ${cfg.color}30` }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${cfg.color}15` }}>{cfg.icon}</div>
            <div>
              <h3 className="text-base font-bold text-white">{cfg.title}</h3>
              <p className="text-xs text-slate-400">Paso {step + 1} de {cfg.steps.length} · {currentStep.label}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"><X size={16} style={{ color: '#64748B' }} /></button>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-6">
          {cfg.steps.map((_, i) => (
            <div key={i} className="h-1 flex-1 rounded-full transition-all" style={{ background: i <= step ? cfg.color : '#1a2640' }} />
          ))}
        </div>

        <div className="space-y-4 mb-6">
          {currentStep.fields.map(field => (
            <div key={field.name}>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">{field.name}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none bg-transparent text-white placeholder-slate-600"
                style={{ border: '1px solid #1a2640', background: 'rgba(255,255,255,0.03)' }}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} className="btn-secondary flex-1 justify-center">Atrás</button>
          )}
          <button
            onClick={() => isLast ? setDone(true) : setStep(s => s + 1)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all"
            style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}cc)` }}
          >
            {isLast ? '✓ Confirmar' : 'Siguiente →'}
          </button>
        </div>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#0D1629', border: '1px solid #1a2640', borderRadius: '10px', padding: '10px 14px' }}>
        <p style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '6px' }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
            <span style={{ color: '#E2E8F0', fontSize: '12px', fontWeight: 600 }}>
              {typeof p.value === 'number' && p.value > 1000 ? `$${(p.value / 1000).toFixed(0)}k` : p.value}
            </span>
            <span style={{ color: '#475569', fontSize: '11px' }}>{p.name}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  nuevo: { label: 'Nuevo', color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
  en_cocina: { label: 'En Cocina', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  listo: { label: 'Listo', color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
  en_camino: { label: 'En Camino', color: '#06B6D4', bg: 'rgba(6,182,212,0.15)' },
  confirmado: { label: 'Confirmado', color: '#7C3AED', bg: 'rgba(124,58,237,0.15)' },
  entregado: { label: 'Entregado', color: '#34D399', bg: 'rgba(52,211,153,0.15)' },
};

const typeIcons: Record<string, { label: string; icon: string }> = {
  interno: { label: 'Mesa', icon: '🍽️' },
  uber_eats: { label: 'Uber Eats', icon: '🟢' },
  delivery: { label: 'Delivery', icon: '🛵' },
  whatsapp: { label: 'WhatsApp', icon: '💬' },
  takeaway: { label: 'Take Away', icon: '🥡' },
};

interface DashboardProps {
  region: 'consolidated' | 'uy' | 'es';
}

export default function Dashboard({ region }: DashboardProps) {
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const stats = regionStats[region];
  const uyM = branchMetrics.UY;
  const esM = branchMetrics.ES;

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: liveOrders.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64, // approximate height with gap
    overscan: 5,
  });

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <ActionModal type={activeModal} onClose={() => setActiveModal(null)} />
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>Dashboard Ejecutivo</h2>
            <p className="text-sm mt-0.5" style={{ color: '#475569' }}>
              {region === 'consolidated' ? 'Visión consolidada — Uruguay & España' : region === 'uy' ? 'Visión Regional — Uruguay' : 'Visión Regional — España'} · Hoy, lunes 7 julio 2025
            </p>
          </div>
          <div className="flex items-center gap-4">

            
            <div className="flex items-center gap-2">
              {(['day', 'week', 'month', 'year'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: period === p ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${period === p ? 'rgba(37,99,235,0.4)' : '#1a2640'}`,
                    color: period === p ? '#60A5FA' : '#64748B',
                  }}
                >
                  {{ day: 'Hoy', week: 'Semana', month: 'Mes', year: 'Año' }[p]}
                </button>
              ))}
              <button className="btn-primary ml-2 hidden sm:flex">
                <ArrowUpRight size={14} />
                Exportar
              </button>
            </div>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'pedido' as ModalType, label: 'Nuevo Pedido', icon: '🛒', color: '#3B82F6' },
            { id: 'empleado' as ModalType, label: 'Nuevo Empleado', icon: '👤', color: '#10B981' },
            { id: 'campana' as ModalType, label: 'Campaña Mail', icon: '📧', color: '#7C3AED' },
            { id: 'inventario' as ModalType, label: 'Pedir Inventario', icon: '📦', color: '#F59E0B' },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setActiveModal(btn.id)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
              style={{ background: `${btn.color}15`, border: `1px solid ${btn.color}35`, color: btn.color }}
            >
              <span>{btn.icon}</span>
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards — region-reactive */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Ventas Totales"
          value={stats.ventas}
          subtitle="vs mes anterior"
          trend={stats.ventasTrend}
          trendLabel="vs mes anterior"
          icon={<DollarSign size={18} className="text-white" />}
          iconBg="linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)"
          accentColor="#2563EB"
          badge={stats.ventasBadge}
          badgeColor="#10B981"
        />
        <StatCard
          title="Pedidos Hoy"
          value={stats.pedidos}
          subtitle="pedidos activos"
          trend={stats.pedidosTrend}
          trendLabel="vs ayer"
          icon={<ShoppingBag size={18} className="text-white" />}
          iconBg="linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)"
          accentColor="#7C3AED"
          badge={stats.pedidosBadge}
          badgeColor="#7C3AED"
        />
        <StatCard
          title="Ganancia Neta"
          value={stats.ganancia}
          subtitle="margen 60.6%"
          trend={stats.gananciaTrend}
          trendLabel="margen 60.6%"
          icon={<TrendingUp size={18} className="text-white" />}
          iconBg="linear-gradient(135deg, #059669 0%, #10B981 100%)"
          accentColor="#10B981"
          badge={stats.gananciaBadge}
          badgeColor="#10B981"
        />
        <StatCard
          title="Clientes Activos"
          value={stats.clientes}
          subtitle="284 hoy"
          trend={stats.clientesTrend}
          trendLabel="284 hoy"
          icon={<Users size={18} className="text-white" />}
          iconBg="linear-gradient(135deg, #0891B2 0%, #06B6D4 100%)"
          accentColor="#06B6D4"
          badge={stats.clientesBadge}
          badgeColor="#F59E0B"
        />
      </div>

      {/* Revenue Chart + Branch Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Revenue Chart */}
        <div className="lg:col-span-2 card-premium p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white">
                {region === 'consolidated' ? 'Ingresos Consolidados' : `Ingresos ${region === 'uy' ? 'Uruguay' : 'España'}`}
              </h3>
              <p className="text-xs mt-0.5" style={{ color: '#475569' }}>
                {region === 'consolidated' ? 'Uruguay + España' : region === 'uy' ? 'Sucursal Montevideo' : 'Sucursal Madrid'} · Últimos 12 meses
              </p>
            </div>
            <div className="flex items-center gap-4">
              {(region === 'consolidated' || region === 'uy') && (
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: '#3B82F6' }} />
                  <span className="text-xs" style={{ color: '#64748B' }}>Uruguay</span>
                </div>
              )}
              {(region === 'consolidated' || region === 'es') && (
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: '#7C3AED' }} />
                  <span className="text-xs" style={{ color: '#64748B' }}>España</span>
                </div>
              )}
              {region === 'consolidated' && (
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: '#06B6D4' }} />
                  <span className="text-xs" style={{ color: '#64748B' }}>Total</span>
                </div>
              )}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradUY" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradES" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2640" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              {(region === 'consolidated' || region === 'uy') && (
                <Area type="monotone" dataKey="uy" name="Uruguay" stroke="#3B82F6" strokeWidth={2} fill="url(#gradUY)" dot={false} />
              )}
              {(region === 'consolidated' || region === 'es') && (
                <Area type="monotone" dataKey="es" name="España" stroke="#7C3AED" strokeWidth={2} fill="url(#gradES)" dot={false} />
              )}
              {region === 'consolidated' && (
                <Area type="monotone" dataKey="total" name="Total" stroke="#06B6D4" strokeWidth={1.5} strokeDasharray="5 3" fill="url(#gradTotal)" dot={false} />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Branch Cards */}
        <div className="space-y-4">
          {/* UY */}
          {(region === 'consolidated' || region === 'uy') && (
          <div className="card-premium p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #3B82F6, transparent)' }} />
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{uyM.flag}</span>
                <div>
                  <p className="text-sm font-semibold text-white">Uruguay</p>
                  <p className="text-xs" style={{ color: '#475569' }}>Montevideo</p>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full badge-success">+{uyM.growth}%</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs" style={{ color: '#475569' }}>Ingresos</p>
                <p className="text-lg font-bold text-white">${uyM.revenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: '#475569' }}>Pedidos</p>
                <p className="text-lg font-bold text-white">{uyM.orders}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: '#475569' }}>Ticket Prom.</p>
                <p className="text-sm font-semibold text-white">${uyM.avgTicket.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: '#475569' }}>Satisfacción</p>
                <div className="flex items-center gap-1">
                  <Star size={12} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                  <p className="text-sm font-semibold text-white">{uyM.satisfaction}</p>
                </div>
              </div>
            </div>
            {/* Capacity bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: '#475569' }}>Capacidad</span>
                <span style={{ color: '#60A5FA' }}>{uyM.capacity}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${uyM.capacity}%`, background: 'linear-gradient(90deg, #2563EB, #3B82F6)' }} />
              </div>
            </div>
          </div>
          )}

          {/* ES */}
          {(region === 'consolidated' || region === 'es') && (
          <div className="card-premium p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #7C3AED, transparent)' }} />
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{esM.flag}</span>
                <div>
                  <p className="text-sm font-semibold text-white">España</p>
                  <p className="text-xs" style={{ color: '#475569' }}>Madrid</p>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(124,58,237,0.15)', color: '#A78BFA', border: '1px solid rgba(124,58,237,0.3)' }}>+{esM.growth}%</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs" style={{ color: '#475569' }}>Ingresos</p>
                <p className="text-lg font-bold text-white">€{esM.revenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: '#475569' }}>Pedidos</p>
                <p className="text-lg font-bold text-white">{esM.orders}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: '#475569' }}>Ticket Prom.</p>
                <p className="text-sm font-semibold text-white">€{esM.avgTicket.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: '#475569' }}>Satisfacción</p>
                <div className="flex items-center gap-1">
                  <Star size={12} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                  <p className="text-sm font-semibold text-white">{esM.satisfaction}</p>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: '#475569' }}>Capacidad</span>
                <span style={{ color: '#A78BFA' }}>{esM.capacity}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${esM.capacity}%`, background: 'linear-gradient(90deg, #7C3AED, #9333EA)' }} />
              </div>
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Orders Chart + Top Products + Live Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Orders by Type */}
        <div className="card-premium p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white">Pedidos por Canal</h3>
              <p className="text-xs mt-0.5" style={{ color: '#475569' }}>Esta semana</p>
            </div>
            <MoreHorizontal size={16} style={{ color: '#475569' }} className="cursor-pointer" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyOrders} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2640" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="internal" name="Mesa" stackId="a" fill="#2563EB" radius={[0, 0, 0, 0]} />
              <Bar dataKey="delivery" name="Delivery" stackId="a" fill="#7C3AED" radius={[0, 0, 0, 0]} />
              <Bar dataKey="takeaway" name="Take Away" stackId="a" fill="#06B6D4" radius={[0, 0, 0, 0]} />
              <Bar dataKey="whatsapp" name="WhatsApp" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { label: 'Mesa', color: '#2563EB', val: '509' },
              { label: 'Delivery', color: '#7C3AED', val: '507' },
              { label: 'Take Away', color: '#06B6D4', val: '352' },
              { label: 'WhatsApp', color: '#10B981', val: '215' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: item.color }} />
                <span className="text-xs" style={{ color: '#64748B' }}>{item.label}</span>
                <span className="text-xs font-semibold text-white ml-auto">{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="card-premium p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Top Productos</h3>
              <p className="text-xs mt-0.5" style={{ color: '#475569' }}>Por ingresos este mes</p>
            </div>
            <button className="text-xs" style={{ color: '#3B82F6' }}>Ver todos</button>
          </div>
          <div className="space-y-3">
            {topProducts.slice(0, 6).map((prod, i) => (
              <div key={prod.name} className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: i < 3 ? 'linear-gradient(135deg, #1D4ED8, #7C3AED)' : 'rgba(255,255,255,0.05)',
                    color: i < 3 ? 'white' : '#64748B',
                  }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{prod.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 h-1 rounded-full" style={{ background: '#1a2640' }}>
                      <div
                        className="h-1 rounded-full"
                        style={{
                          width: `${(prod.revenue / 30000) * 100}%`,
                          background: i < 3 ? 'linear-gradient(90deg, #2563EB, #7C3AED)' : '#1f2f4a',
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-semibold text-white">${(prod.revenue / 1000).toFixed(0)}k</p>
                  <p className="text-xs" style={{ color: prod.trend > 0 ? '#34D399' : '#FB7185' }}>
                    {prod.trend > 0 ? '+' : ''}{prod.trend}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Orders */}
        <div className="card-premium p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Pedidos en Vivo</h3>
              <div className="live-indicator mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
                Tiempo Real
              </div>
            </div>
            <ChevronRight size={16} style={{ color: '#475569' }} />
          </div>
          <div ref={parentRef} className="max-h-72 overflow-y-auto" style={{ position: 'relative' }}>
            <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const order = liveOrders[virtualRow.index];
                const status = statusConfig[order.status];
                const type = typeIcons[order.type];
                return (
                  <div
                    key={order.id}
                    className="absolute top-0 left-0 w-full px-1"
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <div
                      className="flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all h-full"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border, #1a2640)' }}
                    >
                      <span className="text-base flex-shrink-0">{type.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-semibold text-white">{order.id}</p>
                          <span className="text-xs" style={{ color: '#475569' }}>·</span>
                          <p className="text-xs truncate" style={{ color: '#94A3B8' }}>{order.client}</p>
                          <span className="text-xs ml-auto" style={{ color: '#475569' }}>{order.branch}</span>
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <span
                            className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                            style={{ background: status.bg, color: status.color, fontSize: '10px' }}
                          >
                            {status.label}
                          </span>
                          <span className="text-xs font-semibold text-white">${order.amount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Traffic */}
      <div className="card-premium p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-white">Tráfico por Hora — Hoy</h3>
            <p className="text-xs mt-0.5" style={{ color: '#475569' }}>Distribución de pedidos durante el día</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="live-indicator">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
              Live
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={hourlyTraffic} margin={{ top: 4, right: 0, left: -30, bottom: 0 }}>
            <defs>
              <linearGradient id="gradHourly" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2640" vertical={false} />
            <XAxis dataKey="hour" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="orders" name="Pedidos" stroke="#2563EB" strokeWidth={2} fill="url(#gradHourly)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
