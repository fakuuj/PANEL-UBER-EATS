export const revenueData = [
  { month: 'Ene', uy: 48200, es: 22100, total: 70300 },
  { month: 'Feb', uy: 52800, es: 28400, total: 81200 },
  { month: 'Mar', uy: 61400, es: 34200, total: 95600 },
  { month: 'Abr', uy: 58900, es: 39800, total: 98700 },
  { month: 'May', uy: 67200, es: 44100, total: 111300 },
  { month: 'Jun', uy: 71800, es: 51600, total: 123400 },
  { month: 'Jul', uy: 69400, es: 55200, total: 124600 },
  { month: 'Ago', uy: 78300, es: 61800, total: 140100 },
  { month: 'Sep', uy: 82100, es: 68400, total: 150500 },
  { month: 'Oct', uy: 88600, es: 72100, total: 160700 },
  { month: 'Nov', uy: 94200, es: 79800, total: 174000 },
  { month: 'Dic', uy: 102400, es: 86200, total: 188600 },
];

export const weeklyOrders = [
  { day: 'Lun', delivery: 42, takeaway: 28, internal: 67, whatsapp: 18 },
  { day: 'Mar', delivery: 55, takeaway: 34, internal: 78, whatsapp: 22 },
  { day: 'Mié', delivery: 38, takeaway: 29, internal: 62, whatsapp: 15 },
  { day: 'Jue', delivery: 61, takeaway: 41, internal: 84, whatsapp: 27 },
  { day: 'Vie', delivery: 89, takeaway: 62, internal: 112, whatsapp: 38 },
  { day: 'Sáb', delivery: 124, takeaway: 87, internal: 145, whatsapp: 51 },
  { day: 'Dom', delivery: 98, takeaway: 71, internal: 118, whatsapp: 44 },
];

export const hourlyTraffic = [
  { hour: '8am', orders: 12 },
  { hour: '9am', orders: 18 },
  { hour: '10am', orders: 24 },
  { hour: '11am', orders: 38 },
  { hour: '12pm', orders: 86 },
  { hour: '1pm', orders: 124 },
  { hour: '2pm', orders: 98 },
  { hour: '3pm', orders: 42 },
  { hour: '4pm', orders: 28 },
  { hour: '5pm', orders: 34 },
  { hour: '6pm', orders: 56 },
  { hour: '7pm', orders: 88 },
  { hour: '8pm', orders: 112 },
  { hour: '9pm', orders: 94 },
  { hour: '10pm', orders: 61 },
  { hour: '11pm', orders: 28 },
];

export const topProducts = [
  { name: 'Asado Premium', sales: 842, revenue: 29470, margin: 68, trend: +12 },
  { name: 'Empanadas x6', sales: 1240, revenue: 21080, margin: 74, trend: +8 },
  { name: 'Paella Valencia', sales: 486, revenue: 19440, margin: 62, trend: +24 },
  { name: 'Milanesa Napolitana', sales: 934, revenue: 18680, margin: 71, trend: -3 },
  { name: 'Tabla de Quesos', sales: 621, revenue: 16146, margin: 79, trend: +15 },
  { name: 'Provoleta', sales: 789, revenue: 14202, margin: 82, trend: +6 },
  { name: 'Vino Tannat', sales: 412, revenue: 12360, margin: 56, trend: +18 },
  { name: 'Choripán Gourmet', sales: 1086, revenue: 11946, margin: 77, trend: +4 },
];

export const liveOrders = [
  { id: '#8821', client: 'Mesa 4', type: 'interno', status: 'en_cocina', time: '2 min', amount: 4800, items: ['Asado Premium', 'Provoleta', 'Malbec'], branch: 'UY' },
  { id: '#8822', client: 'Carlos M.', type: 'uber_eats', status: 'nuevo', time: '1 min', amount: 2100, items: ['Empanadas x6', 'Refrescos'], branch: 'UY' },
  { id: '#8823', client: 'Ana García', type: 'delivery', status: 'en_camino', time: '18 min', amount: 3400, items: ['Milanesa Napolitana', 'Papas fritas'], branch: 'ES' },
  { id: '#8824', client: 'Mesa 7', type: 'interno', status: 'listo', time: '0 min', amount: 6200, items: ['Paella Valencia x2', 'Sangría'], branch: 'ES' },
  { id: '#8825', client: 'Roberto P.', type: 'whatsapp', status: 'confirmado', time: '5 min', amount: 1800, items: ['Choripán x3', 'Coca Cola'], branch: 'UY' },
  { id: '#8826', client: 'Mesa 2', type: 'interno', status: 'en_cocina', time: '8 min', amount: 5100, items: ['Tabla de Quesos', 'Asado', 'Vino'], branch: 'UY' },
  { id: '#8827', client: 'Laura S.', type: 'uber_eats', status: 'nuevo', time: '30 seg', amount: 2800, items: ['Paella Valencia', 'Flan casero'], branch: 'ES' },
  { id: '#8828', client: 'Mesa 11', type: 'takeaway', status: 'listo', time: '0 min', amount: 3200, items: ['Empanadas x12', 'Chimichurri'], branch: 'UY' },
];

