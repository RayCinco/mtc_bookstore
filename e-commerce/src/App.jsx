import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./components/AppLayout";
import StyleProvider from "./components/StyleProvider";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Reserve from "./pages/Reserve";
import Contact from "./pages/Contact";
import Product from "./pages/Product";

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
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Navigate replace to="/" />} />
              <Route path="shop" element={<Shop />} />
              <Route path="cart" element={<Cart />} />
              <Route path="contact" element={<Contact />} />
              <Route path="product" element={<Product />} />
              <Route path="product/:id" element={<Product />} />
              <Route path="reserve" element={<Reserve />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </StyleProvider>
  );
}

export default App;
