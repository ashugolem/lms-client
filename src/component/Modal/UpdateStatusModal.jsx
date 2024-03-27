import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ChangeStatus from '../API/ChangeStatus';
import IssueBook from '../API/IssueBook';
import animationData from '../../assets/Loading/Airplane.json'
import './UpdateStatusModal.css';
import useFetchData from '../API/FetchRequests';
import Lottie from 'lottie-react';

const UpdateStatusModal = (props) => {
    const { fetchData } = useFetchData();
    const [loading, setLoading] = useState(false)

    const handleReject = async () => {
        const response = await ChangeStatus('Rejected', props._id);
        if (response.success) {
            setLoading(true)
            await fetchData()
            props.showSuccess("The book has been rejected.")
            setLoading(false)
            props.onClose();
        }
        else {
            props.showError(response.msg)
        }
    };

    const handleAccept = async () => {
        const response = await ChangeStatus('Accepted', props._id);
        if (response.success) {
            setLoading(true)
            await IssueBook(props.user, props.role, props.book);
            await fetchData()
            props.showSuccess(response.msg)
            setLoading(false)
            props.onClose();
        }
        else{
            props.showError(response.msg)
        }
    };
    const styles = {
        table: {
            padding: '0px',
            maxWidth: '80%'
        },
        tableHeader: {
            paddingRight: '0px',
        },
        animation: {
            height: '100%',
            width: '100%',
        }
    };

    return (
        <Modal show={props.show} onHide={props.onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Request of {props.action}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading
                    ?
                    <div className="container d-flex justify-content-center" style={styles.animation}>
                        <Lottie animationData={animationData} loop={true} style={{ width: '250px' }} />
                    </div>

                    :
                    <>
                        <h5>
                            {`${props.name} has requested to ${props.action === 'Submission' ? 'Submit' : "Lent"} the book: `}
                            <span style={{ color: "green" }}>{`${props.bookName}`}</span>
                        </h5>

                        <div className="d-flex justify-content-center align-items-center table-responsive table mt-4" id="dataTable" role="grid" aria-describedby="dataTable_info" style={{ fontSize: "12px" }}>
                            <table className="table border mt-3 horizontal-table" style={styles.table} id="dataTable ">
                                <thead>
                                    <tr>
                                        <th>Book ID</th>
                                        <th>:</th>
                                        <td >{props.code ? props.code.toLocaleString('en-US', { minimumIntegerDigits: 6, useGrouping: false }) : 'N/A'}</td>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Book</th>
                                        <th>:</th>
                                        <td>{props.bookName}</td>
                                    </tr>
                                    <tr>
                                        <th>Self Number</th>
                                        <th>:</th>
                                        <td >{props.selfNo}</td>
                                    </tr>
                                    <tr>
                                        <th>Student</th>
                                        <th>:</th>
                                        <td >{props.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Admission No.</th>
                                        <th>:</th>
                                        <td >{props.admissionNo}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br />
                    </>}
            </Modal.Body>
            <Modal.Footer>
                <h6 className='text-end text-warning'>{props.status === "Requested" ? <span>Take necessary action</span> : (props.status === "Accepted" ? <span className='text-success'>Book was issued</span> : <span className='text-danger'>Book request was declined</span>)}</h6>
                <div className="button d-flex justify-content-center">
                    <Button variant={props.isactiontaken ? "primary" : "secondary"} onClick={props.onClose}>
                        Back
                    </Button>
                    {
                        props.status==="Requested" &&
                        <>
                            <Button variant="primary" onClick={handleAccept}>
                                Issue
                            </Button>
                            <Button variant="danger" onClick={handleReject}>
                                Decline
                            </Button>
                        </>
                    }
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateStatusModal;
