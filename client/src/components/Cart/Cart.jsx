import React, {useEffect, useState} from 'react';
import styles from "../../styles/Cart.module.css"
import {useDispatch, useSelector} from "react-redux";
import {BASE_URL} from "../../utils/constants";
import Products from "../Products/Products";
import {addProductToCart, decrement, increment, updateProductToCart} from "../../features/slices/Product/productSlice";
import {removeProduct} from "../../features/slices/Product/productSlice";
import {Link} from "react-router-dom";
const Cart = () => {
    const dispatch = useDispatch();
    const {cartList,productList,price} = useSelector(state => state.product);

    const[value,setValue] = useState([]);
    const[totalPrice,setTotalPrice] = useState();

    useEffect(() => {
        if (cartList) {
            //ADD CARTLIST IN VALUE
            setValue(cartList);
            //GET ALL PRICE
            setTotalPrice(cartList.reduce((curr,acc) => {return acc.allPrice + curr},0));
        }},[cartList]);

    return (
        <>
            <div className={styles.cart}>
                <div className={styles.cart_title}>Your cart</div>
                <section className={styles.cart_list}>
                    <div className={styles.scroll}>
                        <>
                        </>
                        {value.map((item) => {
                            const {_id,images = [],title,category,price,quantity} = item;
                            return (
                                <div key={_id} className={styles.cart_item}>
                                    <Link className={styles.link} to= {`/products/${_id}`}>
                                        <div style={{backgroundImage : `url(${BASE_URL}/uploads/${images[0]})`}} className={styles.product_image}></div>
                                        <div className={styles.product_info}>
                                            <div className={styles.product_title}>{title}</div>
                                            {category && (<div className={styles.product_category}>{category.name}</div>)}

                                        </div>
                                    </Link>

                                    <div className={styles.product_price}>{price}$</div>
                                    <div className={styles.product_count}>
                                        <button onClick={() => {
                                            if (quantity < 2)return;
                                            dispatch(updateProductToCart({...item,quantity:quantity - 1}))
                                        }
                                        } className={styles.decrement}>-</button>
                                        <div className={styles.num}>{quantity}</div>
                                        <button onClick={() => {
                                            dispatch(updateProductToCart({...item,quantity:quantity + 1}))

                                        }}  className={styles.increment}>-</button>
                                    </div>

                                    <div className={styles.count_price}>{quantity * price}$</div>

                                    <button onClick={() => dispatch(removeProduct(_id))}
                                            className={styles.product_remove}>x</button>
                                </div>
                            )
                            })
                        }
                    </div>
                </section>

                <div className={styles.cart_footer}>
                    <div className={styles.total_price}>TOTAL PRICE: <span> {totalPrice}$</span> </div>
                    <Link className={styles.check} to= "/check">Proceed to checkout</Link>
                </div>
            </div>
            <Products products = {productList}  amount={5} title= "Worth seeing"/>
        </>

    );
};

export default Cart;