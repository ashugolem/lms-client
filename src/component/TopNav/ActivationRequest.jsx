import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'
import ActivationRequestModal from '../Modal/ActivationRequestModal';

export default function ActivationRequest(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [indicatorColor, setIndicatorColor] = useState('')
    const [indicator, setIndicator] = useState(props.seen)
    const handleRead = async () => {
        try {
            setModalVisible(true)
            const response = await fetch(`${import.meta.env.VITE_HOST}/activation-request/${props._id.toString()}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ seen: true }),
            });
            const json = await response.json();
            if (json.successSeen) {
                setIndicator(true)
                props.set(props.count - 1)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const[status, setStatus] = useState(props.status)
    const chooseIndicator = () => {
        if (props.status === "Pending") {
            setIndicatorColor('warning')
        }
        else if (props.status === "Approved") {
            setIndicatorColor('success')
        }
        else if (props.status === "Declined") {
            setIndicatorColor('danger')
        }
    }
    useEffect(() => {
        chooseIndicator()
    }, [])
    const currentTime = moment();
    const propTime = moment(props.time);

    // Calculate the difference in hours
    const isNotToday = !propTime.isSame(currentTime, 'day');

    // Format the date or time accordingly
    const displayTime = isNotToday
        ? propTime.format('MMMM DD, YYYY') // Format for displaying the date
        : propTime.format('hh:mm A'); // Format for displaying the time
    let sverb = ''
    props.isactiontaken ? sverb = 'had' : sverb = 'has'
    const message = `${props.name.split(' ')[0]} ${sverb} Registered as ${props.type}`
    return (
        <>
            <ActivationRequestModal
                _id={props._id}
                key={props._id}
                show={modalVisible}
                onClose={() => {
                    setModalVisible(false)
                }}
                status={status}
                setStatus={setStatus}
                showError={props.showError}
                showSuccess={props.showSuccess}
                name={props.name}
                message={message}
                isactiontaken={props.isactiontaken}
                student={props.student}
                teacher={props.teacher}
                type={props.type}
                time={props.time}
            />

            <Link className={` fw-${!indicator ? 'bold' : ''} dropdown-item d-flex align-items-center`} onClick={handleRead}>
                <div className="dropdown-list-image me-3">
                    <div className="bg-info icon-circle">
                        <i className="fas fa-user text-white"></i>
                    </div>
                    <div className={`bg-${indicatorColor} status-indicator`}></div>
                </div>
                <div className='w-100'>
                    <div className='d-flex justify-content-between'>
                        <span className="small text-gray-500">{displayTime}</span>
                        {
                            status === "Pending" &&
                            <span className="small fw-bold text-warning">Action Required</span>
                        }
                        {
                            status === "Declined" &&
                            <span className="small fw-bold text-danger">Declined</span>
                        }
                        {
                            props.status === "Approved" &&
                            <span className="small fw-bold text-success">Approved</span>
                        }

                    </div>
                    <p>{message}</p>
                </div>
            </Link>
        </>
    )
}
