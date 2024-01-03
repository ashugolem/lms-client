import React, { useRef, useState } from 'react'
import moment from 'moment/moment'
import '../BookList/book.css'
import { useSelector } from 'react-redux';
import BookLentModal from '../Modal/BookLentModal';
import { Toast } from 'primereact/toast';

export default function Book({ _id, code, title, author, selfNo, stock, publishedOn, isbn, price, total }) {

    const role = useSelector((state) => state.setLog.role)
    const user = localStorage.getItem('user-id')
    const [modalVisible, setModalVisible] = useState(false);
    const toast = useRef(null);
    const showError = (msg) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: msg, life: 3000 });
    }
    const handleLent = () => {
        if (role === 'Student') {
            if (stock === 0) {
                showError('This book is out of stock')
            }
            else {
                setModalVisible(true);
            }
        }
    };

    return (
        <>
            <Toast ref={toast} position="top-center" />
            <BookLentModal
                show={modalVisible}
                onClose={() => setModalVisible(false)}
                book={_id}
                key={_id}
                user={user}
                code={code}
                title={title}
                author={author}
                selfNo={selfNo}
            />
            <tr className={`${stock === 0 && role === 'Admin' ? 'text-danger ' : ''}`} onClick={stock===0?handleLent:null}  style={{ height: '10vh', verticalAlign: 'top' }}>
                <td >
                    {(code).toLocaleString('en-US', { minimumIntegerDigits: 6, useGrouping: false })}
                </td>
                <td>{title}</td>
                <td>{author}</td>
                <td className="text-center">{moment(publishedOn).format('YYYY')}</td>
                <td className="text-center">{selfNo}</td>
                {role === "Student" &&
                    <td className={`text-center ${stock > 0 ? "text-success" : "text-danger"}`}>
                        <button onClick={handleLent} className={`btn border  text-${stock === 0 ? 'white y' : 'success border-success'} btn-${stock === 0 ? 'danger' : ''}`} disabled={stock === 0}>{stock > 0 ? 'Lent Now' : 'Out of stock'}</button>
                    </td>}
                {(role === "Admin" || role === "Teacher") &&
                    <>
                        <td className="text-center">  {isbn}</td>
                        <td className="text-center">₹ {price}</td>
                        <td className="text-center">  {stock} out of {total}</td>
                    </>
                }
            </tr>
        </>
    )
}
