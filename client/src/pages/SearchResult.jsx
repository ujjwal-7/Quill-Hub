import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { useParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { BASE_URL } from '../utils';
import Spinner from '../components/Spinner';

const SearchResult = () => {

    const [blogs, setBlogs] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const {searchQuery} = useParams();

    useEffect(() => {
        fetchData();
    }, [pageNumber, searchQuery]);

    const fetchData = async () => {

        try {
            const res = await fetch(`${BASE_URL}/blog/search?searchQuery=${searchQuery}&page=${pageNumber}`);
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

        <div className="p-4 md:max-w-6xl md:m-auto min-h-[90vh] ">
            {

                loading ? (<Spinner/>) : (

                    blogs.length > 0 ? blogs.map((blog) => {
            
                        return (
                            
                            <BlogCard key = {blog?._id} blog = {blog}/>
                            
                            )
                    }) : (
                        <div className='flex justify-center items-center'>
                            <p className='text-3xl font-bold'>Sorry, No Results Found!</p>
                        </div>
                    )
                    
                )
                
            }

            {
                totalPages > 0? <Pagination pageNumber = {pageNumber} setPageNumber = {setPageNumber} totalPages = {totalPages} /> : ''
            }   
        </div>
    
    </>
  )
}

export default SearchResult