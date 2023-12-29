import React, { useEffect } from 'react'

export default function Bar(props) {
    let color = 'danger'
    let value = props.value
    if (value == '100' && props.text==="Account Setup") value = 'Complete!'
    const setColor = () => {
        if (props.value >= 70) {
            color = 'success'
        }
        else if (props.value >= 40) {
            color = 'warning'
        }
    }
    setColor()


    return (
        <>
            <h4 className="small fw-bold">{props.text}<span className="float-end">{props.text === 'Fine Imposed' || props.text === 'Fine Paid' ? `₹${value}` : `${value}`}</span></h4>
            <div className="progress progress-sm mb-3">
                <div className={`progress-bar bg-${color}`} aria-valuenow={props.value} aria-valuemin="0" aria-valuemax="100" style={{ width: `${props.value}%` }}>
                    <span className="visually-hidden">{props.value}</span>
                </div>
            </div>
        </>
    )
}
