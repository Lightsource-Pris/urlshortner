import React, { useState,useEffect } from 'react'
import Login from '../images/login.svg'
import { Link } from 'react-router-dom'
import 'animate.css';

function Header() {
    return (
        <div className='flex flex-row justify-between items-center'>
            <Link className='text-transparent text-1xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-[600] text-[36px] cursor-pointer'>LilLink</Link>
            <div className='flex flex-row items-center space-x-5'>
                <div>
                    <button className='rounded-[48px] text-white p-5 bg-[#181E29] border-[1px] border-[#353C4A] w-[123px] flex flex-row items-center space-x-3'>
                        <span>Login</span>
                        <img src={Login}/>
                    </button>
                </div>
                <div className='hidden lg:block'><button className='rounded-[48px] bg-[#144EE3] p-5 w-[178px] text-white bg-gradient-to-r from-purple-400 to-pink-600'>Signup</button></div>
            </div>
        </div>
      )
}

export default Header