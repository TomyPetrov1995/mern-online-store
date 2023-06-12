import React from 'react';
import styles from "../../styles/Categories.module.css";
import {Link} from "react-router-dom";
import ANY from "../../images/any.jpg";
import {BASE_URL} from "../../utils/constants";
const Categories = ({categories = [],title = ""}) => {

    return (
        <section className= {styles.categories}>

            {title && (<div className= {styles.categories_title}>{title}</div>)}

            <div className={styles.list}>
                {categories.filter((_,i) => i < 5).reverse().map(({_id,name,image}) => (
                    <div key={_id} className={styles.category}>
                        <Link className={styles.product} to={`categories/${_id}`}>
                            <div style={{backgroundImage : `url(${BASE_URL}/uploads/${image})`}} className={styles.image} ></div>
                        </Link>
                        <div className={styles.category_name}>{name}</div>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default Categories;