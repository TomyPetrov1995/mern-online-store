import React from 'react';
import styles from "../../styles/Banner.module.css";
import IMAGE1 from "../../images/banner_image1.png";
import IMAGE2 from "../../images/banner_image2.png";
import IMAGE3 from "../../images/Image3.png";


const Banner = () => {
    return (
        <section className={styles.banner}>
            <div className={styles.banner_left}>
                <p className={styles.banner_firstName}>NEW YEAR</p>
                <p className={styles.banner_lastName}>SALE</p>
                <button className={styles.banner_button}>See more</button>
                <div className={styles.banner_image1} style={{backgroundImage :`url(${IMAGE1})`}}></div>
                <div className={styles.banner_image2} style={{backgroundImage :`url(${IMAGE2})`}}></div>
            </div>
            <div className={styles.banner_right} style={{backgroundImage : `url(${IMAGE3})`}}>
                <p>save up to <span>50%</span> off</p>
            </div>
        </section>
    );
};

export default Banner;