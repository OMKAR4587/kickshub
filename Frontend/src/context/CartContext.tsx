import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "../types/Product";
import { useAuth } from "./AuthContext";

import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCartApi,
} from "../services/api";

export type CartItem = {
  id?: string;
  product: Product;
  size: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (
    product: Product,
    size: number,
    quantity: number,
  ) => Promise<void>;
  removeFromCart: (productId: string, size: number) => Promise<void>;
  updateQuantity: (
    productId: string,
    size: number,
    quantity: number,
  ) => Promise<void>;
  clearCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const { token, isAuthenticated } = useAuth();

  const [items, setItems] = useState<CartItem[]>([]);

  /*
   * Load cart from PostgreSQL when the user logs in.
   */
  useEffect(() => {
    if (!token || !isAuthenticated) {
      setItems([]);
      return;
    }

    async function loadCart() {
      if (!token) {
        return;
      }

      try {
        const data = await getCart(token);

        if (!data.success) {
          return;
        }

        const databaseItems = data.cart?.items ?? [];

        setItems(
          databaseItems.map((item: any) => ({
            id: item.id,
            product: item.product,
            size: item.size,
            quantity: item.quantity,
          })),
        );
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }

    loadCart();
  }, [token, isAuthenticated]);

  /*
   * Add product to PostgreSQL cart.
   */
  const addToCart = async (
    product: Product,
    size: number,
    quantity: number,
  ) => {
    if (!token) {
      return;
    }

    try {
      const data = await addCartItem(token, product.id, size, quantity);

      if (!data.success) {
        return;
      }

      const item = data.item;

      setItems((currentItems) => {
        const existingItem = currentItems.find(
          (currentItem) =>
            currentItem.product.id === product.id && currentItem.size === size,
        );

        if (existingItem) {
          return currentItems.map((currentItem) =>
            currentItem.product.id === product.id && currentItem.size === size
              ? {
                  ...currentItem,
                  id: item.id,
                  quantity: item.quantity,
                }
              : currentItem,
          );
        }

        return [
          ...currentItems,
          {
            id: item.id,
            product: item.product,
            size: item.size,
            quantity: item.quantity,
          },
        ];
      });
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  /*
   * Remove item from PostgreSQL cart.
   */
  const removeFromCart = async (productId: string, size: number) => {
    if (!token) {
      return;
    }

    const item = items.find(
      (currentItem) =>
        currentItem.product.id === productId && currentItem.size === size,
    );

    if (!item?.id) {
      return;
    }

    try {
      const data = await removeCartItem(token, item.id);

      if (!data.success) {
        return;
      }

      setItems((currentItems) =>
        currentItems.filter(
          (currentItem) =>
            !(
              currentItem.product.id === productId && currentItem.size === size
            ),
        ),
      );
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  };

  /*
   * Update quantity in PostgreSQL.
   */
  const updateQuantity = async (
    productId: string,
    size: number,
    quantity: number,
  ) => {
    if (!token) {
      return;
    }

    const item = items.find(
      (currentItem) =>
        currentItem.product.id === productId && currentItem.size === size,
    );

    if (!item?.id) {
      return;
    }

    if (quantity <= 0) {
      await removeFromCart(productId, size);
      return;
    }

    try {
      const data = await updateCartItem(token, item.id, quantity);

      if (!data.success) {
        return;
      }

      setItems((currentItems) =>
        currentItems.map((currentItem) =>
          currentItem.product.id === productId && currentItem.size === size
            ? {
                ...currentItem,
                quantity,
              }
            : currentItem,
        ),
      );
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  /*
   * Clear PostgreSQL cart.
   */
  const clearCart = async () => {
    if (!token) {
      return;
    }

    try {
      const data = await clearCartApi(token);

      if (!data.success) {
        return;
      }

      setItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const cartTotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + Number(item.product.price) * item.quantity,
        0,
      ),
    [items],
  );

  const value = {
    items,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
