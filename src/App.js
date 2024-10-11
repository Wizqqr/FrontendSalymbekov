import  React, { useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from "@mui/material/Container";
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './redux/slices/auth';
import ProtectedRoute from './components/ProtectedRoute';
import { Footer } from './components/Footer';
import Loader from './components/Loader';
import {Header} from './components/Header'; 
import Home from './pages/Home';
import Info from './pages/Info';
import {Login}  from './pages/Login'
import { Registration } from './pages/Registration';
import { Students } from './pages/StudentsList'
import Profile from './pages/Profile';
import Main from './pages/Main';
import { AddPost } from './pages/AddPost'
import {FullPost} from './pages/FullPost.jsx'

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      dispatch(fetchAuthMe());
    }
    // const timer = setTimeout(() => setLoading(false), 2500); // Можно использовать реальную логику завершения загрузки
    // return () => clearTimeout(timer);
  }, [dispatch]); 

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <>
    <Header/>
    <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/register' element={<Registration />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/students' element={ <ProtectedRoute><Students /></ProtectedRoute>} />        
          <Route path='/info' element={<Info/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/create-post' element={<AddPost/>}></Route>
          <Route path='/posts/:id' element={<FullPost/>}></Route>
          </Routes>
      </Container>
      <Footer/>
    </>
  );
};

export default App;
