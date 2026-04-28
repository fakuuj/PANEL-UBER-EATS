import { useState, useEffect } from 'react';
import {
  Search, Plus, Check, X, Eye, Printer,
  RefreshCw
} from 'lucide-react';
import { liveOrders } from '../data/mockData';

// ---- Inline mini-modal for Orders ----
function NewOrderModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const steps = [
    { label: 'Datos del pedido', fields: [{ name: 'Mesa / Canal', placeholder: 'Mesa 4 / Uber Eats / WhatsApp' }, { name: 'Cliente', placeholder: 'Nombre del cliente' }] },
    { label: 'Productos', fields: [{ name: 'Platos', placeholder: 'Ej: Asado x2, Ensalada x1' }, { name: 'Observaciones', placeholder: 'Sin sal, sin gluten...' }] },
  ];
  const color = '#3B82F6';
  if (done) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
      <div className="card-premium p-8 w-full max-w-sm text-center animate-fade-up">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${color}20`, border: `1px solid ${color}50` }}>
          <Check size={28} style={{ color }} />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">¡Pedido creado!</h3>
        <p className="text-sm text-slate-400 mb-6">El pedido fue registrado y enviado a cocina.</p>
        <button onClick={onClose} className="btn-primary w-full justify-center">Cerrar</button>
      </div>
    </div>
  );
  const cur = steps[step];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
      <div className="card-premium p-6 w-full max-w-md animate-fade-up" style={{ border: `1px solid ${color}30` }}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${color}15` }}>🛒</div>
            <div><h3 className="text-base font-bold text-white">Nuevo Pedido</h3><p className="text-xs text-slate-400">Paso {step+1}/{steps.length} · {cur.label}</p></div>
          </div>
          <button onClick={onClose}><X size={16} style={{ color: '#64748B' }} /></button>
        </div>
        <div className="flex gap-1.5 mb-5">{steps.map((_,i)=><div key={i} className="h-1 flex-1 rounded-full" style={{ background: i<=step?color:'#1a2640' }} />)}</div>
        <div className="space-y-4 mb-6">{cur.fields.map(f=><div key={f.name}><label className="text-xs font-semibold text-slate-300 block mb-1.5">{f.name}</label><input placeholder={f.placeholder} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none text-white placeholder-slate-600" style={{ border:'1px solid #1a2640', background:'rgba(255,255,255,0.03)' }} /></div>)}</div>
        <div className="flex gap-2">
          {step>0&&<button onClick={()=>setStep(s=>s-1)} className="btn-secondary flex-1 justify-center">Atrás</button>}
          <button onClick={()=>step===steps.length-1?setDone(true):setStep(s=>s+1)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background:`linear-gradient(135deg,${color},${color}cc)` }}>{step===steps.length-1?'✓ Confirmar':'Siguiente →'}</button>
        </div>
      </div>
    </div>
  );
}

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  nuevo: { label: 'Nuevo', color: '#3B82F6', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)' },
  en_cocina: { label: 'En Cocina', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)' },
  listo: { label: 'Listo', color: '#10B981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)' },
  en_camino: { label: 'En Camino', color: '#06B6D4', bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.3)' },
  confirmado: { label: 'Confirmado', color: '#7C3AED', bg: 'rgba(124,58,237,0.12)', border: 'rgba(124,58,237,0.3)' },
  entregado: { label: 'Entregado', color: '#34D399', bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.3)' },
  cancelado: { label: 'Cancelado', color: '#F43F5E', bg: 'rgba(244,63,94,0.12)', border: 'rgba(244,63,94,0.3)' },
};

const typeConfig: Record<string, { label: string; icon: string; color: string }> = {
  interno: { label: 'Mesa', icon: '🍽️', color: '#2563EB' },
  uber_eats: { label: 'Uber Eats', icon: '🟢', color: '#06D6A0' },
  delivery: { label: 'Delivery', icon: '🛵', color: '#7C3AED' },
  whatsapp: { label: 'WhatsApp', icon: '💬', color: '#25D366' },
  takeaway: { label: 'Take Away', icon: '🥡', color: '#F59E0B' },
};

const allOrders = [
  ...liveOrders,
  { id: '#8815', client: 'Mesa 1', type: 'interno', status: 'entregado', time: '—', amount: 7800, items: ['Asado x2', 'Tabla Quesos', 'Vino Malbec'], branch: 'UY' },
  { id: '#8816', client: 'Jorge L.', type: 'delivery', status: 'entregado', time: '—', amount: 2100, items: ['Milanesa', 'Papas'], branch: 'ES' },
  { id: '#8817', client: 'Mesa 9', type: 'interno', status: 'entregado', time: '—', amount: 3400, items: ['Paella', 'Sangría'], branch: 'ES' },
  { id: '#8818', client: 'Lucía R.', type: 'whatsapp', status: 'confirmado', time: '12 min', amount: 1600, items: ['Empanadas x4'], branch: 'UY' },
  { id: '#8819', client: 'Felipe M.', type: 'takeaway', status: 'listo', time: '0 min', amount: 2900, items: ['Asado, Ensalada'], branch: 'UY' },
];

