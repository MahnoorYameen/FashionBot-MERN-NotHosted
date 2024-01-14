import React, { createContext, useEffect, useReducer } from 'react'
import { reducer } from './reducer'
export const CartContext = createContext("initial value")

export default function CartContextProvider({ children }) {

  function getcartdata(){
    let cartdata = localStorage.getItem('cart');
    if (cartdata === null || cartdata === undefined) {
      return [];
    } else {
      return JSON.parse(cartdata);
    }
  }
  
  const initialData = {
    cart: getcartdata()
  }
  
  const [cart_state,cart_dispatch] = useReducer(reducer, initialData)
  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart_state.cart))
  },[cart_state.cart])
  return (
  <>
      <CartContext.Provider value={{cart_state, cart_dispatch}}>
        {children}
      </CartContext.Provider>


    </>
  )
}
