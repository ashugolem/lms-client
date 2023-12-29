import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModelAdded = (props) => {
    
    return (
        <>
            <Modal
                show={props.show}
                onClose={props.onClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Body className="text-center text-success">
                    <h3>{props.message}</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={props.onClose}
                        style={{
                            borderRadius: '5px',
                            opacity: 0,
                            display: 'none',
                        }}
                    >
                        Back
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModelAdded;
