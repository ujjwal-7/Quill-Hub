import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { AuthContextProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import CreateBlog from './pages/CreateBlog';
import SingleBlog from './pages/SingleBlog';
import EditBlog from './pages/EditBlog';
import SearchResult from './pages/SearchResult';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (

    <AuthContextProvider>
      <Navbar/>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/signup' element = {<SignUp/>}/>
        <Route path = '/createblog' element = {<CreateBlog/>}/>
        <Route path = '/singleblog/:id' element = {<SingleBlog/>} />
        <Route path = '/editblog/:id' element = {<EditBlog/>}/>
        <Route path= '/searchResult/:searchQuery' element = {<SearchResult/>}/>
        <Route path= '/user/profile/:id' element = {<Profile/>}/>
        <Route path= '/profile/update/:id' element = {<EditProfile/>}/>
        
      </Routes>
      <ToastContainer/>
    </AuthContextProvider>
      
  )
}

export default App;