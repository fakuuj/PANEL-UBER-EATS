import { useState, useEffect } from 'react';
import { Search, Plus, TrendingUp, Clock, Users, Award, Check, X } from 'lucide-react';
import { employees } from '../data/mockData';

function NewEmployeeModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const steps = [
    { label: 'Datos personales', fields: [{ name: 'Nombre completo', placeholder: 'Ej: María González' }, { name: 'Email', placeholder: 'empleado@gastroos.com' }] },
    { label: 'Rol y sucursal', fields: [{ name: 'Cargo', placeholder: 'Chef, Mozo, Delivery...' }, { name: 'Sucursal', placeholder: 'Uruguay / España' }] },
  ];
  const color = '#10B981';
  if (done) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
      <div className="card-premium p-8 w-full max-w-sm text-center animate-fade-up">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${color}20`, border: `1px solid ${color}50` }}><Check size={28} style={{ color }} /></div>
        <h3 className="text-lg font-bold text-white mb-2">¡Empleado registrado!</h3>
        <p className="text-sm text-slate-400 mb-6">El nuevo empleado fue agregado al sistema y recibió sus credenciales.</p>
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
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${color}15` }}>👤</div>
            <div><h3 className="text-base font-bold text-white">Nuevo Empleado</h3><p className="text-xs text-slate-400">Paso {step+1}/{steps.length} · {cur.label}</p></div>
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

const roleColors: Record<string, string> = {
  'Chef Principal': '#F59E0B',
  'Jefa de Sala': '#7C3AED',
  'Chef Sous': '#F59E0B',
  'Maitre': '#7C3AED',
  'Bartender': '#06B6D4',
  'Delivery Manager': '#10B981',
  'Contadora': '#3B82F6',
};

const schedule: Record<string, string[]> = {
  'E001': ['8:00', '16:00', '—', '8:00', '16:00', '—', '—'],
  'E002': ['12:00', '20:00', '12:00', '20:00', '—', '12:00', '20:00'],
  'E003': ['9:00', '17:00', '9:00', '17:00', '9:00', '—', '—'],
  'E004': ['11:00', '19:00', '11:00', '19:00', '—', '11:00', '19:00'],
  'E005': ['13:00', '21:00', '—', '13:00', '21:00', '13:00', '21:00'],
  'E006': ['16:00', '0:00', '16:00', '—', '16:00', '0:00', '16:00'],
  'E007': ['10:00', '18:00', '10:00', '18:00', '10:00', '10:00', '—'],
  'E008': ['9:00', '17:00', '9:00', '17:00', '9:00', '—', '—'],
};

const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

interface HRProps {
  region?: 'consolidated' | 'uy' | 'es';
  setRegion?: (r: 'consolidated' | 'uy' | 'es') => void;
}

