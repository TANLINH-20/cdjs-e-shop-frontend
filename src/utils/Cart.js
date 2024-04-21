import { useState, useEffect, createContext, useContext } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const checkCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  const addToCart = (cartItem) => {
    const existingItem = cart.find((item) => item.id === cartItem.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === cartItem.id
          ? { ...item, qty: item.qty + cartItem.qty }
          : item
      );
    } else {
      updatedCart = [...cart, cartItem];
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateCart = (id, qty) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, qty: qty } : item
    );
    setCart(updatedCart.filter((item) => item.qty > 0));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const deleteFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const cartTotal = () => {
    return cart.reduce((total, item) => total + item.qty * item.price, 0);
  };

  const value = {
    cart,
    checkCart,
    addToCart,
    updateCart,
    deleteFromCart,
    cartTotal,
    clearCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
