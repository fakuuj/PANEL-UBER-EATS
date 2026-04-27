import { useState } from 'react';
import {
  LayoutDashboard, ShoppingBag, Package, DollarSign,
  Users, UserCircle, Building2, Bell, Settings,
  ChevronDown, Zap, LogOut, HelpCircle,
  Truck, BarChart3, CreditCard, Clock, ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (m: string) => void;
  notifications: number;
}

const navSections = [
  {
    label: 'CORE',
    items: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null },
      { id: 'analytics', icon: BarChart3, label: 'Analytics', badge: 'NEW' },
    ]
  },
  {
    label: 'OPERACIONES',
    items: [
      { id: 'orders', icon: ShoppingBag, label: 'Gestión de Pedidos', badge: '12' },
      { id: 'ubereats', icon: Truck, label: 'Uber Eats', badge: '2' },
      { id: 'inventory', icon: Package, label: 'Inventario', badge: '4' },
      { id: 'schedule', icon: Clock, label: 'Horarios', badge: null },
    ]
  },
  {
    label: 'FINANZAS',
    items: [
      { id: 'finances', icon: DollarSign, label: 'Finanzas', badge: null },
    ]
  },
  {
    label: 'PERSONAS',
    items: [
      { id: 'hr', icon: Users, label: 'Recursos Humanos', badge: null },
      { id: 'crm', icon: UserCircle, label: 'CRM Clientes', badge: null },
    ]
  },
  {
    label: 'EMPRESA',
    items: [
      { id: 'branches', icon: Building2, label: 'Multi Sucursal', badge: null },
      { id: 'settings', icon: Settings, label: 'Configuración', badge: null },
    ]
  },
];

export default function Sidebar({ activeModule, setActiveModule, notifications }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="flex flex-col h-screen transition-all duration-300 ease-in-out"
      style={{
        width: collapsed ? '64px' : '240px',
        minWidth: collapsed ? '64px' : '240px',
        background: 'linear-gradient(180deg, #060D1C 0%, #080F1E 100%)',
        borderRight: '1px solid #1a2640',
        position: 'relative',
        zIndex: 40,
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5" style={{ borderBottom: '1px solid #1a2640' }}>
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #7C3AED 100%)' }}>
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <span className="text-sm font-800 text-white" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>GastroOS</span>
              <div className="text-xs" style={{ color: '#475569', marginTop: '-1px' }}>Enterprise v2.4</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex items-center justify-center w-8 h-8 rounded-lg mx-auto" style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #7C3AED 100%)' }}>
            <Zap size={16} className="text-white" />
          </div>
        )}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded-md transition-colors"
            style={{ color: '#475569' }}
          >
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="p-4 flex justify-center"
          style={{ color: '#475569' }}
        >
          <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} />
        </button>
      )}

      {/* Branch Selector */}
      {!collapsed && (
        <div className="px-3 py-3">
          <button
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all"
            style={{
              background: 'rgba(37, 99, 235, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.2)',
            }}
          >
            <span className="text-base">🌎</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">Todas las sucursales</div>
              <div className="text-xs" style={{ color: '#475569' }}>UY · ES</div>
            </div>
            <ChevronDown size={12} style={{ color: '#475569', flexShrink: 0 }} />
          </button>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 pb-4 sidebar-scroll overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label} className="mb-4">
            {!collapsed && (
              <div className="px-3 py-2 text-xs font-700 tracking-widest" style={{ color: '#2d3f5e', fontWeight: 700, letterSpacing: '0.1em' }}>
                {section.label}
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-left transition-all nav-item ${isActive ? 'nav-active' : ''}`}
                  title={collapsed ? item.label : ''}
                  style={{
                    color: isActive ? '#60A5FA' : '#64748B',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                  }}
                >
                  <Icon size={16} style={{ flexShrink: 0 }} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-sm font-medium truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                          style={{
                            background: item.badge === 'NEW'
                              ? 'rgba(124, 58, 237, 0.2)'
                              : 'rgba(244, 63, 94, 0.15)',
                            color: item.badge === 'NEW' ? '#A78BFA' : '#FB7185',
                            fontSize: '10px',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {collapsed && item.badge && (
                    <span
                      className="absolute top-1 right-1 w-2 h-2 rounded-full"
                      style={{ background: '#F43F5E' }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom */}
      {!collapsed && (
        <div className="px-3 pb-4" style={{ borderTop: '1px solid #1a2640', paddingTop: '12px' }}>
          {/* Notifications */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 cursor-pointer nav-item" style={{ color: '#64748B' }}>
            <div className="relative">
              <Bell size={16} />
              {notifications > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center text-white rounded-full"
                  style={{ background: '#F43F5E', fontSize: '9px', fontWeight: 700 }}
                >
                  {notifications}
                </span>
              )}
            </div>
            <span className="text-sm font-medium">Notificaciones</span>
          </div>

          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 cursor-pointer nav-item" style={{ color: '#64748B' }}>
            <HelpCircle size={16} />
            <span className="text-sm font-medium">Soporte</span>
          </div>

          {/* User */}
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl mt-2 cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1a2640' }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #7C3AED 100%)' }}
            >
              AD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">Admin General</div>
              <div className="text-xs truncate" style={{ color: '#475569' }}>admin@gastroos.com</div>
            </div>
            <LogOut size={13} style={{ color: '#475569', flexShrink: 0 }} />
          </div>
        </div>
      )}
    </aside>
  );
}
