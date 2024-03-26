import React, { useState } from 'react'
import FineSettings from './FineSettings'

export default function Alert() {
    const [show, setShow] = useState(false)
    return (
        <div className="col-md-3" style={{ width: "41%" }}>
            <div className="card card-status shadow" style={{ height: '95%' }}>
                <div className="card-header d-flex justify-content-between fw-bold text-primary font-weight-bold w-100">
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
                <div className="container row h-100" >
                    <div className="container d-flex align-items-center justify-content-center flex-column">
                        <FineSettings show={show} setShow={setShow} />
                    </div>

                </div>
            </div>
        </div>
    )
}
