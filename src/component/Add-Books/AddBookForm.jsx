import React, { useRef } from 'react'
import { useFormik } from 'formik';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { AddBookSchema } from '../../schemas';
import AddBook from '../API/AddBook';
import { Toast } from 'primereact/toast';
import CreateAlert from '../API/CreateAlert';


export default function AddBookForm() {
    const initialValues = { title: '', isbn: '', subject: '', author: '', publishedOn: new Date, stock: '', price: '', selfNo: '' }

    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: `Book - ${values.title} added successfully`, life: 3000 });
    }
    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Some Error Occured', life: 3000 });
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: AddBookSchema,
            onSubmit: async (values, action) => {
                const response = await AddBook(values)
                if(response.success){
                    await CreateAlert(response.book._id, values.stock, "Book", values.title)
                    showSuccess()
                }
                else{
                    showError()
                }
                action.resetForm();
            },
        });
    return (

        <>
            <Toast ref={toast} />
            <h2 className="display-4 fw-bold mb-5 text-center mt-5">
                <span className="underline pb-1">
                    <strong>Add Book Manually</strong>
                    <br />
                </span>
            </h2>
            <div className="row">
                <div className="col-md-6 text-center">
                    <img
                        style={{ maxWidth: "550px" }}
                        className="img-fluid w-100"
                        src="/img/illustrations/Book.svg"
                        alt="Add-Note Illustration"
                    />
                </div>
                <div className="col-md-5 col-xl-4 text-center text-md-start">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <InputText onBlur={handleBlur} placeholder="Enter Title" style={{ width: '80%' }} onChange={handleChange} value={values.title} name='title' />
                            {errors.title && touched.title ? (
                                <p className="form-error text-danger">{errors.title}</p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <InputText onBlur={handleBlur} placeholder="Enter ISBN" style={{ width: '80%' }} onChange={handleChange} value={values.isbn} name='isbn' />
                            {errors.isbn && touched.isbn ? (
                                <p className="form-error text-danger">{errors.isbn}</p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <InputText onBlur={handleBlur} placeholder="Enter Subject" style={{ width: '80%' }} onChange={handleChange} value={values.subject} name='subject' />
                            {errors.subject && touched.subject ? (
                                <p className="form-error text-danger">{errors.subject}</p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <InputText onBlur={handleBlur} placeholder="Enter Author" style={{ width: '80%' }} onChange={handleChange} value={values.author} name='author' />
                            {errors.author && touched.author ? (
                                <p className="form-error text-danger">{errors.author}</p>
                            ) : null}
                        </div>
                        <div className="mb-3 mt-4">
                            <Calendar onBlur={handleBlur}  placeholder='Enter Publishon' onChange={handleChange} showIcon style={{ width: '80%' }} value={values.publishedOn} name='publishedOn' />
                            {errors.publishedOn && touched.publishedOn ? (
                                <p className="form-error text-danger">Date is required</p>
                            ) : null}
                        </div>
                        <div className="mb-3 mt-4">
                            <InputNumber onBlur={handleBlur} placeholder='Enter Stock' showButtons min={0} style={{ width: '80%' }} onValueChange={handleChange} value={values.stock} name='stock' />
                            {errors.stock && touched.stock ? (
                                <p className="form-error text-danger">{errors.stock}</p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <InputNumber onBlur={handleBlur} placeholder='Enter Price' inputId="currency-india" onValueChange={handleChange} mode="currency" currency="INR" currencyDisplay="code" locale="en-IN" showButtons min={0} style={{ width: '80%' }} value={values.price} name='price' />
                            {errors.price && touched.price ? (
                                <p className="form-error text-danger">{errors.price}</p>
                            ) : null}
                        </div>
                        <div className="mb-3 mt-4">
                            <InputNumber onBlur={handleBlur} placeholder='Enter Self-No' showButtons min={0} max={24} style={{ width: '80%' }} onValueChange={handleChange} name='selfNo' />
                            {errors.selfNo && touched.selfNo ? (
                                <p className="form-error text-danger">{errors.selfNo}</p>
                            ) : null}
                        </div>
                        <div className="mb-5 ">
                            <button
                                className="btn btn-primary shadow px-5"
                                style={{
                                    borderRadius: "5px",
                                    marginTop: "20px",
                                }}
                                type="submit"
                            >
                                ADD
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <br />
            <br />
            <br />
        </>
    )
}
