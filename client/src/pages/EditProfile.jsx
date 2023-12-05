import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import {BiSolidUser} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../utils';

const EditProfile = () => {

    const {user, editUserDetails} = useContext(AuthContext);
    const [name, setName] = useState(user?.name);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit =  async (e) => {

        e.preventDefault();

        const newUser={ name, profileImg: user?.profileImg };

        if(selectedFile) {

            const data=new FormData();
            const filename=Date.now()+selectedFile.name;
            data.append("img",filename);
            data.append("file",selectedFile);
            newUser.profileImg=filename;

            try{
                await fetch(`${BASE_URL}/api/upload`, {
                    
                    method: "POST",
                    body: data
                })
            } catch(e){
                console.log(e)
            }
        }

        try {

            const res = await fetch(`${BASE_URL}/user/update/${user?.id}`,  {
            
                headers: {
                
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token}`
                },
                method: "PATCH",
                body: JSON.stringify(newUser)
            });

            const data = await res.json();
            if(!res.ok) {
                throw new Error(data.message);
            }

            editUserDetails(data);
            navigate(-1);
            toast.success("Profile updated successfully", {
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

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        
    };

  return (

    <div className='md:max-w-6xl md:m-auto py-20'>
        <div className='flex flex-col h-64 items-center justify-between'>
                <div className=''>
                    <h1 className='text-2xl xs:text-3xl font-bold text-[#1a8917]'>Edit your profile</h1>

                </div>
                <form className='mt-8 w-60 xs:w-80 flex flex-col space-y-6' onSubmit={handleSubmit}>

                    <div className='flex border-2'>
                        <div className='flex w-[10%] justify-center items-center bg-[#1a8917]'>
                            <BiSolidUser size={24} color='white'/>
                        </div>
                      
                        <div className='h-8 w-[90%]'>
                            <input 
                            
                                type='text' 
                                name='name'
                                placeholder='Name'
                                value={name}
                                required
                                onChange={(e) => {setName(e.target.value)}}
                                className='h-full w-full pl-2 focus:outline-none'
                            />
                        </div>
                        
                    </div>

                    <label htmlFor='profile-picture'>Upload a profile picture (optional)</label>
                      
                        <div className='xs:h-8 w-[90%]'>
                            <input 
                                id='profile-picture'
                                type='file' 
                                name='file'
                                accept="image/*"
                                onChange={handleFileChange}
                                className='h-full w-full pl-2 focus:outline-none'
                            />
                        </div>
                    
                    <button className='bg-[#1a8917] h-8  text-white' type='submit '>Update</button>
                    <div className='bg-[#1a8917] h-8  text-white text-center pt-1 hover:cursor-pointer' onClick={() => {navigate(-1)}}>Close</div>
                    
                </form>
                
            </div>  

        </div>  
  )
}

export default EditProfile