import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cartItems: [],
  isSideCartOpen: false,
  openSideCart: () => set({ isSideCartOpen: true }),
  closeSideCart: () => set({ isSideCartOpen: false }),

  addToCart: (product) => set((state) => {
    const existingItem = state.cartItems.find(item => item.id === product.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = state.cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...state.cartItems, { ...product, quantity: 1 }];
    }
    return {
      cartItems: updatedCart,
      isSideCartOpen: true, 
    };
  }),

  removeFromCart: (id) => set((state) => ({
    cartItems: state.cartItems.filter(item => item.id !== id)
  })),
  increaseQuantity: (id) => set((state) => ({
    cartItems: state.cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  })),
  decreaseQuantity: (id) => set((state) => ({
    cartItems: state.cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    )
  })),
  clearCart: () => set({ cartItems: [] }),
}));
