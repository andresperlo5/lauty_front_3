
import Card from 'react-bootstrap/Card';
import "../css/CardC.css"
import { Link } from 'react-router-dom';
import axiosUrl, { configToken } from '../helps/axiosBase';



const CardC = ({ title, imageUrl, idProduct, idPage, idDelete}) => {
  const deleteProduct=async(id)=>{
    const token=JSON.parse(sessionStorage.getItem("token"))||"";
    const config=configToken(token)
    const deleteProduct=await axiosUrl.delete(`/fav/${id}`,config)
    if (deleteProduct.status===200) {
      alert("Producto eliminado de favoritos")
      window.location.reload()
    }
  }

  return (
    <Card id='style-card' className='border-0 mt-5' style={{ width: '18rem' }}>
      <Card.Img className='img-card' variant="top" src={imageUrl} />
      <Card.Body  className='card-body'>
        <Card.Title id='title-id'>{title}</Card.Title>
        {idPage === 'favPage' ? (
          <Link className='btn btn-danger w-100' onClick={()=>deleteProduct(idDelete)}>Eliminar</Link>
        ) : (
          <Link to={`/productos/${idProduct}`} className='btn btn-warning w-100'>
            Ver mas
          </Link>
        )}
      </Card.Body>
    </Card>
  );

};

export default CardC;
