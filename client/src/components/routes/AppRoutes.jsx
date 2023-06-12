import {Routes,Route} from "react-router-dom";
import Home from "../Home/Home";
import SingleProduct from "../Products/SingleProduct";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import AllProducts from "../Products/AllProducts";
import Cart from "../Cart/Cart";
import Profile from "../Profile/Profile";
import SingleCategory from "../Categories/SingleCategory";


const AppRoutes = () => {

    return (
        <Routes>
            <Route path= "/" element={<Home/>}/>
            <Route path={`/products/:id`} element={<SingleProduct/>}/>
            <Route path= "/auth" element={<Login/>}/>
            <Route path= "/register" element={<Register/>}/>
            <Route path= "/products" element={<AllProducts/>}/>
            <Route path= "/cart" element={<Cart/>}/>
            <Route path= "/profile" element={<Profile/>}/>
            <Route path= "/categories/:id" element={<SingleCategory/>}/>
            <Route path= "*" element={<Home/>}/>
        </Routes>
    );
};

export default AppRoutes;