import {
  Search, Bell, ChevronDown, Globe, Zap,
  TrendingUp, AlertCircle, CheckCircle, Info,
  Sun, Moon
} from 'lucide-react';
import { notifications } from '../data/mockData';

interface HeaderProps {
  activeModule: string;
  notifOpen: boolean;
  setNotifOpen: (v: boolean) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  region: 'consolidated' | 'uy' | 'es';
  setRegion: (r: 'consolidated' | 'uy' | 'es') => void;
}

const moduleNames: Record<string, string> = {
  dashboard: 'Dashboard Ejecutivo',
  analytics: 'Analytics Avanzado',
  orders: 'Gestión de Pedidos',
  ubereats: 'Integración Uber Eats',
  inventory: 'Inventario Inteligente',
  finances: 'Finanzas & Administración',
  hr: 'Recursos Humanos',
  crm: 'CRM de Clientes',
  branches: 'Panel Multi Sucursal',
  settings: 'Configuración del Sistema',
  schedule: 'Horarios & Turnos',
  billing: 'Facturación',
};

const notifIcons: Record<string, { icon: typeof AlertCircle; color: string }> = {
  alert: { icon: AlertCircle, color: '#F59E0B' },
  order: { icon: Zap, color: '#3B82F6' },
  success: { icon: CheckCircle, color: '#10B981' },
  info: { icon: Info, color: '#06B6D4' },
};

export default function Header({ activeModule, notifOpen, setNotifOpen, theme, toggleTheme, region, setRegion }: HeaderProps) {
  const unread = notifications.filter(n => !n.read).length;

  return (
    <header
      className="flex items-center justify-between px-6 h-14"
      style={{
        background: 'rgba(5, 10, 20, 0.95)',
        borderBottom: '1px solid #1a2640',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-sm font-semibold text-white">{moduleNames[activeModule] || 'GastroOS'}</h1>
        </div>
        <div className="live-indicator hidden md:flex">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
          Live
        </div>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg flex-1 max-w-sm mx-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #1a2640' }}>
        <Search size={14} style={{ color: '#475569' }} />
        <input
          type="text"
          placeholder="Buscar pedidos, clientes, productos..."
          className="bg-transparent text-sm outline-none flex-1"
          style={{ color: '#94A3B8', fontSize: '13px' }}
        />
        <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#1a2640', color: '#475569', fontSize: '10px' }}>⌘K</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Upgrade */}
        <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(37,99,235,0.2) 100%)', border: '1px solid rgba(124,58,237,0.3)', color: '#A78BFA' }}>
          <TrendingUp size={12} />
          Enterprise
        </button>

        {/* Global Region Selector */}
        <div className="flex bg-opacity-20 rounded-lg p-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border, #1a2640)' }}>
          <button
            onClick={() => setRegion('consolidated')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${region === 'consolidated' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Todas
          </button>
          <button
            onClick={() => setRegion('uy')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${region === 'uy' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            🇺🇾 UY
          </button>
          <button
            onClick={() => setRegion('es')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${region === 'es' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            🇪🇸 ES
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border, #1a2640)', color: '#64748B' }}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-lg transition-colors"
            style={{ background: notifOpen ? 'rgba(37, 99, 235, 0.1)' : 'rgba(255,255,255,0.04)', border: '1px solid #1a2640', color: '#64748B' }}
          >
            <Bell size={16} />
            {unread > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center rounded-full text-white"
                style={{ background: '#F43F5E', fontSize: '9px', fontWeight: 700 }}
              >
                {unread}
              </span>
            )}
          </button>

          {/* Notifications Panel */}
          {notifOpen && (
            <div
              className="absolute right-0 top-10 w-80 rounded-xl shadow-2xl animate-fade-up"
              style={{ background: '#0D1629', border: '1px solid #1a2640', zIndex: 100 }}
            >
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #1a2640' }}>
                <span className="text-sm font-semibold text-white">Notificaciones</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(244,63,94,0.15)', color: '#FB7185' }}>{unread} nuevas</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => {
                  const Icon = notifIcons[notif.type]?.icon || Info;
                  const color = notifIcons[notif.type]?.color || '#94A3B8';
                  return (
                    <div
                      key={notif.id}
                      className="flex items-start gap-3 px-4 py-3 transition-colors cursor-pointer"
                      style={{
                        borderBottom: '1px solid #0f1a2e',
                        background: !notif.read ? 'rgba(37, 99, 235, 0.05)' : 'transparent',
                      }}
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}20` }}>
                        <Icon size={13} style={{ color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-white leading-snug">{notif.message}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#475569' }}>Hace {notif.time}</p>
                      </div>
                      {!notif.read && (
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#3B82F6' }} />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="px-4 py-2.5 text-center">
                <button className="text-xs font-medium" style={{ color: '#3B82F6' }}>Ver todas las notificaciones</button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <button className="flex items-center gap-2 pl-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #7C3AED 100%)' }}>
            AD
          </div>
          <ChevronDown size={12} style={{ color: '#475569' }} />
        </button>
      </div>
    </header>
  );
}
