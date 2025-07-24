
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cartItems: [],
  addToCart: (product) => set((state) => {
    const existingIndex = state.cartItems.findIndex(item => item.id === product.id);
    if (existingIndex !== -1) {
      const updatedItems = [...state.cartItems];
      updatedItems[existingIndex].quantity += 1;
      return { cartItems: updatedItems };
    }
    return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
  }),
  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter(item => item.id !== productId)
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { cartItems: state.cartItems.filter(item => item.id !== productId) };
      }
      const updatedItems = state.cartItems.map(item => item.id === productId ? { ...item, quantity } : item);
      return { cartItems: updatedItems };
    }),
  clearCart: () => set({ cartItems: [] }),
}));
