import React, { useRef, useState } from 'react'
import moment from 'moment/moment'
import '../BookList/book.css'
import { useSelector } from 'react-redux';
import BookLentModal from '../Modal/BookLentModal';

export default function Book(props) {
    const role = useSelector((state) => state.setLog.role)
    const user = localStorage.getItem('user-id')
    const [modalVisible, setModalVisible] = useState(false);
    const handleLent = () => {
        console.log("user - " + user )
        console.log("book - " + props._id )
        if (role === 'Student') {
            setModalVisible(true);
        }
    };

    return (
        <>
            <BookLentModal
                show={modalVisible}
                onClose={() => setModalVisible(false)}
                book={props._id}
                key={props._id}
                user={user}
                index={props.index}
                title={props.title}
                author={props.author}
                selfNo={props.selfNo}
            />
            <tr onClick={handleLent}>
                <td >{(props.code).toLocaleString('en-US', { minimumIntegerDigits: 6, useGrouping: false })}</td>
                <td>{props.title}</td>
                <td>{props.author}</td>
                <td className="text-center">{moment(props.publishedOn).format('YYYY')}</td>
                <td className="text-center">{props.selfNo}</td>
                {(role === "Admin" || role === "Teacher") &&
                    <>
                        <td className="text-center">  {props.isbn}</td>
                        <td className="text-center">₹ {props.price}</td>
                        <td className="text-center">  {props.stock}</td>
                        <td className="text-center">  {props.total}</td>
                        <td className="text-center">  {moment(props.registeredAt).format('DD-MM-YYYY')}</td>
                    </>
                }
            </tr>
        </>
    )
}
