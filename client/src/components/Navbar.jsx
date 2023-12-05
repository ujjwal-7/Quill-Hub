import React, { useContext, useState } from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import { Sidebar } from './Sidebar';
import { useNavigate, Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils';

const Navbar = () => {

  const [menu, setMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const {user} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSearchQuery = (e) => {

    if((e?.key === "Enter" || e === "searchButton") && searchQuery?.length > 0) {
      console.log(searchQuery);
      navigate(`/searchResult/${searchQuery}`);
    }
  }
  
  return (
    <>
      <div className='sticky top-0 z-10 h-16 shadow-lg bg-white'>
        <div className='flex flex-row h-full items-center justify-between px-2 xs:px-4 md:max-w-6xl md:m-auto'>
          <Link to='/'>
            <div className='text-[#1a8917] xs:text-lg hover:cursor-pointer'>QuillHub</div>
          </Link>
          <div className='flex border-2 rounded-full hover:border-[#1a8917] divide-x divide-[#1a8917] bg-[#f0fdf4]' >

            <input 
              type="text" 
              placeholder='Search'
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchQuery}
              value={searchQuery}
              className="rounded-full bg-[#f0fdf4] outline-none pr-5 pl-3 w-24 xs:w-44 sm:w-64 md:w-72 lg:w-[400px] "
            />

            
            <button onClick={() => handleSearchQuery("searchButton")}><IoIosSearch size={24}/></button>

          </div>
          <div className='hidden md:flex md:flex-row md:items-center md:justify-between md:w-64'>
            <Link to='/'><p className='hover:text-[#1a8917]'>Home</p></Link>
            
            <Link to={user ? '/createblog' : '/login'}><p className='hover:text-[#1a8917]'>Write</p></Link>

            {
              !user ? 
                <Link to='/login'><p className='hover:text-[#1a8917]'>Login</p></Link> 
                : 
                <Link to='/user/profile/:id'>

                <div className="relative">
                    <img
                      src={`${BASE_URL}/uploads/${user?.profileImg}`}
                      alt=""
                      className="w-10 h-10 object-contain rounded-full"
                    />
                  <div className="absolute inset-0 rounded-full border-2 border-slate-400"></div>
                </div>

                </Link>}
          </div>

         
          <div className='text-[#1a8917] md:hidden' onClick={() => {setMenu(!menu)}}>
            {!menu && <AiOutlineMenu size={24}/>}
          </div>

        </div>
      </div>
      {<Sidebar menu = {menu} setMenu = {setMenu} user = {user}/>}
    </>
  )
}

export default Navbar;