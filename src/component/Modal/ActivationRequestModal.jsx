import React, { useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './UpdateStatusModal.css';
import UpdateUserActivation from '../API/User Activation/UpdateUserActivation';

const DetailsModal = (props) => {
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
        const response = await UpdateUserActivation('Declined', props._id)
        if (response) {
            props.showError(`${props.name} has Declined for Activation`)
            props.setStatus("Declined")
        }
        else props.showError('Some Error Occured')
        props.onClose();
    };

    const handleAccept = async () => {
        const response = await UpdateUserActivation('Approved', props._id)
        if (response) {
            props.showSuccess(`${props.name} has Approved Successfully`)
            props.setStatus("Approved")
        }
        else props.showError('Some Error Occured')
        props.onClose();
    };
    return (
        <>
            <Modal show={props.show} onHide={props.onClose} centered>
                <Modal.Header>
                    <Modal.Title>
                        User Activation Request
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className='text-center'>
                        <span className='text-bold'>{props.message}</span>
                    </h5>
                    <div className="table-responsive d-flex justify-content-center table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                        <table className="table border mt-3 horizontal-table" style={styles.table} id="dataTable ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>:</th>
                                    <td>{props.name}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {props.type === 'Student' &&
                                        <>
                                            <th>Admission Number</th>
                                            <th>:</th>
                                            <td >{props.admissionNo}</td>
                                        </>
                                    }
                                    {props.type === 'Teacher' &&
                                        <>
                                            <th>EID</th>
                                            <th>:</th>
                                            <td>TODO</td>
                                        </>
                                    }
                                </tr>
                                <tr>
                                    {props.type === 'Student' &&
                                        <>
                                            <th>Stream</th>
                                            <th>:</th>
                                            <td>{`${props.course} ${props.branch}`}</td>
                                        </>
                                    }
                                    {props.type === 'Teacher' &&
                                        <>
                                            <th>Designation</th>
                                            <th>:</th>
                                            <td>TODO</td>
                                        </>
                                    }
                                </tr>
                                <tr>
                                    {props.type === 'Student' &&
                                        <>
                                            <th>Semester</th>
                                            <th>:</th>
                                            <td>{props.semester}</td>
                                        </>
                                    }
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {
                        !props.isactiontaken &&
                        <h6 className='text-end text-warning'>Take necessary action</h6>
                    }
                    {
                        props.isactiontaken && ((
                            props.status === "Declined" &&
                            <span className="small fw-bold text-danger">Declined</span>
                        ) ||
                            (props.status === "Approved" &&
                                <span className="fw-bold">Approved</span>))

                    }
                    <div className="button d-flex justify-content-center">
                        <Button variant={`${props.isactiontaken ? "primary" : "secondary"}`} onClick={props.onClose}>
                            Back
                        </Button>
                        {
                            !props.isactiontaken &&
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
