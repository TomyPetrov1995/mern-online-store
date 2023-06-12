import React from 'react';
import styles from "../../styles/Poster.module.css";
import IMAGE from "../../images/image.png";
const Poster = () => {
    return (
        <div className={styles.poster}>
            <div className={styles.poster_title}>big sale 20%</div>
            <div className={styles.poster_main}>
                <div className={styles.poster_main_left}>
                    <p>the bestseller of 2022</p>
                    <h1>LENNON r2d2 with NVIDIA 5090 TI </h1>
                    <button>Shop Now</button>
                </div>
                <div style={{backgroundImage: `url(${IMAGE})`}} className={styles.poster_main_right}></div>
            </div>
        </div>
    );
};

export default Poster;