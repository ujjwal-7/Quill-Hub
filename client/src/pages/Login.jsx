import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {BiSolidUser} from 'react-icons/bi';
import {BsFillKeyFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../utils';


const Login = () => {

    const {updateAuth} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
          email,
          password
        };

        try {

            const res = await fetch(`${BASE_URL}/auth/login`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            
            const user = await res.json();

            if(!res.ok) {
                
                throw new Error(user.message);
       
            } 

            toast.success("Logged in successfully!", {
                position: "top-center",
                autoClose: 1200
            });
            updateAuth(user);
            navigate('/');

        } catch(e) {
            toast.error(`${e}`, {
                position: "top-center",
                autoClose: 1200
            });
        }
    }

    
    return (

    <>
        <div className='md:max-w-6xl md:m-auto py-20'>

            <div className='flex flex-col h-64 items-center justify-between'>
                <div className='mr-29 xs:mr-24'>
                    <h1 className='text-2xl xs:text-3xl font-bold text-[#1a8917]'>Welcome Back!</h1>
                    <h3 className='text-gray-500'>Login to continue</h3>
                </div>
                <form className='mt-8 w-60 xs:w-80 flex flex-col space-y-6' onSubmit={handleLogin}>
                    <div className='flex border-2'>
                        <div className='flex w-[10%] justify-center items-center bg-[#1a8917]'>
                            <BiSolidUser size={24} color='white'/>
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
                    
                    <button className='bg-[#1a8917] h-8  text-white' type='submit '>Login</button>
                </form>

                <Link to='/signup'>
                    <p className='mt-4 text-sm xs:text-base text-blue-500'>Don't have an account? Create an account.</p>
                </Link> 

                <div className='mt-2'>
                    <p>Demo account: testuserdev07@gmail.com</p>
                    <p>Password: test123</p>
                </div>
                
            </div>
        </div>
        
    </>
    )
}

export default Login;