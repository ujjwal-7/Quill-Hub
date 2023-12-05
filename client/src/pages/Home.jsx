import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import { BASE_URL } from '../utils';

const Home = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
      
      fetchAllBlogs();

    }, [pageNumber]);

    const fetchAllBlogs = async () => {

      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/blog/allBlogs?page=${pageNumber}`);
        const data = await res.json();
        setBlogs(data?.blogs);
        setTotalPages(data?.totalPages);
        setLoading(false);

      } catch(e) {
        console.log(e);
      }
      
    }

  return (
    <>

        <div className="p-4 md:max-w-6xl md:m-auto min-h-[80vh]">

          {

            loading ? (<Spinner/>) : (

                blogs.length > 0 ? blogs.map((blog) => {

                    return (
                        
                        <BlogCard key = {blog?._id} blog = {blog}/>
                        
                        )
                }) : (
                    <div className='flex justify-center items-center'>
                        <p className='text-3xl font-bold'>Sorry, No Blogs Yet!</p>
                    </div>
                )
                
            )

          }

          {
            totalPages > 0 ? <Pagination pageNumber = {pageNumber} setPageNumber = {setPageNumber} totalPages = {totalPages} /> : ''
          }  

                 
      </div>
        
    </>
  )
}

export default Home;

