import React, { useContext, useEffect, useRef, useState } from 'react'
import TopNav from '../TopNav/TopNav';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import Bar from './Bar';
import './Responsive.css'
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import GetStudentData from '../API/userData/GetStudentData';
import ChangePhotoModal from '../Modal/ChangePhotoModal'
import animationData from '../../assets/Loading/Airplane.json';
import Lottie from 'lottie-react';

const Profile = () => {
    const [student, setStudent] = useState({});
    const [loading, setLoading] = useState(true);

    const userData = async () => {
        try {
            const response = await GetStudentData();
            setStudent(response);
            setLoading(false); // Set loading to false when data is available
            console.log(response);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setLoading(false); // Set loading to false in case of an error
        }
    };

    useEffect(() => {
        userData();
        // eslint-disable-next-line
    }, []); // Run only once when the component mounts
    const initialValues = student
    const [edit, setEdit] = useState(false)
    const [editAdditional, setEditAdditional] = useState(false)
    const toast = useRef(null);
    let maxDate = new Date();
    maxDate.setMonth((new Date()).getMonth());
    maxDate.setFullYear((new Date()).getFullYear());

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: `Profile updated successfully`, life: 3000 });
    }
    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Some Error Occured', life: 3000 });
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            // validationSchema: AddBookSchema,
            onSubmit: async (values, action) => {
                const response = await AddBook(values)
                if (response.success) {
                    await CreateAlert(response.book._id, values.stock, "Book", values.title)
                    showSuccess()
                }
                else {
                    showError()
                }
                action.resetForm();
            },
        });
    const [viewModal, setViewModal] = useState(false)
    const handleChangePhoto = async () => {
        setViewModal(true);
    }
    // if (loading) {
    //     <div className="container bg-white d-flex justify-content-center align-items-center" style={{ position: 'absolute', zIndex: 999, minHeight: '100%', minWidth: '100%' }}>
    //         <Lottie animationData={animationData} loop={true} />
    //     </div>
    // }
    return (
        <div className="d-flex flex-column" id="content-wrapper">
            <ChangePhotoModal
                show={viewModal}
                onClose={() => {
                    setViewModal(false)
                }}
                userData={()=>{userData()}}
            />
            <div id="content">
                <Toast ref={toast} />
                <TopNav />
                {loading ?
                    (<div className="container bg-white d-flex justify-content-center align-items-center" style={{ position: 'absolute', zIndex: 999, minHeight: '100%', minWidth: '100%' }}>
                        <Lottie animationData={animationData} loop={true} />
                    </div>)
                    :
                    <div className="container-fluid" style={{ maxWidth: "90%" }}>
                        <h3 className="text-dark mb-4">Profile</h3>
                        <div className="row mb-3">
                            <div className="col-lg-4">
                                <div className="card mb-3">
                                    <div className="card-body text-center shadow">
                                        {student.profile === null ?
                                            <img className="rounded-circle mb-3 mt-4" alt='UserIcon' src={'src/assets/img/avatars/defaultContact.png'} width="213" height="213" /> :
                                            <img className="rounded-circle mb-3 mt-4" alt='UserIcon' src={`${student.profile}`} width="213" height="213" />}
                                        <div className="mb-3"><button className="btn btn-primary btn-sm" onClick={handleChangePhoto} type="button">Change Photo</button></div>
                                    </div>
                                </div>
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="text-primary fw-bold m-0">Dashboard</h6>
                                    </div>
                                    <div className="card-body">
                                        <Bar text='Books Lent' value={student.booksLent} />
                                        <Bar text='Books Submitted' value={student.booksSubmitted} />
                                        <Bar text='Fine Imposed' value={student.fine} />
                                        <Bar text='Fine Paid' value={student.finePaid} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col">
                                        <div className="card shadow mb-3">
                                            <div className="card-header py-3">
                                                <p className="text-primary m-0 fw-bold">User Details</p>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="mb-3"><label className="form-label" htmlFor="city"><strong>Name</strong></label>
                                                                <div className="flex-coloumn">
                                                                    <InputText value={student.name} disabled={!edit} onBlur={handleBlur} onChange={handleChange} name="name" id="alphabetic" keyfilter="alpha" className="w-full" style={{ width: '90%' }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="mb-3">
                                                                <label className="form-label  " htmlFor="email"><strong>Email Address</strong></label>
                                                                <div className="flex-auto">
                                                                    <InputText value={student.email} disabled={!edit} onBlur={handleBlur} onChange={handleChange} name="email" id="spacekey" keyfilter={/[^s]/} className="w-full " style={{ width: '100%' }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="mb-3">
                                                                <div className="mb-3">
                                                                    <label className="form-label" htmlFor="admNo"><strong>Date of Birth</strong></label>
                                                                    <div className="flex-coloumn">
                                                                        <Calendar id="minmax" value={student.dob} onBlur={handleBlur} maxDate={maxDate} onChange={handleChange} dateFormat="yy/mm/dd" style={{ width: '100%' }} name='dob' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="mb-3">
                                                                <div className="mb-3">
                                                                    <label className="form-label" htmlFor="admNo"><strong>Phone</strong></label>
                                                                    <div className="flex-coloumn">
                                                                        <InputText value={student.phone} disabled={!edit} onBlur={handleBlur} onChange={handleChange} name="phone" id="pint" keyfilter="pint" className="w-full" style={{ width: '100%' }} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="mb-3">
                                                                <div className="mb-3">
                                                                    <label className="form-label" htmlFor="admissionNo"><strong>Admission Number</strong></label>
                                                                    <div className="flex-coloumn">
                                                                        <InputText value={student.admissionNo} disabled={true} onBlur={handleBlur} onChange={handleChange} name="admissionNo" id="pint" keyfilter="pint" className="w-full" style={{ width: '100%' }} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <button className="btn btn-primary btn-sm pt-1 pb-1" type="submit">Save Settings</button>
                                                        <button className="btn btn-primary btn-sm ms-3 ps-3 pe-3 pt-1 pb-1" onClick={() => { setEdit(true) }} type="submit">Edit</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="card shadow">
                                            <div className="card-header py-3">
                                                <p className="text-primary m-0 fw-bold">Additional Information</p>
                                            </div>
                                            <div className="card-body">
                                                <form>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="mb-3"><label className="form-label" htmlFor="course"><strong>Course</strong></label>
                                                                <div className="flex-coloumn">
                                                                    <InputText value={student.course} disabled={!editAdditional} onBlur={handleBlur} onChange={handleChange} name='course' id="alphabetic" keyfilter="alpha" className="w-full" style={{ width: '100%' }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="mb-3"><label className="form-label" htmlFor="branch"><strong>Branch</strong></label>
                                                                <div className="flex-coloumn">
                                                                    <InputText value={student.branch} disabled={!editAdditional} onBlur={handleBlur} onChange={handleChange} name='branch' id="alphabetic" keyfilter="alpha" className="w-full" style={{ width: '100%' }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="mb-3"><label className="form-label" htmlFor="semester"><strong>Semester</strong></label>
                                                                <div className="flex-coloumn">
                                                                    <InputText value={student.semester} disabled={!editAdditional} onBlur={handleBlur} onChange={handleChange} name='semester' id="alphabetic" keyfilter="alpha" className="w-full" style={{ width: '100%' }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="address"><strong>Address</strong></label>
                                                        <div className="flex-coloumn">
                                                            <InputText value={student.address} disabled={!editAdditional} onBlur={handleBlur} onChange={handleChange} name='address' id="alphabetic" keyfilter="alpha" className="w-full" style={{ width: '100%' }} />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <button className="btn btn-primary btn-sm pt-1 pb-1" type="submit">Save Settings</button>
                                                        <button className="btn btn-primary btn-sm ms-3 ps-3 pe-3 pt-1 pb-1" type="submit" onClick={() => { setEditAdditional(true) }}>Edit</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default Profile