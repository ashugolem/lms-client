import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './UpdateStatusModal.css';
import moment from 'moment/moment';

const DetailsModal = (props) => {
    const styles = {
        table: {
            padding: '0px',
            maxWidth: "80%"
        },
        tableHeader: {
            paddingRight: '0px',
        },
    };

    return (
        <Modal show={props.show} onHide={props.onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.reference === 'Book' ? <h4>Book Stock Added</h4> : ''}

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
                                <th>ID</th>
                                <th>:</th>
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
                                <th>Added By</th>
                                <th>:</th>
                                <td >{props.userName}</td>
                            </tr>
                            <tr>
                                <th>Total Stock</th>
                                <th>:</th>
                                <td >{props.stock}</td>
                            </tr>
                            <tr>
                                <th>Self Number</th>
                                <th>:</th>
                                <td >{props.selfNo}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="button d-flex justify-content-center">
                    <Button variant="primary" onClick={props.onClose}>
                        Done
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailsModal;
