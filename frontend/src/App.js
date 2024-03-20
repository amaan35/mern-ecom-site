import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import AuthUserRoute from "./components/AuthUserRoute";
import AddProduct from "./pages/AddProduct";
import AdminUserRoute from "./components/AdminUserRoute";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route element={<AuthUserRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<AdminUserRoute />}>
          <Route path="/addproduct" element={<AddProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
