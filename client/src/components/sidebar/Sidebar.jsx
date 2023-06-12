import React from 'react';
import styles from "../../styles/Sidebar.module.css";
import {Link, NavLink} from "react-router-dom";

const SideBar = ({categories}) => {


    return (
        <div className={styles.sidebar}>
            <div className={styles.title}>CATEGORIES</div>

            <nav>
                <ul>
                    {categories.map(({_id,name,image}) => (
                        <li  key={_id}>
                            <NavLink to={`/categories/${_id}`}
                            className={({isActive}) => `${styles.link} ${isActive ? styles.active : ""}`}>{name}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={styles.footer}>
                <Link className={styles.footer_link} to= "/help">Help</Link>
                <Link className={styles.footer_link} to= "/help">Therm and Conditions</Link>
            </div>
        </div>
    );
};

export default SideBar;