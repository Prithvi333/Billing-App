import { createContext, useEffect, useState } from "react";
import { fetchCategory } from "../service/CategoryService";
import { fetchItems } from "../service/ItemService";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [auth, setAuth] = useState({ token: null, role: null });
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (itemInCart) => itemInCart.name === item.name
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((itemInCart) =>
          itemInCart.name === item.name
            ? { ...itemInCart, quantity: itemInCart.quantity + 1 }
            : itemInCart
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.itemId !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity } : item
      )
    );
  };

  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("token") && localStorage.getItem("role")) {
        setAuth({
          token: localStorage.getItem("token"),
          role: localStorage.getItem("role"),
        });
      }
      const response = await fetchCategory();
      const itemResponse = await fetchItems();
      setCategories(response.data);
      setItems(itemResponse.data);
    }
    loadData();
  }, []);

  const setAuthData = (token, role) => {
    setAuth({ token, role });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const contextValue = {
    categories,
    setCategories,
    auth,
    setAuthData,
    items,
    setItems,
    addToCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
