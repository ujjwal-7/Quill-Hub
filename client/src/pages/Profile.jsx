import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import {BiLogOut} from 'react-icons/bi';
import { toast } from 'react-toastify';
import { BASE_URL } from '../utils';
import Spinner from '../components/Spinner';


const Profile = () => {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user, updateAuth} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {

    try {

      const res = await fetch(`${BASE_URL}/blog/myBlogs/${user?.id}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });
      const data = await res.json();
      setBlogs(data);
      setLoading(false);

    } catch(e) {

      console.log(e);
    }
  }

  const handleDeleteUser = async (e) => {

    try {

      const res = await fetch(`${BASE_URL}/user/delete/${user?.id}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`
        },
        method: 'DELETE'
      });

      const data = await res.json();
      
      if(!res.ok) {
        throw new Error(data.message);
      }

      updateAuth(null);
      navigate('/');
      toast.success("Profile deleted successfully", {
        position: "top-center",
        autoClose: 1200
      });
      
      
      
    } catch(e) {
      console.log(e);
      toast.error(`${e}`, {
        position: "top-center",
        autoClose: 1200
      });
    }
  }

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


    <div className='px-4 md:max-w-6xl md:m-auto'>

      {
        loading ? (<Spinner/>) : (

          <div className='flex flex-col'>

            <div className='flex flex-col items-center gap-3 p-4 shadow-lg '>

            <div className="relative">
              <img
                src={`${BASE_URL}/uploads/${user?.profileImg}`}
                alt=""
                className="w-24 h-24 object-contain rounded-full"
              />
            <div className="absolute inset-0 rounded-full border-2 border-slate-400"></div>
            </div>

            <p className='sm:text-xl font-bold'>{user?.name}</p>
            <div className='flex gap-5 hover:cursor-pointer'>
              <Link to={`/profile/update/${user?.id}`}><AiOutlineEdit size={24}/></Link>
              <div onClick={handleDeleteUser}><AiOutlineDelete size={24}/></div>
              <div onClick={handleLogout}><BiLogOut size={24}/></div>
            </div>
          </div>

          <div className='mt-2'>
            <p className='mb-4 text-xl sm:text-2xl font-semibold'>My Blogs</p>
            <div>
            {
              blogs.length > 0 ? (blogs.map((blog) => {
            
                return (
               
                  <BlogCard key = {blog?._id} blog = {blog}/>
                  
                  )
                })) : (
                  <div className='flex justify-center items-center mt-8'>
                    <p className='text-xl sm:text-3xl font-bold'>You Don't Have Any Blog</p>
                  </div>
                )
            }
            </div>
          </div>
        </div>

        )

      }

    </div>
  )
}

export default Profile