import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
import NavbarC from '../components/NavbarC';
import Soda from "../images/soda.jpg"
import { Col, Container, Row } from 'react-bootstrap';
import FooterC from '../components/FooterC';
import { useNavigate } from 'react-router-dom';
import "../css/RegisterPage.css"

const RegisterPage = () => {
   const navigate=useNavigate()
    const [formRegister,setFormRegister]=useState({
        NombreRock:"",
        NacionalidadRock:"",
        CorreoRock:"",
        ContraseniaRock:"",
        RcontraseniaRock:""

    })

   const registerChange=(ev)=>{ 
   setFormRegister({...formRegister,[ev.target.name]:ev.target.value});
}

 const goRegister= async (ev)=>{
    ev.preventDefault()
const{NombreRock,NacionalidadRock,CorreoRock,ContraseniaRock,RcontraseniaRock}=formRegister
if (!NombreRock || !NacionalidadRock || !CorreoRock || !ContraseniaRock || !RcontraseniaRock) {
    Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Por favorr completa todos los campos!",
      });
}else if (ContraseniaRock===RcontraseniaRock){
    const RockRegister= await fetch("http://localhost:3001/usuarios",{
        method:"Post",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            Nombre:NombreRock,
            Nacionalidad:NacionalidadRock,
            Correo:CorreoRock,
            Contrasenia:ContraseniaRock
        })
    })
    const rockUserNew= await RockRegister.json()
   if (rockUserNew) {
    Swal.fire({
        title: "Gracias por registrarse!",
        text: "Soda Stereo una de las bandas mas iconicas de Latino America",
        imageUrl: Soda,
        imageWidth: 400,
        imageHeight: 200,
      });
      setTimeout(()=>{
         navigate("/login")
      },3000)
   }
}else{
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contrasenias no coinciden!",
      });
}

}

useEffect(()=>{
   const NameRock=document.getElementById('NameRock')
const NacionalityRock=document.getElementById('NacionalityRock')
const EmailRock=document.getElementById('EmailRock')
const ContraRock=document.getElementById('ContraRock')
const RcontraRock=document.getElementById('RcontraRock')



const NameRockColor=(ev)=>{
   if (ev.target.value==='') {
      ev.target.classList.add('input-error');
   }else{
      ev.target.classList.remove('input-error');
   }
}

const NacionalityRockColor=(ev)=>{
   if (ev.target.value==='') {
      ev.target.classList.add('input-error');
   }else{
      ev.target.classList.remove('input-error');
   }
}


const EmailRockColor=(ev)=>{
   if (ev.target.value==='') {
      ev.target.classList.add('input-error');
   }else{
      ev.target.classList.remove('input-error');
   }
}


const ContraRockColor=(ev)=>{
   if (ev.target.value==='') {
      ev.target.classList.add('input-error');
   }else{
      ev.target.classList.remove('input-error');
   }
}


const RContraRockColor=(ev)=>{
   if (ev.target.value==='') {
      ev.target.classList.add('input-error');
   }else{
      ev.target.classList.remove('input-error');
   }
}

NameRock.addEventListener('input',NameRockColor)
NacionalityRock.addEventListener('input',NacionalityRockColor)
EmailRock.addEventListener('input',EmailRockColor)
ContraRock.addEventListener('input',ContraRockColor)
RcontraRock.addEventListener('input',RContraRockColor)

},[])



  return (
 <>
 <div className='register-page-container'>
 <NavbarC/>
 <Container>
      <Row>
         <Col sm={"12"}>
         <div className='d-flex justify-content-center mt-5'>
       <Form className='form-style'>
      <h2 className='h2-rock-register'>Registrarse</h2>
      <Form.Group className="mb-3" controlId="NombreInfo">
         <Form.Label className='register-style'>Nombre</Form.Label>
         <Form.Control id='NameRock' type="text" value={formRegister.Nombre} onChange={registerChange} placeholder="Ingrese su Nombre" name='NombreRock' />
      </Form.Group>

      <Form.Group className="mb-3" controlId="nacionalidadInfo">
         <Form.Label className='register-style'>Nacionalidad</Form.Label>
         <Form.Control id='NacionalityRock' type="text" value={formRegister.Nacionalidad} onChange={registerChange} placeholder="Ingrese su nacionalidad" name='NacionalidadRock' />
      </Form.Group>

      <Form.Group className="mb-3" controlId="correoInfo">
         <Form.Label className='register-style'>Correo Electronico</Form.Label>
         <Form.Control id='EmailRock' type="email" value={formRegister.Correo} onChange={registerChange} placeholder="Ingrese su correo" name='CorreoRock' />
      </Form.Group>

      <Form.Group className="mb-3" controlId="passInfo">
         <Form.Label className='register-style'>Contraseña</Form.Label>
         <Form.Control id='ContraRock' type="password" value={formRegister.Contrasenia} onChange={registerChange} placeholder="Ingrese una contraseña" name='ContraseniaRock' />
      </Form.Group>

      <Form.Group className="mb-3" controlId="rPassInfo">
         <Form.Label className='register-style'>Repetir Contraseña</Form.Label>
         <Form.Control id='RcontraRock' type="password" value={formRegister.Rcontrasenia} onChange={registerChange} placeholder="Ingrese una contraseña" name='RcontraseniaRock' />
      </Form.Group>
      <Button className='register-buttom mt-5 mx-auto w-75' onClick={goRegister} variant="danger" type="submit">
         Registrarse
      </Button>
   </Form>
      </div>
    </Col>
   </Row>
   </Container>
</div>
<FooterC/>
 </>
  )
}

export default RegisterPage
