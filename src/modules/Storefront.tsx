import { useState, useMemo } from 'react';
import { addOrder } from './Orders';

interface StorefrontProps {
  onNavigate: (module: string) => void;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'burger' | 'side' | 'drink';
}

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'CALIFORNIA',
    description: 'Spicy tuna, crispy rice buns, jalapeño, unagi sauce, spicy mayo.',
    price: 18.00,
    category: 'burger',
    image: '../src/images/california.png'
  },
  {
    id: 'p2',
    name: 'Wagyu Truffle Crunch',
    description: 'A5 Wagyu beef, truffle mayo, gold leaf, crispy nori rice buns.',
    price: 56.00,
    category: 'burger',
    image: '../src/images/burger2.png'
  },
  {
    id: 'p3',
    name: 'Salmon Volcano',
    description: 'Fresh salmon tartare, avocado, tempura flakes, signature volcano sauce.',
    price: 22.00,
    category: 'burger',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'p4',
    name: 'Crispy Karaage',
    description: 'Japanese style fried chicken bites with yuzu mayo dipping sauce.',
    price: 12.00,
    category: 'side',
    image: 'https://images.unsplash.com/photo-1562967914-01efa7e87832?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'p5',
    name: 'Truffle Edamame',
    description: 'Steamed edamame tossed in white truffle oil and sea salt.',
    price: 8.00,
    category: 'side',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop'
  }
];

