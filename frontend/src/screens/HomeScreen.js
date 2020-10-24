import React, {useEffect} from 'react'
import  {Row, Col, Container} from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productAction'
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta'
import {Link} from 'react-router-dom'

const HomeScreen = ({match}) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1


    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList


    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])
    
    return (
        <>
            <Meta />
            {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light' />}
            <h1>Lastest Products</h1>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                <Row>
                    {products.map(product => (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product}/>
                        </Col>
                    ))}
                </Row>
               
                <Paginate className='align-items-center' page={page} pages={pages} keyword={keyword ? keyword : ''}/>
     
                
                </>
            )}
           
        </>
    )
}

export default HomeScreen
