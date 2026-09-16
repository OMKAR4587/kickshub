import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";
import Product from "./pages/Products/Product";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Account from "./pages/Account/Account";
import ProductDetail from "./pages/Productdetails/ProductDetail";
function App() {
 return(
   <BrowserRouter>
    <Routes>
     <Route element={<MainLayout/>}>
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<Product/>}/>
      <Route path="/products/:id" element={<ProductDetail/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/account" element={<Account/>}/>
     </Route>
    </Routes>
  </BrowserRouter>
 )
}

export default App;
