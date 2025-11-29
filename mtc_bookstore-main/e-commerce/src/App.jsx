import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./components/AppLayout";
import StyleProvider from "./components/StyleProvider";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import ShopDetails from "./features/product/productComponents/ShopDetails";
import { Toaster } from "react-hot-toast";
import UserOrders from "./features/account/UserOrders";
import OrderDetails from "./features/order/orderComponents/OrderDetails";
import AccountDetails from "./features/account/AccountDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Account from "./pages/Account";
import Messages from "./features/account/Messages";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <StyleProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="home" element={<Navigate replace to="/" />} />
              <Route path="shop" element={<Shop />} />
              <Route path="cart" element={<Cart />} />
              <Route path="contact" element={<Contact />} />
              <Route path="product" element={<Product />} />
              <Route path="/product/:id" element={<ShopDetails />} />

              <Route path="order" element={<Order />} />
              <Route path="account" element={<Account />}>
                <Route index element={<AccountDetails />} />
                <Route path="orders" element={<UserOrders />} />
                <Route path="orders/:id" element={<OrderDetails />} />
                <Route path="messages" element={<Messages />} />
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </BrowserRouter>
    </StyleProvider>
  );
}

export default App;
