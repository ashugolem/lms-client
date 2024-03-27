import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'
import UpdateStatusModal from '../Modal/UpdateStatusModal'

export default function Request(props) {
    const [indicator, setIndicator] = useState(props.seen)
    const [modalVisible, setModalVisible] = useState(false);
    
    const handleRead = async () => {
        try {
            setModalVisible(true);
            const response = await fetch(`${import.meta.env.VITE_HOST}/request/${props._id.toString()}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ seen: true }),
            });
            const json = await response.json();
            if (json.successSeen) {
                setIndicator(true)
                props.setCount(props.count - 1)
                console.log(json.successSeen)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <UpdateStatusModal
                _id={props._id}
                show={modalVisible}
                onClose={() => setModalVisible(false)}
                name={props.name}
                status={props.status}
                role={props.role}
                action={props.type}
                bookName={props.bookName}
                user={props.user}
                book={props.book}
                admissionNo={props.admissionNo}
                isactiontaken={props.isactiontaken}
                eid={props.eid}
                code={props.code}
                selfNo={props.selfNo}
                showError={props.showError}
                showSuccess={props.showSuccess}
            />
            <Link className="dropdown-item d-flex align-items-center" onClick={handleRead}>
                <div className="dropdown-list-image me-3">
                    {
                        props.profile === null
                            ?
                            <img className="rounded-circle" src="/img/avatars/defaultContact.png" />
                            :
                            <img className="rounded-circle" src={props.profile} />
                    }
                    <div className={`bg-${indicator ? 'success' : 'danger'} status-indicator`}></div>
                </div>
                <div className={`fw-${!indicator ? 'bold' : ''}`}>
                    <div className="text-truncate w-100" data-aos="zoom-out"
                        id='head'
                        data-aos-duration="950"
                        data-aos-delay="300"
                    >
                        <span className='text-end text-primary'>{props.status === "Accepted" ? "Issued" : (props.status === "Rejected" ? "Declined" : props.type === 'Lent' ? <span className='text-warning'>New Book lent request</span> : <span className='text-warning'>New Book Submission request</span>)}</span>
                        {/* {props.type === 'Lent' ? <span>New Book lent request</span> : <span>New Book Submission request</span>} */}
                    </div>
                    <p className="small text-gray-500 mb-0">{props.name} </p>
                    <p className="small text-gray-500 mb-0">{`${(moment(props.time).format('hh:mm, DD-MM-YYYY'))}`}</p>
                </div>
            </Link>
        </>
    )
}
