import React from 'react'
import Counter from '../Counter/Counter'

export default function CountContainer({ count, icon, color, header, progressBar, text }) {

    return (
        <div className="col-md-6 mb-4 h-3" >
            <div className="card shadow border-start-primary py-5" style={{ background: color, color: "white", fontSize: '1rem' }}>
                <div className="card-body">
                    <div className="row align-items-center no-gutters">
                        <div className="col me-2">
                            <div className=" fw-bold  mb-1 my-auto pb-2"><span>{header}</span></div>
                            <Counter end={count} text={text} />
                            {false &&
                                <div className="col me-2 ">
                                    <div className="progress progress-sm">
                                        <div className="progress-bar bg-info" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ width: "50%" }}>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="col-auto"><i className={`fas fa-${icon} fa-2x `}></i></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
