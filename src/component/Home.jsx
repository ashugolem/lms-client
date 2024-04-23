import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()
    const role = useSelector((state) => state.setLog.role);
    // Redirect to login page if user is not logged in
    useEffect( () => {
        if (localStorage.getItem('auth-token') === null) {
            navigate('/login', { replace: true })
        } else {
            if (role == "Admin"){
                navigate("/admin", {replace:true})
            }else{
               navigate("/books", {replace:true});
           }
        }
    }, [navigate])
  return (
    <div>Home</div>
  )
}
