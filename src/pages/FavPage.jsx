import React, { useEffect, useState } from 'react'
import axiosUrl, { configToken } from '../helps/axiosBase'
import NavbarC from '../components/NavbarC'
import { Col, Container, Row } from 'react-bootstrap';
import FooterC from '../components/FooterC';
import CardC from '../components/CardC';
import "../css/Fav.css"

const FavPage = () => {
    const rockData=JSON.parse(sessionStorage.getItem('idUsuario'))

    const[productFav,setProductFav]=useState([])

    const getFavRock=async()=>{
        const token=JSON.parse(sessionStorage.getItem("token"))||"";
        const config=configToken(token)
        const rockFav= await axiosUrl.get("/fav",config)
        const findRock=rockFav.data.getAllFav.find((data)=>data.idUsuario===rockData)
        setProductFav(findRock.favoritos)
    }

useEffect(()=>{
    getFavRock()
},[])


  return (
    <>
    <div className='body-stone'>
    <NavbarC/>
    <Container className='my-5'>
        <Row>
        {productFav.map((data)=>(
            <Col className='my-5 d-flex justify-content-center aling-items-center' sm={"12"} md={"4"} lg={"4"} key={data._id}>
           <CardC clas imageUrl={data.Imagen} idPage='favPage' idDelete={data._id}/>
            </Col>
           ))}
        </Row>
    </Container>
    </div>
    <FooterC/>
    </>
  )
}

export default FavPage
