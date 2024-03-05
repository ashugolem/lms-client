import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { Modal, Button, ModalHeader } from 'react-bootstrap';
import { FineSchema } from '../../schemas';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import animationData from '../../assets/Loading/Airplane.json';
import Lottie from 'lottie-react';
import CreateFine from '../API/CreateFine';
import GetFineApi from '../API/Fine';

const FineUpdate = (props) => {
    const initialValues = {
        finePerDay: props.fine.finePerDay,
        deadline: props.fine.deadline
    }
    const [loading, setLoading] = useState(false)
    const submit = useRef(null);
    const cancelRef = useRef(null);
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: FineSchema,
            onSubmit: async (values, action) => {
                try {
                    setLoading(true)
                    const response = await CreateFine(values.finePerDay, values.deadline);
                    if (response.success) {
                        props.showSuccess("Fine Parameters Updated Successfully");
                        const Fine = await GetFineApi()
                        props.setFine(Fine.fine);
                    }
                    else {
                        props.showError(response.msg)
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
                    <h5 className='text-white fw-bold text-center w-100'>Fine Parameters</h5>
                </ModalHeader>
                <Modal.Body className="text-center text-success ">
                    {loading && (<div className="container bg-white w-100 h-100 d-flex justify-content-center align-items-center" style={{ position: 'absolute', zIndex: 999, maxHeight: '100%', maxWidth: '90%' }}>
                        <Lottie animationData={animationData} loop={true} />
                    </div>)}
                    <h6>Enter New Fine Parameters</h6>
                    <form onSubmit={handleSubmit} className='d-flex align-items-center flex-column justify-content-center' style={{ border: '' }}>
                        <div className="mb-3 mt-3">
                            <InputText
                                className="shadow"
                                name="finePerDay"
                                id="finePerDay"
                                value={values.finePerDay}
                                placeholder={'₹ ' + props.fine.finePerDay + ' Per Day'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete='true'
                                inputId="currency-india"
                                mode="currency"
                                currency="INR"
                                currencyDisplay="code"
                                locale="en-IN"
                            />
                            {values.deadline && errors.finePerDay && touched.finePerDay ? (
                                <p className="form-error text-danger">{errors.finePerDay}</p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <InputText
                                className="shadow"
                                name="deadline"
                                id="deadline"
                                value={values.deadline}
                                placeholder={props.fine.deadline + ' Days'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete='true'
                            />
                            {errors.deadline && touched.deadline ? (
                                <p className="form-error text-danger">{errors.deadline}</p>
                            ) : null}
                        </div>
                        <button
                            className="btn btn-primary shadow px-4 py-2 mt-4 mx-2"
                            style={{
                                borderRadius: "0.6rem",
                                display: 'none'
                            }}
                            type='submit'
                            disabled={loading}
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
                            Update
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

export default FineUpdate;
