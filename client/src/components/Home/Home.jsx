import React, {useEffect} from 'react';
import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Banner";
import {useDispatch, useSelector} from "react-redux";
import {getProductsByPrice} from "../../features/slices/Product/productSlice";
const Home = () => {
    const dispatch = useDispatch();

    const {categoryList} = useSelector(state => state.category);
    const {productList,filteredByPrice} = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getProductsByPrice(100))
        },
        [productList])

    return (
        <>
            <Poster/>
            <Products products = {productList} amount={5} title= "Worth seeing"/>
            <Categories categories = {categoryList} amount = {5} title = "Trending"/>
            <Banner/>
            <Products products = {filteredByPrice}  amount={5} title= "Less than 100$"/>
        </>


    );
};

export default Home;