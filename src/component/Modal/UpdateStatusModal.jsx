import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ChangeStatus from '../API/ChangeStatus';
import IssueBook from '../API/IssueBook';
import './UpdateStatusModal.css';
import useFetchData from '../API/FetchRequests';

const UpdateStatusModal = (props) => {
    const { fetchData } = useFetchData();
    const handleReject = async () => {
        ChangeStatus('Rejected', props._id);
        await fetchData()
        props.onClose();
    };

    const handleAccept = async () => {
        ChangeStatus('Accepted', props._id);
        IssueBook(props.user, props.role, props.book);
        await fetchData()
        props.onClose();
    };
    const styles = {
        table: {
            padding: '0px',
            maxWidth: '80%'
        },
        tableHeader: {
            paddingRight: '0px',
        },
    };

    return (
        <Modal show={props.show} onHide={props.onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Request of {props.action}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>
                    {`${props.name} has requested to ${props.action === 'Submission' ? 'Submit' : "Lent"} the book: `}
                    <span style={{ color: "green" }}>{`${props.bookName}`}</span>
                </h5>

                <div className="d-flex justify-content-center align-items-center table-responsive table mt-4" id="dataTable" role="grid" aria-describedby="dataTable_info" style={{ fontSize: "12px" }}>
                    {/* <table className="table my-2" style={styles.table} id="dataTable">
                        <thead>
                            <tr>
                                <th className="text-center">ID</th>
                                <th className="text-center">Student</th>
                                <th className="text-center">Book</th>
                                <th className="text-center">Self No</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center">000001</td>
                                <td className="text-center">{props.name}</td>
                                <td className="text-center">{props.bookName}</td>
                                <td className="text-center">{props.selfNo}</td>
                            </tr>
                        </tbody>
                    </table> */}
                    <table className="table border mt-3 horizontal-table" style={styles.table} id="dataTable ">
                        <thead>
                            <tr>
                                <th>Book ID</th>
                                <th>:</th>
                                {/* <td >000001{props.code}</td> */}
                                <td >{(props.code).toLocaleString('en-US', { minimumIntegerDigits: 6, useGrouping: false })}</td>
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
            </Modal.Body>
            <Modal.Footer>
                <h6 className='text-end text-warning'>Take necessary action</h6>
                <div className="button d-flex justify-content-center">
                    <Button variant={props.isactiontaken ? "primary" : "secondary"} onClick={props.onClose}>
                        Back
                    </Button>
                    {
                        !props.isactiontaken &&
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
