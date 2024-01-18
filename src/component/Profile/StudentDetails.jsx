import { useFormik } from 'formik';
import React from 'react'

export default function StudentDetails() {

    const initialValues = student
    const [edit, setEdit] = useState(false)
    const [editAdditional, setEditAdditional] = useState(false)
    const toast = useRef(null);
    let maxDate = new Date();
    maxDate.setMonth((new Date()).getMonth());
    maxDate.setFullYear((new Date()).getFullYear());

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: `Profile updated successfully`, life: 3000 });
    }
    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Some Error Occured', life: 3000 });
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            // validationSchema: AddBookSchema,
            onSubmit: async (values, action) => {
                const response = await AddBook(values)
                if (response.success) {
                    await CreateAlert(response.book._id, values.stock, "Book", values.title)
                    showSuccess()
                }
                else {
                    showError()
                }
                action.resetForm();
            },
        });

    return (
        <>
            <div className="col-lg-8">
                <div className="row">
                    <div className="col">
                        <div className="card shadow mb-3">
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
                        </div>
                        <div className="card shadow">
                            <div className="card-header py-3">
                                <p className="text-primary m-0 fw-bold">Additional Information</p>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3"><label className="form-label" htmlFor="course"><strong>Course</strong></label>
                                                <div className="flex-coloumn">
                                                    <InputText value={student.course} disabled={!editAdditional} onBlur={handleBlur} onChange={handleChange} name='course' id="alphabetic" keyfilter="alpha" className="w-full" style={{ width: '100%' }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3"><label className="form-label" htmlFor="branch"><strong>Branch</strong></label>
                                                <div className="flex-coloumn">
                                                    <InputText value={student.branch} disabled={!editAdditional} onBlur={handleBlur} onChange={handleChange} name='branch' id="alphabetic" keyfilter="alpha" className="w-full" style={{ width: '100%' }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3"><label className="form-label" htmlFor="semester"><strong>Semester</strong></label>
                                                <div className="flex-coloumn">
                                                    <InputText value={student.semester} disabled={!editAdditional} onBlur={handleBlur} onChange={handleChange} name='semester' id="alphabetic" keyfilter="alpha" className="w-full" style={{ width: '100%' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="address"><strong>Address</strong></label>
                                        <div className="flex-coloumn">
                                            <InputText value={student.address} disabled={!editAdditional} onBlur={handleBlur} onChange={handleChange} name='address' id="alphabetic" keyfilter="alpha" className="w-full" style={{ width: '100%' }} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <button className="btn btn-primary btn-sm pt-1 pb-1" type="submit">Save Settings</button>
                                        <button className="btn btn-primary btn-sm ms-3 ps-3 pe-3 pt-1 pb-1" type="submit" onClick={() => { setEditAdditional(true) }}>Edit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
