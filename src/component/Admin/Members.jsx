import React, { useEffect, useState } from 'react'
import AllUser from '../API/AllUsers/AllUsers'
import { ScrollPanel } from 'primereact/scrollpanel'
import { Avatar } from 'primereact/avatar'

export default function Members() {
    const [users, setUsers] = useState([])
    const getAllUsers = async () => {
        const user = await AllUser()
        setUsers(user)
    }
    useEffect(() => {
        getAllUsers()
    }, [])
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
            <div className="col-md-9 " style={{ height: '90%' }}>
                <div className="card">
                    <div className="card-header d-flex justify-content-between text-primary text-center py-3">
                        <div className="fw-bold">
                            <h5 className="fw-bold my-auto text-larger">Members Stats</h5>
                            <h6 className="fw-bold text-start my-auto text-muted text-larger">Total - {users.length}</h6>
                        </div>
                        <div className="btn btn-primary d-flex align-items-center fw-bold text-white"> <i className="fa-solid fa-user-plus"></i> </div>
                    </div>


                    <ScrollPanel style={{ width: '100%', height: '350px' }} >
                        <table className="align-middle table my-0" style={styles.table} id="dataTable">
                            <thead>
                                <tr>
                                    <th>Profile</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Access</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(
                                    (user) => {
                                        return (
                                            <tr>
                                                <td>
                                                    {
                                                        user.profile === undefined
                                                            ?
                                                            <Avatar label={user.name.slice(0)[0]} size="xlarge" className='bg-primary text-white' shape="circle" />
                                                            :
                                                            <Avatar image={user.profile} size="xlarge" shape="circle" />
                                                    }
                                                </td>
                                                <td>{localStorage.getItem('user-id') === user._id.toString() ? `${user.name} (You)` : user.name}</td>
                                                <td>{user.role}</td>
                                                <td>{user.role === 'Admin' ? 'CRUD, Issue' : (user.role === 'Teacher' ? 'Issue' : 'Request')}</td>
                                                <td>
                                                    {
                                                        user.role !== 'Admin' &&
                                                        <>
                                                            <div className="btn btn-primary">
                                                                <i className="fas text-white fa-pencil " ></i>
                                                            </div>
                                                            <div className="btn ms-3">
                                                                <i className="fa-solid text-danger  fa-trash" ></i>
                                                            </div>

                                                        </>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    }
                                )}
                            </tbody>
                        </table>

                    </ScrollPanel>
                </div>
            </div>
        </>
    )
}
