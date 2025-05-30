import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface CartItem {
  id: string;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addItem: (
    itemToAdd: Omit<CartItem, "quantity" | "imageUrl">,
    quantity?: number
  ) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function useCartContext(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext deve ser usado dentro de um CartProvider");
  }
  return context;
}

interface CartProviderProps {
  children: ReactNode;
  initialItemsForDev?: CartItem[];
}

const CART_STORAGE_KEY = "meuEcommerceShoppingCart";

export function CartProvider({
  children,
  initialItemsForDev = [],
}: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const localData = localStorage.getItem(CART_STORAGE_KEY);
      if (localData) {
        return JSON.parse(localData);
      }
    } catch (error) {
      console.error("Erro ao carregar o carrinho do localStorage:", error);
    }
    return initialItemsForDev;
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Erro ao salvar o carrinho no localStorage:", error);
    }
  }, [cartItems]);

  const addItem = (
    itemToAdd: Omit<CartItem, "quantity" | "imageUrl">,
    quantity: number = 1
  ) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemToAdd.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === itemToAdd.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          ...itemToAdd,
          quantity: quantity,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.id !== itemId);
      }
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getItemCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const contextValue: CartContextType = {
    cartItems,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    getItemCount,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
