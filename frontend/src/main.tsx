import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ProductProvider } from "./context/productContext/productContext.tsx";
import { UserProvider } from "./context/userContext/userContext.tsx";
import { CartProvider } from "./context/cartContext/cartContext.tsx";
import { AddressProvider } from "./context/addressContext/addresscontext.tsx";
import { WishProvider } from "./context/wishContext/wishContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProductProvider>
      <UserProvider>
        <CartProvider>
          <AddressProvider>
            <WishProvider>
              <App />
            </WishProvider>
          </AddressProvider>
        </CartProvider>
      </UserProvider>
    </ProductProvider>
  </React.StrictMode>
);
