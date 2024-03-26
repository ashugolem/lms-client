import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { Modal, Button, ModalHeader } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import animationData from '../../assets/Loading/Airplane.json';
import Lottie from 'lottie-react';
import ChangePasswordAPI from '../API/AllUsers/ChangePassword';
import { ChangePasswordSchema } from '../../schemas';
import CheckPassword from '../API/AllUsers/CheckPassword';

const ChangePassword = (props) => {
    const initialValues = {
        oldPassword: "",
        password: "",
        confirmPassword: ""
    }
    const [loading, setLoading] = useState(false)
    const submit = useRef(null);
    const cancelRef = useRef(null);
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: ChangePasswordSchema,
            onSubmit: async (values, action) => {
                try {
                    setLoading(true)
                    const response = await CheckPassword(values.oldPassword);
                    if (response.success) {
                        const responseChangePassword = await ChangePasswordAPI(values.password);
                        if (responseChangePassword.success) {
                            props.showSuccess("Password Updated Successfully");
                        }
                        else {
                            props.showError(responseChangePassword.msg);
                        }
                    }
                    else {
                        props.showError("Old Password is Incorrect")
                    }
                } catch (error) {
                    props.showError(error.message)
                }
                finally {
                    setLoading(false)
                    cancelRef.current.click()
                }
                action.resetForm();
            },
        });
    return (
        <>

            <Modal
                show={props.show}
                onClose={props.onClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <ModalHeader>
                    <h5 className='text-white fw-bold text-center w-100'>Change Password</h5>
                </ModalHeader>
                <Modal.Body className="text-center text-success ">
                    {loading && (<div className="container bg-white w-100 h-100 d-flex justify-content-center align-items-center" style={{ position: 'absolute', zIndex: 999, maxHeight: '100%', maxWidth: '90%' }}>
                        <Lottie animationData={animationData} loop={true} />
                    </div>)}
                    <form onSubmit={handleSubmit} className='d-flex align-items-center flex-column justify-content-center' style={{ border: '' }}>
                        <div className="mb-3 mt-3">
                            <InputText
                                className="shadow"
                                name="oldPassword"
                                id="oldPassword"
                                value={values.oldPassword}
                                placeholder={'Old Password'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete='true'
                            />
                            <p className="form-error text-danger">{errors.oldPassword}</p>
                        </div>
                        <div className="mb-3 mt-3">
                            <InputText
                                className="shadow"
                                name="password"
                                id="password"
                                value={values.password}
                                placeholder={'Password'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete='true'
                            />
                            <p className="form-error text-danger">{errors.password}</p>
                        </div>
                        <div className="mb-3 mt-3">
                            <InputText
                                className="shadow"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={values.confirmPassword}
                                placeholder={'Confirm Password'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete='true'
                            />
                            <p className="form-error text-danger">{errors.confirmPassword}</p>
                        </div>

                        <button
                            className="btn btn-primary shadow px-4 py-2 mt-4 mx-2"
                            style={{
                                borderRadius: "0.6rem",
                                display: 'none'
                            }}
                            type='submit'
                            ref={submit}
                        >
                        </button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-center w-100 ">
                        <Button
                            variant="primary"
                            style={{
                                borderRadius: '5px',
                            }}
                            onClick={() => submit.current.click()}
                        >
                            Change
                        </Button>
                        <Button
                            ref={cancelRef}
                            variant="Primary"
                            onClick={props.onClose}
                            style={{
                                borderRadius: '5px',
                            }}
                        >
                            Back
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ChangePassword;
