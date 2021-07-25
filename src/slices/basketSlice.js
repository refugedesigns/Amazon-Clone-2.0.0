import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addToBasket(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;
      if(!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          title: newItem.title,
          description: newItem.description,
          image: newItem.image,
          totalPrice: newItem.price,
          rating: newItem.rating,
          quantity: newItem.quantity,
          hasPrime: newItem.hasPrime
        })
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price
      }
    },
    removeFromBasket(state, action) {
      const id = action.payload 
      const existingItem = state.items.find(item => item.id === id);
      state.totalQuantity--;
      if(existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id)
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price
      }
    },
    deleteFromBasket(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      state.items = state.items.filter(item => item.id !== id);
      state.totalQuantity = state.totalQuantity - existingItem.quantity;
      state.totalAmount = state.totalAmount - existingItem.totalPrice

    },
    emptyBasket(state) {
      state.items = []
      state.totalAmount = 0
      state.totalQuantity = 0
    }
  }
})

export const { addToBasket, removeFromBasket, deleteFromBasket, emptyBasket } = basketSlice.actions

export const selectItems = state => state.basket.items

export const selectTotalQuantity = state => state.basket.totalQuantity

export const selectTotalAmount = state => state.basket.totalAmount

export default basketSlice