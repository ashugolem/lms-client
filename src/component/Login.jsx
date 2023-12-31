import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NotSure from './NotSure';
import TopNav from './TopNav/TopNav';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn, setUserName, setRole } from './Action/index';
import Decode from './JWT/Decode';
import { LoginSchema } from '../schemas';
import LoginApi from './API/Login';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import RoleBasedAuthentication from './RBA/RBA';

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.setLog.isLoggedIn)

  const initialValues = { email: '', password: '' }

  const toast = useRef(null);

  const showError = (errorMsg) => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: LoginSchema,
      onSubmit: async (values, action) => {
        const response = await LoginApi(values)
        if (response.success) {
          dispatch(setLoggedIn(true));
          localStorage.clear();
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
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <TopNav />
          <section className="py-md-5" >
            <div className="container py-md-5">
              <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                  <img
                    className="img-fluid w-100"
                    src="src/assets/img/illustrations/login.svg"
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
                        style={{ borderRadius: "5px", height:"55px!important" }}
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
                        style={{ borderRadius: "5px", height: "55px" }}
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
                        className="btn btn-primary shadow px-3 py-2"
                        style={{ borderRadius: "2rem" }}
                        type="submit"
                      >
                        Log in
                      </button>
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
      </div>
    </>
  )
}

export default Login;