export const inventoryItems = [
  { name: 'Carne vacuna premium', stock: 24.5, unit: 'kg', min: 15, max: 80, status: 'ok', supplier: 'Frigorífico El Gaucho', cost: 850, branch: 'UY' },
  { name: 'Harina 000', stock: 8.2, unit: 'kg', min: 20, max: 100, status: 'low', supplier: 'Molinos Río de la Plata', cost: 120, branch: 'UY' },
  { name: 'Tomate perita', stock: 12, unit: 'kg', min: 10, max: 40, status: 'warning', supplier: 'Verdulería Central', cost: 85, branch: 'ES' },
  { name: 'Vino Malbec', stock: 48, unit: 'btl', min: 24, max: 120, status: 'ok', supplier: 'Bodega Familia Zuccardi', cost: 680, branch: 'UY' },
  { name: 'Aceite de oliva', stock: 6.8, unit: 'lt', min: 10, max: 40, status: 'low', supplier: 'Importadora Gourmet', cost: 920, branch: 'UY' },
  { name: 'Queso provolone', stock: 15.4, unit: 'kg', min: 8, max: 35, status: 'ok', supplier: 'Lácteos La Suiza', cost: 560, branch: 'UY' },
  { name: 'Arroz bomba', stock: 22, unit: 'kg', min: 15, max: 60, status: 'ok', supplier: 'Distribuidora ES', cost: 210, branch: 'ES' },
  { name: 'Mariscos mix', stock: 5.1, unit: 'kg', min: 12, max: 30, status: 'low', supplier: 'Pescadería Valencia', cost: 1840, branch: 'ES' },
  { name: 'Cerveza artesanal', stock: 144, unit: 'u', min: 72, max: 300, status: 'ok', supplier: 'Cervecería Patagonia', cost: 185, branch: 'UY' },
  { name: 'Azúcar impalpable', stock: 3.2, unit: 'kg', min: 5, max: 25, status: 'low', supplier: 'Distribuidora Norte', cost: 95, branch: 'UY' },
];

export const employees = [
  { id: 'E001', name: 'Martín Rodríguez', role: 'Chef Principal', branch: 'UY', status: 'activo', hours: 168, sales: 48200, performance: 94, avatar: 'MR' },
  { id: 'E002', name: 'Sofía Benítez', role: 'Jefa de Sala', branch: 'UY', status: 'activo', hours: 156, sales: 36800, performance: 91, avatar: 'SB' },
  { id: 'E003', name: 'Diego Fernández', role: 'Chef Sous', branch: 'UY', status: 'activo', hours: 160, sales: 0, performance: 88, avatar: 'DF' },
  { id: 'E004', name: 'Carmen López', role: 'Chef Principal', branch: 'ES', status: 'activo', hours: 172, sales: 52400, performance: 96, avatar: 'CL' },
  { id: 'E005', name: 'Alejandro Ruiz', role: 'Maitre', branch: 'ES', status: 'activo', hours: 148, sales: 41200, performance: 89, avatar: 'AR' },
  { id: 'E006', name: 'Valentina Cruz', role: 'Bartender', branch: 'UY', status: 'descanso', hours: 140, sales: 28600, performance: 85, avatar: 'VC' },
  { id: 'E007', name: 'Pablo Sánchez', role: 'Delivery Manager', branch: 'UY', status: 'activo', hours: 164, sales: 0, performance: 82, avatar: 'PS' },
  { id: 'E008', name: 'Isabel Martínez', role: 'Contadora', branch: 'ES', status: 'activo', hours: 160, sales: 0, performance: 98, avatar: 'IM' },
];

export const customers = [
  { id: 'C001', name: 'Roberto Pérez', email: 'roberto@email.com', orders: 48, lifetime: 186400, tier: 'VIP', lastOrder: 'Hoy', branch: 'UY', satisfaction: 4.9 },
  { id: 'C002', name: 'María Santana', email: 'maria@email.com', orders: 36, lifetime: 142800, tier: 'VIP', lastOrder: 'Ayer', branch: 'ES', satisfaction: 4.8 },
  { id: 'C003', name: 'Juan Morales', email: 'juan@email.com', orders: 28, lifetime: 98200, tier: 'Gold', lastOrder: 'Hace 3 días', branch: 'UY', satisfaction: 4.7 },
  { id: 'C004', name: 'Ana Delgado', email: 'ana@email.com', orders: 21, lifetime: 76500, tier: 'Gold', lastOrder: 'Hace 1 semana', branch: 'ES', satisfaction: 4.6 },
  { id: 'C005', name: 'Carlos Ibáñez', email: 'carlos@email.com', orders: 15, lifetime: 54200, tier: 'Silver', lastOrder: 'Hace 2 semanas', branch: 'UY', satisfaction: 4.5 },
  { id: 'C006', name: 'Laura Vidal', email: 'laura@email.com', orders: 12, lifetime: 38900, tier: 'Silver', lastOrder: 'Hace 1 semana', branch: 'ES', satisfaction: 4.4 },
  { id: 'C007', name: 'Miguel Torres', email: 'miguel@email.com', orders: 8, lifetime: 22100, tier: 'Bronze', lastOrder: 'Hoy', branch: 'UY', satisfaction: 4.2 },
  { id: 'C008', name: 'Patricia Lema', email: 'patricia@email.com', orders: 6, lifetime: 17400, tier: 'Bronze', lastOrder: 'Hace 3 días', branch: 'ES', satisfaction: 4.3 },
];

