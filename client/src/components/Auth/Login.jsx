import React, {useEffect, useState} from 'react';
import styles from "../../styles/User.module.css";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {checkIsAuth, loginUsers} from "../../features/slices/User/userSlice";


const Login = () => {
    const {productList} = useSelector(state => state.product);
    const {categoryList} = useSelector(state => state.category);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status} = useSelector(state => state.auth);
    const isAuth = useSelector(checkIsAuth);

    const [value,setValue] = useState({email:"",password:"",name:"",role:"customer",avatar:"gdfgd"})

    useEffect(() => {
            if (status){
                toast(status)
            };
            if (isAuth)navigate("/")
        },
        [status,isAuth,navigate])

    return (
        <>
            <div className={styles.auth}>
                <div className={styles.register}>
                    <div className={styles.title}>Login</div>
                    <form onSubmit={e => {
                        e.preventDefault();
                        dispatch(loginUsers(value));
                        setValue({email:"",password:"",name:""})
                    }
                    }>
                        <div className={styles.form}>
                            <input onChange={e => setValue({...value,email: e.target.value})}
                                   value={value.email}
                                   name= "email"
                                   required
                                   autoComplete= "off"
                                   type="email"
                                   placeholder= "Email"/>
                        </div>
                        <div className={styles.form}>
                            <input onChange={e => setValue({...value,password :e.target.value})}
                                   type="password"
                                   name= "password"
                                   required
                                   autoComplete= "off"
                                   placeholder= "Password"
                                   value={value.password}/>
                        </div>

                        <button type="submit" className={styles.button}>Log In</button>
                    </form>
                    <Link className={styles.create} to= "/register">
                        <div>Create Account</div>
                    </Link>

                </div>
            </div>
            <Products products = {productList}  amount={5} title= "Worth seeing"/>
            <Categories categories = {categoryList} amount = {5} title = "Trending"/>
        </>

    );
};

export default Login;