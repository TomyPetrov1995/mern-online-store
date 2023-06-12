import React, {useEffect, useState} from 'react';
import styles from "../../styles/Category.module.css";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {BASE_URL} from "../../utils/constants";
import {getBrand} from "../../features/slices/Brand/brandSlice";
import UP from "../../images/up.jpg";

const Category = ({filteredProduct,category,id}) => {

    //INPUT VALUES
    const[brandValue,setBrandValue] = useState("");
    const[firstPrice,setFirstPrice] = useState();
    const[lastPrice,setLastPrice] = useState();

    const[product,setProduct] = useState([]);

    useEffect(() => {setProduct(filteredProduct)},[id,filteredProduct]);

    const[scroll,setScroll] = useState();
    window.addEventListener("scroll",(e) => setScroll(e.currentTarget.scrollY));

    return (
        <section className={styles.category}>
            {category && (
                <div className={styles.category_title}>
                    <p>{category?.name}</p>
                </div>
            )}

            <div className={styles.category_filter}>
                <form onSubmit={e => {
                    e.preventDefault();
                    setProduct(product.filter(({brand,price}) => {
                        if (brandValue && ! firstPrice && !lastPrice){
                            return brand.name.toLowerCase() === brandValue.toLowerCase() && price
                        }
                        else if (!brandValue && !firstPrice && !lastPrice){
                            return product
                        }
                        else if (brandValue && firstPrice && !lastPrice){
                            return brand.name.toLowerCase() === brandValue.toLowerCase() && price > firstPrice
                        }
                        else if (brandValue && firstPrice && lastPrice){
                            return brand.name.toLowerCase() === brandValue.toLowerCase() && price > firstPrice && price < lastPrice
                        }
                        else if (!brandValue && firstPrice && !lastPrice){
                            return price > firstPrice
                        }
                        else if (!brandValue && !firstPrice && lastPrice){
                            return price < lastPrice
                        }
                        else if (!brandValue && firstPrice && lastPrice){
                            return  price > firstPrice && price < lastPrice
                        }
                    }));
                    setBrandValue('')
                }
                }>
                    <div className={styles.category_name}>
                        <input onChange={e => {
                            setBrandValue(e.target.value.toLowerCase());
                        }}
                            type="text" placeholder= "Product name" value={brandValue}/>
                    </div>
                    <div className={styles.category_name}>
                        <input
                            onChange={e => setFirstPrice(e.target.value)}
                            type="text"
                            placeholder= "Price from"
                            defaultValue={firstPrice}/>
                    </div>
                    <div className={styles.category_name}>
                        <input
                            onChange={e =>setLastPrice(e.target.value)}
                            defaultValue={lastPrice}
                            type="text"
                            placeholder= "Price to"/>
                    </div>
                    <button type="submit">Search</button>
                </form>
            </div>


            <div className={styles.categories_list}>
                {product.map(({_id,title,price,category,brand,images,viewsCount}) => (
                    <div key={_id} className={styles.list}>
                        <Link to={`/products/${_id}`} className={styles.product}>
                            <div className={styles.image} style={{backgroundImage : `url(${BASE_URL}/uploads/${images[0]})`}}></div>
                        </Link>

                        <div className={styles.wrapper}>
                            <h3 className={styles.title}>{brand?.name + " " + title.slice(0,23)}</h3>
                            <div className={styles.cat}>{category?.name}</div>
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
            {scroll > 700 ? ( <div onClick={() => window.scrollTo({
                top :0,
                behavior:"smooth"
            })} className={styles.up} style={{backgroundImage:`url(${UP})`}}></div>):""}
        </section>
    );
};

export default Category;