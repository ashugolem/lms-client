import { useFormik } from 'formik';
import { InputNumber } from 'primereact/inputnumber'
import React, { useState } from 'react'

export default function FineSettings() {
    const initialValues = { finePrice: '', deadline: '' }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            // validationSchema: LoginSchema,
            onSubmit: async (values, action) => {
                const response = await LoginApi(values)
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
        <>
            {/* <form onSubmit={handleSubmit} className='d-flex align-items-center justify-content-center' style={{border: 'none'}}>
                <div className="mb-3">
                    <InputNumber
                        className="shadow form-control"
                        style={{ borderRadius: "5px" }}
                        name="finePrice"
                        value={values.finePrice}
                        placeholder="Fine Price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete='true'
                        inputId="currency-india"
                        mode="currency"
                        currency="INR"
                        currencyDisplay="code"
                        locale="en-IN" />
                </div>
                <div className="mb-3">
                    <InputNumber
                        className="shadow form-control"
                        style={{ borderRadius: "5px" }}
                        name="deadline"
                        value={values.deadline}
                        placeholder="Deadline in months"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete='true'/>
                </div>
                <div className="mb-5">
                    <button
                        className="btn btn-primary shadow px-4 py-2 mt-3"
                        style={{ borderRadius: "0.5rem" }}
                        type="submit"
                    >
                        Update
                    </button>
                </div>
            </form> */}
        </>
    )
}
