import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Cart from "./pages/Cart.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";
import FinalizePurchase from "./pages/FinalizePurchase.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/productdetail",
    element: <ProductDetail />,
  },
  {
    path: "/finalizepurchase",
    element: <FinalizePurchase />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
