import React from 'react'

export default function PrimaryDetails() {
  return (
    <>
            <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">User Details</p>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3"><label className="form-label" htmlFor="city"><strong>Name</strong></label>
                                <div className="flex-coloumn">
                                    <InputText value={student.name} disabled={!edit} onBlur={handleBlur} onChange={handleChange} name="name" id="alphabetic" keyfilter="alpha" className="w-full" style={{ width: '90%' }} />
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label  " htmlFor="email"><strong>Email Address</strong></label>
                                <div className="flex-auto">
                                    <InputText value={student.email} disabled={!edit} onBlur={handleBlur} onChange={handleChange} name="email" id="spacekey" keyfilter={/[^s]/} className="w-full " style={{ width: '100%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="admNo"><strong>Date of Birth</strong></label>
                                    <div className="flex-coloumn">
                                        <Calendar id="minmax" value={student.dob} onBlur={handleBlur} maxDate={maxDate} onChange={handleChange} dateFormat="yy/mm/dd" style={{ width: '100%' }} name='dob' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="admNo"><strong>Phone</strong></label>
                                    <div className="flex-coloumn">
                                        <InputText value={student.phone} disabled={!edit} onBlur={handleBlur} onChange={handleChange} name="phone" id="pint" keyfilter="pint" className="w-full" style={{ width: '100%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="admissionNo"><strong>Admission Number</strong></label>
                                    <div className="flex-coloumn">
                                        <InputText value={student.admissionNo} disabled={true} onBlur={handleBlur} onChange={handleChange} name="admissionNo" id="pint" keyfilter="pint" className="w-full" style={{ width: '100%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary btn-sm pt-1 pb-1" type="submit">Save Settings</button>
                        <button className="btn btn-primary btn-sm ms-3 ps-3 pe-3 pt-1 pb-1" onClick={() => { setEdit(true) }} type="submit">Edit</button>
                    </div>
                </form>
            </div>
    </>
  )
}
