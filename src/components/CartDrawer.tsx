import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Shield, CreditCard, CheckCircle2, ArrowRight, Lock, Truck, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  currency: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'shipping' | 'payment' | 'success'>('shipping');

  // Shipping Form State
  const [fullName, setFullName] = useState('Alexander Wright');
  const [shippingAddress, setShippingAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('San Francisco');
  const [postalCode, setPostalCode] = useState('94107');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
  };
  const sym = currencySymbols[currency] || '$';

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const code = promoCode.trim().toUpperCase();
    if (code === 'TITANIUM10' || code === 'AURA10') {
      setAppliedDiscount(10);
      setPromoSuccess('10% Titanium VIP Discount Applied!');
    } else if (code === 'AURA2026') {
      setAppliedDiscount(15);
      setPromoSuccess('15% 2026 Launch Pass Applied!');
    } else {
      setPromoError('Invalid promo code. Try "TITANIUM10"');
    }
  };

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkoutStep === 'shipping') {
      setCheckoutStep('payment');
    } else if (checkoutStep === 'payment') {
      setCheckoutStep('success');
      onClearCart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/70 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-neutral-200 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-neutral-200/80 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-neutral-950" />
              <h2 className="font-extrabold text-lg text-neutral-950 font-sans">Your Shopping Bag</h2>
              <span className="text-xs font-mono text-neutral-500 font-bold bg-neutral-100 px-2 py-0.5 rounded-full">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Contents or Checkout View */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Free Courier Shipping Progress Bar */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-mono font-bold text-neutral-800">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" /> Express White-Glove Delivery
                </span>
                <span className="text-emerald-700">FREE</span>
              </div>
              <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-full rounded-full" />
              </div>
            </div>

            {/* Items List */}
            {items.length === 0 && checkoutStep !== 'success' ? (
              <div className="py-20 text-center space-y-3 text-neutral-400">
                <div className="w-12 h-12 rounded-full bg-neutral-100 mx-auto flex items-center justify-center text-neutral-300">
                  <Truck className="w-6 h-6" />
                </div>
                <div className="font-bold text-neutral-800 text-sm">Your shopping bag is empty</div>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Explore our flagship titanium phones and spatial accessories to build your custom setup.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white border border-neutral-200 rounded-2xl flex items-start gap-4 hover:border-neutral-300 transition-colors"
                  >
                    <div className="w-16 h-16 bg-neutral-50 rounded-xl border border-neutral-200 p-1 shrink-0 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-xs text-neutral-950 truncate">{item.name}</div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-400 hover:text-rose-600 p-0.5 rounded transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-neutral-500 font-mono space-y-0.5">
                        <div>
                          Finish: <span className="font-semibold text-neutral-800">{item.selectedColor.name}</span>
                        </div>
                        {item.selectedStorage && (
                          <div>Storage: <span className="font-semibold text-neutral-800">{item.selectedStorage}</span></div>
                        )}
                        {item.engravingText && (
                          <div className="text-amber-700 font-bold">Laser Etched: "{item.engravingText}"</div>
                        )}
                        {item.hasAuraCare && (
                          <div className="text-emerald-700 flex items-center gap-1 font-bold">
                            <Shield className="w-3 h-3" /> AuraCare Protection Active
                          </div>
                        )}
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-neutral-200 text-neutral-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-mono text-xs font-bold text-neutral-900">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-neutral-200 text-neutral-700"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="font-mono font-black text-xs text-neutral-950">
                          {sym}{item.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Promo Code Input */}
            {items.length > 0 && (
              <form onSubmit={handleApplyPromo} className="space-y-1 pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. TITANIUM10)"
                    className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs font-mono text-neutral-900 outline-hidden uppercase placeholder:normal-case placeholder:text-neutral-400"
                  />
                  <button
                    type="submit"
                    className="bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs px-4 py-2 rounded-xl transition-colors font-bold"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <div className="text-[11px] text-rose-600 font-mono">{promoError}</div>}
                {promoSuccess && <div className="text-[11px] text-emerald-600 font-mono font-bold">{promoSuccess}</div>}
              </form>
            )}

          </div>

          {/* Drawer Footer & Total Price */}
          {items.length > 0 && (
            <div className="p-6 border-t border-neutral-200 bg-white space-y-4 shadow-xl">
              <div className="space-y-1.5 text-xs text-neutral-600 font-mono">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-neutral-900">{sym}{subtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-bold">
                    <span>VIP Discount ({appliedDiscount}%)</span>
                    <span>-{sym}{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span>Express Courier Shipping</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-sm font-black text-neutral-950">
                  <span>Total Due</span>
                  <span className="text-lg">{sym}{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm py-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                id="drawer-checkout-btn"
              >
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Express Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Express Checkout Modal Overlay */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden p-6 space-y-6">
            
            {/* Modal Top */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-neutral-950 text-white font-bold flex items-center justify-center text-xs">
                  A
                </div>
                <h3 className="font-extrabold text-base text-neutral-950 font-sans">Aura Express Checkout</h3>
              </div>
              <button
                onClick={() => setIsCheckingOut(false)}
                className="p-1 text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Multi-step form */}
            {checkoutStep === 'shipping' && (
              <form onSubmit={handleProcessOrder} className="space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                  Step 1. Express Delivery Address
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-neutral-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-neutral-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-neutral-700 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-semibold text-neutral-700 mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-neutral-950 text-white font-bold text-xs px-6 py-3 rounded-full flex items-center gap-2 shadow-md"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {checkoutStep === 'payment' && (
              <form onSubmit={handleProcessOrder} className="space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                  Step 2. Payment Method
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-neutral-800" />
                    <div>
                      <div className="font-bold text-xs text-neutral-900">Apple Pay / Credit Card</div>
                      <div className="text-[10px] text-neutral-500 font-mono">End-to-end 256-Bit Encrypted</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-950">{sym}{grandTotal.toFixed(2)}</span>
                </div>

                <div className="space-y-3 pt-2">
                  <input
                    type="text"
                    defaultValue="4242 •••• •••• 4242"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs font-mono text-neutral-900"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      defaultValue="08 / 28"
                      className="bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs font-mono text-neutral-900"
                    />
                    <input
                      type="text"
                      defaultValue="777"
                      className="bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs font-mono text-neutral-900"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('shipping')}
                    className="text-xs font-bold text-neutral-600 hover:text-neutral-900"
                  >
                    &larr; Back to Address
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-full flex items-center gap-2 shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Order ({sym}{grandTotal.toFixed(2)})</span>
                  </button>
                </div>
              </form>
            )}

            {checkoutStep === 'success' && (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce-subtle">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-neutral-950 font-sans">Order Confirmed!</h3>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-neutral-900">{fullName}</span>. Your order <span className="font-mono font-bold text-neutral-900">#AURA-2026-9814</span> has been placed. White-glove courier dispatch tracking will be emailed shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsCheckingOut(false);
                      setCheckoutStep('shipping');
                      onClose();
                    }}
                    className="bg-neutral-950 text-white font-bold text-xs px-6 py-3 rounded-full"
                  >
                    Return to Store
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
