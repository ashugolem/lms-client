import React, { useEffect, useRef, useState } from 'react';
import AllUser from '../API/AllUsers/AllUsers';
import { ScrollPanel } from 'primereact/scrollpanel';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { Avatar } from 'primereact/avatar';
import './Members.css';
import AddUser from '../Modal/AddUserModal';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import AddTeacher from '../Modal/AddTeacherModal';


export default function Members() {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [showTeacher, setShowTeacher] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        const user = await AllUser();
        setUsers(user);
    };

    const showError = (errorMsg) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
    };

    const showSuccess = (msg) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
    };

    const toast = useRef(null);
    const styles = {
        table: {
            padding: '0px',
        },
        tableHeader: {
            paddingRight: '0px',
        },
    };
    return (
        <>
            <Toast ref={toast} />
            <AddUser
                show={show}
                onClose={() => {
                    setShow(false);
                }}
                role={"Student"} // Pass the role to the AddUser component
                showSuccess={showSuccess}
                showError={showError}
            />
            <AddTeacher
                show={showTeacher}
                onClose={() => {
                    setShowTeacher(false);
                }}
                role={"Teacher"} // Pass the role to the AddUser component
                showSuccess={showSuccess}
                showError={showError}
            />
            <div className="col-md-12" style={{ height: '90%' }}>
                <div className="card">
                    <div className="card-header d-flex justify-content-between text-primary text-center py-3">
                        <div className="fw-bold">
                            <h5 className="fw-bold my-auto text-larger">Members Stats</h5>
                            <h6 className="fw-bold text-start my-auto text-muted text-larger">Total - {users.length}</h6>
                        </div>
                        <button onClick={() => setVisible(true)} className="btn btn-primary d-flex align-items-center fw-bold text-white"> <i className="fa-solid fa-user-plus"></i> </button>
                        <Dialog header="Choose the type of User" className='text-center' visible={visible} style={{ width: '20vw' }} onHide={() => setVisible(false)}>
                            <p className="m-0 d-flex justify-content-between">
                                <button onClick={() => {
                                    setVisible(false);
                                    setShow(true)
                                }} className="btn btn-primary text-white"> Student </button>

                                <button onClick={() => {
                                    setVisible(false);
                                    setShowTeacher(true)
                                }} className="btn btn-primary text-white"> Teacher </button>

                            </p>
                        </Dialog>
                    </div>
                    <ScrollPanel style={{ width: '100%', height: '300px' }} >
                        <table className="align-middle table my-0" style={styles.table} id="dataTable">
                            <thead>
                                <tr>
                                    <th>Profile</th>
                                    <th>Name</th>
                                    <th className='role'>Role</th>
                                    <th className='access'>Status</th>
                                    <th className='access'>Access</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>
                                            {user.profile === undefined ? (
                                                <Avatar label={user.name.slice(0)[0]} size="xlarge" className='bg-primary profile text-white' shape="circle" />
                                            ) : (
                                                <Avatar image={user.profile} className='profile' size="xlarge" shape="circle" />
                                            )}
                                        </td>
                                        <td>{localStorage.getItem('user-id') === user._id.toString() ? `${user.name} (You)` : user.name}</td>
                                        <td className='role'>{user.role}</td>
                                        <td className='access'>{user.status}</td>
                                        <td className='access'>{user.role === 'Admin' ? 'CRUD, Issue' : (user.role === 'Teacher' ? 'Issue' : 'Request')}</td>
                                        <td>
                                            {user.role !== 'Admin' && (
                                                <>
                                                    <div className="btn btn-primary">
                                                        <i className="fas text-white fa-pencil "></i>
                                                    </div>
                                                    <div className="btn">
                                                        <i className="fa-solid text-danger  fa-trash" ></i>
                                                    </div>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </ScrollPanel>
                </div>
            </div>
        </>
    );
}
