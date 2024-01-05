import React, { useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './UpdateStatusModal.css';
import UploadAvatarAPI from '../API/UploadAvatar';
import animationData from '../../assets/Loading/Airplane.json';
import { Toast } from 'primereact/toast';
import Lottie from 'lottie-react';


const DetailsModal = (props) => {
    const input = useRef(null)
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState({ preview: "", raw: "" })
    const handleClear = () => {
        setAvatar({ preview: "", raw: "" });
    };
    const toast = useRef(null);
    const showError = (errorMsg) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
    }
    const showSuccess = (msg) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(avatar)
        const formData = new FormData();
        formData.append("avatar", avatar.raw)
        try {
            setLoading(true)
            await UploadAvatarAPI(formData)
            showSuccess("Profile updated successfully")
            await props.userData()
        } catch (error) {
            showError("Some error occured")
        }
        finally {
            setLoading(false)
            handleClear()
            // setTimeout(() => {
            //     props.onClose()
            // }, 1000);
        }
    }

    const onInputChange = (e) => {
        if (e.target.files.length) {
            setAvatar({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };
    return (
        <Modal show={props.show} onHide={props.onClose} centered>
            <Toast ref={toast} />
            <Modal.Header >
                <Modal.Title>
                    Change Profile Photo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className='d-flex w-100 justify-content-center align-items-center flex-column'>
                    {loading && (<div className="container bg-white d-flex justify-content-center align-items-center" style={{ position: 'absolute', zIndex: 999, minHeight: '100%', minWidth: '100%' }}>
                        <Lottie animationData={animationData} loop={true} />
                    </div>)}
                    <div className="row">
                        <div className="col  text-center">
                            <div className="mb-3"><label className="form-label" htmlFor="avatar"><strong>Choose jpg, jpeg & png</strong></label>
                                <div className="flex-coloumn">
                                    <div className="card d-flex justify-content-center align-items-center">
                                        <div className="file-input-container">
                                            <label htmlFor="file-input-button" >
                                                {avatar.preview ? (
                                                    <img src={avatar.preview} alt="dummy" width="300" height="300" />
                                                ) : (
                                                    <>
                                                        <div onClick={() => { input.current.click() }} className="btn text-primary form-iconn fa-stack m-auto fa-2x mt-3 mb-2 d-flex justify-content-center align-items-center">
                                                            <i className="avatar-upload fa-solid fa-upload" />
                                                        </div>
                                                        <h5 className="text-center">Upload your photo</h5>
                                                        <input ref={input} type="file" name="avatar" required accept="image/*" className="file-input" onChange={onInputChange} />
                                                    </>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 w-50 d-flex justify-content-between align-items-center">
                        <button className="btn btn-primary btn-sm pt-1 pb-1 px-3" disabled={avatar.preview ? false : true} type="submit">Upload</button>
                        <button className="btn btn-primary btn-sm pt-1 pb-1 px-3" disabled={avatar.preview ? false : true} onClick={handleClear}>Clear</button>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <div className="button d-flex justify-content-center">
                    <Button variant="primary" onClick={props.onClose}>
                        Back
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailsModal;
