import React, {useEffect, useState} from 'react';
import styles from "../../styles/Products.module.css";
import {Link, useNavigate} from "react-router-dom";
import {BASE_URL} from "../../utils/constants";
import {useSelector} from "react-redux";
import UP from "../../images/up.jpg";

const Products = ({products,title}) => {
    const {productList} = useSelector(state => state.product);


    const [limit,setLimit] = useState(5);
    const[value,setValue] = useState([]);
    const filteredProduct = products.filter((_,i) => i < limit);

    //SCROLL
    const[scroll,setScroll] = useState();
    useEffect(() => {
        if (productList.length)
        setValue(filteredProduct)
        },[limit,productList]);

    window.addEventListener("scroll",(e) => {
        setScroll(e.currentTarget.scrollY)
    })

    return (
        <div className={styles.all_list}>
            <section className={styles.products}>
                {title && (<div className= {styles.list_title}>{title}</div>)}
                <div className= {styles.products_list}>
                    {value.map(({_id,images,title,category,brand = "",price,viewsCount}) => (
                        <div key={_id} className={styles.list}>
                            <Link to={`/products/${_id}`} className={styles.product}>
                                <div className={styles.image} style={{backgroundImage : `url(${BASE_URL}/uploads/${images[0]})`}}></div>
                            </Link>

                            <div className={styles.wrapper}>
                                <h3 className={styles.title}>{brand.name + " " + title.slice(0,30)}</h3>
                                <div className={styles.cat}>{category.name}</div>
                                <div className={styles.info}>
                                    <div className={styles.prices}>
                                        <div className={styles.price}>{price}$</div>
                                        <div className={styles.oldPrice}>
                                            {Math.floor(price * 0.8 + 1)}$
                                        </div>
                                    </div>

                                    <div className={styles.purchases}>
                                        {+viewsCount -1} purchased
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {limit === productList.length ?
                    (""):(
                    <button
                        onClick={() => setLimit(limit + 5)}
                        className= {styles.button}>See more
                    </button>
                )}

                {scroll > 700 ?
                    (
                        (
                            <div onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth"
                                });}
                            } className={styles.up} style={{backgroundImage:`url(${UP})`}}></div>
                        )
                    ) :("")
                    }
            </section>
        </div>



    );
};

export default Products;