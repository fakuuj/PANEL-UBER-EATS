import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './modules/Dashboard';
import Orders from './modules/Orders';
import UberEats from './modules/UberEats';
import Inventory from './modules/Inventory';
import Finances from './modules/Finances';
import HR from './modules/HR';
import CRM from './modules/CRM';
import Branches from './modules/Branches';
import Analytics from './modules/Analytics';
import Storefront from './modules/Storefront';
import { notifications } from './data/mockData';


function ToggleRow({ label, desc, defaultOn = false }: { label: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2640' }}>
      <div><p className="text-sm font-semibold text-white">{label}</p><p className="text-xs text-slate-500 mt-0.5">{desc}</p></div>
      <button onClick={() => setOn(v => !v)} className="w-11 h-6 rounded-full transition-all flex-shrink-0 relative" style={{ background: on ? '#2563EB' : '#1a2640' }}>
        <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all" style={{ left: on ? '22px' : '2px', display: 'block' }} />
      </button>
    </div>
  );
}
function SelectRow({ label, desc, options }: { label: string; desc: string; options: string[] }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2640' }}>
      <div><p className="text-sm font-semibold text-white">{label}</p><p className="text-xs text-slate-500 mt-0.5">{desc}</p></div>
      <select className="px-3 py-1.5 rounded-lg text-sm outline-none" style={{ background: '#0D1629', border: '1px solid #1a2640', color: '#94A3B8' }}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
function InputRow({ label, desc, placeholder, defaultValue }: { label: string; desc: string; placeholder: string; defaultValue?: string }) {
  return (
    <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2640' }}>
      <p className="text-sm font-semibold text-white mb-0.5">{label}</p>
      <p className="text-xs text-slate-500 mb-2">{desc}</p>
      <input defaultValue={defaultValue} placeholder={placeholder} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: '#0D1629', border: '1px solid #1a2640', color: '#E2E8F0' }} />
    </div>
  );
}

