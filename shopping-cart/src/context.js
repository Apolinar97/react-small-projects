import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'

const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const initialState = {
    loading: false,
    cart: cartItems,
    total: 0,
    amount: 0
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }
  const increaseItemCount = (id) => {
    dispatch({ type: "INCREASE_ITEM_COUNT", payload: id })
  }
  const decreaseItemCount = (id) => {
    dispatch({ type: "DECREASE_ITEM_COUNT", payload: id })
  }

  const fetchData = async () => {
    dispatch({ type: 'LOADING' })
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
  }
  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' })
  }, state.cart)

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increaseItemCount,
        decreaseItemCount
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
