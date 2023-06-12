import React, {useEffect, useState} from 'react';
import styles from "../../styles/Product.module.css";
import {NavLink,Link} from "react-router-dom";
import IMAGE from "../../images/image 5.png";
import {BASE_URL} from "../../utils/constants.js";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth} from "../../features/slices/User/userSlice";
import {toast} from "react-toastify";
import {addProductToCart, getCart} from "../../features/slices/Product/productSlice";

const size = ["4,5","5","5.5"]
const Product = ({product = {}}) => {
    const dispatch = useDispatch();

    const [currentImage,setCurrentImage] = useState(product.images[0]);
    const[selectedSize,setSelectedSize] = useState();

    const isAuth = useSelector(checkIsAuth);

    return (
            <div className={styles.product}>
                <div className={styles.left_product}>
                    <div className={styles.left_product_image}
                         style={{backgroundImage : `url(${BASE_URL}/uploads/${currentImage})`}}></div>
                    <div className={styles.product_images}>
                        {product.images.filter((_,i) => i < 4).map((image,id) =>
                            (
                                <div onClick={() =>setCurrentImage(image)} key={id}>
                                    <img className={styles.image} src={`${BASE_URL}/uploads/${image}`} alt="image"/>
                                </div>
                            ))}
                    </div>
                </div>

                <div className={styles.right_product}>
                    <div className={styles.product_name}>{product.brand?.name + "  " + product.title}</div>
                    <div className={styles.product_price}>{product.price}$</div>
                    <div className={styles.product_color}>
                        <div className={styles.color}>Color:</div>
                        <div className={styles.color_name}>Blanch</div>
                    </div>
                    <div className={styles.product_size}>
                        <div className={styles.size}>Sizes:</div>
                        <div className={styles.size_number_list}>
                            {size.map((num) =>
                                (
                                    <div key={num}
                                         className={`${styles.size_number} ${selectedSize === num ? styles.selected : ""}`}
                                         onClick={() => setSelectedSize(num)}
                                    >
                                        {num}
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className={styles.product_description}>{product.description}</div>
                        <div className={styles.button_list}>
                            <button onClick={() => {
                                if (product){
                                    dispatch(addProductToCart({...product,quantity : 1}));
                                }
                            }
                            } className={`${isAuth && selectedSize ? styles.cart : styles.disabled}`} >Add to cart</button>
                            <button className={`${isAuth ? styles.favorites : styles.disabled}`}>Add to favorites</button>
                        </div>


                    <div className={styles.footer}>
                        <p className={styles.footer_left}>19 people purchased</p>
                        <Link>
                            <p className={styles.footer_right}>Find in a store</p>
                        </Link>
                    </div>
                </div>

            </div>

    );
};

export default Product;