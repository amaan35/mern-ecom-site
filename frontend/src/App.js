import react, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import AuthUserRoute from "./components/AuthUserRoute";
import AddProduct from "./pages/AddProduct";
import AdminUserRoute from "./components/AdminUserRoute";
import ProductDetails from "./pages/ProductDetails";
import UpdateProduct from "./pages/UpdateProduct";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import { useDispatch } from "react-redux";
import { signOut } from "./redux/user/userSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleBeforeUnload = () => {
      dispatch(signOut());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<AuthUserRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<MyOrders />} />
        </Route>
        <Route element={<AdminUserRoute />}>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/updateproduct" element={<UpdateProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
