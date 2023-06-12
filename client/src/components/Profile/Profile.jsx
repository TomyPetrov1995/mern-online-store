import React, {useEffect, useState} from 'react';
import styles from "../../styles/Profile.module.css";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../features/slices/User/userSlice";
import {toast} from "react-toastify";
import USER from "../../images/user.jpg";

const Profile = () => {

    const dispatch = useDispatch();
    const{user,isLoading,status} = useSelector(state => state.auth);
    const[value,setValue] = useState({email: user?.email,password:user?.password,name:user?.name,avatar :""});

    useEffect(() => {
        if (isLoading)toast(status)
    },[isLoading,status]);


    useEffect(() => {if (user)setValue(user)},[user])

    return (
        <div className={styles.profile}>
            {value &&
                (
                    <div className={styles.profile_list}>
                        <form onSubmit={e => {
                            e.preventDefault();
                            dispatch(updateUser({id:user._id,value}))
                        }}>
                            {/*EMAIL*/}
                            <div className={styles.profile_item}>
                                <label htmlFor = "email">Your Email</label>
                                <div className={styles.form}>
                                    <input
                                        onChange={e => setValue({...value,email: e.target?.value.toString()})}
                                        defaultValue={value.email}
                                        name= "email"
                                        autoComplete= "off"
                                        type="email"
                                        id= "email"
                                        placeholder= "Email"/>
                                </div>
                            </div>

                            {/*NAME*/}
                            <div className={styles.profile_item}>
                                <label htmlFor = "name">Your Name</label>
                                <div className={styles.form}>
                                    <input
                                        onChange={e => setValue({...value,name: e.target?.value})}
                                        defaultValue={value?.name}
                                        name= "name"
                                        autoComplete= "off"
                                        type="name"
                                        id= "name"
                                        placeholder= "Name"/>
                                </div>
                            </div>

                            {/*PASSWORD*/}
                            <div className={styles.profile_item}>
                                <label htmlFor = "password">Your Password</label>
                                <div className={styles.form}>
                                    <input
                                        onChange={e => setValue({...value,password: e.target?.value.toString()})}
                                        defaultValue= {USER}
                                        name= "password"
                                        autoComplete= "off"
                                        type="password"
                                        id= "password"
                                        placeholder= "Password"/>
                                </div>
                            </div>

                            {/*AVATAR*/}
                            <div className={styles.profile_item}>
                                <label htmlFor = "avatar">Your Avatar</label>
                                <div className={styles.form}>
                                    <input
                                        type="file"
                                           id= "avatar"
                                           value=''

                                            accept="image/png, .jpeg, .jpg, image/gif"
                                           onChange={(e) => setValue({...value,avatar:e.target?.files[0]})}/>
                                </div>
                            </div>

                            <button type="submit" className={styles.profile_sutton}>UPDATE</button>
                        </form>
                    </div>
                )}
        </div>
    );
};

export default Profile;