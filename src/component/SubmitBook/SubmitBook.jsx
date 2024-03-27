import Lottie from 'lottie-react';
import animationData from '../../assets/Loading/Airplane.json';
import React, { useRef, useState } from 'react'
import { Toast } from 'primereact/toast';
import { useFormik } from 'formik';
import { Dropdown } from 'primereact/dropdown';
import { SubmitBookSchema } from '../../schemas';
import NotSure from '../NotSure';
import TopNav from '../TopNav/TopNav';

export default function SubmitBook() {
    const initialValues = {
        book: ""
    }
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);
    const showError = (errorMsg) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
    }
    const showSuccess = (msg) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: SubmitBookSchema,
            onSubmit: async (values, action) => {
                console.log(values)
                action.resetForm(initialValues)
            },
        });
    return (
        <>
            <div className="show" style={{ zIndex: 99999 }}>
                <Toast ref={toast} />
            </div>
            <div className="d-flex flex-column " id="content-wrapper">
                <div id="content">
                    <TopNav />
                    {loading && (<div className="container bg-white d-flex justify-content-center align-items-center" style={{ position: 'absolute', zIndex: 999, minHeight: '120vh', minWidth: '100vw' }}>
                        <Lottie animationData={animationData} loop={true} />
                    </div>)}

                    <section className=" signup" >
                        <div className="container pt-5" >
                            <h2 className="display-6 text-center w-100 fw-bold mb-5">
                                <span className="underline text-center pb-1">
                                    <strong style={{ color: "#211e2bd9", fontFamily: "sans-serif" }}>Submit Book</strong>
                                </span>
                            </h2>
                            <div className="row justify-content-center">
                                <div className="col-md-8 text-center" >
                                    <img className="img-fluid w-100 responsive " src="/img/illustrations/register.svg" alt="Registration Illustration" />
                                </div>
                                <div className="col-md-4 col-xl-4 text-center text-md-start ">

                                    <form onSubmit={handleSubmit} id='submitBookForm'>
                                        <div className="mb-3 ">
                                            <Dropdown
                                                name='book'
                                                value={values.book}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                options={['Student', 'Teacher']}
                                                placeholder="Select Book"
                                                style={{ height: '50px', width: '100%' }} />
                                            {errors.book && touched.book ? (
                                                <p className="form-error text-danger">{errors.book}</p>
                                            ) : null}
                                        </div>
                                        <div className="mb-5">
                                            <button className="btn btn-primary shadow px-3 py-2" type="submit" style={{ borderRadius: "2rem" }}>
                                                Submit Request
                                            </button>
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
    )
}
