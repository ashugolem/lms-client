import React, { useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './UpdateStatusModal.css';
import UpdateUserActivation from '../API/User Activation/UpdateUserActivation';

const DetailsModal = ({ student, teacher, _id, showError, setStatus, onClose, show, message, name, type, isactiontaken, status }) => {
    const styles = {
        table: {
            padding: '0px',
            maxWidth: '80%'
        },
        tableHeader: {
            paddingRight: '0px',
        },
    };

    const handleReject = async () => {
        const response = await UpdateUserActivation('Declined', _id)
        if (response) {
            showError(`${name} has Declined for Activation`)
            setStatus("Declined")
        }
        else showError('Some Error Occured')
        onClose();
    };

    const handleAccept = async () => {
        const response = await UpdateUserActivation('Approved', _id)
        if (response) {
            showSuccess(`${name} has Approved Successfully`)
            setStatus("Approved")
        }
        else showError('Some Error Occured')
        onClose();
    };
    return (
        <>
            <Modal show={show} onHide={onClose} centered>
                <Modal.Header>
                    <Modal.Title>
                        User Activation Request
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className='text-center'>
                        <span className='text-bold'>{message}</span>
                    </h5>
                    <div className="table-responsive d-flex justify-content-center table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                        <table className="table border mt-3 horizontal-table" style={styles.table} id="dataTable ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>:</th>
                                    <td>{name}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {type === 'Student' &&
                                        <>
                                            <th>Admission Number</th>
                                            <th>:</th>
                                            <td >{student.admissionNo}</td>
                                        </>
                                    }
                                    {type === 'Teacher' &&
                                        <>
                                            <th>EID</th>
                                            <th>:</th>
                                            <td>{teacher.eid}</td>
                                        </>
                                    }
                                </tr>
                                <tr>
                                    {type === 'Student' &&
                                        <>
                                            <th>Stream</th>
                                            <th>:</th>
                                            <td>{`${student.course} ${student.branch}`}</td>
                                        </>
                                    }
                                    {type === 'Teacher' &&
                                        <>
                                            <th>Designation</th>
                                            <th>:</th>
                                            <td>{teacher.designation}</td>
                                        </>
                                    }
                                </tr>
                                <tr>
                                    {type === 'Student' &&
                                        <>
                                            <th>Semester</th>
                                            <th>:</th>
                                            <td>{student.semester}</td>
                                        </>
                                    }
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {
                        !isactiontaken &&
                        <h6 className='text-end text-warning'>Take necessary action</h6>
                    }
                    {
                        isactiontaken && ((
                            status === "Declined" &&
                            <span className="small fw-bold text-danger">Declined</span>
                        ) ||
                            (status === "Approved" &&
                                <span className="fw-bold">Approved</span>))

                    }
                    <div className="button d-flex justify-content-center">
                        <Button variant={`${isactiontaken ? "primary" : "secondary"}`} onClick={onClose}>
                            Back
                        </Button>
                        {
                            !isactiontaken &&
                            <>
                                <Button variant="primary" onClick={handleAccept}>
                                    Allow
                                </Button>
                                <Button variant="danger" onClick={handleReject}>
                                    Decline
                                </Button>
                            </>
                        }
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DetailsModal;
