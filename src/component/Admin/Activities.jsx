import { ScrollPanel } from 'primereact/scrollpanel'
import React from 'react'

export default function Activities() {
    const styles = {
        table: {
            padding: '0px',
        },
        tableHeader: {
            paddingRight: '0px',
        },
    };
    return (
        <div className=" col-md-7 card shadow mb-4" style={{ minHeight: '100%' }}>
            <div className="card-header bg-primary  py-3">
                <h6 className="text-white w-100 text-center fw-bold m-0">Activities</h6>
            </div>
                <div className="">
                    <ScrollPanel style={{ width: '100%', height: '300px' }} >
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
                            <tr>
                                <td>Ashish</td>
                                <td>Ranjan</td>
                                <td>Admin</td>
                                <td>CRUDF</td>
                                <td>del</td>
                            </tr>
                        </tbody>
                    </table>

                    </ScrollPanel>
                </div>
        </div>
    )
}
