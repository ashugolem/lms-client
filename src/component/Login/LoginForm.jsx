import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setLoggedIn, setUserName, setRole } from '../Action/index';
import Decode from '../JWT/Decode';
import { LoginSchema } from '../../schemas';
import LoginApi from '../API/Login';
import { useFormik } from 'formik';
import { useCookies } from "react-cookie";
import './Responsive.css'
import './CSS/LoginForm.css'
const LoginForm = (props) => {
    document.title = "LMS - Login"
    const { setLoading, showError } = props;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(["auth-token"]);

    const [isVisibile, setIsVisibile] = useState(false)
    const initialValues = { email: '', password: '' }

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


    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="display-6 fw-bold mb-5">
                <span className="underline pb-2">
                    <strong style={{ color: "#211e2bd9", fontFamily: "sans-serif" }}>Login</strong>
                    <br />
                </span>
            </h2>
            <div className="flex-column text-start">
                <label>Email </label>
            </div>
            <div className="inputForm">
                <i className="fa-solid fa-envelope mt-1"></i>
                <input
                    type="text"
                    className="input"
                    name='email'
                    placeholder="Enter your Email"
                    value={values.email}
                    onBlur={handleBlur}
                    autoComplete='true'
                    onChange={handleChange}
                    />
            </div>
            {errors.email && touched.email ? (
                <p className="form-error text-start text-danger">{errors.email}</p>
            ) : null}

            <div className="flex-column text-start">
                <label>Password </label>
            </div>
            <div className="inputForm">
                <i className="fa-solid fa-lock"></i>
                <input
                    type="password"
                    name='password'
                    className="input password"
                    placeholder="Enter your Password"
                    value={values.password}
                    onBlur={handleBlur}
                    autoComplete='true'
                    onChange={handleChange}
                    />
                {
                    isVisibile
                        ?
                        <a onClick={() => {
                            setIsVisibile(!isVisibile);
                            document.querySelector('.password').type = 'text';
                        }}><i className="fa-regular fa-eye"></i></a>
                        :
                        <a onClick={() => {
                            setIsVisibile(!isVisibile);
                            document.querySelector('.password').type = 'password';
                        }}><i className="fa-regular fa-eye-slash"></i></a>
                }
            </div>
            {errors.password && touched.password ? (
                <p className="form-error text-start text-danger">{errors.password}</p>
            ) : null}

            <div className="flex-row">
                <div>
                    <input type="checkbox" />
                    <label className='mx-2'>Remember me </label>
                </div>
                <span className="span">Forgot password?</span>
            </div>
            <button className="button-submit" type='submit'>Sign In</button>
            <p className="p">
                Don't have an account?<Link to={'/register'}> <span className="span text-primary">Sign Up</span></Link>
            </p>
            <span className="form-error text-muted text-start">Admin Email : singh.asishhhh@gmail.com</span>
            <span className="form-error text-muted text-start">Password : 123456</span>
        </form>
    );
};

export default LoginForm;
