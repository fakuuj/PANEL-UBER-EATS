import { useState, useEffect } from 'react';
import { Search, Star, Crown, Gift, TrendingUp, Users, Mail, Phone, Check, X } from 'lucide-react';
import { customers } from '../data/mockData';

function CampaignModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const steps = [
    { label: 'Configurar campaña', fields: [{ name: 'Asunto', placeholder: '¡Oferta especial este fin de semana!' }, { name: 'Segmento', placeholder: 'VIP, Gold, Todos...' }] },
    { label: 'Contenido', fields: [{ name: 'Mensaje', placeholder: 'Escribí el mensaje principal...' }, { name: 'CTA', placeholder: 'Reservar ahora / Ver menú' }] },
  ];
  const color = '#7C3AED';
  if (done) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
      <div className="card-premium p-8 w-full max-w-sm text-center animate-fade-up">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${color}20`, border: `1px solid ${color}50` }}><Check size={28} style={{ color }} /></div>
        <h3 className="text-lg font-bold text-white mb-2">¡Campaña enviada!</h3>
        <p className="text-sm text-slate-400 mb-6">Tu campaña de email fue programada y se enviará al segmento seleccionado.</p>
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
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${color}15` }}>📧</div>
            <div><h3 className="text-base font-bold text-white">Campaña Email</h3><p className="text-xs text-slate-400">Paso {step+1}/{steps.length} · {cur.label}</p></div>
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

