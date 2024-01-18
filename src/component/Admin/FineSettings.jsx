import { useFormik } from 'formik';
import { InputNumber } from 'primereact/inputnumber'
import React, { useState } from 'react'

export default function FineSettings(props) {
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
            <form onSubmit={handleSubmit} className='d-flex align-items-center flex-column justify-content-center' style={{border: ''}}>
                <h5 className='mt-3 text-start w-100'>For {props.userType}</h5>
                <div className="mb-3">
                    <InputNumber
                        className="shadow"
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
                        className="shadow"
                        name="deadline"
                        value={values.deadline}
                        placeholder="Deadline in months"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete='true'/>
                </div>
                <div className="mb-2">
                    <button
                        className="btn btn-primary shadow px-4 py-2 mt-3"
                        style={{ borderRadius: "0.5rem" }}
                        type="submit"
                    >
                        Update
                    </button>
                </div>
            </form>
        </>
    )
}
