import React, {useEffect, useState} from 'react';
import styles from "../../styles/User.module.css";
import {Link, useNavigate} from "react-router-dom";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {checkIsAuth, createUser} from "../../features/slices/User/userSlice";
import {createCart} from "../../features/slices/Product/productSlice";

const Register = () => {
    const {productList} = useSelector(state => state.product);
    const {categoryList} = useSelector(state => state.category);
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(user){
            dispatch(createCart(user._id))
        }
    },[user])

    const isAuth = useSelector(checkIsAuth);
    const {status} = useSelector(state => state.auth)
    useEffect(() => {
            if (status) toast(status);
            if (isAuth) navigate("/");

        }, [status,navigate,isAuth])

    const [value,setValue] = useState({email:"",password:"",name:"",role:"customer",avatar:"gdfgd"})

    return (
        <>
            <div className={styles.auth}>
                <div className={styles.register_page}>
                    <div className={styles.register}>
                        <div className={styles.title}>Register</div>
                        <form onSubmit={e => {
                            e.preventDefault();
                            dispatch(createUser(value));
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
                            <div className={styles.form}>
                                <input onChange={e => setValue({...value,name: e.target.value})}
                                       type="text"
                                       name= "name"
                                       autoComplete= "off"
                                       placeholder= "Name"
                                       value={value.name}/>
                            </div>
                            <button type="submit" className={styles.button}>Create an account</button>
                        </form>


                    </div>
                </div>
            </div>
            <Products products = {productList}  amount={5} title= "Worth seeing"/>
            <Categories categories = {categoryList} amount = {5} title = "Trending"/>
        </>
    );
};

export default Register;