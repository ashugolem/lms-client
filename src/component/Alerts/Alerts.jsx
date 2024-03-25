import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/Loading/Airplane.json';
import TopNav from '../TopNav/TopNav';
import getAlerts from './getAlertAPI';
import { ScrollPanel } from 'primereact/scrollpanel'
import { Toast } from 'primereact/toast';
import { Avatar } from 'primereact/avatar'
import UpdateStatusModal from '../Modal/UpdateStatusModal';
// import handleRead from './handleReadAPI';

export default function BookTransaction() {
    document.title = 'LMS - Requests';
    const [Requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const showError = (errorMsg) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
    }
    const showSuccess = (msg) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
    }



    const itemTemplate = (request) => {
        return (
            <div className="d-flex align-items-center p-2"><div className="flex-1 flex flex-column ">
                <h4 className="fw-bold text-primary">{request.userName}</h4>
                <div className="flex align-items-center gap-2">
                    <i class="fa-solid fa-book text-sm mx-2"></i>
                    <span>Book - {request.bookName}</span>
                </div>
            </div>
            </div>
        );
    };
    const handleRead = async (setModalVisible, _id) => {
        try {
            setModalVisible(true);
            const response = await fetch(`${import.meta.env.VITE_HOST}/request/${_id.toString()}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ seen: true }),
            });
            const json = await response.json();
            return json
        } catch (error) {
            console.log(error.message)
        }
    }
    const toast = useRef(null);
    const getRequests = async () => {
        setLoading(true);
        const response = await getAlerts(500);
        setLoading(false);
        setRequests(response.allRequests);
    };
    const styles = {
        table: {
            padding: '0px',
        },
        tableHeader: {
            paddingRight: '0px',
        },
    };
    useEffect(() => {
        getRequests();
    }, []);

     return (
        <>
            {loading ? (
                <div className="container d-flex justify-content-center">
                    <Lottie animationData={animationData} loop={true} style={{ width: '250px' }} />
                </div>
            ) : (
                <div className="d-flex flex-column" id="content-wrapper">
                    <Toast ref={toast} />
                    <div id="content">
                        <>
                            <TopNav />
                            <div className="container-fluid">
                                <div className="card xl:flex xl:justify-content-center">
                                    <div className="card-header text-center py-3">
                                        <h3 className="text-primary m-0 fw-bold">Book Requests</h3>
                                        <h6 className="text-grey">Click on requests to Action</h6>
                                    </div>
                                    <ScrollPanel style={{ width: '100%', height: '70dvh' }} >
                                        <table className="align-middle table my-0" style={styles.table} id="dataTable">
                                            <thead>
                                                <tr>
                                                    <th>Profile</th>
                                                    <th>Name</th>
                                                    <th>Role</th>
                                                    <th>Type</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Requests.map((request) => {
                                                        return(
                                                            <>
                                                                <tr key={request._id} onClick={() => setModalVisible(true)}>
                                                                {/* <tr key={request._id} onClick={() => handleRead(setModalVisible, request._id)}> */}
                                                                <UpdateStatusModal
                                                                    _id={request._id}
                                                                    show={modalVisible}
                                                                    onClose={() => setModalVisible(false)}
                                                                    name={request.userNamename}
                                                                    role={request.role}
                                                                    action={request.type}
                                                                    bookName={request.bookName}
                                                                    user={request.user}
                                                                    book={request.book}
                                                                    admissionNo={request.admissionNo}
                                                                    isactiontaken={request.isactiontaken}
                                                                    eid={request.eid}
                                                                    code={request.code}
                                                                    selfNo={request.selfNo}
                                                                    showError={showError}
                                                                    showSuccess={showSuccess}
                                                                />
                                                                    <td>
                                                                        {
                                                                            !request.profile
                                                                                ?
                                                                                <Avatar label={request.userName.slice(0)[0]} size="xlarge" className='bg-primary text-white' shape="circle" />
                                                                                :
                                                                                <Avatar image={request.profile} size="xlarge" shape="circle" />
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {itemTemplate(request)}
                                                                    </td>
                                                                    <td><span className="font-bold text-end w-100 fw-bold align-middle">{request.role}</span></td>
                                                                    <td>{request.type}</td>
                                                                    <td className={`fw-bold`}>{request.status === "Accepted" ? "Issued" : "Pending"}</td>
                                                                    <td></td>

                                                                </tr>
                                                            </>
                                                        )                                                            
                                                    }
                                                )}
                                            </tbody>
                                        </table>

                                    </ScrollPanel>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            )}
        </>
    );
}
