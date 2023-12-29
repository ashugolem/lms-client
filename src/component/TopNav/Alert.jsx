import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'
import DetailsModal from '../Modal/DetailsModal';

export default function Alert(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [indicator, setIndicator] = useState(props.seen)
    const handleRead = async () => {
        try {
            setModalVisible(true)
            const response = await fetch(`${import.meta.env.VITE_HOST}/alert/${props._id.toString()}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ seen: true }),
            });
            const json = await response.json();
            if (json.successSeen) {
                setIndicator(true)
                console.log(props.count)
                props.setAlertCount(props.count - 1)
                console.log(props.count)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <DetailsModal
                _id={props._id}
                show={modalVisible}
                onClose={() => {
                    setModalVisible(false)
                    props.set(props.allAlert.filter((alert) => { return alert._id !== props._id }))
                }}
                message={props.message}
                userName={props.name}
                bookName={props.book}
                reference={props.reference}
                stock={props.stock}
                time={props.time}
                code={props.code}
                selfNo={props.selfNo}
            />

            <Link className={`fw-${!indicator ? 'bold' : ''} dropdown-item d-flex align-items-center`} onClick={handleRead}>
                <div className="me-3">
                    <div className="bg-success icon-circle">
                        {props.reference==='Book'?
                            <i className="fas fa-book text-white"></i>:
                            <i className="fas fa-file-alt text-white"></i>
                        }
                    </div>
                </div>
                <div><span className="small text-gray-500">{moment(props.time).format('DD MMMM, YYYY')}</span>
                    <p>{props.message}</p>
                    <p className='text-muted ' style={{textAlign:'end', marginTop:'-10px'}}>By : {props.name}</p>
                </div>
            </Link>
        </>
    )
}
