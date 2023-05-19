import React, { useState,useEffect } from 'react'
import Login from '../../images/login.svg'
import LLink from '../../images/link.svg'
import { Link } from 'react-router-dom'
import { CirclesWithBar } from 'react-loader-spinner'
import axios from 'axios';
import WOW from 'wowjs';
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

function Shorten(){

    useEffect(() => {
        new WOW.WOW({
          live: false
        }).init();
      }, [])


    const [started, setStarted] = useState()

    function verify(){
        setStarted(true)
        let thelink = document.getElementById('link').value;
        let name = document.getElementById('name').value;
        var a  = document.createElement('a');
        a.href = thelink;
        if(a.host && a.host != window.location.host){
            if (name == ''){
                makeError('Please input a unique name')
                setStarted(false)
            }else callEndpoint()
        }else{
            makeError('Please enter a valid url!')
            setStarted(false)
        }
    }

    const [error, setError] = useState()

    function makeError(err){
        setError(err)
        setStarted(false)
        setTimeout(() => removeError(),3000)
    }

    function removeError(){
        setError(false)
    }
    function callEndpoint(){
        var MyHeaders = new Headers();
        MyHeaders.append("Accept", "application/json");
        MyHeaders.append("Content-Type", "application/json");
        var settings = {
            headers: MyHeaders
        };
        let url = "https://jekinraa.com"
        let name = "jekinraa"
        axios.get("https://lilapi.iaaws.com/shorten/?url="+url+"&name="+name, settings)
        .then((res) => {
            if(res.data.message){
                alert('Success')
            }else{
                makeError('Something went wrong, please try again')
            }
        })
        .catch((e)=>{
            makeError('Something went wrong, please try again')
        })  

    }
    function copy(){
        const copyContent = async () => {
            try {
              await navigator.clipboard.writeText('https://lilapi.iaaws.com/shorten/?url={"{url}"}&name={"{name}"}');
              alert('Endpoint copied to clipboard');
            } catch (err) {
             alert('Failed to copy: ', err);
            }
          }
          copyContent()
    }
    return (
        <div className='flex flex-col'>
            <div className='text-[30px] lg:text-[60px]'>
                <h3 className='font-[800] text-transparent text-1xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 wow slideInLeft' data-wow-duration="2s">Personalize and shorten your links</h3>
            </div>
            {!started ?
            <>
            <span className='text-[#C9CED6] mt-3'>Input your long link below and even personalize before sharing with your target audience</span>
        
            <div class="mt-5 flex justify-center items-center">
                <div class="relative w-full lg:w-auto"> 
                    <div class="absolute left-10 top-5">
                        <img className='my-auto' src={LLink} />
                    </div>
                <input type="text" id="link" class="h-14 w-full lg:w-96 pl-[50px] text-center pr-20 rounded-[48px] bg-[#181E29] border-[2px] border-[#353C4A] z-0 text-white focus:outline-none" placeholder="Enter your link here"/>

                </div>
            </div>
            <div className="mt-5 flex justify-center items-center">
                <div class="relative w-full lg:w-auto"> 
                    <input type="text" id="name" class="h-14 w-full lg:w-96 pl-5 pr-20 rounded-[48px] bg-[#181E29] border-[2px] border-[#353C4A] z-0 text-white focus:outline-none" placeholder="Give it a unique name"/>
                    <div class="absolute top-2 right-2">
                        <button onClick={verify} class="h-10 w-20 lg:w-40 text-white rounded-[48px] bg-[#144EE3] border-[1px]  font-[600] bg-gradient-to-r from-purple-400 to-pink-600">Continue</button>
                    </div>
                </div>
            </div>
            {error ? <div className='text-red-500 mt-2 transition-all duration-150'>{error}</div> : null}
            <div className='font-[600] text-[18px] text-transparent mt-5 text-1xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Or</div>

            <div className='flex flex-row mx-auto items-center space-x-3 mt-5'>
                <span className='text-[#C9CED6]' title='Click to copy'>You can also use our get endpoint in your platform: <span id="textToCopy" onClick={copy} className='cursor-pointer hover:text-pink-300'>https://lilapi.iaaws.com/shorten/?url={"{url}"}&name={"{name}"}</span></span>
            </div>
            </>
            :null}

            {started ? 
            <div className='mx-auto mt-5 flex flex-col justify-center items-center'>
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
                <span className='text-[#C9CED6] mt-3'>Cooking your new link</span>
            </div> : null}
 
        </div>
    )
}

function Home() {

  return (
    <div className='grid grid-cols-1 p-5 lg:p-10 bg-[#0B101B] h-screen'>
        <div className='col-span-1'>
            <Header></Header>
        </div>
        <div className='col-span-1 lg:mt-5'>
            <Shorten></Shorten>
        </div>
    </div>
  )
}

export default Home