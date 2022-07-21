import { createContext, useEffect, useState, useMemo, useReducer } from "react";
import Cookies from "js-cookie";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {};
  const [cart, setCart] = useState(initialState);
  const [state, dispatch] = useReducer(AppReducer, cart);

  // const contextCart = useMemo(() => {
  //   return [cart, setCart];
  // }, [cart, setCart]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      setCart(cartData);
    }
  }, []);

  // const caart = (product) => ({
  //   type: "add_cart",
  //   payload: [...cart, product],
  // });

  useEffect(() => {
    if (cart !== initialState)
      localStorage.setItem("cart", JSON.stringify(cart));

    // Cookies.set("cart", cart, { expires: 1 / 24 });
    // let products = Cookies.get("cart");
    // console.log(products);
  }, [cart]);

  const addToCart = (newProduct) => {
    const prevProduct = cart[newProduct._id];
    const prevQuantity = prevProduct?.quantity || 0;
    const prevPrice = prevProduct?.currentPrice || 0;
    setCart((prev) => ({
      ...prev,
      [newProduct._id]: {
        ...newProduct,
        quantity: prevQuantity + 1,
        currentPrice: prevPrice + newProduct.price,
      },
    }));
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const newData = { ...prev };
      delete newData[productId];
      return newData;
    });
  };

  const resetCart = () => {
    setCart({});
  };

  const selectQuantity = (value, productId) => {
    const product = cart[productId];
    const updatedPrice = product.price * value;
    setCart((prev) => ({
      ...prev,
      [productId]: {
        ...product,
        quantity: parseInt(value),
        currentPrice: updatedPrice,
      },
    }));
  };

  return (
    <DataContext.Provider
      value={{
        cart,
        setCart,
        removeFromCart,
        resetCart,
        selectQuantity,
        state,
        dispatch,
        addToCart,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "add_cart": {
      return { ...state, cart: action.payload };
    }
    default:
      return state;
  }
};
