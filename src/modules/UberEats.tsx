import { useState } from 'react';
import { Check, X, Clock, MapPin, Star, Zap, RefreshCw, TrendingUp, AlertTriangle } from 'lucide-react';
import { uberEatsOrders } from '../data/mockData';

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  nuevo: { label: 'Nuevo pedido', color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
  en_cocina: { label: 'En preparación', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  en_camino: { label: 'En camino', color: '#06B6D4', bg: 'rgba(6,182,212,0.12)' },
  entregado: { label: 'Entregado ✓', color: '#10B981', bg: 'rgba(16,185,129,0.12)' },
  rechazado: { label: 'Rechazado', color: '#F43F5E', bg: 'rgba(244,63,94,0.12)' },
};

export default function UberEats() {
  const [orders, setOrders] = useState(uberEatsOrders.map(o => ({ ...o, id: o.id })));
  const [showMenu, setShowMenu] = useState(false);

  const accept = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'en_cocina' } : o));
  };

  const reject = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'rechazado' } : o));
  };

  const newOrders = orders.filter(o => o.status === 'nuevo');
  const activeOrders = orders.filter(o => ['en_cocina', 'en_camino'].includes(o.status));
  const completedOrders = orders.filter(o => ['entregado', 'rechazado'].includes(o.status));

  return (
    <div className="p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #142328 0%, #1a3040 100%)', border: '1px solid rgba(6,214,160,0.3)' }}>
            <span className="text-lg">🟢</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Integración Uber Eats</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="live-indicator">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: '#06D6A0' }} />
                Conectado
              </div>
              <span className="text-xs" style={{ color: '#475569' }}>·</span>
              <span className="text-xs" style={{ color: '#475569' }}>Uruguay & España</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={() => setShowMenu(!showMenu)}>
            Sincronizar Menú
          </button>
          <button className="btn-primary">
            <RefreshCw size={13} />
            Actualizar
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Pedidos hoy', value: '48', icon: '📦', color: '#3B82F6', trend: '+12%' },
          { label: 'Ingresos UE', value: '$142,800', icon: '💰', color: '#10B981', trend: '+18%' },
          { label: 'Tiempo prom.', value: '28 min', icon: '⏱️', color: '#F59E0B', trend: '-3 min' },
          { label: 'Rating tienda', value: '4.9 ★', icon: '⭐', color: '#F59E0B', trend: '+0.1' },
        ].map(s => (
          <div key={s.label} className="card-premium p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs mb-1" style={{ color: '#475569' }}>{s.label}</p>
                <p className="text-xl font-bold text-white">{s.value}</p>
                <span className="text-xs" style={{ color: '#34D399' }}>{s.trend} vs ayer</span>
              </div>
              <span className="text-2xl">{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* New Orders Alert */}
      {newOrders.length > 0 && (
        <div className="mb-6 p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(59,130,246,0.2)' }}>
            <Zap size={16} style={{ color: '#3B82F6' }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">{newOrders.length} pedido{newOrders.length > 1 ? 's' : ''} nuevo{newOrders.length > 1 ? 's' : ''} esperando aceptación</p>
            <p className="text-xs" style={{ color: '#475569' }}>Los pedidos se auto-cancelan si no se aceptan en 3 minutos</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: '#3B82F6' }} />
            <span className="text-xs font-semibold" style={{ color: '#60A5FA' }}>Acción requerida</span>
          </div>
        </div>
      )}

      {/* Menu Sync Panel */}
      {showMenu && (
        <div className="mb-6 card-premium p-5 animate-fade-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Sincronización de Menú</h3>
            <button onClick={() => setShowMenu(false)}><X size={14} style={{ color: '#475569' }} /></button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: 'Asado Premium', price: '$2,400', available: true, uePrice: '$2,400' },
              { name: 'Empanadas x6', price: '$890', available: true, uePrice: '$890' },
              { name: 'Paella Valencia', price: '$1,800', available: true, uePrice: '$1,800' },
              { name: 'Milanesa Napolitana', price: '$1,100', available: false, uePrice: '$1,100' },
              { name: 'Tabla de Quesos', price: '$1,400', available: true, uePrice: '$1,400' },
              { name: 'Provoleta', price: '$780', available: true, uePrice: '$780' },
            ].map(item => (
              <div key={item.name} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1a2640' }}>
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 cursor-pointer"
                  style={{ background: item.available ? '#10B981' : '#1a2640', border: `1px solid ${item.available ? '#10B981' : '#2d3f5e'}` }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{item.name}</p>
                  <p className="text-xs" style={{ color: '#475569' }}>{item.price}</p>
                </div>
                <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: item.available ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)', color: item.available ? '#34D399' : '#FB7185', fontSize: '10px' }}>
                  {item.available ? 'Activo' : 'Pausado'}
                </span>
              </div>
            ))}
          </div>
          <button className="btn-primary mt-4">Sincronizar con Uber Eats</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* New Orders */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: '#3B82F6' }} />
            <h3 className="text-sm font-semibold text-white">Nuevos</h3>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(59,130,246,0.15)', color: '#60A5FA' }}>{newOrders.length}</span>
          </div>
          <div className="space-y-3">
            {newOrders.map(order => (
              <UberOrderCard key={order.id} order={order} onAccept={accept} onReject={reject} />
            ))}
            {newOrders.length === 0 && (
              <div className="card-premium p-6 text-center">
                <p className="text-sm" style={{ color: '#475569' }}>No hay pedidos nuevos</p>
              </div>
            )}
          </div>
        </div>

        {/* Active Orders */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{ background: '#F59E0B' }} />
            <h3 className="text-sm font-semibold text-white">En Proceso</h3>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,158,11,0.15)', color: '#FCD34D' }}>{activeOrders.length}</span>
          </div>
          <div className="space-y-3">
            {activeOrders.map(order => (
              <UberOrderCard key={order.id} order={order} onAccept={accept} onReject={reject} />
            ))}
          </div>
        </div>

        {/* Completed */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
            <h3 className="text-sm font-semibold text-white">Completados hoy</h3>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.15)', color: '#34D399' }}>{completedOrders.length}</span>
          </div>
          <div className="space-y-3">
            {completedOrders.map(order => (
              <UberOrderCard key={order.id} order={order} onAccept={accept} onReject={reject} />
            ))}
          </div>
        </div>
      </div>

      {/* Performance */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card-premium p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Performance por Sucursal</h3>
          <div className="space-y-4">
            {[
              { branch: '🇺🇾 Uruguay', orders: 28, revenue: '$84,200', rating: 4.9, acceptance: 96 },
              { branch: '🇪🇸 España', orders: 20, revenue: '$58,600', rating: 4.8, acceptance: 94 },
            ].map(b => (
              <div key={b.branch} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1a2640' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-white">{b.branch}</span>
                  <div className="flex items-center gap-1">
                    <Star size={12} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                    <span className="text-sm font-semibold text-white">{b.rating}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs" style={{ color: '#475569' }}>Pedidos</p>
                    <p className="text-sm font-bold text-white">{b.orders}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: '#475569' }}>Ingresos</p>
                    <p className="text-sm font-bold text-white">{b.revenue}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: '#475569' }}>Aceptación</p>
                    <p className="text-sm font-bold" style={{ color: '#34D399' }}>{b.acceptance}%</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="h-1.5 rounded-full" style={{ background: '#1a2640' }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${b.acceptance}%`, background: 'linear-gradient(90deg, #10B981, #06B6D4)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-premium p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Alertas & Configuración</h3>
          <div className="space-y-3">
            {[
              { icon: AlertTriangle, label: 'Tiempo máximo preparación', value: '35 min', color: '#F59E0B' },
              { icon: Clock, label: 'Auto-aceptar pedidos', value: 'Desactivado', color: '#64748B' },
              { icon: TrendingUp, label: 'Comisión Uber Eats', value: '30%', color: '#F43F5E' },
              { icon: Check, label: 'Estado de tienda', value: 'Abierta', color: '#10B981' },
              { icon: Zap, label: 'Notificaciones push', value: 'Activadas', color: '#3B82F6' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1a2640' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${item.color}20` }}>
                      <Icon size={13} style={{ color: item.color }} />
                    </div>
                    <span className="text-sm" style={{ color: '#94A3B8' }}>{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function UberOrderCard({ order, onAccept, onReject }: {
  order: typeof uberEatsOrders[0] & { status: string };
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const status = statusConfig[order.status] || statusConfig.nuevo;
  const isNew = order.status === 'nuevo';

  return (
    <div
      className="card-premium p-4 relative overflow-hidden"
      style={{
        border: `1px solid ${isNew ? 'rgba(59,130,246,0.3)' : '#1a2640'}`,
        background: isNew ? 'rgba(59,130,246,0.04)' : undefined,
      }}
    >
      {isNew && (
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #3B82F6, #7C3AED)' }} />
      )}

      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">{order.id}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: order.branch === 'UY' ? 'rgba(59,130,246,0.15)' : 'rgba(124,58,237,0.15)', color: order.branch === 'UY' ? '#60A5FA' : '#A78BFA', fontSize: '10px' }}>
              {order.branch === 'UY' ? '🇺🇾' : '🇪🇸'} {order.branch}
            </span>
          </div>
          <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{order.time}</p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: status.bg, color: status.color }}>
          {status.label}
        </span>
      </div>

      <div className="mb-3">
        <p className="text-sm font-semibold text-white mb-1">{order.client}</p>
        {order.items.map((item, i) => (
          <p key={i} className="text-xs" style={{ color: '#64748B' }}>· {item}</p>
        ))}
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Clock size={11} style={{ color: '#475569' }} />
            <span className="text-xs" style={{ color: '#94A3B8' }}>{order.eta}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={11} style={{ color: '#475569' }} />
            <span className="text-xs" style={{ color: '#94A3B8' }}>{order.distance}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Star size={11} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
          <span className="text-xs font-semibold text-white">{order.rating}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-white">${order.amount.toLocaleString()}</span>
        {isNew && (
          <div className="flex gap-2">
            <button
              onClick={() => onReject(order.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1"
              style={{ background: 'rgba(244,63,94,0.15)', color: '#FB7185', border: '1px solid rgba(244,63,94,0.3)' }}
            >
              <X size={12} /> Rechazar
            </button>
            <button
              onClick={() => onAccept(order.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1"
              style={{ background: 'rgba(16,185,129,0.15)', color: '#34D399', border: '1px solid rgba(16,185,129,0.3)' }}
            >
              <Check size={12} /> Aceptar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
