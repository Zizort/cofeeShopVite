// import React from 'react'
// import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
// import products from '../products.js' dummy array of data
import Product from '../components/Product'
// import axios from 'axios'
import { useGetProductsQuery } from '../slices/productApiSlice'; //redux for products
import Loader from '../components/Loader';
import Message from '../components/Message';



export default function HomeScreen() {
  //get data and rename it to products
  const { data: products, isLoading, error } = useGetProductsQuery();

  
  return (
    <>
      { isLoading ? (
        <Loader />
      ) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) :  (<>
        <h1>Latest Products</h1>
        <Row>
            { products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    {/* <h3>{product.name}</h3> */}
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
      </>)}
        
    </>
  )
}
