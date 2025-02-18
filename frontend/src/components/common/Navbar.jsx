import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import auth from '../../config/firebase'
import { signOut } from 'firebase/auth'

function Navbar() {
  const[log, setLog] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
      auth.onAuthStateChanged(function(user){
        if(user){
          console.log("User Logged In")
          setLog(true)
        }else{
          console.log("User Logged Out")
          setLog(false)
        }
      })
    },[])

    function logout(){
      signOut(auth)
    }
    
  return (
    <div className='py-5 flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Personal</h2>
        <div className='flex items-center'>
            <Link className='list-none px-5' to={"/home"}>Home</Link>
            <Link className='list-none px-5' to={"/blogs"}>Blogs</Link>
            {
              log? <button className='button-style hidden md:block' onClick={logout}>Login Out</button> : <button className='button-style hidden md:block' onClick={()=>navigate("/login")}>Login</button>
            }
        </div>
    </div>
  )
}

export default Navbar