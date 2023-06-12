import React, {useEffect, useState} from 'react';
import Poster from "../Poster/Poster";
import styles from "../../styles/AllProducts.module.css";
import {Link} from "react-router-dom";
import {BASE_URL} from "../../utils/constants";
import ANY from "../../images/any.jpg"
import {useSelector} from "react-redux";

const AllProducts = () => {

    const {productList} = useSelector(state => state.product);

    //PAGE
    // const[page,setPage] = useState(1);

    const[limit,setLimit] = useState(10);

    const filteredList = productList.filter((_,i) => i < limit);

    // const buttonList = productList.filter((_,i) => i < productList.length / limit);



    return (
        <>
            <Poster/>
            <div className={styles.products_page}>
                <div className= {styles.list_title}>Related products</div>

                <div className={styles.products_list}>
                    {filteredList.map(({_id,title,viewsCount,images,category,price}) =>
                        (
                            <div key={_id} className={styles.list}>
                                <Link to={`/products/${_id}`} className={styles.product}>
                                    <div className={styles.image} style={{backgroundImage : `url(${`${BASE_URL}/uploads/${images[0]}`})`}}></div>
                                </Link>

                                <div className={styles.wrapper}>
                                    <h3 className={styles.title}>{title}</h3>
                                    <div className={styles.cat}>{category.name}</div>
                                    <div className={styles.info}>
                                        <div className={styles.prices}>
                                            <div className={styles.price}>{price}$</div>
                                            <div className={styles.oldPrice}>
                                                {Math.floor(price * 0.8 + 1)}$
                                            </div>
                                        </div>
                                        <div className={styles.purchases}>
                                            {viewsCount} purchased
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {/*<div className={styles.page_count}>*/}
                {/*    <div className={styles.page_count_list}>*/}
                {/*        {buttonList.map((_,i) =>*/}
                {/*            (*/}
                {/*                <button key={i} onClick={e => setPage(+e.target.innerText)}>{i + 1}</button>*/}
                {/*            ))}*/}

                {/*    </div>*/}
                {/*</div>*/}
            </div>

        </>
    );
};

export default AllProducts;