import React, { useEffect, useRef, useState } from 'react'
import TopNav from '../TopNav/TopNav';
import { InputText } from 'primereact/inputtext';
import Bar from './Bar';
import './Responsive_Profile.css'
import { Toast } from 'primereact/toast';
import GetStudentData from '../API/userData/GetStudentData';
import ChangePhotoModal from '../Modal/ChangePhotoModal'
import animationData from '../../assets/Loading/Airplane.json';
import Lottie from 'lottie-react';
import ChangePassword from '../Modal/ChangePasswordModal';

const Profile = () => {
    const [viewModal, setViewModal] = useState(false)
    const [viewChangePasswordModal, setViewChangePasswordModal] = useState(false)
    const [student, setStudent] = useState({});
    const [loading, setLoading] = useState(true);
    const userData = async () => {
        try {
            const response = await GetStudentData();
            setStudent(response);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setLoading(false); // Set loading to false in case of an error
        }
    };
    const handleReload = (e) => {
        e.preventDefault()
    };

    useEffect(() => {
        userData();
        // eslint-disable-next-line
    }, []);
    const toast = useRef(null);

    const showSuccess = (msg) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: msg , life: 3000 });
    }
    const showError = (msg) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: msg , life: 3000 });
    }
   
    const handleChangePhoto = async () => {
        setViewModal(true);
    }
    return (
        <div className="d-flex flex-column" id="content-wrapper">
            <ChangePhotoModal
                show={viewModal}
                onClose={() => {
                    setViewModal(false)
                }}
                userData={()=>{userData()}}
            />
            <ChangePassword
                show={viewChangePasswordModal}
                onClose={() => {
                    setViewChangePasswordModal(false)
                }}
                showSuccess={showSuccess}
                showError={showError}
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
                        <h1 className="text-primary text-center fw-bold mb-4">Profile</h1>
                        <div className="row mb-3">
                            <div className="col-lg-5 profile-card">
                                <div className="card mb-3 h-100">
                                    <div className="card-body text-center shadow">
                                        {student.profile === null ?
                                            <img className="rounded-circle profile mb-3 mt-4" alt='UserIcon' src={'/img/avatars/defaultContact.png'} width="213" height="213" /> :
                                            <img className="rounded profile mb-3 mt-4" alt='UserIcon' src={`${student.profile}`} width="213" height="213" />}
                                        <div className="mb-3"><button className="btn btn-primary btn-sm" onClick={handleChangePhoto} type="button">Change Photo</button></div>
                                    </div>
                                </div>                                
                            </div>                            
                            <div className="col-lg-7">
                                <div className="card shadow mb-4 h-100">
                                    <div className="card-header py-3">
                                        <h6 className="text-primary fw-bold m-0">Dashboard</h6>
                                    </div>
                                    <div className="card-body">
                                        <Bar text='Books Lent' max={5} value={student.booksLent} />
                                        <Bar text='Books Submitted' max={5} value={student.booksSubmitted} />
                                        <Bar text='Fine Imposed' max={500} value={student.fine} />
                                        <Bar text='Fine Paid' max={500} value={student.finePaid} />
                                    </div>
                                </div>                             
                            </div>                            
                        </div>
                        <div className="row mb-3">
                            <div>
                                <div className="card shadow mb-3">
                                    <div className="card-header py-3">
                                        <p className="text-primary m-0 fw-bold">User Details</p>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleReload}>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="city"><strong>Name</strong></label>
                                                        <div className="flex-coloumn">
                                                            <InputText value={student.name} disabled={true} name="name" id="alphabetic" keyfilter="alpha" className="w-full" style={{ width: '100%' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="admissionNo"><strong>Admission Number</strong></label>
                                                            <div className="flex-coloumn">
                                                                <InputText value={student.admissionNo} disabled={true}  name="admissionNo" id="pint" keyfilter="pint" className="w-full" style={{ width: '100%' }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <label className="form-label  " htmlFor="email"><strong>Email Address</strong></label>
                                                        <div className="flex-auto">
                                                            <InputText value={student.email} disabled={true}  name="email" id="spacekey" keyfilter={/[^s]/} className="w-full " style={{ width: '100%' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="course"><strong>Course</strong></label>
                                                            <div className="flex-coloumn">
                                                                <InputText value={`${student.course}`} disabled={true}  name="course" id="alphabetic" keyfilter="alpha" className="w-full" style={{ width: '100%' }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                                                
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="branch"><strong>Branch</strong></label>
                                                            <div className="flex-coloumn">
                                                                <InputText value={`${student.branch}`} disabled={true}  name="course" id="alphabetic" keyfilter="alpha" className="w-full" style={{ width: '100%' }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                                                
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="semester"><strong>Semeseter</strong></label>
                                                            <div className="flex-coloumn">
                                                                <InputText value={student.semester} disabled={true}  name="semester" id="pint" keyfilter="pint" className="w-full" style={{ width: '100%' }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                                            
                                        </form>
                                        <div className="mb-3">
                                            <button className="btn btn-primary btn-sm pt-1 pb-1" onClick={() => { setViewChangePasswordModal(true) }}>Change Password</button>
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