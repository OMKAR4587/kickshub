import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./context/CartContext.tsx";
import { WishlistProvider } from "./context/WishlistContext.tsx";
import { ToastProvider } from "./context/ToastContext"
import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
           <App />
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