export default function Storefront({ onNavigate }: StorefrontProps) {
  const [view, setView] = useState<'home' | 'checkout' | 'success'>('home');
  const [cart, setCart] = useState<{ product: Product, qty: number }[]>([]);

  // Checkout Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        return { ...item, qty: Math.max(0, item.qty + delta) };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const cartTotalItems = useMemo(() => cart.reduce((acc, item) => acc + item.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.product.price * item.qty), 0), [cart]);
  const deliveryFee = 5.00;
  const taxes = subtotal * 0.09;
  const total = subtotal + deliveryFee + taxes;

  const handlePlaceOrder = () => {
    if (!firstName || !lastName || !phone || !address) {
      alert('Please fill out all delivery details.');
      return;
    }

    const newItems = cart.map(item => `${item.product.name} x${item.qty}`);

    addOrder({
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      client: `${firstName} ${lastName}`,
      type: 'delivery',
      status: 'nuevo',
      time: '0 min',
      amount: total,
      items: newItems,
      branch: 'UY'
    });

    setView('success');
    setCart([]);
  };

  const renderHeader = () => (
    <header className="w-full h-20 flex justify-between items-center px-6 md:px-12 border-b border-[#353535] bg-black/90 backdrop-blur-lg sticky top-0 z-50">
      <button onClick={() => setView('home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <span className="text-xl md:text-2xl font-black tracking-tighter text-[#e60000] italic uppercase">
          SUSHI BURGER
        </span>
        <span className="text-[#e2e2e2] font-light tracking-[0.3em] text-[10px] md:text-xs uppercase border-l border-[#353535] pl-2 h-4 flex items-center">
          EXPERIENCE
        </span>
      </button>
      <div className="flex items-center gap-6">
        {view === 'home' && (
          <button
            onClick={() => cartTotalItems > 0 && setView('checkout')}
            className="flex items-center gap-2 text-[#e2e2e2] hover:text-[#e60000] transition-colors relative"
          >
            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
            {cartTotalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#e60000] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartTotalItems}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );

  const renderFooter = () => (
    <footer className="w-full py-12 mt-auto border-t border-[#111111] bg-[#050505] flex flex-col md:flex-row justify-between items-center px-10 gap-6 opacity-80 hover:opacity-100 transition-opacity">
      <div className="flex items-center gap-2">
        <span className="text-xl font-black text-[#e2e2e2] italic uppercase">
          SUSHI BURGER
        </span>
        <span className="text-[#e60000] font-light tracking-[0.3em] text-[10px] uppercase border-l border-[#353535] pl-2 h-4 flex items-center">
          EXPERIENCE
        </span>
      </div>
      <div className="text-[#e60000] font-sans text-[10px] tracking-widest uppercase font-medium">
        © 2026 SUSHI BURGER EXPERIENCE. MARTES-DOMINGO
      </div>
      <nav className="flex gap-6">
        <a className="text-[#555555] hover:text-[#e60000] transition-colors font-sans text-[10px] tracking-widest uppercase font-medium hover:tracking-[0.2em] duration-500" href="#">Privacy</a>
        <a className="text-[#555555] hover:text-[#e60000] transition-colors font-sans text-[10px] tracking-widest uppercase font-medium hover:tracking-[0.2em] duration-500" href="#">Terms</a>
      </nav>
    </footer>
  );

  if (view === 'success') {
    return (
      <div className="bg-[#000000] text-[#e2e2e2] antialiased min-h-screen flex flex-col font-['Plus_Jakarta_Sans']">
        {renderHeader()}
        <main className="flex-grow flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-[#1A1A1A] border border-[#333333] rounded-2xl p-10 animate-fade-up">
            <div className="w-20 h-20 bg-[#e60000]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#e60000]">
              <span className="material-symbols-outlined text-5xl">check_circle</span>
            </div>
            <h1 className="font-['Space_Grotesk'] text-[32px] font-bold text-white mb-2 uppercase">Order Received!</h1>
            <p className="text-[#e9bcb5] mb-8">Your sushi burger experience is being prepared.</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => setView('home')} className="w-full bg-[#333333] hover:bg-[#444] text-white font-bold text-[14px] uppercase py-3 px-6 rounded transition-colors">
                Back to Home
              </button>
            </div>
          </div>
        </main>
        {renderFooter()}
      </div>
    );
  }

  if (view === 'checkout') {
    return (
      <div className="bg-[#000000] text-[#e2e2e2] antialiased min-h-screen flex flex-col font-['Plus_Jakarta_Sans']" style={{ fontSize: '16px' }}>
        {renderHeader()}
        <main className="flex-grow pt-10 pb-[80px] px-[16px] md:px-[40px] max-w-[1280px] mx-auto w-full animate-fade-up">
          <button onClick={() => setView('home')} className="mb-6 flex items-center gap-2 text-[#e9bcb5] hover:text-[#e60000] transition-colors uppercase font-bold text-[12px]">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Menu
          </button>

          <div className="mb-12">
            <h1 className="font-['Space_Grotesk'] text-[56px] md:text-[64px] font-bold leading-[1.1] tracking-[-0.04em] text-[#e2e2e2] uppercase mb-4">Checkout</h1>
            <p className="text-[18px] text-[#e9bcb5]">Completa los detalles de tu pedido a continuación.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px]">
            {/* Left Column: Forms */}
            <div className="lg:col-span-7 space-y-12">
              <section className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-8">
                <h2 className="font-['Space_Grotesk'] text-[24px] font-semibold text-[#e2e2e2] mb-6 uppercase flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#e60000]">local_shipping</span>
                  Detalles de entrega
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <label className="cursor-pointer">
                    <input defaultChecked className="peer sr-only" name="order_type" type="radio" value="delivery" />
                    <div className="p-4 border-2 border-[#e60000] rounded bg-[#1b1b1b] text-center peer-checked:shadow-[0_0_15px_rgba(230,0,0,0.15)] transition-all">
                      <span className="font-bold text-[14px] text-[#e2e2e2] uppercase">Delivery</span>
                    </div>
                  </label>
                  <label className="cursor-pointer opacity-50 cursor-not-allowed">
                    <input className="peer sr-only" disabled name="order_type" type="radio" value="pickup" />
                    <div className="p-4 border border-[#333333] rounded bg-[#0e0e0e] text-center">
                      <span className="font-bold text-[14px] text-[#e9bcb5] uppercase">Pickup</span>
                    </div>
                  </label>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-bold text-[14px] text-[#e9bcb5] mb-2 uppercase">Nombre</label>
                      <input
                        value={firstName} onChange={e => setFirstName(e.target.value)}
                        className="w-full bg-[#0e0e0e] border-b border-[#333333] border-t-0 border-x-0 focus:border-[#e60000] focus:ring-0 text-[#e2e2e2] py-3 px-3 rounded-t-md transition-colors placeholder:text-[#444] outline-none"
                        placeholder="Akira" type="text" />
                    </div>
                    <div>
                      <label className="block font-bold text-[14px] text-[#e9bcb5] mb-2 uppercase">Apellido</label>
                      <input
                        value={lastName} onChange={e => setLastName(e.target.value)}
                        className="w-full bg-[#0e0e0e] border-b border-[#333333] border-t-0 border-x-0 focus:border-[#e60000] focus:ring-0 text-[#e2e2e2] py-3 px-3 rounded-t-md transition-colors placeholder:text-[#444] outline-none"
                        placeholder="Tetsuo" type="text" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-[14px] text-[#e9bcb5] mb-2 uppercase">Dirección de entrega</label>
                    <input
                      value={address} onChange={e => setAddress(e.target.value)}
                      className="w-full bg-[#0e0e0e] border-b border-[#333333] border-t-0 border-x-0 focus:border-[#e60000] focus:ring-0 text-[#e2e2e2] py-3 px-3 rounded-t-md transition-colors placeholder:text-[#444] outline-none"
                      placeholder="123 Neon Street, Apt 4B" type="text" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-bold text-[14px] text-[#e9bcb5] mb-2 uppercase">Número de teléfono</label>
                      <input
                        value={phone} onChange={e => setPhone(e.target.value)}
                        className="w-full bg-[#0e0e0e] border-b border-[#333333] border-t-0 border-x-0 focus:border-[#e60000] focus:ring-0 text-[#e2e2e2] py-3 px-3 rounded-t-md transition-colors placeholder:text-[#444] outline-none"
                        placeholder="+1 (555) 019-8372" type="tel" />
                    </div>
                    <div>
                      <label className="block font-bold text-[14px] text-[#e9bcb5] mb-2 uppercase">Instrucciones (Opcional)</label>
                      <input
                        className="w-full bg-[#0e0e0e] border-b border-[#333333] border-t-0 border-x-0 focus:border-[#e60000] focus:ring-0 text-[#e2e2e2] py-3 px-3 rounded-t-md transition-colors placeholder:text-[#444] outline-none"
                        placeholder="Dejar en el lobby" type="text" />
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-8">
                <h2 className="font-['Space_Grotesk'] text-[24px] font-semibold text-[#e2e2e2] mb-6 uppercase flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#e60000]">credit_card</span>
                  Método de pago
                </h2>
                <div className="space-y-4">
                  <label className="flex items-center p-4 border border-[#e60000] bg-[#1b1b1b] rounded cursor-pointer shadow-[0_0_15px_rgba(230,0,0,0.1)]">
                    <input defaultChecked className="text-[#e60000] focus:ring-[#e60000] bg-[#0e0e0e] border-[#333333] mr-4" name="payment" type="radio" />
                    <span className="font-bold text-[14px] text-[#e2e2e2] uppercase">Tarjeta de crédito / débito</span>
                    <span className="ml-auto material-symbols-outlined text-[#e9bcb5]">credit_card</span>
                  </label>
                  <label className="flex items-center p-4 border border-[#333333] bg-[#0e0e0e] rounded cursor-pointer hover:border-[#5f3f3a] transition-colors">
                    <input className="text-[#e60000] focus:ring-[#e60000] bg-[#0e0e0e] border-[#333333] mr-4" name="payment" type="radio" />
                    <span className="font-bold text-[14px] text-[#e2e2e2] uppercase">Billetera digital</span>
                    <span className="ml-auto material-symbols-outlined text-[#e9bcb5]">account_balance_wallet</span>
                  </label>
                  <label className="flex items-center p-4 border border-[#333333] bg-[#0e0e0e] rounded cursor-pointer hover:border-[#5f3f3a] transition-colors">
                    <input className="text-[#e60000] focus:ring-[#e60000] bg-[#0e0e0e] border-[#333333] mr-4" name="payment" type="radio" />
                    <span className="font-bold text-[14px] text-[#e2e2e2] uppercase">Cash (Efectivo)</span>
                    <span className="ml-auto material-symbols-outlined text-[#e9bcb5]">payments</span>
                  </label>
                </div>
              </section>
            </div>

            {/* Right Column: Summary */}
            <div className="lg:col-span-5">
              <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-8 sticky top-28">
                <h2 className="font-['Space_Grotesk'] text-[24px] font-semibold text-[#e2e2e2] mb-6 uppercase border-b border-[#333333] pb-4">Resumen del pedido</h2>

                <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 items-start">
                      <div className="w-16 h-16 bg-[#0e0e0e] rounded overflow-hidden shrink-0 border border-[#333333]">
                        <img alt={item.product.name} className="w-full h-full object-cover" src={item.product.image} />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-[14px] text-[#e2e2e2] uppercase leading-tight pr-2">{item.product.name}</h3>
                          <span className="font-bold text-[14px] text-[#e2e2e2]">${(item.product.price * item.qty).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateQty(item.product.id, -1)} className="w-6 h-6 rounded-full bg-[#333] hover:bg-[#e60000] text-white flex items-center justify-center transition-colors">
                            <span className="material-symbols-outlined text-[14px]">remove</span>
                          </button>
                          <span className="font-bold text-[14px] text-[#e2e2e2] w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.product.id, 1)} className="w-6 h-6 rounded-full bg-[#333] hover:bg-[#e60000] text-white flex items-center justify-center transition-colors">
                            <span className="material-symbols-outlined text-[14px]">add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-[#333333] mb-8">
                  <div className="flex justify-between text-[#e9bcb5] text-[16px]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#e9bcb5] text-[16px]">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#e9bcb5] text-[16px]">
                    <span>Taxes</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#e2e2e2] font-['Space_Grotesk'] text-[24px] font-semibold pt-4 border-t border-[#333333] mt-4">
                    <span className="uppercase">Total</span>
                    <span className="text-[#e60000]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button onClick={handlePlaceOrder} className="w-full bg-[#e60000] text-white font-bold text-[14px] uppercase py-4 px-6 rounded hover:shadow-[0_0_20px_rgba(230,0,0,0.3)] transition-all duration-300 flex justify-center items-center gap-2">
                  <span>Place Order</span>
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </main>
        {renderFooter()}
      </div>
    );
  }

  // HOME VIEW
  return (
    <div className="bg-[#000000] text-[#e2e2e2] antialiased min-h-screen flex flex-col font-['Plus_Jakarta_Sans']">
      {renderHeader()}

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=2000&auto=format&fit=crop"
            alt="Sushi Burger Background"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-up">
          <h2 className="text-[#e60000] font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-4">THE FIRST AND ORIGINAL</h2>
          <h1 className="font-['Space_Grotesk'] text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase leading-[0.9] tracking-tighter mb-6">
            VIVI LA<br />EXPERIENCIA
          </h1>
          <p className="text-[#e9bcb5] text-lg md:text-xl max-w-2xl mx-auto mb-10">
            La primera y única <span className="text-[#e60000] font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-4">SUSHIBURGER</span>, brindando una experiencia premium en más de 4 países por   el mundo!
          </p>
          <button
            onClick={() => {
              document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#e60000] hover:bg-white hover:text-black text-white font-bold text-[14px] tracking-widest uppercase py-4 px-10 rounded-full transition-all duration-300"
          >
            REALIZAR PEDIDO
          </button>
        </div>
      </section>

      {/* Menu Section */}
      <main id="menu-section" className="flex-grow py-20 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold text-white uppercase">Signature Menu</h2>
            <div className="h-1 w-20 bg-[#e60000] mt-4"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map(product => {
            const inCart = cart.find(i => i.product.id === product.id)?.qty || 0;
            return (
              <div key={product.id} className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden group hover:border-[#e60000]/50 transition-colors">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {inCart > 0 && (
                    <div className="absolute top-4 right-4 bg-[#e60000] text-white font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                      {inCart}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white uppercase leading-tight pr-4">{product.name}</h3>
                    <span className="text-xl font-bold text-[#e60000]">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-[#999] mb-6 text-sm leading-relaxed min-h-[40px]">{product.description}</p>

                  {inCart === 0 ? (
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full border border-[#444] hover:border-[#e60000] bg-transparent hover:bg-[#e60000] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
                    >
                      <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                      Agregar al pedido
                    </button>
                  ) : (
                    <div className="flex items-center justify-between border border-[#e60000] rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQty(product.id, -1)}
                        className="w-12 h-12 flex items-center justify-center bg-[#1a0000] hover:bg-[#e60000] text-white transition-colors"
                      >
                        <span className="material-symbols-outlined">remove</span>
                      </button>
                      <span className="font-bold text-white text-lg">{inCart}</span>
                      <button
                        onClick={() => updateQty(product.id, 1)}
                        className="w-12 h-12 flex items-center justify-center bg-[#1a0000] hover:bg-[#e60000] text-white transition-colors"
                      >
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Floating Action Button for Mobile / Sticky Cart */}
      {cartTotalItems > 0 && view === 'home' && (
        <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/90 to-transparent z-40 animate-fade-up flex justify-center">
          <button
            onClick={() => setView('checkout')}
            className="w-full max-w-md bg-[#e60000] text-white rounded-full py-4 px-6 font-bold uppercase tracking-wider shadow-[0_10px_30px_rgba(230,0,0,0.3)] hover:scale-105 transition-transform flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white text-[#e60000] w-8 h-8 rounded-full flex items-center justify-center">
                {cartTotalItems}
              </div>
              <span>Checkout</span>
            </div>
            <span>${subtotal.toFixed(2)}</span>
          </button>
        </div>
      )}

      {renderFooter()}
    </div>
  );
}