export default function HR({ region = 'consolidated', setRegion }: HRProps) {
  const [view, setView] = useState<'list' | 'schedule'>('list');
  const [search, setSearch] = useState('');
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

  const [branchFilter, setBranchFilter] = useState<string>(getInternalRegion(region));

  useEffect(() => {
    setBranchFilter(getInternalRegion(region));
  }, [region]);

  const handleRegionChange = (newRegion: string) => {
    setBranchFilter(newRegion);
    if (setRegion) {
      setRegion(getGlobalRegion(newRegion));
    }
  };

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchBranch = branchFilter === 'all' || e.branch === branchFilter;
    return matchSearch && matchBranch;
  });

  return (
    <div className="p-6 animate-fade-up">
      {showModal && <NewEmployeeModal onClose={() => setShowModal(false)} />}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Recursos Humanos</h2>
          <p className="text-sm mt-0.5" style={{ color: '#475569' }}>Gestión de personal, horarios y desempeño</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><Clock size={13} /> Ver Horarios</button>
          <button className="btn-primary" onClick={() => setShowModal(true)}><Plus size={13} /> Nuevo Empleado</button>
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
              background: branchFilter === r.id ? `${r.color}15` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${branchFilter === r.id ? `${r.color}40` : '#1a2640'}`,
              color: branchFilter === r.id ? r.color : '#64748B',
            }}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Empleados', value: '24', icon: Users, color: '#3B82F6', sub: 'activos' },
          { label: 'Activos Hoy', value: '18', icon: TrendingUp, color: '#10B981', sub: 'en turno' },
          { label: 'Horas este mes', value: '1,248', icon: Clock, color: '#F59E0B', sub: 'horas totales' },
          { label: 'Mejor Desempeño', value: '96%', icon: Award, color: '#7C3AED', sub: 'Isabel M.' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card-premium p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${s.color}20` }}>
                  <Icon size={16} style={{ color: s.color }} />
                </div>
              </div>
              <p className="text-xs mb-1" style={{ color: '#475569' }}>{s.label}</p>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs mt-1" style={{ color: '#64748B' }}>{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1 max-w-xs" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1a2640' }}>
            <Search size={14} style={{ color: '#475569' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar empleado..."
              className="bg-transparent text-sm outline-none flex-1"
              style={{ color: '#94A3B8', fontSize: '13px' }}
            />
          </div>

        </div>
        <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #1a2640' }}>
          {(['list', 'schedule'] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-3 py-2 text-xs font-medium transition-colors"
              style={{
                background: view === v ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.03)',
                color: view === v ? '#60A5FA' : '#64748B',
              }}
            >
              {v === 'list' ? 'Lista' : 'Horarios'}
            </button>
          ))}
        </div>
      </div>

      {view === 'list' ? (
        <div className="card-premium overflow-hidden">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #1a2640' }}>
                {['Empleado', 'Cargo', 'Sucursal', 'Estado', 'Horas Mes', 'Ventas', 'Desempeño', 'Comisión'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: '#475569', letterSpacing: '0.05em' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(emp => (
                <tr key={emp.id} className="table-row-hover cursor-pointer" style={{ borderBottom: '1px solid #0f1a2e' }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #1D4ED8, #7C3AED)' }}
                      >
                        {emp.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{emp.name}</p>
                        <p className="text-xs" style={{ color: '#475569' }}>{emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: `${roleColors[emp.role] || '#3B82F6'}20`, color: roleColors[emp.role] || '#3B82F6' }}>
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm">{emp.branch === 'UY' ? '🇺🇾 Uruguay' : '🇪🇸 España'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: emp.status === 'activo' ? '#10B981' : '#475569' }} />
                      <span className="text-xs" style={{ color: emp.status === 'activo' ? '#34D399' : '#64748B' }}>
                        {emp.status === 'activo' ? 'Activo' : 'Descanso'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-white">{emp.hours}h</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-white">{emp.sales > 0 ? `$${emp.sales.toLocaleString()}` : '—'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full" style={{ background: '#1a2640' }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${emp.performance}%`, background: emp.performance >= 90 ? '#10B981' : '#F59E0B' }} />
                      </div>
                      <span className="text-xs font-semibold" style={{ color: emp.performance >= 90 ? '#34D399' : '#FCD34D' }}>{emp.performance}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold" style={{ color: '#10B981' }}>
                      {emp.sales > 0 ? `$${Math.round(emp.sales * 0.05).toLocaleString()}` : '—'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Schedule View */
        <div className="card-premium overflow-hidden">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #1a2640' }}>
                <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: '#475569' }}>Empleado</th>
                {days.map(d => (
                  <th key={d} className="px-3 py-3 text-center text-xs font-semibold" style={{ color: '#475569' }}>{d}</th>
                ))}
                <th className="px-4 py-3 text-center text-xs font-semibold" style={{ color: '#475569' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(emp => {
                const empSchedule = schedule[emp.id] || ['—', '—', '—', '—', '—', '—', '—'];
                const workDays = empSchedule.filter(s => s !== '—').length;
                return (
                  <tr key={emp.id} className="table-row-hover" style={{ borderBottom: '1px solid #0f1a2e' }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1D4ED8, #7C3AED)' }}>
                          {emp.avatar}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">{emp.name}</p>
                          <p className="text-xs" style={{ color: '#475569' }}>{emp.role}</p>
                        </div>
                      </div>
                    </td>
                    {empSchedule.map((shift, i) => (
                      <td key={i} className="px-2 py-3 text-center">
                        {shift !== '—' ? (
                          <div className="px-2 py-1 rounded-lg text-center" style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.2)' }}>
                            <span className="text-xs font-medium" style={{ color: '#60A5FA' }}>{shift}</span>
                          </div>
                        ) : (
                          <span className="text-xs" style={{ color: '#2d3f5e' }}>—</span>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs font-semibold text-white">{workDays * 8}h</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
