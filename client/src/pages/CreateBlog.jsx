import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../utils';

const CreateBlog = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
     
    const newBlog = {
      title,
      content: description,
    }

    if(file) {

      const data=new FormData();
      const filename=Date.now()+file.name;
      data.append("img",filename);
      data.append("file",file);
      newBlog.coverImg=filename;

      try {

        const res = await fetch(`${BASE_URL}/api/upload`, {
                    
          method: "POST",
          body: data
        });


      } catch(e) {
        console.log(e);
      }

    }

      try {

        const res = await fetch(`${BASE_URL}/blog/create`,  {
        
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`
            },
            method: "POST",
          
            body: JSON.stringify(newBlog)
        });

        const blog = await res.json();

        if(!res.ok) {
          throw new Error(blog.message);
        }

        navigate(`/singleblog/${blog?._id}`);
        toast.success("Blog created successfully", {
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

      <div className='p-4 md:max-w-6xl md:m-auto'>
          <form className='flex flex-col justify-center
          ' onSubmit={handleSubmit}>

              <div className="flex flex-col">

                <input
                  type="text"
                  placeholder="Title"
                  autoFocus={true}
                  value={title}
                  required
                  onChange={e=>setTitle(e.target.value)}
                  className='mb-10 h-10 p-2'
                />

                <label htmlFor="fileInput">
                  <i className="writeIcon fas fa-plus"></i>
                </label>
                <input
                  type="file"
                  id="fileInput"
                  
                  className='mb-10'
                  onChange={(e) => setFile(e.target.files[0])}
                />
                
              </div>
              <div className=' h-80 mb-10'>
                <textarea
                  placeholder="Tell your story..."
                  type="text"
                  value={description}
                  required
                  className='w-full h-full p-2'
                  onChange={e=>setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className='flex'>
                <button className='text-white bg-[#1a8917] rounded-full w-20 h-8' type="submit">
                  Publish
                </button>

                <div className='text-white pl-4 pt-1 bg-[#1a8917] rounded-full w-20 h-8 ml-4 cursor-pointer' onClick={(e) => {navigate(-1)}}>
                  Cancel
                </div>
              </div>
              
          </form>
        </div>
      
      
    </>
  )
}

export default CreateBlog