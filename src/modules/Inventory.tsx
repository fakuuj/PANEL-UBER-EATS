import { useState, useEffect } from 'react';
import { Search, AlertTriangle, TrendingDown, Package, Truck, RefreshCw, Check, X } from 'lucide-react';
import { inventoryItems } from '../data/mockData';

function OrderInventoryModal({ onClose, prefilled }: { onClose: () => void; prefilled?: string }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const steps = [
    { label: 'Insumo a pedir', fields: [{ name: 'Producto', placeholder: prefilled || 'Ej: Harina 000' }, { name: 'Cantidad', placeholder: 'Ej: 50 kg' }] },
    { label: 'Proveedor y entrega', fields: [{ name: 'Proveedor', placeholder: 'Ej: Distribuidora Norte' }, { name: 'Fecha estimada', placeholder: 'Ej: 27/04/2025' }] },
  ];
  const color = '#F59E0B';
  if (done) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
      <div className="card-premium p-8 w-full max-w-sm text-center animate-fade-up">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${color}20`, border: `1px solid ${color}50` }}><Check size={28} style={{ color }} /></div>
        <h3 className="text-lg font-bold text-white mb-2">¡Orden enviada!</h3>
        <p className="text-sm text-slate-400 mb-6">La orden de compra fue registrada y enviada al proveedor.</p>
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
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${color}15` }}>📦</div>
            <div><h3 className="text-base font-bold text-white">Pedir Inventario</h3><p className="text-xs text-slate-400">Paso {step+1}/{steps.length} · {cur.label}</p></div>
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

interface InventoryProps {
  region?: 'consolidated' | 'uy' | 'es';
  setRegion?: (r: 'consolidated' | 'uy' | 'es') => void;
}

