import React from 'react';
import { useState } from 'react';
import {BiSolidUser} from 'react-icons/bi';
import {BsFillKeyFill} from 'react-icons/bs';
import {MdEmail} from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { BASE_URL } from '../utils';

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const validateForm = () => {

        if(name === '') {

            toast.error(`Name can not be empty`, {
                position: "top-center",
                autoClose: 1200
            });
            return true;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)) {
            
            toast.error(`Invalid email address`, {
                position: "top-center",
                autoClose: 1200
            });
            return true;
        }

        if(password.length < 6) {
            toast.error(`Password must contain greater than or equal to 6 characters`, {
                position: "top-center",
                autoClose: 1200
            });
            return true;
        }

        return false;

    }

    const handleSubmit =  async (e) => {

        e.preventDefault();

        if(validateForm()) {
            return;
        }

        const newUser={
            email,
            name,
            password
        };

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

            const res = await fetch(`${BASE_URL}/auth/register`,  {
            
                headers: {
                
                'Content-Type': 'application/json'
                },
                method: "POST",
                
                body: JSON.stringify(newUser)
            })

            const data = await res.json();

            if(!res.ok) {
                throw new Error(data.message);
            }

            navigate('/login');
            

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
                    <h1 className='text-2xl xs:text-3xl font-bold text-[#1a8917]'>Create your account!</h1>
                    
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

                    <div className='flex border-2'>
                        <div className='flex w-[10%] justify-center items-center bg-[#1a8917]'>
                            <MdEmail size={24} color='white'/>
                        </div>
                        <div className='h-8 w-[90%]'>
                            <input 
                            
                                type='email' 
                                name='email'
                                placeholder='Email'
                                value={email}
                                required
                                onChange={(e) => {setEmail(e.target.value)}}
                                className='h-full w-full pl-2 focus:outline-none'
                            />
                        </div>
                        
                    </div>

                    <div className='flex border-2'>
                        <div className='flex w-[10%] justify-center items-center bg-[#1a8917]'>
                            <BsFillKeyFill size={22} color='white'/>
                        </div>
                        <div className='h-8 w-[90%]'>
                            <input 
                            
                                type='password' 
                                name='password'
                                placeholder='Password'
                                autoComplete="off"
                                value={password}
                                required
                                onChange={(e) => {setPassword(e.target.value)}}
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
                  
                    <button className='bg-[#1a8917] h-8  text-white' type='submit '>SignUp</button>
                    <Link to='/login'>
                        <p className='text-sm xs:text-base text-blue-500'>Already have an account? Sign in.</p>
                    </Link>
                </form>   
            </div>
        </div>
  )
}

export default SignUp;