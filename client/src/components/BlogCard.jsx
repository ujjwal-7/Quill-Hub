import React from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils';

const BlogCard = ({blog}) => {

    const date = new Date(blog?.createdAt);
    const publishedDate = date.toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'});

  return (

    <>
      <Link to={`/singleblog/${blog?._id}`}>
      <div className="flex flex-col w-full sm:flex-row sm:space-x-4 mb-10">
            
            <div className="w-full sm:w-[35%] sm:h-[165px] flex justify-center items-center">
              <img src={blog ? `${BASE_URL}/uploads/${blog?.coverImg}` : ''} alt="" className="object-cover" style={{ maxHeight: '165px' }}/>
            </div>
            
            <div className="flex flex-col w-full mt-4 sm:mt-0 sm:w-[65%]">

              <p className="xs:text-lg font-bold md:mb-2 mb-1 md:text-2xl">
                {blog?.title}
              </p>

              <div className="flex mb-2 text-sm font-semibold items-center justify-between md:mb-4">
                <p>{blog?.author?.name}</p>
                <p>{publishedDate}</p>
              </div>
              
              <div>  
                <p className="hidden xs:block text-sm md:text-base">{blog?.content.slice(0, 200)} ...Read more
                </p>
              </div>
            </div>
        </div>
      
      </Link>
    
    </>
        
  )
}

export default BlogCard