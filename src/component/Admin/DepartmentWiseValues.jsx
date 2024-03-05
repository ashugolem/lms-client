import React, { useState } from 'react'
import Activities from './Activities'
import FineSettings from './FineSettings'

import { InputSwitch } from 'primereact/inputswitch';


export default function DepartmentWiseValues() {
    const [show, setShow] = useState(false)
    const [checked, setChecked] = useState(false)
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
            <div className="col-md-4">
                <div className="card card-status shadow mb-4" style={{ height: '50%' }}>
                    <div className="card-header d-flex justify-content-between fw-bold text-primary font-weight-bold">
                        <div className="d-flex align-items-center">
                            Fine Parameters
                        </div>
                        <div className="flex justify-content-center">
                            <button
                                className="btn btn-primary shadow px-4 py-2 mx-2"
                                style={{ borderRadius: "0.6rem" }}
                                onClick={() => setShow(true)}
                            >
                                <i className="fa-solid fa-pencil"></i>
                            </button>
                        </div>
                    </div>
                    <div className="container row h-100 d-flex justify-content-between" >
                        <div className="container col-md-6 border-right border-primary ">
                            <FineSettings show={show} setShow={setShow} />
                        </div>

                    </div>
                </div>
                <div className="card card-status shadow mb-4" style={{ height: '45%' }}>
                    <div className="card-header d-flex justify-content-between fw-bold text-primary font-weight-bold">
                        <div className="d-flex align-items-center">
                            Special Authorisation
                        </div>
                        <div className="flex justify-content-center">
                            <button
                                className="btn btn-primary shadow px-4 py-2 mx-2"
                                style={{ borderRadius: "0.6rem" }}
                                onClick={() => setShow(true)}
                            >
                                <i className="fa-solid fa-pencil"></i>
                            </button>
                        </div>
                    </div>
                    <div className="container row h-100 d-flex justify-content-between" >
                        <div className="container col-md-6 border-right border-primary ">
                           
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
