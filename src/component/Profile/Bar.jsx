import React from 'react'

export default function Bar(props) {
    let color = 'danger'
    let value = props.value
    if (value == '100' && props.text==="Account Setup") value = 'Complete!'
    const setColor = () => {
        if (props.value <= props.max/4 && (props.text !== "Fine Imposed" || props.text !== 'Fine Paid')) {
            color = 'success'
        }
        else if (props.value <= props.max/2 && (props.text !== "Fine Imposed" || props.text !== 'Fine Paid')) {
            color = 'warning'
        }
        else if (props.value >= 100 && (props.text === "Fine Imposed" || props.text === 'Fine Paid')) {
            color = 'danger'
        }
        else if (props.value < 50 && (props.text === "Fine Imposed" || props.text === 'Fine Paid')) {
            color = 'success'
        }
        else if (props.value < 100 && (props.text === "Fine Imposed" || props.text === 'Fine Paid')) {
            color = 'warning'
        }
        else if (props.value >= 40) {
            color = 'warning'
        }
    }
    setColor()


    return (
        <>
            <h4 className="small fw-bold mt-2">{props.text}<span className="float-end">{props.text === 'Fine Imposed' || props.text === 'Fine Paid' ? `₹${value}` : `${value}`}</span></h4>
            <div className="progress progress-sm mb-4">
                <div className={`progress-bar bg-${color}`} aria-valuenow={props.value} aria-valuemin="0" aria-valuemax={props.max} style={{ width: `${props.value*100/props.max}%` }}>
                    <span className="visually-hidden">{props.value}</span>
                </div>
            </div>
        </>
    )
}
