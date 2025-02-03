"use client"
import { create } from 'zustand'

const useStore = create((set) => ({
  data: [],

  // تابع برای افزودن محصول
  updateBasket: (addProduct) => set((state) => {
    const parsedProduct = JSON.parse(addProduct);
    const existingProduct = state.data.find(product => product.id === parsedProduct.id);

    if (existingProduct) {
      return {
        data: state.data.map(product =>
          product.id === parsedProduct.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };
    } else {
      return {
        data: [...state.data, { ...parsedProduct, quantity: 1 }],
      };
    }
  }),

  // تابع برای کاهش تعداد محصول
  decreaseQuantity: (productId) => set((state) => {
    const updatedData = state.data.map(product =>
      product.id === productId && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );

    return {
      data: updatedData,
    };
  }),
  


  // تابع برای حذف محصول
  removeProduct: (productId) => set((state) => {
    const updatedData = state.data.filter(product => product.id !== productId);
    
    return {
      data: updatedData,
    };
  }),

  // محاسبه تعداد کل اقلام در سبد خرید
  cartItemCount: (state) => {
    return state.data.reduce((total, product) => total + product.quantity, 0);
  },

  // تابع برای پاک کردن سبد خرید
  clearBasket: () => set(() => ({
    data: [],
  })),
}));

export default useStore;