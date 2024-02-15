import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import logoImage from '../images/Logo.png';
import '../css/NavbarC.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { config } from '@fortawesome/fontawesome-svg-core';
import axiosUrl, { configToken } from '../helps/axiosBase';



const NavbarC = () => {
  const [preference,setPreference]=useState(null)
  initMercadoPago('YOUR_PUBLIC_KEY',{
    locale:"es-AR"
  });
  const rockData=JSON.parse(sessionStorage.getItem('idUsuario'))
  const navigate=useNavigate();

  const sinOff=()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("role")
    sessionStorage.removeItem("idUsuario")
    navigate("/")
  }

  const token = JSON.parse(sessionStorage.getItem("token")) || "";
  const role = JSON.parse(sessionStorage.getItem("role")) || "";
  const AdminPageProduct=window.location.pathname

  const[newProduct,setNewProduct]=useState({
    Nombre:"",
    Marca:"",
    Precio:"",
    Descripcion:""
  })

  const[imagen,setImagen]=useState({})

  const newChange=(ev)=>{
    setNewProduct({...newProduct,[ev.target.name]:ev.target.value})
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  
  const handleShow = () =>{
    setShow(true);
  }

  const newChangeImagen=(ev)=>{
    setImagen(ev.target.files[0]);

  }

  const newRockProduct= async(ev)=>{
   ev.preventDefault()
   try {
    const{Nombre,Marca,Precio,Descripcion}=newProduct
    if (!Nombre || !Marca ||! Precio ||!Descripcion|| !imagen) {
      alert("Por favor complete todos los campos!")
      return
    }else{
      const data= new FormData();
      data.append("Nombre",Nombre)
      data.append("Marca",Marca)
      data.append("Precio",Precio)
      data.append("Descripcion",Descripcion)
      data.append("Imagen",imagen)
      const createProductRock=await axiosUrl.post("/productos",data);
      console.log(createProductRock)
      if (createProductRock.status===200) {
        alert("Producto creado")
        window.location.reload()
      }
    }
   } catch (error) {
    console.log(error)
   }
  }

  const [newUser,setNewUser]=useState({
    Nombre:"",
    Correo:"",
    Nacionalidad:"",
    Role:"",
    Contrasenia:""
  })

  const userChange=(ev)=>{
    setNewUser({...newUser,[ev.target.name]:ev.target.value})
  }

const postUser=async(ev)=>{
ev.preventDefault()
try {
  const{Nombre,Nacionalidad,Role,Contrasenia,Correo}=newUser
  if (!Nombre||!Nacionalidad||!Role||!Contrasenia||!Correo) {
    alert("Completa todos los campos")
    return
  }else{
        const token=JSON.parse(sessionStorage.getItem("token"))||"";
        const config=configToken(token)
    const createUserRock=await axiosUrl.post("/usuarios",{
      Nombre:newUser.Nombre,
      Correo:newUser.Correo,
      Nacionalidad:newUser.Nacionalidad,
      Role:newUser.Role,
      Contrasenia:newUser.Contrasenia
    },config)
    if (createUserRock.status===200) {
      alert("Usuario creado")
      window.location.reload()
    }
  }
} catch (error) {
  console.log(error)
}
}

const [carrRock,setCarrRock]=useState([])

const carrMe=async()=>{
  const token=JSON.parse(sessionStorage.getItem("token"))||"";
  const config=configToken(token)
  const rockCarrMe=await axiosUrl.get("/carr",config)
  const rockCarrIndividual=rockCarrMe.data.carrGet.find((data)=>data.idUsuario===rockData)
  setCarrRock(rockCarrIndividual.productos)
}

useEffect(()=>{
  carrMe()
},[])


const createPrefance=async()=>{
  try {
    const responseMp= await axiosUrl.post("/carr/pay",{
      title:'Tienda Full Rock',
      quantity:1,
      price:totalPrice()
    })
    return responseMp
  } catch (error) {
    console.log(error)
  }
}

const handleBuy=async()=>{
    const res= await createPrefance()
    window.location=`${res.data.res}`
}


const totalPrice = () => {
  let total = 0;

  carrRock.forEach((producto) => {
    total += producto.Precio;
  });

  return total;
};

const deleteRock=async(id)=>{
  try {
    const confirmDeleteRock=confirm('Estas seguro de eliminar este producto?')
    if (confirmDeleteRock) {
        const token=JSON.parse(sessionStorage.getItem("token"))||"";
        const config=configToken(token)
      const rockDelte= await axiosUrl.delete(`/carr/${id}`,config)
      if (rockDelte.status===200) {
        alert("Producto eliminado")
        window.location.reload()
      }
    }
  } catch (error) {
    console.log(error)
  }
}

  const handleWhatsAppClick = () => {
    const phoneNumber = '91123877300'; 
    const whatsappURL = `https://wa.me/${phoneNumber}`;
    window.open(whatsappURL, '_blank');
  };



  return (
    <>
      <Navbar expand="lg" className="color-nav">
        <Navbar.Brand href="#home" className='text-rock'><img className='img-logo' src={logoImage} alt="logo"/></Navbar.Brand>
        <Navbar.Toggle className='color-button' aria-controls="basic-navbar-nav"  />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className='style-control'>
            </div>
            <NavLink  to="/" className='text-rock mt-2 me-2'>Inicio</NavLink>
            <NavLink to="/sobreNosotros" className='text-rock mt-2 me-2'>Sobre mi</NavLink>
            <NavLink to="#" onClick={handleWhatsAppClick} className='text-rock mt-2 me-2'>Contacto</NavLink>
          {token && role==="user" ?(
              <>   
              <NavLink to="/user" className='text-rock mt-2 me-2'>Tienda</NavLink>     
              <NavLink to="/fav" className='text-rock mt-2 me-2'>Favoritos</NavLink>
              <NavLink onClick={handleShow} className='text-rock mt-2 me-2'>Carrito</NavLink>
            <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title id='style-carr-title' className='title-carr-pp justify-content-center aling-items-center'>Carrito Full Rock</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='style-carr'>
            <Table striped bordered hover>
          <thead>
          <tr>
          <th className='th-text'>Nombre</th>
          <th className='th-text'>Precio</th>
          <th className='th-text'>Marca</th>
          <th className='th-text'>Eliminar</th>
          </tr>
          </thead>
         <tbody>
         {carrRock.map((producto) => (
         <tr key={producto._id}>
         <td className='title-carr my-3'>{producto.Nombre}</td>
         <td className='title-carr my-3'>{producto.Precio}</td>
         <td className='title-carr my-3'>{producto.Marca}</td>
         <td><Button onClick={()=>deleteRock(producto._id)} variant='danger'>Borrar</Button></td>
        </tr>
          ))}
       </tbody>
    </Table>
    {
      <>
      <h2 className='title-carr-price mt-5 d-flex justify-content-center' >Total a pagar : ${totalPrice()}</h2>
      <Button onClick={handleBuy} className='mt-5 d-flex justify-content-center aling-items-center w-100' variant='primary'>Pagar total</Button>
      </>
    }
    <Wallet initialization={{ preferenceId: preference }} customization={{ texts:{ valueProp: 'smart_option'}}} />
           </Offcanvas.Body>
           </Offcanvas>
              </>
          ):token && role==="admin" && AdminPageProduct=="/admin" ? (
            <>
            <NavLink to="/userAdmin" className='text-rock mt-2'>Usuarios</NavLink>        
           <Button className='button-product me-auto' variant="danger" onClick={handleShow}>
           Crear un producto
           </Button>

          <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Crear Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>

          <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Ingrese el nombre" value={newProduct.Nombre} name='Nombre' onChange={newChange} />
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label>Marca</Form.Label>
          <Form.Control type="text" placeholder="Ingrese la marca" value={newProduct.Marca} name='Marca'  onChange={newChange} />
          </Form.Group>

          
          <Form.Group className="mb-3">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control type="text" placeholder="Ingrese la marca" value={newProduct.Descripcion} name='Descripcion'  onChange={newChange} />
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" placeholder="Ingrese el precio" value={newProduct.Precio} name='Precio'  onChange={newChange}/>
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" placeholder="Ingrese la URL" name='Imagen' onChange={newChangeImagen}/>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={newRockProduct}>
           Crear producto
          </Button>
          </Form>
          </Modal.Body>
          </Modal>
            </>
          ):token && role==="admin" && AdminPageProduct=="/userAdmin"?(
            <>
            <NavLink to="/admin" className='text-rock mt-2'>Productos</NavLink>        
            <Button  className='button-product me-auto'  onClick={handleShow}>
            Crear un usuario
            </Button>

           <Modal show={show} onHide={handleClose}>
           <Modal.Header closeButton>
           <Modal.Title >Crear usuario</Modal.Title>
           </Modal.Header>
           <Modal.Body>
           <Form>

           <Form.Group className="mb-3">
           <Form.Label>Nombre</Form.Label>
           <Form.Control type="text" placeholder="Ingresa el nombre" value={newUser.Nombre} name='Nombre' onChange={userChange} />
           </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" placeholder="Ingresa el correo" value={newUser.Correo} name='Correo' onChange={userChange}/>
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label>Nacionalidad</Form.Label>
          <Form.Control type="text" placeholder="Ingresa la nacionalidad" value={newUser.Nacionalidad} name='Nacionalidad' onChange={userChange} />
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Control type="text" placeholder="Ingresa el Role"  value={newUser.Role} name='Role' onChange={userChange} />
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Ingresa la contraseña"  value={newUser.Contrasenia} name='Contrasenia' onChange={userChange} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={postUser}>
           Crear usuario
          </Button>
          </Form>
           </Modal.Body>
           </Modal>
            </>
          ):null}
        </Nav>
          {token && role ? (
            <Nav className='ms-auto me-1'>
              <NavLink to="/#"  className='text-rock' onClick={sinOff}>Cerrar Sesion</NavLink>
            </Nav>
          ) : (
            <Nav className="ms-auto me-2">
              <NavLink to="/register" className='text-rock mt-2 me-2'>Registrarse</NavLink>
              <NavLink to="/login" className='text-rock mt-2 me-2'>Iniciar Sesion</NavLink>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarC;
