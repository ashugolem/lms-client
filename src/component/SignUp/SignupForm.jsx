import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FormField from './FormField';
import { Dropdown } from 'primereact/dropdown';

const LoginForm = (props) => {
    document.title = "LMS - Register"
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = props;

    const [isVisibile1, setIsVisibile1] = useState(false)
    const [isVisibile, setIsVisibile] = useState(false)



    return (
        <form className="form signup-form" onSubmit={handleSubmit}>
            <h2 className="display-6 text-center fw-bold">
                <span className="underline pb-2">
                    <strong style={{ color: "#211e2bd9", fontFamily: "sans-serif" }}>Signup</strong>
                    <br />
                </span>
            </h2>
            <FormField type={"text"} name={"name"} value={values.name} icon={"fa-solid fa-user"} handleBlur={handleBlur} handleChange={handleChange} error={errors.name} touched={touched.name} />

            <FormField type={"text"} name={"email"} value={values.email} icon={"fa-solid fa-envelope"} handleBlur={handleBlur} handleChange={handleChange} error={errors.email} touched={touched.email} />

            <div className="row">
                <div className="col-6">
                    <FormField type={"text"} name={"phone"} value={values.phone} icon={"fa-solid fa-phone"} handleBlur={handleBlur} handleChange={handleChange} error={errors.phone} touched={touched.phone} />
                </div>
                <div className="col-6 ">
                    <div className="flex-column text-start">
                        <label>Select Role</label>
                    </div>
                    <Dropdown name='role' value={values.role} onBlur={handleBlur} onChange={handleChange} options={['Student']}
                        placeholder="Select Role" style={{ height: '50px', width: '100%' }} />
                    {errors.role && touched.role ? (
                        <p className="form-error text-danger">{errors.role}</p>
                    ) : null}
                </div>
            </div>
            {values.role === 'Student' &&
                <>
                    <div className="row">
                        <div className="col-6">
                            <FormField type={"text"} name={"admissionNo"} value={values.admissionNo} icon={"fa-solid fa-ticket"} handleBlur={handleBlur} handleChange={handleChange} error={errors.admissionNo} touched={touched.admissionNo} />
                        </div>
                        <div className="col-6">
                            <FormField type={"text"} name={"semester"} value={values.semester} icon={"fa-solid fa-building-columns"} handleBlur={handleBlur} handleChange={handleChange} error={errors.semester} touched={touched.semester} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <FormField type={"text"} name={"course"} value={values.course} icon={"fa-solid fa-graduation-cap"} handleBlur={handleBlur} handleChange={handleChange} error={errors.course} touched={touched.course} />
                        </div>
                        <div className="col-6">
                            <FormField type={"text"} name={"branch"} value={values.branch} icon={"fa-solid fa-book"} handleBlur={handleBlur} handleChange={handleChange} error={errors.branch} touched={touched.branch} />
                        </div>
                    </div>
                </>
            }
            {values.role === 'Teacher' &&
                <>
                    <div className="row">
                        <div className="col-6">
                            <FormField type={"text"} name={"eid"} value={values.eid} icon={"fa-solid fa-id-badge"} handleBlur={handleBlur} handleChange={handleChange} error={errors.eid} touched={touched.eid} />
                        </div>
                        <div className="col-6">
                            <FormField type={"text"} name={"designation"} value={values.designation} icon={"fa-solid fa-user-shield"} handleBlur={handleBlur} handleChange={handleChange} error={errors.designation} touched={touched.designation} />
                        </div>
                    </div>
                </>
            }


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

            <div className="flex-column text-start">
                <label>Confirm Password </label>
            </div>
            <div className="inputForm">
                <i className="fa-solid fa-lock"></i>
                <input
                    type="password"
                    name='password_repeat'
                    className="input password_repeat"
                    placeholder="Confirm your Password"
                    value={values.password_repeat}
                    onBlur={handleBlur}
                    autoComplete='true'
                    onChange={handleChange}
                />
                {
                    isVisibile1
                        ?
                        <a onClick={() => {
                            setIsVisibile1(!isVisibile1);
                            document.querySelector('.password_repeat').type = 'text';
                        }}><i className="fa-regular fa-eye"></i></a>
                        :
                        <a onClick={() => {
                            setIsVisibile1(!isVisibile1);
                            document.querySelector('.password_repeat').type = 'password';
                        }}><i className="fa-regular fa-eye-slash"></i></a>
                }
            </div>
            {errors.password_repeat && touched.password_repeat ? (
                <p className="form-error text-start text-danger">{errors.password_repeat}</p>
            ) : null}
            <button className="button-submit" type='submit' >Register</button>

            <p className="p">
                Don't have an account?<Link to={'/login'}> <span className="span text-primary">Log in</span></Link>
            </p>
        </form>
    );
};

export default LoginForm;
