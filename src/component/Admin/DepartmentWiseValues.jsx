import React from 'react'
import Activities from './Activities'
import FineSettings from './FineSettings'

export default function DepartmentWiseValues() {
    return (
        <div className="row d-flex justify-content-between">
            <div className="col-md-5">
                <div className="card shadow mb-4 " style={{ height: '95%' }}>
                    <div className="card-header bg-primary  py-3">
                        <h6 className="text-white fw-bold m-0">Department Wise Fine</h6>
                    </div>
                    <div className="card-body" >
                        <div className="container">
                            <h4 className="small fw-bold">CSE<span className="float-end">20%</span></h4>
                            <div className="progress mb-3">
                                <div className="progress-bar bg-danger" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ width: "20%" }}><span className="visually-hidden">20%</span></div>
                            </div>
                            <h4 className="small fw-bold">ECE<span className="float-end">40%</span></h4>
                            <div className="progress mb-3">
                                <div className="progress-bar bg-warning" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ width: "40%" }}><span className="visually-hidden">40%</span></div>
                            </div>
                            <h4 className="small fw-bold">IT<span className="float-end">60%</span></h4>
                            <div className="progress mb-3">
                                <div className="progress-bar bg-primary" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }}><span className="visually-hidden">60%</span></div>
                            </div>
                            <h4 className="small fw-bold">Mechanical<span className="float-end">80%</span></h4>
                            <div className="progress mb-3">
                                <div className="progress-bar bg-info" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }}><span className="visually-hidden">80%</span></div>
                            </div>
                            <h4 className="small fw-bold">Civil<span className="float-end">Complete!</span></h4>
                            <div className="progress mb-3">
                                <div className="progress-bar bg-success" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%" }}><span className="visually-hidden">100%</span></div>
                            </div>
                            <h4 className="small fw-bold">CSE-AI<span className="float-end">40%</span></h4>
                            <div className="progress mb-3">
                                <div className="progress-bar bg-success" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ width: "40%" }}><span className="visually-hidden">40%</span></div>
                            </div>
                            <h4 className="small fw-bold">CSE-AI & DS<span className="float-end">60%</span></h4>
                            <div className="progress mb-3">
                                <div className="progress-bar bg-success" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }}><span className="visually-hidden">60%</span></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="col-md-6">
                <div className="card card-status shadow mb-4" style={{ height: '95%' }}>
                    <div className="card-header fw-bold text-primary font-weight-bold">Fine Settings</div>
                    <div className="container row h-100 d-flex justify-content-between" >
                        <div className="container col-md-6 border-right border-primary ">
                            <FineSettings userType={'Teacher'} />
                        </div>
                        {/* <hr /> */}
                        <div className="container col-md-6 ">
                            <FineSettings userType={'Student'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
