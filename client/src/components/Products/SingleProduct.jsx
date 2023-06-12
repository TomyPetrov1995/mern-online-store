import React, {useEffect} from 'react';
import Products from "./Products";
import Product from "./Product";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {filteredProductByCategory, getOneProduct} from "../../features/slices/Product/productSlice";


const SingleProduct = () => {
    const dispatch = useDispatch();
    const {id} = useParams();

    const { product,filteredByCategory} = useSelector(state => state.product);
    useEffect(() => {
        dispatch(getOneProduct(id));
    },[id]);

    useEffect(() => {
        if (product){
            dispatch(filteredProductByCategory({name:product.category.name, id}))
        }
    },[product]);


    return (
        <>
            {product && (<Product product = {product}/>)}

            <Products products={filteredByCategory} amount={5} title="Related products" />
        </>
    );
};

export default SingleProduct;