import { useEffect } from "react";
import {Routes, Route } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import {useDispatch} from "react-redux"
import { auth } from "./firebase";
import { currentUser } from "./functions/auth";
import MainNavbar from "./Components/navbar/MainNavbar";
import Home from "./Home";
import Brand from "./Components/brands/Brand";
import Category from "./Components/category/Category";
import Products from "./Components/products/Product";
import ProductIndex from "./Components/products/ProductIndex";
import ProductDetail from "./Components/products/ProductDetail";
import Login from "./Components/auth/login";
import Register from "./Components/auth/register";
import CompleteRegisteration from "./Components/auth/register/CompleteRegisteration"
import ForgotPassword from "./Components/auth/forgot"
import History from "./pages/user/History"
import AuthUserRoute from "./Components/routes/AuthUserRoute"
import UpdatePassword from "./pages/user/UpdatePassword"
import Wishlist from "./pages/user/Wishlist"
import NotFound from "./pages/404/NotFound"
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddCategory from "./pages/admin/category/AddCategory";
import AddSubCategory from "./pages/admin/subcategory/CreateSubCategory";
import UpdateCategory from "./pages/admin/category/UpdateCategory";
import UpdateSubCategory from "./pages/admin/subcategory/UpdateSubCategory";
import AddProduct from "./pages/admin/product/CreateProduct";
import ListProducts from "./pages/admin/product/ListProducts";
import AdminRoute from "./Components/routes/AdminRoute"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        currentUser(idTokenResult.token).then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              role: res.data.role,
              _id: res.data._id,
              token: idTokenResult.token
            }
          })
        }).catch(err => console.log("error in backend", err))
      }

      return () => unsubscribe();
    })
    
  }, [dispatch])
  return (
    <div className="App">
      <MainNavbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/category" element={<Category />} />
        <Route path="/products" element={<Products />}>
          <Route path="/" element={<ProductIndex />} />
          <Route path=":slug" element={<ProductDetail />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/complete" element={<CompleteRegisteration />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <AuthUserRoute path="/user/history" element={<History />} />
        <AuthUserRoute path="/user/password" element={<UpdatePassword />} />
        <AuthUserRoute path="/user/wishlist" element={<Wishlist />} />
        <AdminRoute path="/admin/dashboard" element={<AdminDashboard />} />
        <AdminRoute path="/admin/category" element={<AddCategory />} />
        <AdminRoute path="/admin/category/:slug" element={<UpdateCategory />} />
        <AdminRoute path="/admin/sub-category" element={<AddSubCategory />} />
        <AdminRoute path="/admin/sub-category/:slug" element={<UpdateSubCategory />} />
        <AdminRoute path="/admin/product" element={<AddProduct />} />
        <AdminRoute path="/admin/products/" element={<ListProducts />} />
        <AdminRoute path="/admin/coupon-code" element={<AdminDashboard />} />
        <AdminRoute path="/user/password" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
