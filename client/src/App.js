import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getMe} from "./features/slices/User/userSlice";
import {getAllCategories} from "./features/slices/Category/categorySlice";
import Header from "./components/Header/Header";
import SideBar from "./components/sidebar/Sidebar";
import AppRoutes from "./components/routes/AppRoutes";
import Footer from "./components/Footer/Footer";
import "./styles/global.css";
import { ToastContainer } from 'react-toastify';
import {createCart, getAllProducts, getCart} from "./features/slices/Product/productSlice";

function App() {

    const dispatch = useDispatch();

    const {categoryList} = useSelector(state => state.category);

    useEffect(() => {
        dispatch(getMe());
        dispatch(getCart());
        dispatch(getAllCategories());
        dispatch(getAllProducts());
        },
        [])

  return (
      <div className= "app">

          <Header/>
          <div className="container">
              <SideBar categories = {categoryList}/>
              <AppRoutes/>
          </div>
          <ToastContainer position= "bottom-right"/>
          <Footer/>
      </div>

  );
}

export default App;
