import React, {useEffect, useState} from 'react';
import styles from "../../styles/Header.module.css";
import LOGO from "../../images/LOGO.svg";
import USER from "../../images/user.jpg";
import SEARCH from "../../images/Search.svg";
import LIKE from "../../images/Like.svg";
import SHOP from "../../images/Shop.svg";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, logOut} from "../../features/slices/User/userSlice";
import {toast} from "react-toastify";
import {BASE_URL} from "../../utils/constants";

const Header = () => {
    let isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [value,setValue] = useState("");

    const {user} = useSelector(state => state.auth);
    const {productList,cartList} = useSelector(state => state.product);

    const[cartItemCount,setCartItemCount] = useState(0);

    useEffect(() => {
        if (cartList) setCartItemCount(cartList?.length)
    },[cartList?.length])

    const [changeSearchBlock,setChangeSearchBlock] = useState(false);

    const searchItem = productList.filter((item) => (item.brand?.name + item.title).toLowerCase().includes(value.toLowerCase())).filter((_,i) => i < 10);
    useEffect(() => {
        if (!value){
            setChangeSearchBlock(false)
        }
        },
        [value])
    return (
        <div className= {styles.header}>
            <div className={styles.logo}>
                <Link to= "/">
                    <img src= {LOGO} alt="logo"/>
                </Link>
            </div>

            {isAuth &&
                (
                    <div className={styles.user}>
                        {user?.avatar ?
                            (
                                <div className={styles.left_product_image}
                                     style={{backgroundImage : `url(${BASE_URL}/uploads/${user?.avatar})`}}></div>
                            ) :
                            (
                                <div className={styles.userImage}>
                                    <img src= {USER} alt="USER"/>
                                </div>
                            )}

                        <Link className={styles.link} to= "/profile">{user?.name}</Link>
                    </div>
                )}

            <div className={styles.search}>
                <form>
                    <img src={SEARCH} alt="search"/>
                    <input
                           onChange={e => {
                               setValue(e.target.value.toLowerCase().trim());
                               setChangeSearchBlock(true);
                           }}
                           value={value}
                           type="search"
                           autoComplete= "off"
                           placeholder= "Search for anything ..."
                           name= "search"
                    />
                </form>
                {changeSearchBlock &&
                    (
                        <div className={styles.search_items}>
                            {searchItem.map(({_id,title,images,brand}) => (
                                <Link onClick={() => setValue("")} key={_id} to= {`/products/${_id}`}>
                                    <div className={styles.search_item}>
                                        <div className={styles.search_item_image} style={{backgroundImage : `url(${BASE_URL}/uploads/${images[0]})`}}></div>
                                        <div className={styles.search_item_name}>{brand?.name + " " + title}</div>
                                    </div>
                                </Link>

                            ))}

                        </div>
                    )}

            </div>
            {isAuth ?
                (
                <div className= {styles.shopIcons}>
                    <Link to= "/favorites">
                        <div className={styles.like} style={{backgroundImage : `url(${LIKE})`}}></div>
                    </Link>
                    <Link to= "/cart">
                        <div className={styles.shop} style={{backgroundImage : `url(${SHOP})`}}>
                            <div className={styles.group}>
                                <p>{cartItemCount}</p>
                            </div>
                        </div>
                    </Link>
                </div>
                ):
                (
                    <div className={styles.auth}>
                        <Link to= "/auth">
                            <div className={styles.signIn}>Sign In</div>
                        </Link>
                    </div>
                )
            }
            {isAuth &&
                (
                    <div className={styles.logOut}>
                        <button onClick={() => {
                            dispatch(logOut());
                            navigate("/")
                            window.localStorage.removeItem("token");
                            toast("Вы вышли из системы")
                        }}>Log out</button>
                    </div>
                )}

        </div>
    );
};

export default Header;