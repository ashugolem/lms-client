import React, { useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CreateRequest from '../API/Request/CreateRequest';
import { Toast } from 'primereact/toast';

const BookLentModal = (props) => {
    const styles = {
        table: {
            padding: '0px',
        },
        tableHeader: {
            paddingRight: '0px',
        },
    };
    const toastTopCenter = useRef(null);
    const showSuccess = () => {
        toastTopCenter.current.show({ severity: 'success', summary: 'Success', detail: 'Request Successfully Sent to Librarian', life: 3000 });
    }
    const handleLent = async () => {
        console.log("From Modal : ")
        console.log(`Book - ${props.book}`)
        const response = await CreateRequest(props.user, props.book )
        if (response.success) {
            showSuccess()
            props.onClose();
            // setTimeout(() => {
            // }, 3000);
        }
    }
    return (
        <>
            <Toast ref={toastTopCenter} position="top-center" />
            <Modal show={props.show} onHide={props.onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Lent - {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>
                        <div className="table-responsive table mt-4" id="dataTable" role="grid" aria-describedby="dataTable_info" style={{ fontSize: "15px" }}>
                            <table className="table my-2" style={styles.table} id="dataTable">
                                <thead>
                                    <tr>
                                        <th className="text-center">Code</th>
                                        <th className="text-center">Book</th>
                                        <th className="text-center">Author</th>
                                        <th className="text-center">Self No</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center">{props.index + 5001}</td>
                                        <td className="text-center">{props.title}</td>
                                        <td className="text-center">{props.author}</td>
                                        <td className="text-center">{props.selfNo}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </h4>
                </Modal.Body>
                <Modal.Footer>
                    <div className="button d-flex justify-content-center">
                        <Button variant="secondary" onClick={props.onClose}>
                            Back
                        </Button>
                        <Button variant="primary" onClick={handleLent}>
                            Lent Book
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BookLentModal;
