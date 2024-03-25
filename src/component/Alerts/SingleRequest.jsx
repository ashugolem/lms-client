import React from 'react'
import handleRead from './handleReadAPI';
import { Avatar } from 'primereact/avatar'

export default function singleRequest(request) {
    const [modalVisible, setModalVisible] = useState(false);

    const showError = (errorMsg) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
    }
    const showSuccess = (msg) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
    }



    const itemTemplate = (request) => {
        return (
            <div className="d-flex align-items-center p-2"><div className="flex-1 flex flex-column ">
                <h4 className="fw-bold text-primary">{request.userName}</h4>
                <div className="flex align-items-center gap-2">
                    <i class="fa-solid fa-book text-sm mx-2"></i>
                    <span>Book - {request.bookName}</span>
                </div>
            </div>
            </div>
        );
    };


    return (
        <>
            <UpdateStatusModal
                _id={request._id}
                show={modalVisible}
                onClose={() => setModalVisible(false)}
                name={request.userNamename}
                role={request.role}
                action={request.type}
                bookName={request.bookName}
                user={request.user}
                book={request.book}
                admissionNo={request.admissionNo}
                isactiontaken={request.isactiontaken}
                eid={request.eid}
                code={request.code}
                selfNo={request.selfNo}
                showError={showError}
                showSuccess={showSuccess}
            />
            <tr onClick={handleRead(setModalVisible, request._id)}>
                <td>
                    {
                        !request.profile
                            ?
                            <Avatar label={request.userName.slice(0)[0]} size="xlarge" className='bg-primary text-white' shape="circle" />
                            :
                            <Avatar image={request.profile} size="xlarge" shape="circle" />
                    }
                </td>
                <td>
                    {itemTemplate(request)}
                </td>
                <td><span className="font-bold text-end w-100 fw-bold align-middle">{request.role}</span></td>
                <td>{request.type}</td>
                <td className={`fw-bold`}>{request.status === "Accepted" ? "Issued" : "Pending"}</td>
                <td></td>

            </tr>
        </>
    )
}
