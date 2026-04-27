import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Globe } from 'lucide-react';
import { finances, revenueData } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#0D1629', border: '1px solid #1a2640', borderRadius: '10px', padding: '10px 14px' }}>
        <p style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '6px' }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
            <span style={{ color: '#E2E8F0', fontSize: '12px', fontWeight: 600 }}>
              ${typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
            </span>
            <span style={{ color: '#475569', fontSize: '11px' }}>{p.name}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Finances() {
  const { today, month, cashFlow, categories } = finances;

  return (
    <div className="p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Finanzas & Administración</h2>
          <p className="text-sm mt-0.5" style={{ color: '#475569' }}>Consolidado Uruguay + España · Multi moneda</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1a2640', color: '#64748B' }}>
            <Globe size={12} />
            <span>UYU + EUR</span>
          </div>
          <button className="btn-primary"><ArrowUpRight size={13} /> Exportar P&L</button>
        </div>
      </div>

      {/* Today's KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: 'Ingresos Hoy',
            value: `$${today.revenue.toLocaleString()}`,
            sub: `${today.transactions} transacciones`,
            color: '#10B981',
            icon: ArrowUpRight,
            bg: 'rgba(16,185,129,0.1)',
          },
          {
            label: 'Egresos Hoy',
            value: `$${today.expenses.toLocaleString()}`,
            sub: 'costos operativos',
            color: '#F43F5E',
            icon: ArrowDownRight,
            bg: 'rgba(244,63,94,0.1)',
          },
          {
            label: 'Ganancia Hoy',
            value: `$${today.profit.toLocaleString()}`,
            sub: 'margen 58.4%',
            color: '#3B82F6',
            icon: TrendingUp,
            bg: 'rgba(37,99,235,0.1)',
          },
          {
            label: 'Crecimiento',
            value: `+${month.growth}%`,
            sub: 'vs mes anterior',
            color: '#F59E0B',
            icon: TrendingUp,
            bg: 'rgba(245,158,11,0.1)',
          },
        ].map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="card-premium p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${card.color}, transparent)` }} />
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
                  <Icon size={16} style={{ color: card.color }} />
                </div>
              </div>
              <p className="text-xs mb-1" style={{ color: '#475569' }}>{card.label}</p>
              <p className="text-2xl font-bold text-white" style={{ letterSpacing: '-0.03em' }}>{card.value}</p>
              <p className="text-xs mt-1" style={{ color: '#64748B' }}>{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Cash Flow */}
        <div className="lg:col-span-2 card-premium p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white">Flujo de Caja — Hoy</h3>
              <p className="text-xs mt-0.5" style={{ color: '#475569' }}>Ingresos vs Egresos en tiempo real</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
                <span className="text-xs" style={{ color: '#64748B' }}>Ingresos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: '#F43F5E' }} />
                <span className="text-xs" style={{ color: '#64748B' }}>Egresos</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={cashFlow} margin={{ top: 4, right: 0, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#F43F5E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2640" vertical={false} />
              <XAxis dataKey="hour" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="income" name="Ingresos" stroke="#10B981" strokeWidth={2} fill="url(#gradIncome)" dot={false} />
              <Area type="monotone" dataKey="expenses" name="Egresos" stroke="#F43F5E" strokeWidth={2} fill="url(#gradExpense)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Distribution */}
        <div className="card-premium p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Distribución de Costos</h3>
          <p className="text-xs mb-4" style={{ color: '#475569' }}>% del total de egresos</p>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={categories} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                {categories.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any) => [`${value}%`, '']}
                contentStyle={{ background: '#0D1629', border: '1px solid #1a2640', borderRadius: 8, fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categories.map(cat => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: cat.color }} />
                  <span className="text-xs truncate" style={{ color: '#64748B', maxWidth: 140 }}>{cat.name}</span>
                </div>
                <span className="text-xs font-semibold text-white">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Annual Revenue */}
      <div className="card-premium p-5 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-white">Ingresos Anuales por Sucursal</h3>
            <p className="text-xs mt-0.5" style={{ color: '#475569' }}>Comparativa Uruguay vs España · 2024</p>
          </div>
          <div className="text-right">
            <p className="text-xs" style={{ color: '#475569' }}>Total anual</p>
            <p className="text-lg font-bold text-white">$1,339,200</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={revenueData} margin={{ top: 4, right: 0, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2640" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="uy" name="Uruguay" fill="#2563EB" radius={[4, 4, 0, 0]} />
            <Bar dataKey="es" name="España" fill="#7C3AED" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Multi-currency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* UY Caja */}
        <div className="card-premium p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🇺🇾</span>
            <h3 className="text-sm font-semibold text-white">Caja Uruguay — UYU</h3>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Efectivo en caja', value: 'UYU 48,400', color: '#10B981' },
              { label: 'Tarjetas (débito)', value: 'UYU 124,800', color: '#3B82F6' },
              { label: 'Tarjetas (crédito)', value: 'UYU 86,200', color: '#7C3AED' },
              { label: 'MercadoPago / Oca', value: 'UYU 42,600', color: '#F59E0B' },
              { label: 'Total del día', value: 'UYU 302,000', color: '#34D399' },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid #0f1a2e' }}>
                <span className="text-sm" style={{ color: '#94A3B8' }}>{item.label}</span>
                <span className="text-sm font-semibold" style={{ color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ES Caja */}
        <div className="card-premium p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🇪🇸</span>
            <h3 className="text-sm font-semibold text-white">Caja España — EUR</h3>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Efectivo en caja', value: '€ 2,840', color: '#10B981' },
              { label: 'Tarjetas (débito)', value: '€ 8,120', color: '#3B82F6' },
              { label: 'Tarjetas (crédito)', value: '€ 5,480', color: '#7C3AED' },
              { label: 'Bizum / PayPal', value: '€ 3,640', color: '#F59E0B' },
              { label: 'Total del día', value: '€ 20,080', color: '#34D399' },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid #0f1a2e' }}>
                <span className="text-sm" style={{ color: '#94A3B8' }}>{item.label}</span>
                <span className="text-sm font-semibold" style={{ color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