export const finances = {
  today: { revenue: 284600, expenses: 118400, profit: 166200, transactions: 284 },
  month: { revenue: 1886400, expenses: 742800, profit: 1143600, growth: 18.4 },
  cashFlow: [
    { hour: '8am', income: 12400, expenses: 4200 },
    { hour: '10am', income: 28600, expenses: 8900 },
    { hour: '12pm', income: 86200, expenses: 18400 },
    { hour: '2pm', income: 124800, expenses: 32100 },
    { hour: '4pm', income: 148200, expenses: 44800 },
    { hour: '6pm', income: 196400, expenses: 68200 },
    { hour: '8pm', income: 248600, expenses: 92400 },
    { hour: '10pm', income: 284600, expenses: 118400 },
  ],
  categories: [
    { name: 'Insumos & Materia Prima', value: 38, color: '#3B82F6' },
    { name: 'Personal', value: 29, color: '#7C3AED' },
    { name: 'Alquiler & Servicios', value: 14, color: '#06B6D4' },
    { name: 'Marketing', value: 8, color: '#F59E0B' },
    { name: 'Plataformas Delivery', value: 7, color: '#F43F5E' },
    { name: 'Otros', value: 4, color: '#10B981' },
  ],
};

export const uberEatsOrders = [
  { id: 'UE-8821', client: 'Carlos M.', items: ['Empanadas x6', 'Coca Cola x2'], amount: 2100, eta: '25-35 min', status: 'nuevo', distance: '1.8 km', rating: 4.8, branch: 'UY', time: '12:34' },
  { id: 'UE-8822', client: 'Laura S.', items: ['Paella Valencia', 'Flan casero', 'Agua'], amount: 2800, eta: '30-40 min', status: 'nuevo', distance: '3.2 km', rating: 4.9, branch: 'ES', time: '12:35' },
  { id: 'UE-8819', client: 'Pedro L.', items: ['Asado x2', 'Ensalada', 'Vino'], amount: 5600, eta: 'En camino', status: 'en_camino', distance: '0.8 km', rating: 5.0, branch: 'UY', time: '12:10' },
  { id: 'UE-8820', client: 'Rosa F.', items: ['Milanesa', 'Papas', 'Refresco'], amount: 1900, eta: 'En camino', status: 'en_camino', distance: '2.1 km', rating: 4.7, branch: 'ES', time: '12:18' },
  { id: 'UE-8815', client: 'Jorge A.', items: ['Choripán x4', 'Chimichurri'], amount: 1400, eta: 'Entregado', status: 'entregado', distance: '—', rating: 4.8, branch: 'UY', time: '11:48' },
  { id: 'UE-8816', client: 'Elena B.', items: ['Tabla Quesos', 'Vino tinto'], amount: 3200, eta: 'Entregado', status: 'entregado', distance: '—', rating: 5.0, branch: 'ES', time: '11:52' },
];

export const branchMetrics = {
  UY: {
    name: 'Uruguay — Montevideo',
    flag: '🇺🇾',
    revenue: 102400,
    orders: 284,
    avgTicket: 3606,
    growth: 12.4,
    satisfaction: 4.8,
    capacity: 78,
    currency: 'UYU',
  },
  ES: {
    name: 'España — Madrid',
    flag: '🇪🇸',
    revenue: 86200,
    orders: 198,
    avgTicket: 4353,
    growth: 24.8,
    satisfaction: 4.9,
    capacity: 85,
    currency: 'EUR',
  },
};

export const notifications = [
  { id: 1, type: 'alert', message: 'Stock crítico: Aceite de oliva < 7 lt', time: '1 min', read: false },
  { id: 2, type: 'order', message: 'Nuevo pedido Uber Eats #UE-8822 — ES', time: '2 min', read: false },
  { id: 3, type: 'order', message: 'Nuevo pedido Uber Eats #UE-8821 — UY', time: '3 min', read: false },
  { id: 4, type: 'success', message: 'Pedido #8828 entregado exitosamente', time: '5 min', read: false },
  { id: 5, type: 'alert', message: 'Stock bajo: Harina 000 — 8.2 kg', time: '8 min', read: true },
  { id: 6, type: 'info', message: 'Meta diaria UY alcanzada al 94%', time: '15 min', read: true },
  { id: 7, type: 'success', message: 'Cliente VIP Roberto Pérez — Reserva confirmada', time: '22 min', read: true },
];
