import React, {useEffect} from 'react';
import styles from "../../styles/Footer.module.css";
import {Link, useParams} from "react-router-dom";
import LOGO from "../../images/LOGO.svg";
import YOUTUBE from "../../images/youtube.svg";
import FACEBOOK from "../../images/facebook.svg";
import INSTAGRAM from "../../images/instagram.svg";
const Footer = () => {
    let isFooter = false;

    return (
        isFooter ? (<div style={{display:"none"}}></div>)
            :(
                <div className={styles.footer}>
                    <div className={styles.footer_logo}>
                        <Link to= "/">
                            <img src= {LOGO} alt="logo"/>
                        </Link>
                    </div>

                    <div className={styles.developer_info}>Developed by <Link>Tomkovich</Link></div>

                    <div className={styles.footer_icons}>
                        <Link to= "https://www.youtube.com/"><img src={YOUTUBE} alt="youtube"/></Link>
                        <Link to= "https://www.facebook.com/"><img src={FACEBOOK} alt="youtube"/></Link>
                        <Link to= "https://www.instagram.com/"><img src={INSTAGRAM} alt="youtube"/></Link>
                    </div>
                </div>
            )
    );
};

export default Footer;