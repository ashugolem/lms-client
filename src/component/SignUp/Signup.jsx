import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateUser from '../API/Signup/Verification';
import ActivationRequest from '../API/Signup/ActivationRequest';
import { Toast } from 'primereact/toast';
import { useFormik } from 'formik';
import animationData from '../../assets/Loading/Airplane.json';
import { SignupSchema } from '../../schemas';
import './Responsive.css'
import SignupForm from './SignupForm';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import OTPForm from './OTPForm';
import Lottie from 'lottie-react';
import CheckUser from '../API/Signup/CheckUser';
import sendEmail from '../API/EmailJS';

export default function Signup() {
  document.title = 'LMS - Register';
  const navigate = useNavigate();
  const toast = useRef(null);
  const [rOTP, setROTP] = useState((Math.floor(Math.random() * 9000 + 1000)).toString())
  const [uOTP, setuOTP] = useState("")
  const [sentStatus, setSentStatus] = useState(false)
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    role: '',
    eid: '',
    designation: '',
    admissionNo: '',
    course: '',
    branch: '',
    semester: '',
    password: '',
    password_repeat: ''
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      const value = await CheckUser(values);
      if (value === 'exists') {
        showError("User already exists! Please Login")
      } else if (value === 'not-exists') {
        setLoading(true)
        console.log(rOTP)
        debugger
        await sendEmail(rOTP, values.email)
        showSuccess(`OTP has been successfully sent to ${values.email}`)
        setLoading(false)
        setSentStatus(true)
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

  const showError = (errorMsg) => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
  }
  const showSuccess = (msg) => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
  }

  return (
    <>
      <Toast ref={toast} />
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          {loading
            ?
            <div className="container  d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
              <Lottie animationData={animationData} loop={true} style={{ width: '250px' }} />
            </div>

            :
            <div className="login-bg d-flex align-items-center justify-content-center">
              <section className="py-md-5" >
                <div className="container res-1200">
                  <div className="row res-600">
                    <div className="col-md-8 img-container text-center d-flex responsive align-items-center">
                      <div className="row">
                        <div className="col-md-2 w-100 mt-2">
                          <h1 className="text-center heading fw-bold">Smart Library</h1>
                        </div>
                        <div className="col-md-11 login-img">
                          <LazyLoadImage
                            className="img-fluid w-100 responsive"
                            src="/img/illustrations/signup-img.png"
                            alt="Login Illustration"
                            effect='blur'
                            loading='lazy'
                            placeholderSrc='/img/illustrations/login_placeholder.png'
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6  signupForm bg-white d-flex align-items-center justify-content-center flex-column text-center res-922 text-md-start right-0">

                      {
                        !sentStatus
                          ?
                          <SignupForm
                            setLoading={setLoading}
                            initialValues={initialValues}
                            showError={showError}
                            showSuccess={showSuccess}
                            setSentStatus={setSentStatus}
                            rOTP={rOTP}
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                          />
                          :
                          <OTPForm
                            setLoading={setLoading}
                            initialValues={initialValues}
                            showError={showError}
                            showSuccess={showSuccess}
                            verification={verification}
                            uOTP={uOTP}
                            setuOTP={setuOTP}
                            email={" your email"}
                          />
                      }
                    </div>
                  </div>
                </div>
              </section>
            </div>}
        </div>
      </div>
    </>
  );
}


