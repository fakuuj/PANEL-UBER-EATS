import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { Zap, Target } from 'lucide-react';

const radarData = [
  { subject: 'Ventas', UY: 88, ES: 92 },
  { subject: 'Delivery', UY: 76, ES: 68 },
  { subject: 'Satisfacción', UY: 92, ES: 96 },
  { subject: 'Eficiencia', UY: 84, ES: 79 },
  { subject: 'Crecimiento', UY: 72, ES: 94 },
  { subject: 'Retención', UY: 88, ES: 82 },
];

const conversionData = [
  { step: 'Visita', uy: 1000, es: 800 },
  { step: 'Interés', uy: 780, es: 640 },
  { step: 'Pedido', uy: 520, es: 440 },
  { step: 'Completado', uy: 490, es: 420 },
  { step: 'Recurrente', uy: 284, es: 198 },
];

const productMix = [
  { name: 'Asado', uy: 28, es: 12 },
  { name: 'Empanadas', uy: 24, es: 8 },
  { name: 'Paella', uy: 6, es: 32 },
  { name: 'Milanesa', uy: 18, es: 14 },
  { name: 'Quesos', uy: 12, es: 16 },
  { name: 'Provoleta', uy: 16, es: 10 },
];

const scatterData = [
  { x: 48, y: 186400, z: 200, name: 'Roberto P.' },
  { x: 36, y: 142800, z: 180, name: 'María S.' },
  { x: 28, y: 98200, z: 150, name: 'Juan M.' },
  { x: 21, y: 76500, z: 120, name: 'Ana D.' },
  { x: 15, y: 54200, z: 100, name: 'Carlos I.' },
  { x: 12, y: 38900, z: 90, name: 'Laura V.' },
  { x: 8, y: 22100, z: 70, name: 'Miguel T.' },
  { x: 6, y: 17400, z: 60, name: 'Patricia L.' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#0D1629', border: '1px solid #1a2640', borderRadius: '10px', padding: '10px 14px' }}>
        <p style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '4px' }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} style={{ color: p.color, fontSize: '12px', fontWeight: 600 }}>{p.name}: {p.value}</div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  return (
    <div className="p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">Analytics Avanzado</h2>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(124,58,237,0.2)', color: '#A78BFA', border: '1px solid rgba(124,58,237,0.3)' }}>AI Powered</span>
          </div>
          <p className="text-sm mt-0.5" style={{ color: '#475569' }}>Inteligencia de negocio · Predictive analytics</p>
        </div>
        <button className="btn-primary"><Zap size={13} /> Generar Reporte IA</button>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          {
            icon: '🎯',
            title: 'Predicción próximos 7 días',
            value: '+18.4%',
            desc: 'Crecimiento esperado en ventas consolidadas',
            color: '#10B981',
            confidence: 94,
          },
          {
            icon: '⚡',
            title: 'Hora pico detectada',
            value: '13:00–14:00',
            desc: 'Mayor concentración de pedidos. Reforzar equipo.',
            color: '#F59E0B',
            confidence: 98,
          },
          {
            icon: '🔮',
            title: 'Producto a potenciar',
            value: 'Paella Valencia',
            desc: 'Tendencia +24% — mayor margen en España',
            color: '#7C3AED',
            confidence: 87,
          },
        ].map(insight => (
          <div key={insight.title} className="card-premium p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${insight.color}, transparent)` }} />
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">{insight.icon}</span>
              <div>
                <p className="text-xs" style={{ color: '#475569' }}>{insight.title}</p>
                <p className="text-xl font-bold text-white mt-0.5">{insight.value}</p>
              </div>
            </div>
            <p className="text-xs mb-3" style={{ color: '#64748B' }}>{insight.desc}</p>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: '#475569' }}>Confianza del modelo</span>
                <span style={{ color: insight.color, fontWeight: 600 }}>{insight.confidence}%</span>
              </div>
              <div className="h-1 rounded-full" style={{ background: '#1a2640' }}>
                <div className="h-1 rounded-full" style={{ width: `${insight.confidence}%`, background: insight.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Radar */}
        <div className="card-premium p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Análisis Comparativo de Sucursales</h3>
          <p className="text-xs mb-4" style={{ color: '#475569' }}>Índice de rendimiento multidimensional</p>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: '#3B82F6' }} />
              <span className="text-xs" style={{ color: '#64748B' }}>Uruguay</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: '#7C3AED' }} />
              <span className="text-xs" style={{ color: '#64748B' }}>España</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1a2640" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#475569', fontSize: 9 }} />
              <Radar name="Uruguay" dataKey="UY" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="España" dataKey="ES" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.15} strokeWidth={2} />
              <Tooltip contentStyle={{ background: '#0D1629', border: '1px solid #1a2640', borderRadius: 8, fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Funnel */}
        <div className="card-premium p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Embudo de Conversión</h3>
          <p className="text-xs mb-4" style={{ color: '#475569' }}>De visitante a cliente recurrente</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={conversionData} layout="vertical" margin={{ top: 0, right: 0, left: 50, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2640" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="step" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="uy" name="Uruguay" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              <Bar dataKey="es" name="España" fill="#7C3AED" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Product Mix */}
        <div className="card-premium p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Mix de Productos por Sucursal</h3>
          <p className="text-xs mb-4" style={{ color: '#475569' }}>Ventas semanales por categoría</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={productMix} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2640" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="uy" name="Uruguay" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="es" name="España" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Value Scatter */}
        <div className="card-premium p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Mapa de Valor — Clientes</h3>
          <p className="text-xs mb-4" style={{ color: '#475569' }}>Frecuencia vs Lifetime Value · Tamaño = potencial</p>
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2640" />
              <XAxis dataKey="x" name="Pedidos" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'Pedidos', position: 'insideBottom', offset: -2, fill: '#475569', fontSize: 10 }} />
              <YAxis dataKey="y" name="LTV" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <ZAxis dataKey="z" range={[40, 200]} />
              <Tooltip
                cursor={{ stroke: '#1a2640' }}
                content={({ active, payload }: any) => {
                  if (active && payload && payload.length) {
                    return (
                      <div style={{ background: '#0D1629', border: '1px solid #1a2640', borderRadius: 8, padding: '8px 12px' }}>
                        <p style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>{payload[0]?.payload?.name}</p>
                        <p style={{ color: '#94A3B8', fontSize: 11 }}>Pedidos: {payload[0]?.value}</p>
                        <p style={{ color: '#60A5FA', fontSize: 11 }}>LTV: ${payload[1]?.value?.toLocaleString()}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="Clientes" data={scatterData} fill="#3B82F6" fillOpacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KPI Goals */}
      <div className="mt-4 card-premium p-5">
        <div className="flex items-center gap-2 mb-4">
          <Target size={16} style={{ color: '#3B82F6' }} />
          <h3 className="text-sm font-semibold text-white">Objetivos del Mes</h3>
          <span className="text-xs" style={{ color: '#475569' }}>Julio 2025</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Revenue Total', current: 188600, target: 200000, color: '#3B82F6' },
            { label: 'Pedidos totales', current: 8821, target: 10000, color: '#7C3AED' },
            { label: 'Clientes nuevos', current: 184, target: 220, color: '#10B981' },
            { label: 'Rating UE', current: 4.85, target: 5.0, color: '#F59E0B' },
          ].map(goal => {
            const pct = Math.min(100, (goal.current / goal.target) * 100);
            return (
              <div key={goal.label} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1a2640' }}>
                <p className="text-xs mb-1" style={{ color: '#475569' }}>{goal.label}</p>
                <p className="text-lg font-bold text-white">{typeof goal.current === 'number' && goal.current > 1000 ? `${(goal.current/1000).toFixed(0)}k` : goal.current}</p>
                <p className="text-xs mb-2" style={{ color: '#475569' }}>/ {typeof goal.target === 'number' && goal.target > 1000 ? `${(goal.target/1000).toFixed(0)}k` : goal.target}</p>
                <div className="h-1.5 rounded-full mb-1" style={{ background: '#1a2640' }}>
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, background: goal.color }} />
                </div>
                <p className="text-xs font-semibold" style={{ color: goal.color }}>{pct.toFixed(0)}% completado</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
