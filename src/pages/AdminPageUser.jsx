import React, { useEffect, useState } from 'react'
import NavbarC from '../components/NavbarC'
import axiosUrl, { configToken } from '../helps/axiosBase'
import { Col, Container, Row } from 'react-bootstrap'
import TableD from '../components/TableD'
import FooterC from '../components/FooterC'
import "../css/TableD.css"

const AdminPageUser = () => {
  const [userData,setUserData]=useState([])
  const rockUser=async()=>{
    const token=JSON.parse(sessionStorage.getItem("token"))||"";
    const config=configToken(token)
    const allRockU= await axiosUrl.get("/usuarios",config)
    setUserData(allRockU.data.getUserAll)
  }

  useEffect(()=>{
    rockUser()
  },[])

  return (
    <div className='style-table'>
    <>
    <NavbarC/>
    <Container>
      <Row>
        <Col lg={"12"} sm={"12"} md={"12"}>
        <TableD data={userData} />
        </Col>
      </Row>
    </Container>
    <FooterC/>
    </>
    </div>
  )
}

export default AdminPageUser
