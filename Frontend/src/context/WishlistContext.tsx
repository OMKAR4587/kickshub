import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useAuth } from "./AuthContext";

import {
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
} from "../services/api";

type WishlistContextType = {
  wishlist: string[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<void>;
};

const WishlistContext =
  createContext<WishlistContextType | undefined>(
    undefined,
  );

type WishlistProviderProps = {
  children: ReactNode;
};

export function WishlistProvider({
  children,
}: WishlistProviderProps) {
  const { token, isAuthenticated } = useAuth();

  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    if (!token || !isAuthenticated) {
      setWishlist([]);
      return;
    }

    async function loadWishlist() {
      if (!token) {
        return;
      }

      try {
        const data = await getWishlist(token);

        if (!data.success) {
          return;
        }

        const productIds = data.wishlist.map(
          (item: { productId: string }) =>
            item.productId,
        );

        setWishlist(productIds);
      } catch (error) {
        console.error(
          "Failed to load wishlist:",
          error,
        );
      }
    }

    loadWishlist();
  }, [token, isAuthenticated]);

  const isWishlisted = (productId: string) => {
    return wishlist.includes(productId);
  };

  const toggleWishlist = async (
    productId: string,
  ) => {
    if (!token) {
      return;
    }

    const alreadyWishlisted =
      wishlist.includes(productId);

    try {
      if (alreadyWishlisted) {
        const data = await removeWishlistItem(
          token,
          productId,
        );

        if (!data.success) {
          return;
        }

        setWishlist((currentWishlist) =>
          currentWishlist.filter(
            (id) => id !== productId,
          ),
        );

        return;
      }

      const data = await addWishlistItem(
        token,
        productId,
      );

      if (!data.success) {
        return;
      }

      setWishlist((currentWishlist) => [
        ...currentWishlist,
        productId,
      ]);
    } catch (error) {
      console.error(
        "Failed to update wishlist:",
        error,
      );
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isWishlisted,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider",
    );
  }

  return context;
}