import React, { useEffect, useRef, useState } from 'react'
import GetFineApi from '../API/Fine';
import { InputText } from 'primereact/inputtext';
import FineUpdate from '../Modal/FineUpdateModal';
import { Toast } from 'primereact/toast';
import moment from 'moment';
import './Fine.css'

export default function FineSettings(props) {
    const [fine, setFine] = useState({ finePerDay: '', deadline: '' })
    const showError = (errorMsg) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: errorMsg, life: 3000 });
    }
    const showSuccess = (msg) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
    }
    const toast = useRef(null);
    const GetFineDetails = async () => {
        const Fine = await GetFineApi()
        setFine(Fine.fine);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        GetFineDetails();
    }, [])


    return (
        <>
            <Toast ref={toast} />
            <FineUpdate
                show={props.show}
                onClose={() => {
                    props.setShow(false)
                }}
                showSuccess={showSuccess}
                showError={showError}
                fine={fine}
                setFine={setFine}
            />
            <form onSubmit={handleSubmit} className='d-flex align-items-center flex-column justify-content-center'>
                <div className="mb-3">
                    <div className="container d-flex flex-column">
                        <label htmlFor="finePerDay" className='text-center'>Fine Per Day</label>
                        <InputText
                            className="shadow"
                            name="finePerDay"
                            value={'Rupees ' + fine.finePerDay + ' per Day'}
                            placeholder="Fine Per Day"
                            autoComplete='true'
                            disabled={true}
                        />
                    </div>
                    <div className="container mt-2 d-flex flex-column">
                        <label htmlFor="deadline" className='mt-2 text-center'>Deadline</label>
                        <InputText
                            className="shadow"
                            name="deadline"
                            value={fine.deadline + ' Days'}
                            placeholder={fine.deadline}
                            disabled={true}
                        />
                    </div>
                </div>
            </form>
            <div className="card-header bg-primary updated rounded py-3">
                <h6 className="text-white w-100 text-center fw-bold m-0 updated">Last Updated : {moment(fine.time).format('DD-MM-YYYY')}</h6>
                <h6 className="text-white mt-1 w-100 text-center fw-bold m-0 updated">Time : {moment(fine.time).format('HH:MM:SS')}</h6>
            </div>

        </>
    )
}
