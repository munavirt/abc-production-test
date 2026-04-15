import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartProvider } from "./lib/cart-context";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderTracking from "./pages/OrderTracking";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Navbar />
                <main className="min-h-screen">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:productId" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-success" element={<OrderSuccess />} />
                        <Route path="/order-tracking" element={<OrderTracking />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
        </CartProvider>
    );
}