const tierConfig: Record<string, { color: string; bg: string; icon: string; border: string }> = {
  VIP: { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', icon: '👑', border: 'rgba(245,158,11,0.3)' },
  Gold: { color: '#FCD34D', bg: 'rgba(252,211,77,0.1)', icon: '⭐', border: 'rgba(252,211,77,0.25)' },
  Silver: { color: '#94A3B8', bg: 'rgba(148,163,184,0.1)', icon: '🥈', border: 'rgba(148,163,184,0.2)' },
  Bronze: { color: '#D97706', bg: 'rgba(217,119,6,0.1)', icon: '🥉', border: 'rgba(217,119,6,0.2)' },
};

interface CRMProps {
  region?: 'consolidated' | 'uy' | 'es';
  setRegion?: (r: 'consolidated' | 'uy' | 'es') => void;
}

export default function CRM({ region = 'consolidated', setRegion }: CRMProps) {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  const branchCustomers = customers.filter(c => regionFilter === 'all' || c.branch === regionFilter);

  const filtered = branchCustomers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchTier = tierFilter === 'all' || c.tier === tierFilter;
    return matchSearch && matchTier;
  });

  const selectedCustomer = customers.find(c => c.id === selected);

  return (
    <div className="p-6 animate-fade-up">
      {showModal && <CampaignModal onClose={() => setShowModal(false)} />}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">CRM de Clientes</h2>
          <p className="text-sm mt-0.5" style={{ color: '#475569' }}>Fidelización, historial y gestión de clientes</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><Gift size={13} /> Nueva Promo</button>
          <button className="btn-primary" onClick={() => setShowModal(true)}><Mail size={13} /> Campaña Email</button>
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

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Clientes Totales', value: '3,841', icon: Users, color: '#3B82F6', sub: '+184 este mes' },
          { label: 'Clientes VIP', value: '48', icon: Crown, color: '#F59E0B', sub: 'nivel más alto' },
          { label: 'Recurrencia', value: '68%', icon: TrendingUp, color: '#10B981', sub: 'retención mensual' },
          { label: 'LTV Promedio', value: '$84,200', icon: Star, color: '#7C3AED', sub: 'valor por cliente' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card-premium p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${s.color}20` }}>
                <Icon size={16} style={{ color: s.color }} />
              </div>
              <p className="text-xs mb-1" style={{ color: '#475569' }}>{s.label}</p>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs mt-1" style={{ color: '#64748B' }}>{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Loyalty Tiers */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {Object.entries(tierConfig).map(([tier, config]) => {
          const count = branchCustomers.filter(c => c.tier === tier).length;
          return (
            <div key={tier} className="card-premium p-4 text-center" style={{ border: `1px solid ${config.border}` }}>
              <span className="text-2xl block mb-2">{config.icon}</span>
              <p className="text-lg font-bold text-white">{count}</p>
              <p className="text-sm font-semibold" style={{ color: config.color }}>{tier}</p>
              <p className="text-xs mt-1" style={{ color: '#475569' }}>clientes</p>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4">
        {/* Customer List */}
        <div className="flex-1">
          {/* Filters */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1a2640' }}>
              <Search size={14} style={{ color: '#475569' }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar cliente..."
                className="bg-transparent text-sm outline-none flex-1"
                style={{ color: '#94A3B8', fontSize: '13px' }}
              />
            </div>
            {['all', 'VIP', 'Gold', 'Silver', 'Bronze'].map(t => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                className="px-3 py-2 rounded-lg text-xs font-medium"
                style={{
                  background: tierFilter === t ? 'rgba(37,99,235,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${tierFilter === t ? 'rgba(37,99,235,0.35)' : '#1a2640'}`,
                  color: tierFilter === t ? '#60A5FA' : '#64748B',
                }}
              >
                {t === 'all' ? 'Todos' : t}
              </button>
            ))}
          </div>

          <div className="card-premium overflow-hidden">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #1a2640' }}>
                  {['Cliente', 'Tier', 'Sucursal', 'Pedidos', 'Lifetime Value', 'Satisfacción', 'Último Pedido'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: '#475569', letterSpacing: '0.05em' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(customer => {
                  const tier = tierConfig[customer.tier];
                  const isSelected = selected === customer.id;
                  return (
                    <tr
                      key={customer.id}
                      className="table-row-hover cursor-pointer"
                      style={{ borderBottom: '1px solid #0f1a2e', background: isSelected ? 'rgba(37,99,235,0.06)' : 'transparent' }}
                      onClick={() => setSelected(isSelected ? null : customer.id)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1D4ED8, #7C3AED)' }}>
                            {customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{customer.name}</p>
                            <p className="text-xs" style={{ color: '#475569' }}>{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ background: tier.bg, color: tier.color, border: `1px solid ${tier.border}` }}>
                          {tier.icon} {customer.tier}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm">{customer.branch === 'UY' ? '🇺🇾 Uruguay' : '🇪🇸 España'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-white">{customer.orders}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-bold" style={{ color: '#60A5FA' }}>${customer.lifetime.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Star size={12} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                          <span className="text-sm font-semibold text-white">{customer.satisfaction}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs" style={{ color: '#94A3B8' }}>{customer.lastOrder}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Detail Panel */}
        {selectedCustomer && (
          <div className="w-64 flex-shrink-0 animate-slide-in">
            <div className="card-premium p-5 sticky top-4">
              <div className="text-center mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white mx-auto mb-3" style={{ background: 'linear-gradient(135deg, #1D4ED8, #7C3AED)' }}>
                  {selectedCustomer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <h3 className="text-sm font-bold text-white">{selectedCustomer.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: tierConfig[selectedCustomer.tier]?.bg, color: tierConfig[selectedCustomer.tier]?.color }}>
                  {tierConfig[selectedCustomer.tier]?.icon} {selectedCustomer.tier}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <Mail size={13} style={{ color: '#475569' }} />
                  <span className="text-xs" style={{ color: '#94A3B8' }}>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <Phone size={13} style={{ color: '#475569' }} />
                  <span className="text-xs" style={{ color: '#94A3B8' }}>+598 99 123 456</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <p className="text-lg font-bold text-white">{selectedCustomer.orders}</p>
                    <p className="text-xs" style={{ color: '#475569' }}>pedidos</p>
                  </div>
                  <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-center justify-center gap-1">
                      <Star size={12} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                      <p className="text-lg font-bold text-white">{selectedCustomer.satisfaction}</p>
                    </div>
                    <p className="text-xs" style={{ color: '#475569' }}>rating</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <p className="text-xs mb-1" style={{ color: '#475569' }}>Lifetime Value</p>
                  <p className="text-xl font-bold" style={{ color: '#60A5FA' }}>${selectedCustomer.lifetime.toLocaleString()}</p>
                </div>

                <div className="space-y-1">
                  <button className="btn-primary w-full justify-center" style={{ padding: '8px' }}>
                    <Gift size={13} /> Enviar Promoción
                  </button>
                  <button className="btn-secondary w-full justify-center" style={{ padding: '8px' }}>
                    <Mail size={13} /> Contactar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
