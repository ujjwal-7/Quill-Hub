import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { BASE_URL } from '../utils';
import Spinner from '../components/Spinner';

const SingleBlog = () => {

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(AuthContext);
  const {id} = useParams();
  const navigate = useNavigate();


  useEffect(() => {

    fetchBlog();

  }, [id]);

  const fetchBlog = async () => {

    try {

      const res = await fetch(`${BASE_URL}/blog/${id}`);
      const data = await res.json();
      setBlog(data);
      setLoading(false);

    } catch(e) {
      console.log(e);
    }
    
  }

  const handleDelete = async () => {

    try {

      const res = await fetch(`${BASE_URL}/blog/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
        method: "DELETE",
      });

      const data = await res.json();

      if(!res.ok) {
        throw new Error(data.message);
      }

      navigate('/');
      toast.success("Blog deleted successfully", {
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


  const date = new Date(blog?.createdAt);
  const publishedDate = date.toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'});


  return (
    <>
      <div className='p-4 md:max-w-6xl md:m-auto'>

        {
          loading ? (<Spinner/>) : (

            <div className='flex flex-col'>
            <div className=' p-2'>
              <p className='text-2xl sm:text-4xl font-bold'>{blog?.title}</p>
              <div className='flex mt-4'>
                <div className="relative">
                  <img
                    src={blog?.author?.profileImg}
                    alt=""
                    className="w-12 h-12 object-contain rounded-full"
                  />
                <div className="absolute inset-0 rounded-full border-2 border-slate-400"></div>
                </div>
  
  
                <div className='ml-2'>
                  <p className='text-sm sm:text-base'>{blog?.author?.name}</p>
                  <p className='text-sm sm:text-base'>{publishedDate}</p>
                </div>
              </div>
  
              <div className='flex justify-between mt-4 p-2'>
                <div className='flex'>
                  <span className='text-sm sm:text-base'>{blog?.views} Views</span>
                </div>
  
                {
                    (user?.id === blog?.author?._id) && <div className='flex hover:cursor-pointer'>
                      <Link to={`/editblog/${blog?._id}`}>
                        <AiOutlineEdit size={24}/>
                      </Link>
                      <AiOutlineDelete size={24} className='ml-4' onClick={handleDelete}/>
                    </div>
                }
  
              </div>
                
            </div>
  
            <div className='w-full flex justify-center'>
              <img className='object-cover' src={blog?.coverImg} alt="Blog" />
            </div>
  
            <div className='mt-4 p-2'>
              <p className='xs:text-xl text-justify'>{blog?.content}</p>
            </div>
    
          </div>
            
          )

        }

       

      </div>
    </>
  )
}

export default SingleBlog