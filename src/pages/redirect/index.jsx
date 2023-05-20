import React, { useState,useEffect } from 'react'
import Login from '../../images/login.svg'
import LLink from '../../images/link.svg'
import { Link } from 'react-router-dom'
import { CirclesWithBar } from 'react-loader-spinner'
import axios from 'axios';
import WOW from 'wowjs';
import 'animate.css';
import Header from '../../components/header'

function RedirectBody(){
    let user_page = window.location.pathname
    let formated_page = user_page.replace(/\//,'')
    const [error, setError] = useState()
    var MyHeaders = new Headers();
    MyHeaders.append("Accept", "application/json");
    MyHeaders.append("Content-Type", "application/json");
    var settings = {
        headers: MyHeaders
    };
    let base = process.env.REACT_APP_BASE_URL
    useEffect(()=>{
        axios.get(base+"/redirect_url/"+formated_page, settings)
        .then((res) => {
            if(res.data.status == 200){
                window.location.href=res.data.original_url
            }else{
                setError(1)
            }
        })
        .catch((e)=>{
            setError(1)
        })  
    },[])
    return (
        <>
            {!error ? <div className='mx-auto mt-5 flex flex-col justify-center items-center'>
                <CirclesWithBar
                height="50"
                width="50"
                color="pink"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                outerCircleColor=""
                innerCircleColor=""
                barColor=""
                ariaLabel='circles-with-bar-loading'
                />
                <span className='text-[#C9CED6] mt-3'>Working on your page</span>
            </div> : 
                <div className='flex flex-col'>
                    <span className='text-transparent text-[150px] bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-[600] text-[36px] cursor-pointe'>404</span>
                    <span className='text-[#C9CED6]'>Oops! Seems you entered a wrong link... <a href='/' className='text-blue-300'>Go Home</a></span>
                </div>
            }
        </>
    )
}
function Redirect(){
    return (
        <>
        <div className='grid grid-cols-1 p-5 lg:p-10 bg-[#0B101B] h-screen'>
            <div className='col-span-1'>
                <Header></Header>
            </div>
            <div className='col-span-1 lg:mt-5'>
                <RedirectBody></RedirectBody>
            </div>
        </div>
        </>
    )
}

export default Redirect