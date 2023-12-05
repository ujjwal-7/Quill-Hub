import React, { useContext } from 'react';
import {AiOutlineClose, AiOutlineHome, AiOutlineLogin} from 'react-icons/ai';
import { IoCreateOutline } from "react-icons/io5";
import {BiLogOut} from 'react-icons/bi';
import {CgProfile} from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { BASE_URL } from '../utils';

export const Sidebar = ({menu, setMenu, user}) => {

  const {updateAuth} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {

    try{

      const res = await fetch(`${BASE_URL}/user/logout`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`
        },
        method: 'POST'
      });

      const data = await res.json();

      if(!res.ok) {
        throw new Error(data.message);
      }
  
      updateAuth(null);
      setMenu(false);
      navigate('/');
      toast.success("Logged out successfully", {
        position: "top-center",
        autoClose: 1200
      });

    } catch(e) {
      toast.error(`${e}`, {
        position: "top-center",
        autoClose: 1200
      });
      console.log(e);
    }
  }

  return (
    <> 
        <div className={`flex flex-col p-4 w-full xs:w-80 h-full fixed top-0 z-20 right-0 transition-transform duration-300 ease-in-out bg-white ${menu ? 'translate-x-0' : 'translate-x-full'} md:hidden `}>

            <div className='flex h-12 justify-between p-2'>
              <p className='text-[#1a8917]'>
                QuillHub
              </p>
              <div className='cursor-pointer' onClick={() => {setMenu(false)}}>
                <AiOutlineClose size={24} className='text-[#1a8917]'/>
              </div>
            </div>
            <hr className='border-1 border-[#1a8917]'/>
        
            <div className='flex flex-col mt-4 h-5/6'>
              
                <Link to='/' onClick={() => {setMenu(false)}}>
                  <div className='flex items-center px-2 h-12 cursor-pointer hover:text-[#1a8917]'>
                    <AiOutlineHome size={20}/>
                    <p className='ml-2'>Home</p>
                  </div>
                </Link>

                <Link to={user ? '/createblog' : '/login'} onClick={() => {setMenu(false)}}>
                  <div className='flex items-center px-2 h-12 cursor-pointer hover:text-[#1a8917]'>
                    <IoCreateOutline size={20}/>
                    <p className='ml-2'>Write</p>
                  </div>
                </Link>
                
                {
                  user ? (

                    <Link to={`/user/profile/${user.id}`} onClick={() => {setMenu(false)}}>
                      <div className='flex items-center px-2 h-12 cursor-pointer hover:text-[#1a8917]'>
                        <CgProfile size={20}/>
                        <p className='ml-2'>Profile</p>
                      </div>
                    </Link>
                    

                  ) : (

                    <Link to='/login' onClick={() => {setMenu(false)}}>
                      <div className='flex items-center px-2 h-12 cursor-pointer hover:text-[#1a8917]'>
                        <AiOutlineLogin size={20}/>
                        <p className='ml-2'>Login</p>
                      </div>
                    </Link>
                    
                  )
                }
                
                {
                  user && <div className='flex items-center px-2 h-12 cursor-pointer hover:text-[#1a8917]' onClick={handleLogout}>
                    <BiLogOut size={20}/>
                    <p className='ml-2'>Logout</p>
                  </div>
                }
              
            </div>
      
        </div>
    </>
  )
}
