import React, {useEffect, useState} from 'react';
import Poster from "../Poster/Poster";
import Category from "./Category";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

const SingleCategory = () => {

    const {id} = useParams();
    //GET CATEGORIES
    const {categoryList} = useSelector(state => state.category);
    //GET PRODUCTS
    const{productList} = useSelector(state => state.product);


    //FILTERED PRODUCTS BY CURRENT CATEGORY
    const filteredProduct = productList.filter(({category}) => category._id === id);

    return (
        <>
            <Poster/>
            {filteredProduct && (
                <Category id = {id} filteredProduct = {filteredProduct} />
            )}

        </>
    );
};

export default SingleCategory;