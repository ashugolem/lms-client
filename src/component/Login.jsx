import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NotSure from './NotSure';
import TopNav from './TopNav/TopNav';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn, setUserName, setRole } from './Action/index';
import Decode from './JWT/Decode';
import { LoginSchema } from '../schemas';
import LoginApi from './API/Login';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import RoleBasedAuthentication from './RBA/RBA';
import { useCookies } from "react-cookie";
import Lottie from 'lottie-react';
import animationData from '../assets/Loading/Airplane.json';

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.setLog.isLoggedIn)
  const [cookies, setCookie] = useCookies(["auth-token"]);

  const initialValues = { email: 'singh.ashishhhh@gmail.com', password: '123456' }
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
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: LoginSchema,
      onSubmit: async (values, action) => {
        setLoading(true)
        const response = await LoginApi(values)
        setLoading(false)
        if (response.success) {
          dispatch(setLoggedIn(true));
          localStorage.clear();
          setCookie("auth-token", response.authToken, { path: "/", httpOnly: true, sameSite: 'None' });
          console.log(cookies['auth-token'])
          localStorage.setItem('auth-token', response.authToken);
          localStorage.setItem('user-id', response.id);
          dispatch(setRole(Decode().user.role))
          dispatch(setUserName(response.username))
          navigate('/admin')
        }
        else {
          showError(response.msg)
        }
        action.resetForm();
      },
    });
  document.title = "LMS - Login"
  if (isLoggedIn){
    return(
      <RoleBasedAuthentication/>
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
            <div className="container py-md-5">
              <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                  <img
                    className="img-fluid w-100"
                    src="/img/illustrations/login.svg"
                    alt="Login Illustration"
                  />
                </div>
                <div className="col-md-5 col-xl-4 text-center text-md-start">
                  <h2 className="display-6 fw-bold mb-5">
                    <span className="underline pb-1">
                      <strong style={{ color: "#211e2bd9", fontFamily: "sans-serif" }}>Login</strong>
                      <br />
                    </span>
                  </h2>
                  <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                      <input
                        className="shadow form-control"
                        style={{ borderRadius: "5px"}}
                        type="email"
                        name="email"
                        value={values.email}
                        placeholder="User ID or Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete='true'
                      />
                      {errors.email && touched.email ? (
                        <p className="form-error text-danger">{errors.email}</p>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <input
                        className="shadow form-control"
                        style={{ borderRadius: "5px", height: "39px" }}
                        type="password"
                        value={values.password}
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete='true'
                      />
                      {errors.password && touched.password ? (
                        <p className="form-error text-danger">{errors.password}</p>
                      ) : null}
                    </div>
                    <div className="mb-5">
                      <button
                        className="btn btn-primary shadow px-4 py-2 mt-3"
                        style={{ borderRadius: "0.5rem" }}
                        type="submit"
                      >
                        Log in
                      </button>
                        <p className="form-error text-success">Admin Email : singh.ashishhhh@gmail.com</p>
                        <p className="form-error text-success">Password : 123456</p>
                    </div>
                    <p className="text-muted">
                      <Link to="/forgot-password">Forgot your password?</Link>
                    </p>
                    <p className="text-muted">Dont Have an account?

                      <Link to="/signup">{"     "}
                        <span className="underline pb-1">
                          <strong>Signup</strong>
                        </span>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <NotSure heading="Facing error while Login" description="Contact us by the button on the right or email us at support@edusync.com" />
        </div>
      </div>}
    </>
  )
}

export default Login;