import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import NotSure from '../NotSure';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import CreateUser from '../API/Signup/Verification';
import CheckUser from '../API/Signup/CheckUser';
import sendEmail from '../API/EmailJS';
import Lottie from 'lottie-react';
import animationData from '../../assets/Loading/Airplane.json';
import ActivationRequest from '../API/Signup/ActivationRequest';
import { SignupSchema } from '../../schemas';
import { Calendar } from 'primereact/calendar';
import './Responsive.css'

export default function Signup() {
  document.title = 'LMS - Signup';
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let nextMonth = month === 11 ? 0 : month + 1;
  let tenPrevYears = nextMonth === 0 ? year - 10 : year - 9;

  const [date, setDate] = useState(null);
  let maxDate = new Date();
  maxDate.setMonth(month);
  maxDate.setFullYear(tenPrevYears);


  const navigate = useNavigate();
  const toast = useRef(null);
  const [uOTP, setuOTP] = useState("")
  const message = ''
  const showError = (errorMsg) => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
  }
  const showSuccess = (msg) => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
  }
  const [rOTP, setROTP] = useState((Math.floor(Math.random() * 9000 + 1000)).toString())

  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    role: '',
    eid: '',
    designation: '',
    admissionNo: '',
    dob: '',
    course: '',
    branch: '',
    semester: '',
    password: '',
    password_repeat: ''
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: SignupSchema,
      onSubmit: async (values, action) => {
        const signupForm = document.getElementById('signupForm')
        const OTP_form = document.getElementById('OTP_form')
        const value = await CheckUser(values);
        if (value === 'exists') {
          console.log('inside 1')
          showError("User already exists! Please Login")
          setTimeout(() => {
            signupForm.reset();
          }, 1500);
        }
        else if (value === 'not-exists') {
          setLoading(true)
          await sendEmail(rOTP, values.email)
          showSuccess(`OTP has been successfully sent to ${values.email}`)
          setLoading(false)
          signupForm.style.display = "none";
          OTP_form.style.display = "block";
        }
        else if (value === 'no-match') {
          showError("Password does not match the confirm password.")
          action.resetForm()
        }
      },
    });

  const verification = async (e) => {
    e.preventDefault();
    if (uOTP === rOTP) {
      setLoading(true)
      const jsonStudent = await CreateUser(values, values.role);
      const creationRequestResponse = await ActivationRequest(values.role);
      setLoading(false)
      if (creationRequestResponse) {
        showSuccess(`Hello ${values.name}! Account creation request sent to Admin successfully`)
      }
      setLoading(false)
      setTimeout(() => {
        if (jsonStudent.success) {
          navigate('/login')
        }
      }, 1500);
    }
    else {
      showError("Otp entered is incorrect");
      document.getElementById('OTP_form').reset();
    }
  }
  return (
    <>
      <div className="show" style={{ zIndex: 99999 }}>
        <Toast ref={toast} />
      </div>
      <div className="d-flex flex-column " id="content-wrapper">
        <div id="content">
          {loading && (<div className="container bg-white d-flex justify-content-center align-items-center" style={{ position: 'absolute', zIndex: 999, minHeight: '120vh', minWidth: '100vw' }}>
            <Lottie animationData={animationData} loop={true} />
          </div>)}

          <section className=" signup" >
            <div className="container pt-5" >
              <div className="row justify-content-center">
                <div className="col-md-8 text-center" >
                  <img className="img-fluid w-100" src="/img/illustrations/register.svg" alt="Registration Illustration" />
                </div>
                <div className="col-md-4 col-xl-4 text-center text-md-start ">
                  <h2 className="display-6 fw-bold mb-5">
                    <span className="underline pb-1">
                      <strong style={{ color: "#211e2bd9", fontFamily: "sans-serif" }}>Sign up</strong>
                    </span>
                  </h2>

                  <form onSubmit={handleSubmit} id='signupForm'>

                    <div className="mb-3">
                      <InputText placeholder='Name' value={values.name} id='name' name="name" minLength="5" onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} />
                      {errors.name && touched.name ? (
                        <p className="form-error text-danger">{errors.name}</p>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <InputText placeholder='Email' value={values.email} id='email' name="email" minLength="5" onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} />
                      {errors.email && touched.email ? (
                        <p className="form-error text-danger">{errors.email}</p>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <InputText placeholder='Phone' value={values.phone} id='phone' name="phone" minLength="10" onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} />
                      {errors.phone && touched.phone ? (
                        <p className="form-error text-danger">{errors.phone}</p>
                      ) : null}
                    </div>
                    <div className="mb-3 ">
                      <Dropdown name='role' value={values.role} onBlur={handleBlur} onChange={handleChange} options={['Student', 'Teacher']}
                        placeholder="Select Role" style={{ height: '50px', width: '80%' }} />
                      {errors.role && touched.role ? (
                        <p className="form-error text-danger">{errors.role}</p>
                      ) : null}
                    </div>
                    {values.role === 'Student' &&
                      <>
                        <div className="mb-3">
                          <InputText placeholder='Admission No' value={values.admissionNo} name="admissionNo" minLength="5" onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} /> {errors.admissionNo && touched.admissionNo ? (
                            <p className="form-error text-danger">{errors.admissionNo}</p>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Calendar placeholder='Date of Birth' maxDate={maxDate} value={values.dob} name="dob" minLength="5" onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} />
                          {errors.dob && touched.dob ? (
                            <p className="form-error text-danger">{errors.dob}</p>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <InputText placeholder='Course' value={values.course} name="course" minLength="5" onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} />
                          {errors.course && touched.course ? (
                            <p className="form-error text-danger">{errors.course}</p>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <InputText placeholder='Branch' value={values.branch} name="branch" minLength="3" onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} />
                          {errors.branch && touched.branch ? (
                            <p className="form-error text-danger">{errors.branch}</p>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <InputText placeholder='Semester' value={values.semester} name="semester" minLength="1" onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} />
                          {errors.semester && touched.semester ? (
                            <p className="form-error text-danger">{errors.semester}</p>
                          ) : null}
                        </div>
                      </>
                    }
                    {values.role === 'Teacher' &&
                      <>
                        <div className="mb-3">
                          <InputText placeholder='Employee ID' value={values.eid} name="eid"  onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} />
                          {errors.eid && touched.eid ? (
                            <p className="form-error text-danger">{errors.eid}</p>
                          ) : null}

                        </div>
                        <div className="mb-3">
                          <Calendar placeholder='Date of Birth' maxDate={maxDate} value={values.dob} name="dob"  onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} />
                          {errors.dob && touched.dob ? (
                            <p className="form-error text-danger">{errors.dob}</p>
                          ) : null}

                        </div>
                        <div className="mb-3">
                          <InputText placeholder='Designation' value={values.designation} name="designation"  onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} />
                          {errors.designation && touched.designation ? (
                            <p className="form-error text-danger">{errors.designation}</p>
                          ) : null}

                        </div>
                      </>
                    }
                    <div className="mb-3">
                      <InputText name='password' value={values.password} placeholder='Password' onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} type='password'/>
                      {errors.password && touched.password ? (
                        <p className="form-error text-danger">{errors.password}</p>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <InputText name='password_repeat' value={values.password_repeat} placeholder='Confirm Password' onBlur={handleBlur} onChange={handleChange} style={{ height: '50px', width: '80%' }} feedback={false} tabIndex={1} type='password'/>
                      {errors.password_repeat && touched.password_repeat ? (
                        <p className="form-error text-danger">{errors.password_repeat}</p>
                      ) : null}
                    </div>

                    <div className="mb-2 ">
                      <button style={{ visibility: "hidden", color: "red", fontSize: "15px", borderRadius: "5px" }} className={`btn p-0 warn`}>{message}</button>
                    </div>
                    <div className="mb-5">
                      <button  className="btn btn-primary shadow px-3 py-2" type="submit" style={{ borderRadius: "2rem" }}>
                        {loading ? (
                          <Lottie
                            animationData={animationData}
                            loop
                            play
                            style={{ width: '50px', height: '50px' }}
                          />
                        ) : (
                          'Create account'
                        )}
                      </button>
                    </div>
                    <p className="text-muted">Have an account?{"     "}
                      <Link to="/login">
                        <span className="underline pb-1">
                          <strong>Login</strong>
                        </span>
                      </Link>
                    </p>
                  </form>
                  <form onSubmit={verification} id='OTP_form' style={{ display: "none" }}>

                    <div className="mb-3">
                      <InputText placeholder='Enter OTP' keyfilter="int" name="OTP" onChange={(e) => { setuOTP(e.target.value) }} />
                      <div className="mb-2 ">
                        <button style={{ visibility: "hidden", color: "red", fontSize: "15px", borderRadius: "5px" }} className={`btn p-0 warn`}>{message}</button>
                      </div>
                      <div className="mb-5 my-3">
                        <button className="btn btn-primary shadow" type="submit" style={{ borderRadius: "2rem" }}>Verify</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <NotSure heading="Facing Difficulty?" description="Connect at support@lms.com " />
        </div>
      </div>
    </>
  );
}


