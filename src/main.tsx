import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./context/CartContext.tsx";
import { WishlistProvider } from "./context/WishlistContext.tsx";
import { ToastProvider } from "./context/ToastContext"
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
           <App />
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  </StrictMode>,
);
