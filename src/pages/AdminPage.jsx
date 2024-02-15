
import React, { useEffect, useState } from 'react'
import axiosUrl, { configToken } from '../helps/axiosBase'
import TableC from '../components/TableC'
import NavbarC from '../components/NavbarC'
import FooterC from '../components/FooterC'
import { Col, Container, Row } from 'react-bootstrap'


const AdminPage = () => {
 
  const [rockProduct,setRockProduct]=useState([])

  const rockAllP=async()=>{
    const dataProductRock= await axiosUrl.get("/productos",configToken)
    setRockProduct(dataProductRock.data.getAllProducts)
  }

  useEffect(()=>{
    rockAllP()
  },[])



  return (
    <>
    <div className='img-body'>
    <NavbarC/>
    <Container>
      <Row>
        <Col lg={"12"} sm={"12"} md={"12"}>
        <TableC  data={rockProduct}/>
        </Col>
      </Row>
    </Container>
    <FooterC/>
    </div>
    </>
  )
}

export default AdminPage
