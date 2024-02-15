import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import AdminPageUser from './pages/AdminPageUser';
import SobreNosotros from './pages/SobreNosotros';
import ProductPage from './pages/ProductPage';
import FavPage from './pages/FavPage';
import PrivateRoute from './components/PrivateRoute';
import Err404 from './components/Err404';


const App = () => {
  return (
  <>
  <Router>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/user'  element={
        <PrivateRoute role={'user'}>
          <UserPage/>
        </PrivateRoute>}/>
        <Route path='/admin'  element={
        <PrivateRoute role={'admin'}>
          <AdminPage/>
        </PrivateRoute>}/>
        <Route path='/userAdmin'  element={
        <PrivateRoute role={'admin'}>
          <AdminPageUser/>
        </PrivateRoute>}/>
        <Route path='/sobreNosotros'  element={<SobreNosotros/>}/>
        <Route path='/productos/:id' element={<ProductPage/>}/>
        <Route path='/fav' element={
        <PrivateRoute role={'user'}>
          <FavPage/>
        </PrivateRoute>}/>
        <Route path='/Error' element={<Err404/>}/>
    </Routes>
  </Router>
  </>
  )
}

export default App
