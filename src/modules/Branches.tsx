import { TrendingUp, Users, ShoppingBag, Star, DollarSign, Activity, Plus, Globe } from 'lucide-react';
import { branchMetrics, revenueData } from '../data/mockData';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#0D1629', border: '1px solid #1a2640', borderRadius: '10px', padding: '10px 14px' }}>
        <p style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '4px' }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
            <span style={{ color: '#E2E8F0', fontSize: '12px', fontWeight: 600 }}>${p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Branches() {
  const branches = [
    {
      ...branchMetrics.UY,
      id: 'UY',
      address: 'Av. 18 de Julio 1234, Montevideo',
      phone: '+598 99 XXX XXX',
      manager: 'Martín Rodríguez',
      employees: 14,
      tables: 28,
      openSince: 'Marzo 2021',
      color: '#3B82F6',
      dataKey: 'uy',
    },
    {
      ...branchMetrics.ES,
      id: 'ES',
      address: 'Calle Serrano 42, Madrid',
      phone: '+34 91 XXX XXXX',
      manager: 'Carmen López',
      employees: 10,
      tables: 22,
      openSince: 'Enero 2024',
      color: '#7C3AED',
      dataKey: 'es',
    },
  ];

  const upcoming = [
    { name: 'Barcelona', flag: '🇪🇸', status: 'Planificada', eta: 'Q3 2025', color: '#06B6D4' },
    { name: 'Buenos Aires', flag: '🇦🇷', status: 'En evaluación', eta: 'Q1 2026', color: '#F59E0B' },
    { name: 'Ciudad de México', flag: '🇲🇽', status: 'En estudio', eta: 'Q2 2026', color: '#10B981' },
  ];

  return (
    <div className="p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Panel Multi Sucursal</h2>
          <p className="text-sm mt-0.5" style={{ color: '#475569' }}>Gestión centralizada de todas las operaciones</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1a2640', color: '#64748B' }}>
            <Globe size={12} />
            <span>2 sucursales activas</span>
          </div>
          <button className="btn-primary"><Plus size={13} /> Nueva Sucursal</button>
        </div>
      </div>

      {/* Branch Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {branches.map(branch => (
          <div key={branch.id} className="card-premium p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${branch.color}, transparent)` }} />
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-5" style={{ background: branch.color, transform: 'translate(30%, -30%)' }} />

            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{branch.flag}</span>
                <div>
                  <h3 className="text-base font-bold text-white">{branch.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{branch.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: '#10B981' }} />
                <span className="text-xs font-semibold" style={{ color: '#34D399' }}>Operativa</span>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Ingresos hoy', value: `${branch.currency} ${branch.revenue.toLocaleString()}`, icon: DollarSign, color: '#10B981' },
                { label: 'Pedidos hoy', value: branch.orders.toString(), icon: ShoppingBag, color: '#3B82F6' },
                { label: 'Ticket prom.', value: `${branch.currency} ${branch.avgTicket.toLocaleString()}`, icon: TrendingUp, color: '#F59E0B' },
                { label: 'Empleados', value: branch.employees.toString(), icon: Users, color: '#7C3AED' },
                { label: 'Mesas', value: branch.tables.toString(), icon: Activity, color: '#06B6D4' },
                { label: 'Rating', value: `${branch.satisfaction} ★`, icon: Star, color: '#F59E0B' },
              ].map(kpi => {
                const Icon = kpi.icon;
                return (
                  <div key={kpi.label} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1a2640' }}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Icon size={11} style={{ color: kpi.color }} />
                      <span className="text-xs" style={{ color: '#475569', fontSize: '10px' }}>{kpi.label}</span>
                    </div>
                    <p className="text-sm font-bold text-white">{kpi.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Manager */}
            <div className="flex items-center justify-between mb-4 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1a2640' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white" style={{ background: `${branch.color}30`, border: `1px solid ${branch.color}50` }}>
                  {branch.manager.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{branch.manager}</p>
                  <p className="text-xs" style={{ color: '#475569' }}>Manager General</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs" style={{ color: '#475569' }}>Desde</p>
                <p className="text-xs font-semibold text-white">{branch.openSince}</p>
              </div>
            </div>

            {/* Capacity */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span style={{ color: '#475569' }}>Ocupación actual</span>
                <span style={{ color: branch.color, fontWeight: 600 }}>{branch.capacity}%</span>
              </div>
              <div className="h-2 rounded-full" style={{ background: '#1a2640' }}>
                <div className="h-2 rounded-full transition-all duration-1000" style={{ width: `${branch.capacity}%`, background: `linear-gradient(90deg, ${branch.color}, ${branch.color}80)` }} />
              </div>
            </div>

            {/* Mini Chart */}
            <div className="mt-4">
              <p className="text-xs mb-2" style={{ color: '#475569' }}>Ingresos últimos 12 meses</p>
              <ResponsiveContainer width="100%" height={80}>
                <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`grad${branch.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={branch.color} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={branch.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey={branch.dataKey} stroke={branch.color} strokeWidth={1.5} fill={`url(#grad${branch.id})`} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Growth Badge */}
            <div className="absolute bottom-5 right-5">
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}>
                <TrendingUp size={12} style={{ color: '#10B981' }} />
                <span className="text-xs font-bold" style={{ color: '#34D399' }}>+{branch.growth}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Branches */}
      <div className="card-premium p-5">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={16} style={{ color: '#3B82F6' }} />
          <h3 className="text-sm font-semibold text-white">Expansión Futura</h3>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(124,58,237,0.15)', color: '#A78BFA' }}>Roadmap 2025–2026</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {upcoming.map(ub => (
            <div key={ub.name} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1a2640' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{ub.flag}</span>
                  <h4 className="text-sm font-semibold text-white">{ub.name}</h4>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${ub.color}20`, color: ub.color }}>{ub.status}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: '#475569' }}>ETA apertura</span>
                <span className="text-xs font-bold text-white">{ub.eta}</span>
              </div>
              <div className="mt-3 h-1 rounded-full" style={{ background: '#1a2640' }}>
                <div className="h-1 rounded-full" style={{ width: ub.status === 'Planificada' ? '60%' : ub.status === 'En evaluación' ? '35%' : '15%', background: ub.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mt-6 card-premium p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Comparativa de Rendimiento</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #1a2640' }}>
                {['Métrica', '🇺🇾 Uruguay', '🇪🇸 España', 'Diferencia', 'Líder'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: '#475569' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'Ingresos diarios', uy: '$102,400', es: '€86,200', diff: '+$16,200', leader: 'UY' },
                { metric: 'Pedidos/día', uy: '284', es: '198', diff: '+86', leader: 'UY' },
                { metric: 'Ticket promedio', uy: '$3,606', es: '€4,353', diff: 'ES mayor', leader: 'ES' },
                { metric: 'Satisfacción', uy: '4.8 ★', es: '4.9 ★', diff: '+0.1', leader: 'ES' },
                { metric: 'Crecimiento', uy: '+12.4%', es: '+24.8%', diff: '+12.4%', leader: 'ES' },
                { metric: 'Ocupación', uy: '78%', es: '85%', diff: '+7%', leader: 'ES' },
              ].map(row => (
                <tr key={row.metric} className="table-row-hover" style={{ borderBottom: '1px solid #0f1a2e' }}>
                  <td className="px-4 py-3 text-sm" style={{ color: '#94A3B8' }}>{row.metric}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-white">{row.uy}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-white">{row.es}</td>
                  <td className="px-4 py-3 text-sm font-medium" style={{ color: '#60A5FA' }}>{row.diff}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{
                      background: row.leader === 'UY' ? 'rgba(59,130,246,0.15)' : 'rgba(124,58,237,0.15)',
                      color: row.leader === 'UY' ? '#60A5FA' : '#A78BFA',
                    }}>
                      {row.leader === 'UY' ? '🇺🇾 Uruguay' : '🇪🇸 España'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