export default function Inventory({ region = 'consolidated', setRegion }: InventoryProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [prefilledItem, setPrefilledItem] = useState<string | undefined>();

  // Region mapping helpers
  const getInternalRegion = (r: string) => {
    if (r === 'uy') return 'UY';
    if (r === 'es') return 'ES';
    return 'all';
  };
  const getGlobalRegion = (rf: string): 'consolidated' | 'uy' | 'es' => {
    if (rf === 'UY') return 'uy';
    if (rf === 'ES') return 'es';
    return 'consolidated';
  };

  const [regionFilter, setRegionFilter] = useState<string>(getInternalRegion(region));

  useEffect(() => {
    setRegionFilter(getInternalRegion(region));
  }, [region]);

  const handleRegionChange = (newRegion: string) => {
    setRegionFilter(newRegion);
    if (setRegion) {
      setRegion(getGlobalRegion(newRegion));
    }
  };

  const openOrder = (itemName?: string) => {
    setPrefilledItem(itemName);
    setShowModal(true);
  };

  const branchItems = inventoryItems.filter(item => regionFilter === 'all' || item.branch === regionFilter);

  const filtered = branchItems.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || item.status === filter;
    return matchSearch && matchFilter;
  });

  const criticalCount = branchItems.filter(i => i.status === 'low').length;
  const warningCount = branchItems.filter(i => i.status === 'warning').length;

  return (
    <div className="p-6 animate-fade-up">
      {showModal && <OrderInventoryModal onClose={() => setShowModal(false)} prefilled={prefilledItem} />}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Inventario Inteligente</h2>
          <p className="text-sm mt-0.5" style={{ color: '#475569' }}>Control de stock en tiempo real · Alertas automáticas</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><RefreshCw size={13} /> Actualizar</button>
          <button className="btn-primary" onClick={() => openOrder()}><Package size={13} /> Pedir Inventario</button>
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

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card-premium p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #2563EB, transparent)' }} />
          <p className="text-xs mb-1" style={{ color: '#475569' }}>Total Insumos</p>
          <p className="text-2xl font-bold text-white">{branchItems.length}</p>
          <p className="text-xs mt-1" style={{ color: '#64748B' }}>productos registrados</p>
        </div>
        <div className="card-premium p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #F43F5E, transparent)' }} />
          <p className="text-xs mb-1" style={{ color: '#475569' }}>Stock Crítico</p>
          <p className="text-2xl font-bold" style={{ color: '#FB7185' }}>{criticalCount}</p>
          <p className="text-xs mt-1" style={{ color: '#64748B' }}>requieren reposición</p>
        </div>
        <div className="card-premium p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #F59E0B, transparent)' }} />
          <p className="text-xs mb-1" style={{ color: '#475569' }}>Bajo Stock</p>
          <p className="text-2xl font-bold" style={{ color: '#FCD34D' }}>{warningCount}</p>
          <p className="text-xs mt-1" style={{ color: '#64748B' }}>monitorear hoy</p>
        </div>
        <div className="card-premium p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #10B981, transparent)' }} />
          <p className="text-xs mb-1" style={{ color: '#475569' }}>Valor en Stock</p>
          <p className="text-2xl font-bold text-white">$284k</p>
          <p className="text-xs mt-1" style={{ color: '#64748B' }}>inventario total</p>
        </div>
      </div>

      {/* Alerts */}
      {criticalCount > 0 && (
        <div className="mb-6 p-4 rounded-xl" style={{ background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.2)' }}>
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle size={16} style={{ color: '#F43F5E' }} />
            <span className="text-sm font-semibold text-white">Alertas de Stock Crítico</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {branchItems.filter(i => i.status === 'low').map(item => (
              <div key={item.name} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.15)' }}>
                <div>
                  <p className="text-xs font-semibold text-white">{item.name}</p>
                  <p className="text-xs" style={{ color: '#FB7185' }}>{item.stock} {item.unit} — mín. {item.min} {item.unit}</p>
                </div>
                <button
                  onClick={() => openOrder(item.name)}
                  className="text-xs px-2 py-1 rounded-lg font-semibold transition-all hover:scale-105"
                  style={{ background: 'rgba(244,63,94,0.2)', color: '#FB7185', border: '1px solid rgba(244,63,94,0.3)' }}
                >
                  Pedir
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1a2640' }}>
          <Search size={14} style={{ color: '#475569' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar insumo..."
            className="bg-transparent text-sm outline-none flex-1"
            style={{ color: '#94A3B8', fontSize: '13px' }}
          />
        </div>
        {['all', 'ok', 'warning', 'low'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
            style={{
              background: filter === f ? 'rgba(37,99,235,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${filter === f ? 'rgba(37,99,235,0.35)' : '#1a2640'}`,
              color: filter === f ? '#60A5FA' : '#64748B',
            }}
          >
            {{ all: 'Todos', ok: 'Normal', warning: 'Advertencia', low: 'Crítico' }[f]}
          </button>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="card-premium overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid #1a2640' }}>
              {['Insumo', 'Stock Actual', 'Mínimo', 'Máximo', 'Estado', 'Proveedor', 'Costo Unit.', 'Acciones'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: '#475569', letterSpacing: '0.05em' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const pct = Math.min(100, (item.stock / item.max) * 100);
              const statusColor = item.status === 'ok' ? '#10B981' : item.status === 'warning' ? '#F59E0B' : '#F43F5E';
              const statusLabel = item.status === 'ok' ? 'Normal' : item.status === 'warning' ? 'Advertencia' : 'Crítico';
              const statusBg = item.status === 'ok' ? 'rgba(16,185,129,0.12)' : item.status === 'warning' ? 'rgba(245,158,11,0.12)' : 'rgba(244,63,94,0.12)';

              return (
                <tr key={item.name} className="table-row-hover" style={{ borderBottom: '1px solid #0f1a2e' }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <Package size={14} style={{ color: '#64748B' }} />
                      </div>
                      <span className="text-sm font-medium text-white">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <span className="text-sm font-semibold text-white">{item.stock} {item.unit}</span>
                      <div className="mt-1 h-1 rounded-full w-20" style={{ background: '#1a2640' }}>
                        <div className="h-1 rounded-full" style={{ width: `${pct}%`, background: statusColor }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm" style={{ color: '#64748B' }}>{item.min} {item.unit}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm" style={{ color: '#64748B' }}>{item.max} {item.unit}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: statusBg, color: statusColor }}>
                      {statusLabel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Truck size={12} style={{ color: '#475569' }} />
                      <span className="text-xs" style={{ color: '#94A3B8' }}>{item.supplier}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-white">${item.cost}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="px-2 py-1 rounded-lg text-xs" style={{ background: 'rgba(37,99,235,0.12)', color: '#60A5FA' }}>Editar</button>
                      {item.status !== 'ok' && (
                        <button className="px-2 py-1 rounded-lg text-xs" style={{ background: 'rgba(16,185,129,0.12)', color: '#34D399' }}>Pedir</button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Suggested Purchases */}
      <div className="mt-6 card-premium p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown size={16} style={{ color: '#F59E0B' }} />
          <h3 className="text-sm font-semibold text-white">Compras Sugeridas por IA</h3>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(124,58,237,0.15)', color: '#A78BFA' }}>AI</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branchItems.filter(i => i.status !== 'ok').map(item => {
            const needed = item.max - item.stock;
            return (
              <div key={item.name} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1a2640' }}>
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(124,58,237,0.15)', color: '#A78BFA', fontSize: '10px' }}>Sugerido</span>
                </div>
                <p className="text-xs mb-3" style={{ color: '#64748B' }}>Proveedor: {item.supplier}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs" style={{ color: '#475569' }}>Cantidad a pedir</p>
                    <p className="text-base font-bold text-white">{Math.ceil(needed)} {item.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: '#475569' }}>Costo estimado</p>
                    <p className="text-base font-bold" style={{ color: '#F59E0B' }}>${(needed * item.cost).toLocaleString()}</p>
                  </div>
                </div>
                <button className="btn-primary w-full justify-center mt-3" style={{ padding: '6px' }}>Generar Orden de Compra</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
