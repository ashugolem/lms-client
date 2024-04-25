import React, { useRef, useState } from 'react'
import NotSure from '../NotSure';
import { useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import RoleBasedAuthentication from '../RBA/RBA';
import Lottie from 'lottie-react';
import animationData from '../../assets/Loading/Airplane.json';
import './Responsive.css'
import LoginForm from './LoginForm';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Login() {
  const isLoggedIn = useSelector((state) => state.setLog.isLoggedIn)
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const showError = (errorMsg) => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
  }
  const styles = {
    animation: {
      height: '100dvh',
      width: '100vw',
    }
  };
  document.title = "LMS - Login"
  if (isLoggedIn) {
    return (
      <RoleBasedAuthentication />
    )
  }
  return (
    <>
      <Toast ref={toast} />
      {loading
        ?
        <div className="container d-flex justify-content-center" style={styles.animation}>
          <Lottie animationData={animationData} loop={true} style={{ width: '250px' }} />
        </div>

        :
        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <section className="py-md-5" >
              <div className="container  res-1200">
                <div className="row justify-content-between res-600">
                  <div className="col-md-8 text-center d-flex responsive align-items-center">
                    <LazyLoadImage
                      className="img-fluid w-100 responsive"
                      src="/img/illustrations/login.png"
                      alt="Login Illustration"
                      effect='blur'
                      loading='lazy'
                      placeholderSrc='/img/illustrations/login_placeholder.png'
                    />
                  </div>
                  <div className="col-md-6 text-center res-922 text-md-start ">                   
                    <LoginForm setLoading={setLoading} showError={showError} />
                  </div>
                </div>
              </div>
            </section>
            <div className='bottom-headline'>
              <NotSure heading="Facing error?" description="Contact - support@edusync.com" />
            </div>
          </div>
        </div>}
    </>
  )
}

export default Login;