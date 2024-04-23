import React, { useEffect, useRef, useState } from 'react'
import TopNav from './TopNav/TopNav'
import { Toast } from 'primereact/toast';
import Alert from './Admin/Alert'
import Members from './Admin/Members'
import CountContainer from './Admin/CountContainer'
import './Admin/Admin.css'
import Activities from './Admin/Activities';
import { useNavigate } from 'react-router-dom';

const Content = () => {
  document.title = "LMS - Admin"
  const toast = useRef(null);
  const [response, setResponse] = useState({});
  const navigate = useNavigate()
  // Display a success or error message
  const AdminVerification = async (auth) => {
    const response = await fetch(`${import.meta.env.VITE_HOST}/user/verify/Admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem("auth-token")
      },
    });
    const json = await response.json();
    return json
  }
  useEffect(()=>{
    const verify = async () =>{
      const adminResponse = await AdminVerification()    
      setResponse(adminResponse)
    }
    verify()
  },[])
    
  if(response.success){
    return (
      <>
        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <TopNav />
            <Toast ref={toast} />
            <div className="container-fluid">
              <div className="row-50">
  
                {/* Total Books in the library */}
                <CountContainer count={4000} color={'#139b2bad'} icon={'book'} header={'Total Books'} />
  
                {/* Total Registered Students */}
                <CountContainer count={12000} color={'#fb6f92'} icon={'user'} header={'Total Students'} />
  
                {/* Issued Books */}
                <CountContainer count={60} text="%" color={'#8338ec'} icon={'clipboard-list'} header={'Issued Books'} progressBar={true} />
  
                {/* Pending Request Count For Admin */}
                <CountContainer count={18} color={'#9f86c0'} icon={'bell'} header={'Pending Requests'} />
              </div>
              <div className="row row-1200 d-flex justify-content-between">
                <Members />
              </div>
              <div className="row row-1000">              
                <Activities />
                <Alert />
              </div>
            </div>
          </div>
        </div >
        <a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
      </>
    )
  }
  else{
    navigate('/books');
  }
}

export default Content