const panelContent: Record<string, () => JSX.Element> = {
  'Seguridad & Accesos': () => (<><ToggleRow label="Autenticación 2FA" desc="Requiere código adicional al iniciar sesión" defaultOn={true} /><ToggleRow label="Sesión única" desc="Solo permite un dispositivo activo por usuario" /><SelectRow label="Rol de administrador" desc="Nivel de permisos del admin principal" options={['Super Admin', 'Admin Regional', 'Gerente']} /><InputRow label="Email del admin" desc="Correo asociado a la cuenta principal" placeholder="admin@gastroos.com" defaultValue="admin@gastroos.com" /><ToggleRow label="Acceso por IP restringida" desc="Solo IPs autorizadas pueden acceder al panel" /><ToggleRow label="Log de actividad" desc="Registrar todas las acciones de administradores" defaultOn={true} /></>),
  'Integración de APIs': () => (<><ToggleRow label="Uber Eats" desc="Sincronizar pedidos de Uber Eats en tiempo real" defaultOn={true} /><InputRow label="Uber Eats API Key" desc="Clave de integración proporcionada por Uber" placeholder="ue_live_xxxx..." defaultValue="ue_live_••••••••" /><ToggleRow label="WhatsApp Business" desc="Recibir pedidos y notificar por WhatsApp" defaultOn={true} /><InputRow label="WhatsApp Token" desc="Token de la API de Meta" placeholder="EAAx..." defaultValue="EAAx••••••••" /><ToggleRow label="Mercado Pago" desc="Procesar pagos con Mercado Pago" defaultOn={true} /><SelectRow label="Entorno de pago" desc="Producción o modo de prueba" options={['Producción', 'Sandbox (Testing)']} /></>),
  'Notificaciones': () => (<><ToggleRow label="Alertas de stock crítico" desc="Notificar cuando un insumo está por agotarse" defaultOn={true} /><ToggleRow label="Notificaciones de nuevos pedidos" desc="Alerta instantánea al recibir un pedido" defaultOn={true} /><ToggleRow label="Resumen diario por email" desc="Recibir el resumen del día cada mañana" /><SelectRow label="Canal de notificaciones" desc="Cómo recibir las alertas" options={['Push + Email', 'Solo Push', 'Solo Email', 'SMS']} /><InputRow label="Email para alertas" desc="Dirección donde llegan los reportes" placeholder="alertas@gastroos.com" defaultValue="alertas@gastroos.com" /><ToggleRow label="Alertas de empleados" desc="Avisos sobre ausencias o cambios de turno" /></>),
  'Impresión & POS': () => (<><InputRow label="IP de impresora principal" desc="Dirección IP de la impresora de cocina" placeholder="192.168.1.100" defaultValue="192.168.1.105" /><SelectRow label="Tamaño de papel" desc="Formato del ticket" options={['80mm (estándar)', '58mm (compacto)', 'A4']} /><ToggleRow label="Impresión automática" desc="Imprimir ticket al confirmar cada pedido" defaultOn={true} /><ToggleRow label="Copia para cocina" desc="Enviar comanda duplicada a impresora de cocina" defaultOn={true} /><SelectRow label="Idioma del ticket" desc="Idioma según sucursal" options={['Español (UY)', 'Español (ES)', 'Inglés']} /><ToggleRow label="Logo en tickets" desc="Incluir logotipo en cada ticket" /></>),
  'Backups & Data': () => (<><ToggleRow label="Backup automático diario" desc="Respaldar todos los datos cada 24 horas" defaultOn={true} /><SelectRow label="Retención de backups" desc="Cuánto tiempo conservar los respaldos" options={['30 días', '60 días', '90 días', '1 año']} /><InputRow label="Destino de backup" desc="Carpeta o bucket de almacenamiento" placeholder="s3://gastroos-backups/" defaultValue="s3://gastroos-backups/" /><ToggleRow label="Encriptación AES-256" desc="Cifrar todos los backups" defaultOn={true} /><div className="p-4 rounded-xl flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2640' }}><div><p className="text-sm font-semibold text-white">Exportar datos ahora</p><p className="text-xs text-slate-500 mt-0.5">Descargar CSV con todos los registros</p></div><button className="btn-secondary">Exportar CSV</button></div><div className="p-4 rounded-xl flex items-center justify-between" style={{ background: 'rgba(244,63,94,0.04)', border: '1px solid rgba(244,63,94,0.2)' }}><div><p className="text-sm font-semibold" style={{ color: '#FB7185' }}>Eliminar todos los datos</p><p className="text-xs text-slate-500 mt-0.5">Acción irreversible. Solo administradores.</p></div><button className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: 'rgba(244,63,94,0.15)', color: '#FB7185', border: '1px solid rgba(244,63,94,0.3)' }}>Eliminar</button></div></>),
  'Multi idioma': () => (<><SelectRow label="Idioma del panel" desc="Idioma de la interfaz de administración" options={['Español (Uruguay)', 'Español (España)', 'Inglés (US)']} /><SelectRow label="Formato de fecha" desc="Cómo se muestran las fechas" options={['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD']} /><SelectRow label="Zona horaria" desc="Zona horaria principal del sistema" options={['América/Montevideo (UTC-3)', 'Europa/Madrid (UTC+2)', 'UTC']} /><SelectRow label="Moneda por defecto" desc="Moneda para reportes y exportaciones" options={['UYU (Pesos Uruguayos)', 'EUR (Euros)', 'USD (Dólares)']} /><ToggleRow label="Detección automática" desc="Detectar idioma según ubicación del usuario" defaultOn={true} /></>),
};

function SettingsPlaceholder({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const sections = [
    { icon: '🔐', title: 'Seguridad & Accesos', desc: 'Gestión de roles, permisos y autenticación 2FA', color: '#3B82F6' },
    { icon: '🌐', title: 'Integración de APIs', desc: 'Uber Eats, WhatsApp Business, Mercado Pago', color: '#7C3AED' },
    { icon: '🔔', title: 'Notificaciones', desc: 'Configurar alertas push, email y SMS', color: '#F59E0B' },
    { icon: '🖨️', title: 'Impresión & POS', desc: 'Configurar impresoras de tickets y comandas', color: '#10B981' },
    { icon: '💾', title: 'Backups & Data', desc: 'Respaldos automáticos y exportación de datos', color: '#06B6D4' },
    { icon: '🌍', title: 'Multi idioma', desc: 'Español (UY), Español (ES), Inglés', color: '#F43F5E' },
  ];

  return (
    <div className="p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Configuración del Sistema</h2>
          <p className="text-sm" style={{ color: '#475569' }}>Plataforma GastroOS Enterprise · Panel de administrador</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(124,58,237,0.15)', color: '#A78BFA', border: '1px solid rgba(124,58,237,0.3)' }}>🔐 Admin</span>
          <button onClick={toggleTheme} className="btn-secondary">{theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}</button>
        </div>
      </div>

      {activeTab && panelContent[activeTab] ? (
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setActiveTab(null)} className="text-sm hover:text-white transition-colors" style={{ color: '#64748B' }}>← Volver</button>
              <h3 className="text-base font-bold text-white">{activeTab}</h3>
            </div>
            <button onClick={save} className="btn-primary" style={{ padding: '6px 16px', background: saved ? 'rgba(16,185,129,0.8)' : undefined }}>
              {saved ? '✓ Guardado' : 'Guardar cambios'}
            </button>
          </div>
          <div className="space-y-3">{panelContent[activeTab]()}</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map(item => (
            <div key={item.title} onClick={() => setActiveTab(item.title)} className="card-premium p-5 cursor-pointer group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}>{item.icon}</div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                  <p className="text-xs" style={{ color: '#64748B' }}>{item.desc}</p>
                </div>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `${item.color}20` }}>
                  <span style={{ color: item.color }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}




function SchedulePlaceholder({ region = 'consolidated', setRegion }: { region?: 'consolidated' | 'uy' | 'es'; setRegion?: (r: 'consolidated' | 'uy' | 'es') => void }) {
  const days = ['Lunes 7', 'Martes 8', 'Miércoles 9', 'Jueves 10', 'Viernes 11', 'Sábado 12', 'Domingo 13'];
  const allShifts = [
    { time: '07:00–15:00', name: 'Martín R.', role: 'Chef', color: '#3B82F6', branch: 'UY' },
    { time: '08:00–16:00', name: 'Diego F.', role: 'Chef Sous', color: '#7C3AED', branch: 'UY' },
    { time: '12:00–20:00', name: 'Sofía B.', role: 'Sala', color: '#10B981', branch: 'UY' },
    { time: '15:00–23:00', name: 'Valentina C.', role: 'Bartender', color: '#F59E0B', branch: 'UY' },
    { time: '16:00–00:00', name: 'Pablo S.', role: 'Delivery', color: '#06B6D4', branch: 'UY' },
    { time: '08:00–16:00', name: 'Carmen L.', role: 'Chef Principal', color: '#F43F5E', branch: 'ES' },
    { time: '10:00–18:00', name: 'Alejandro R.', role: 'Maitre', color: '#7C3AED', branch: 'ES' },
    { time: '14:00–22:00', name: 'Isabel M.', role: 'Contadora', color: '#10B981', branch: 'ES' },
  ];

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

  const shifts = allShifts.filter(s => regionFilter === 'all' || s.branch === regionFilter);
  const subtitle = regionFilter === 'UY' ? 'Uruguay' : regionFilter === 'ES' ? 'España' : 'Uruguay & España';

  return (
    <div className="p-6 animate-fade-up">
      <h2 className="text-xl font-bold text-white mb-2">Horarios & Turnos</h2>
      <p className="text-sm mb-6" style={{ color: '#475569' }}>Semana del 7 al 13 de Julio · {subtitle}</p>

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

      <div className="card-premium overflow-hidden">
        <div className="grid" style={{ gridTemplateColumns: '160px repeat(7, 1fr)' }}>
          <div className="px-4 py-3 text-xs font-semibold" style={{ color: '#475569', borderBottom: '1px solid #1a2640' }}>Empleado</div>
          {days.map(d => (
            <div key={d} className="px-2 py-3 text-xs font-semibold text-center" style={{ color: '#475569', borderBottom: '1px solid #1a2640', borderLeft: '1px solid #1a2640' }}>{d}</div>
          ))}
          {shifts.map(shift => (
            <>
              <div key={shift.name + 'name'} className="px-4 py-3" style={{ borderBottom: '1px solid #0f1a2e' }}>
                <p className="text-xs font-semibold text-white">{shift.name}</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs" style={{ color: '#475569' }}>{shift.role}</p>
                  <span className="text-xs" style={{ fontSize: '9px', color: '#475569' }}>{shift.branch === 'UY' ? '🇺🇾' : '🇪🇸'}</span>
                </div>
              </div>
              {days.map((d, i) => (
                <div key={d + shift.name} className="px-2 py-3" style={{ borderBottom: '1px solid #0f1a2e', borderLeft: '1px solid #1a2640' }}>
                  {(i < 5 || (i === 5 && shift.name !== 'Diego F.')) && i !== 2 ? (
                    <div className="px-1.5 py-1 rounded-lg text-center" style={{ background: `${shift.color}15`, border: `1px solid ${shift.color}30` }}>
                      <span className="text-xs" style={{ color: shift.color, fontSize: '10px' }}>{shift.time}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-center block" style={{ color: '#2d3f5e' }}>—</span>
                  )}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

const moduleComponents: Record<string, React.ComponentType<any>> = {
  dashboard: Dashboard,
  analytics: Analytics,
  orders: Orders,
  ubereats: UberEats,
  inventory: Inventory,
  finances: Finances,
  hr: HR,
  crm: CRM,
  branches: Branches,
  settings: SettingsPlaceholder,
  schedule: SchedulePlaceholder,
};

function AdminPanel() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [notifOpen, setNotifOpen] = useState(false);
  const [liveTime, setLiveTime] = useState(new Date());
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [region, setRegion] = useState<'consolidated' | 'uy' | 'es'>('consolidated');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginCode, setLoginCode] = useState('');

  const unreadNotif = notifications.filter(n => !n.read).length;

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }
  }, [theme]);

  useEffect(() => {
    const t = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('[data-notif]')) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050A14] px-4 font-['Inter']">
        <div className="card-premium p-8 max-w-sm w-full text-center animate-fade-up">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #7C3AED 100%)' }}>
            <span className="text-white text-2xl font-bold">G</span>
          </div>
          <h1 className="text-xl font-bold text-white mb-2">GastroOS Enterprise</h1>
          <p className="text-sm text-slate-400 mb-8">Ingresa tu código de acceso para continuar</p>
          <input 
            type="password" 
            placeholder="Código de acceso" 
            value={loginCode}
            onChange={(e) => setLoginCode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setIsAuthenticated(true)}
            className="w-full bg-[#0D1629] border border-[#1a2640] rounded-xl px-4 py-3 text-white text-center tracking-widest mb-4 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button 
            onClick={() => setIsAuthenticated(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
          >
            Acceder al Panel
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full mt-4 text-slate-500 hover:text-white text-sm transition-colors"
          >
            ← Volver a la Tienda
          </button>
        </div>
      </div>
    );
  }

  const ActiveModule = moduleComponents[activeModule] || Dashboard;

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-primary, #050A14)', overflow: 'hidden' }}>
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} notifications={unreadNotif} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <div data-notif>
          <Header activeModule={activeModule} notifOpen={notifOpen} setNotifOpen={setNotifOpen} theme={theme} toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} region={region} setRegion={setRegion} />
        </div>
        <main style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-primary, #050A14)' }}>
          <div className="flex items-center justify-between px-6 py-2 text-xs" style={{ background: 'rgba(8,15,30,0.8)', borderBottom: '1px solid #1a2640' }}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: '#10B981' }} /><span style={{ color: '#475569' }}>Sistema operativo</span></div>
              <span style={{ color: '#2d3f5e' }}>·</span><span style={{ color: '#475569' }}>{liveTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              <span style={{ color: '#2d3f5e' }}>·</span><span style={{ color: '#475569' }}>Uruguay & España conectadas</span>
            </div>
            <div className="flex items-center gap-4 text-xs" style={{ color: '#2d3f5e' }}>
              <span>UYU $41.82/USD</span><span>·</span><span>EUR €1.08/USD</span><span>·</span><span style={{ color: '#475569' }}>GastroOS Enterprise v2.4.1</span>
            </div>
          </div>
          {activeModule === 'settings' ? <SettingsPlaceholder theme={theme} toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} /> : <ActiveModule region={region} setRegion={setRegion} />}
        </main>
        <div className="flex items-center justify-between px-6 py-1.5" style={{ background: 'rgba(5,10,20,0.95)', borderTop: '1px solid #1a2640' }}>
          <div className="flex items-center gap-4 text-xs" style={{ color: '#2d3f5e' }}>
            <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full" style={{ background: '#10B981' }} /><span>Servidor operativo · Latencia 12ms</span></div>
            <span>·</span><span>Último backup: hace 3 min</span><span>·</span><span>482 pedidos hoy</span>
          </div>
          <div className="flex items-center gap-4 text-xs" style={{ color: '#2d3f5e' }}>
            <span>© 2026 GastroOS</span><span>·</span><span>Enterprise License</span><span>·</span><span style={{ color: '#1a2640' }}>v2.4.1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handlePop = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  if (route.startsWith('/admin')) {
    return <AdminPanel />;
  }

  return <Storefront onNavigate={(module) => {
    if (module === 'dashboard' || module === 'orders') {
      window.history.pushState({}, '', '/admin');
      setRoute('/admin');
    }
  }} />;
}
