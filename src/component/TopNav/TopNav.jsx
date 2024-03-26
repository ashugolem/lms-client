import React, { useEffect, useRef, useState } from 'react'
import Request from './Request';
import GetRequest from '../API/GetRequest'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn } from '../Action/index';
import Alert from './Alert';
import AllActivationRequests from '../API/User Activation/GetUserActivation';
import ActivationRequest from './ActivationRequest';

import useFetchData from '../API/FetchRequests';
import useFetchAlert from '../API/FetchAlert';
import FetchUserActivationRequest from '../API/FetchUserActivationRequest';
import { Toast } from 'primereact/toast';
import moment from 'moment/moment';


const TopNav = () => {
    const role = useSelector((state) => state.setLog.role)
    const userName = useSelector((state) => state.setLog.username);
    const loggedIn = useSelector((state) => state.setLog.isLoggedIn);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate()
    const toast = useRef(null);
    const showError = (errorMsg) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
    }
    const showSuccess = (msg) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
    }
    const { allRequests, setCount, count, fetchData } = useFetchData();

    const { allAlert, setAlertCount, setAllAlert, alertCount, fetchAlert } = useFetchAlert();
    // const { allUserActivationRequest, ActivationRequestCount, setActivationRequestCount, fetchActivationData } = FetchUserActivationRequest
    const dispatch = useDispatch()

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear();
        navigate('/login')
        dispatch(setLoggedIn(false));
    }
    const [allUserActivationRequest, setAllUserActivationRequest] = useState([]);
    const [ActivationRequestCount, setActivationRequestCount] = useState(0);

    const fetchActivationData = async () => {
        try {
            const requests = await AllActivationRequests(5);
            setAllUserActivationRequest(requests);
            try {
                const response = await fetch(`${import.meta.env.VITE_HOST}/user/get-user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: localStorage.getItem("user-id") })
                });
                const userProfile = await response.json();
                setProfile(userProfile.profile)

            } catch (error) {
                console.log(error.message)
            }
            // console.log("allUserActivationRequest", allUserActivationRequest[4].eid)
            const unseenRequestCount = requests.filter(request => !request.seen).length;
            setActivationRequestCount(unseenRequestCount);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            throw error;
        }
    };
    useEffect(() => {
        const fetchEverything = async () => {
            await fetchActivationData()
            await fetchData(5);
            await fetchAlert(5);
        }
        fetchEverything()
    }, []);
    if (loggedIn) {
        return (
            <>
                <Toast ref={toast} />
                <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                    <div className="container-fluid">
                        <button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button">
                            <i className="fas fa-bars"></i>
                        </button>
                        <ul className="navbar-nav flex-nowrap ms-auto">
                            {(role === "Admin" || role === 'Teacher') &&
                                <>
                                    <li className="nav-item dropdown no-arrow mx-1">
                                        <div className="nav-item dropdown no-arrow">
                                            <Link className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown">
                                                {ActivationRequestCount > 0 && (
                                                    <span className="badge bg-danger badge-counter">
                                                        {ActivationRequestCount}
                                                    </span>
                                                )}
                                                <i className="fas fa-user fa-fw"></i>
                                            </Link>

                                            <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                                                <h6 className="dropdown-header">user activation - (click to take action)</h6>
                                                {allUserActivationRequest.map((alert) => (
                                                        <ActivationRequest
                                                            key={alert._id}
                                                            student={alert.student}
                                                            teacher={alert.teacher}
                                                            _id={alert._id}
                                                            showError={showError}
                                                            showSuccess={showSuccess}
                                                            status={alert.status}
                                                            name={alert.userName}
                                                            user={alert.user}
                                                            time={alert.time}
                                                            seen={alert.seen}
                                                            isactiontaken={alert.isactiontaken}
                                                            set={setActivationRequestCount}
                                                            type={alert.type}
                                                            count={ActivationRequestCount}
                                                            message={alert.message}
                                                        />
                                                    ))}
                                                <Link className="dropdown-item text-center small text-gray-500" >Show All Pending Request</Link>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown no-arrow mx-1">
                                        <div className="nav-item dropdown no-arrow">
                                            <Link className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown">
                                                {alertCount > 0 && (
                                                    <span className="badge bg-danger badge-counter">
                                                        {alertCount}
                                                    </span>
                                                )}
                                                <i className="fas fa-bell fa-fw"></i>
                                            </Link>

                                            <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                                                <h6 className="dropdown-header">alerts center</h6>
                                                {allAlert.map((alert) => (
                                                        <Alert
                                                            key={alert._id}
                                                            _id={alert._id}
                                                            stock={alert.stock}
                                                            allAlert={allAlert}
                                                            name={alert.userName}
                                                            book={alert.bookName}
                                                            user={alert.user}
                                                            time={alert.time}
                                                            seen={alert.seen}
                                                            selfNo={alert.selfNo}
                                                            code={alert.code}
                                                            set={setAllAlert}
                                                            reference={alert.reference}
                                                            count={alertCount}
                                                            message={alert.message}
                                                            setAlertCount={setAlertCount}
                                                        />
                                                    ))}
                                                <Link className="dropdown-item text-center small text-gray-500" >Show All Alerts</Link>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown no-arrow mx-1">
                                        <div className="nav-item dropdown no-arrow">
                                            <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" >
                                                {count > 0 && (
                                                    <span className="badge bg-danger badge-counter">
                                                        {count}
                                                    </span>)}
                                                <i className="fas fa-envelope fa-fw"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                                                <h6 className="dropdown-header">book request center</h6>

                                                <div className="container text-center text-danger">
                                                    {allRequests.length === 0 && "No request to Display"}
                                                </div>
                                                {allRequests.map((request) => (
                                                        <Request
                                                            key={request._id}
                                                            _id={request._id}
                                                            profile={request.profile}
                                                            name={request.userName}
                                                            user={request.user}
                                                            role={request.role}
                                                            book={request.book}
                                                            bookName={request.bookName}
                                                            time={request.time}
                                                            seen={request.seen}
                                                            type={request.type}
                                                            isactiontaken={request.isactiontaken}
                                                            admissionNo={request.studentAdmNo}
                                                            eid={request.eid}
                                                            code={request.bookCode}
                                                            count={count}
                                                            selfNo={request.selfNo}
                                                            setCount={setCount}
                                                        />
                                                    ))}

                                                <Link className="dropdown-item text-center small text-gray-500" to={'/request'}>Show All Requests</Link>
                                            </div>
                                        </div>
                                        <div className="shadow dropdown-list dropdown-menu dropdown-menu-end" aria-labelledby="alertsDropdown"></div>
                                    </li>
                                    <div className="d-none d-sm-block topbar-divider"></div>
                                </>}
                            <li className="nav-item dropdown no-arrow">
                                <div className="nav-item dropdown no-arrow">
                                    <Link className="dropdown-toggle nav-link " aria-expanded="false" data-bs-toggle="dropdown">
                                        <span className="d-none d-lg-inline me-2 text-gray-600 "><b>{role === "Admin" ? "Hello " : userName}</b> - {role}</span>
                                        <img className="border rounded-circle img-profile" src={profile ? profile : "/img/avatars/defaultContact.png"} />
                                    </Link>

                                    <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                                        {role === "Student" &&
                                            <>
                                                <Link className="dropdown-item" to={'/profile'}>
                                                    <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>
                                                    &nbsp;Profile
                                                </Link>
                                                <Link className="dropdown-item" to={'/books'}>
                                                    <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>
                                                    &nbsp;Library
                                                </Link>
                                                <Link className="dropdown-item" to={'/transaction'}>
                                                    <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>
                                                    &nbsp;Transactions
                                                </Link>
                                            </>}
                                        <div className="dropdown-divider"></div>
                                        <Link className="dropdown-item" onClick={handleLogout}>
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                                            &nbsp;Logout
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        )
    }
    return (
        <div className="container" style={{ minHeight: "50px" }}>

        </div>
    )
}

export default TopNav