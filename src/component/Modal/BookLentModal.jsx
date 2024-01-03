import React, { useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CreateRequest from '../API/Request/CreateRequest';
import { Toast } from 'primereact/toast';

const BookLentModal = ({show, code, onClose, title, author, selfNo}) => {
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
        const response = await CreateRequest(localStorage.getItem('user-id'), props.book )
        if (response.success) {
            showSuccess()
            props.onClose();
        }
    }
    return (
        <tr>
            <Toast ref={toastTopCenter} position="top-center" />
            <Modal show={show} onHide={onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Lent - {title}
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
                                        <td className="text-center">{(code).toLocaleString('en-US', { minimumIntegerDigits: 6, useGrouping: false })}</td>
                                        <td className="text-center">{title}</td>
                                        <td className="text-center">{author}</td>
                                        <td className="text-center">{selfNo}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </h4>
                </Modal.Body>
                <Modal.Footer>
                    <div className="button d-flex justify-content-center">
                        <Button variant="secondary" onClick={onClose}>
                            Back
                        </Button>
                        <Button variant="primary" onClick={handleLent}>
                            Lent Book
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </tr>
    );
};

export default BookLentModal;