const nextStatus: Record<string, string> = {
  nuevo: 'en_cocina',
  confirmado: 'en_cocina',
  en_cocina: 'listo',
  listo: 'en_camino',
  en_camino: 'entregado',
};

interface OrdersProps {
  region?: 'consolidated' | 'uy' | 'es';
  setRegion?: (r: 'consolidated' | 'uy' | 'es') => void;
}

export default function Orders({ region = 'consolidated', setRegion }: OrdersProps) {
  const [orders, setOrders] = useState(allOrders);
  const [filter, setFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Map global region to internal regionFilter format
  const getInternalRegion = (r: string) => {
    if (r === 'uy') return 'UY';
    if (r === 'es') return 'ES';
    return 'all';
  };

  // Map internal regionFilter to global region format
  const getGlobalRegion = (rf: string) => {
    if (rf === 'UY') return 'uy';
    if (rf === 'ES') return 'es';
    return 'consolidated';
  };

  const [regionFilter, setRegionFilter] = useState<string>(getInternalRegion(region));

  // Sync local regionFilter when global region prop changes
  useEffect(() => {
    setRegionFilter(getInternalRegion(region));
  }, [region]);

  const handleRegionChange = (newRegion: string) => {
    setRegionFilter(newRegion);
    if (setRegion) {
      setRegion(getGlobalRegion(newRegion));
    }
  };
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = orders.filter(o => {
    const matchRegion = regionFilter === 'all' || o.branch === regionFilter;
    const matchStatus = filter === 'all' || o.status === filter;
    const matchType = typeFilter === 'all' || o.type === typeFilter;
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.client.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchStatus && matchType && matchSearch;
  });

  const advance = (id: string) => {
    setOrders(prev => prev.map(o =>
      o.id === id && nextStatus[o.status] ? { ...o, status: nextStatus[o.status] } : o
    ));
  };

  const counts = {
    all: orders.filter(o => regionFilter === 'all' || o.branch === regionFilter).length,
    nuevo: orders.filter(o => o.status === 'nuevo' && (regionFilter === 'all' || o.branch === regionFilter)).length,
    en_cocina: orders.filter(o => o.status === 'en_cocina' && (regionFilter === 'all' || o.branch === regionFilter)).length,
    listo: orders.filter(o => o.status === 'listo' && (regionFilter === 'all' || o.branch === regionFilter)).length,
    en_camino: orders.filter(o => o.status === 'en_camino' && (regionFilter === 'all' || o.branch === regionFilter)).length,
    entregado: orders.filter(o => o.status === 'entregado' && (regionFilter === 'all' || o.branch === regionFilter)).length,
  };

  const selectedOrder = orders.find(o => o.id === selected);

  return (
    <div className="p-6 animate-fade-up">
      {showModal && <NewOrderModal onClose={() => setShowModal(false)} />}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Gestión de Pedidos</h2>
          <p className="text-sm mt-0.5" style={{ color: '#475569' }}>Control centralizado de todos los canales · Tiempo real</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><RefreshCw size={13} /> Actualizar</button>
          <button className="btn-primary" onClick={() => setShowModal(true)}><Plus size={13} /> Nuevo Pedido</button>
        </div>
      </div>

      {/* Region Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'all', label: '🌎 Todos', color: '#94A3B8' },
          { id: 'ES', label: '🇪🇸 España', color: '#F59E0B' },
          { id: 'UY', label: '🇺🇾 Uruguay', color: '#3B82F6' },
        ].map((r) => (
          <button
            key={r.id}
            onClick={() => handleRegionChange(r.id)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: regionFilter === r.id ? `${r.color}15` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${regionFilter === r.id ? `${r.color}40` : '#1a2640'}`,
              color: regionFilter === r.id ? r.color : '#64748B',
            }}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        {Object.entries({
          all: { label: 'Todos', color: '#94A3B8' },
          nuevo: { label: 'Nuevos', color: '#3B82F6' },
          en_cocina: { label: 'Cocina', color: '#F59E0B' },
          listo: { label: 'Listos', color: '#10B981' },
          en_camino: { label: 'En Camino', color: '#06B6D4' },
          entregado: { label: 'Entregados', color: '#34D399' },
        }).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className="p-3 rounded-xl text-left transition-all"
            style={{
              background: filter === key ? `${val.color}15` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${filter === key ? `${val.color}40` : '#1a2640'}`,
            }}
          >
            <p className="text-lg font-bold" style={{ color: filter === key ? val.color : '#94A3B8' }}>
              {counts[key as keyof typeof counts]}
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#475569' }}>{val.label}</p>
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        {/* Orders List */}
        <div className="flex-1">
          {/* Filters */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1a2640' }}>
              <Search size={14} style={{ color: '#475569' }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar pedido, cliente..."
                className="bg-transparent text-sm outline-none flex-1"
                style={{ color: '#94A3B8', fontSize: '13px' }}
              />
            </div>
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1a2640', color: '#94A3B8' }}
            >
              <option value="all">Todos los canales</option>
              <option value="interno">Mesa</option>
              <option value="uber_eats">Uber Eats</option>
              <option value="delivery">Delivery</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="takeaway">Take Away</option>
            </select>
          </div>

          {/* Orders Table */}
          <div className="card-premium overflow-hidden">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #1a2640' }}>
                  {['Pedido', 'Cliente', 'Canal', 'Sucursal', 'Estado', 'Total', 'Acciones'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: '#475569', letterSpacing: '0.05em' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => {
                  const status = statusConfig[order.status] || statusConfig.nuevo;
                  const type = typeConfig[order.type] || typeConfig.interno;
                  const isSelected = selected === order.id;
                  return (
                    <tr
                      key={order.id}
                      className="table-row-hover cursor-pointer transition-colors"
                      style={{
                        borderBottom: '1px solid #0f1a2e',
                        background: isSelected ? 'rgba(37,99,235,0.06)' : 'transparent',
                      }}
                      onClick={() => setSelected(isSelected ? null : order.id)}
                    >
                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-white">{order.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-white">{order.client}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span>{type.icon}</span>
                          <span className="text-xs" style={{ color: '#94A3B8' }}>{type.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#64748B' }}>
                          {order.branch === 'UY' ? '🇺🇾 UY' : '🇪🇸 ES'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-xs px-2 py-1 rounded-full font-medium"
                          style={{ background: status.bg, color: status.color, border: `1px solid ${status.border}` }}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-white">${order.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {nextStatus[order.status] && (
                            <button
                              onClick={(e) => { e.stopPropagation(); advance(order.id); }}
                              className="p-1.5 rounded-lg transition-colors"
                              style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981' }}
                              title="Avanzar estado"
                            >
                              <Check size={13} />
                            </button>
                          )}
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelected(isSelected ? null : order.id); }}
                            className="p-1.5 rounded-lg transition-colors"
                            style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}
                          >
                            <Eye size={13} />
                          </button>
                          <button
                            className="p-1.5 rounded-lg transition-colors"
                            style={{ background: 'rgba(255,255,255,0.05)', color: '#64748B' }}
                          >
                            <Printer size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Detail Panel */}
        {selectedOrder && (
          <div className="w-72 flex-shrink-0 animate-slide-in">
            <div className="card-premium p-5 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">{selectedOrder.id}</h3>
                <button onClick={() => setSelected(null)}>
                  <X size={14} style={{ color: '#475569' }} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <p className="text-xs" style={{ color: '#475569' }}>Cliente</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{selectedOrder.client}</p>
                </div>

                <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <p className="text-xs mb-2" style={{ color: '#475569' }}>Productos</p>
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2563EB' }} />
                      <p className="text-xs text-white">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <p className="text-xs" style={{ color: '#475569' }}>Canal</p>
                    <p className="text-sm font-semibold text-white">{typeConfig[selectedOrder.type]?.label}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <p className="text-xs" style={{ color: '#475569' }}>Sucursal</p>
                    <p className="text-sm font-semibold text-white">{selectedOrder.branch === 'UY' ? '🇺🇾 Uruguay' : '🇪🇸 España'}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex justify-between">
                    <p className="text-xs" style={{ color: '#475569' }}>Total</p>
                    <p className="text-lg font-bold text-white">${selectedOrder.amount.toLocaleString()}</p>
                  </div>
                </div>

                {/* Status progression */}
                <div>
                  <p className="text-xs mb-2" style={{ color: '#475569' }}>Estado del pedido</p>
                  <div className="space-y-1.5">
                    {['nuevo', 'en_cocina', 'listo', 'en_camino', 'entregado'].map((s) => {
                      const statuses = ['nuevo', 'confirmado', 'en_cocina', 'listo', 'en_camino', 'entregado'];
                      const currentIdx = statuses.indexOf(selectedOrder.status);
                      const thisIdx = statuses.indexOf(s);
                      const isDone = thisIdx <= currentIdx;
                      const isCurrent = s === selectedOrder.status;
                      return (
                        <div key={s} className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              background: isDone ? (isCurrent ? statusConfig[s]?.color || '#3B82F6' : 'rgba(16,185,129,0.3)') : '#1a2640',
                            }}
                          >
                            {isDone && !isCurrent && <Check size={8} style={{ color: '#10B981' }} />}
                          </div>
                          <span className="text-xs" style={{ color: isCurrent ? 'white' : isDone ? '#94A3B8' : '#475569' }}>
                            {statusConfig[s]?.label || s}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {nextStatus[selectedOrder.status] && (
                  <button
                    onClick={() => advance(selectedOrder.id)}
                    className="btn-primary w-full justify-center"
                  >
                    <Check size={13} />
                    Avanzar a {statusConfig[nextStatus[selectedOrder.status]]?.label}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
