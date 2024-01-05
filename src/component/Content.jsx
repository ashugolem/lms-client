import React, { useEffect, useRef, useState } from 'react'
import TopNav from './TopNav/TopNav'
import ChartComponent from './ChartComponent'
import Counter from './Counter/Counter'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AllUser from './API/AllUsers/AllUsers'
import { ScrollPanel } from 'primereact/scrollpanel';
import { Avatar } from 'primereact/avatar';
import { Toast } from 'primereact/toast';
import FineSettings from './FineSettings'

const Content = () => {
  document.title = "LMS - Admin"
  const role = useSelector((state) => state.setLog.role)
  const [users, setUsers] = useState([])
  const getAllUsers = async () => {
    const user = await AllUser()
    setUsers(user)
  }
  const toast = useRef(null);
  
  useEffect(() => {
    getAllUsers()
  }, [])
  const styles = {
    table: {
      padding: '0px',
    },
    tableHeader: {
      paddingRight: '0px',
    },
  };
  const navigate = useNavigate()
  if (role === 'Admin') {
    return (
      <>
        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <TopNav />
            <Toast ref={toast} />
            <div className="container-fluid">
              <div className="d-sm-flex justify-content-end align-items-end mb-4 px-2">
                <a className="btn btn-primary btn-sm d-none d-sm-inline-block" role="button" href="#"><i className="fas fa-download fa-sm text-white-100"></i>&nbsp;Generate Report</a>
              </div>
              {/* Monthly Issued Books */}
              <div className="row">
                <div className="col-md-6 col-xl-3 mb-4 h-3" >
                  <div className="card shadow border-start-primary py-5" style={{ background: "#139b2bad", color: "white", fontSize: '1rem' }}>
                    <div className="card-body">
                      <div className="row align-items-center no-gutters">
                        <div className="col me-2">
                          <div className=" fw-bold  mb-1"><span>Total Books</span></div>
                          <Counter end={4000} />
                        </div>
                        <div className="col-auto"><i className="fas fa-book fa-2x "></i></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Annual issued Books */}
                <div className="col-md-6 col-xl-3 mb-4">
                  <div className="card shadow border-start-success py-5" style={{ background: "#fb6f92", color: "white", fontSize: '1rem' }}>
                    <div className="card-body">
                      <div className="row align-items-center no-gutters">
                        <div className="col me-2">
                          <div className="text-larger fw-bold mb-1"><span>Total Students</span></div>
                          <div className="text-dark fw-bold h5 mb-0"><span><Counter end={12000} /></span></div>
                        </div>
                        <div className="col-auto"><i className="fas fa-user fa-2x "></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3 mb-4">
                  <div className="card shadow border-start-info py-5" style={{ background: "#8338ec", color: "white", fontSize: '1rem' }}>
                    <div className="card-body">
                      <div className="row align-items-center no-gutters">
                        <div className="col me-2">
                          <div className="text-larger fw-bold mb-1"><span>Issued Books</span></div>
                          <div className="row g-0 align-items-center">
                            <div className="col-auto">
                              <div className="text-dark fw-bold h5 mb-0 me-3">
                                <span>
                                  <Counter end={60} text="%" />
                                </span>
                              </div>
                            </div>
                            <div className="col">
                              <div className="progress progress-sm">
                                <div className="progress-bar bg-info" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ width: "50%" }}><span className="visually-hidden">50%</span></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-auto"><i className="fas fa-clipboard-list fa-2x "></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3 mb-4">
                  <div className="card shadow border-start-warning py-5" style={{ background: "#9f86c0", color: "white", fontSize: '1rem' }}>
                    <div className="card-body">
                      <div className="row align-items-center no-gutters">
                        <div className="col me-2">
                          <div className="text-larger fw-bold mb-1"><span>Pending Requests</span></div>
                          <div className="text-dark fw-bold h5 mb-0"><span><Counter end={18} /></span></div>
                        </div>
                        <div className="col-auto"><i className="fas fa-bell fa-2x "></i></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-7">
                    <div className="card shadow mb-4" style={{ height: '95%' }}>
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h6 className="text-primary fw-bold m-0">Yearly Fine Stats</h6>

                      </div>
                      <div className="card-body py-5">
                        <ChartComponent type={true} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="card card-status shadow mb-4" style={{ height: '95%' }}>
                      <div className="card-header fw-bold text-primary font-weight-bold">Fine Settings</div>
                      <div className="container" >
                        <FineSettings />
                      </div>
                    </div>
                  </div>

                </div>
                <div className="row d-flex justify-content-between">
                  <div className="col-md-9 " style={{ height: '90%' }}>
                    <div className="card">
                      <div className="card-header d-flex justify-content-between text-primary text-center py-3">
                        <div className="fw-bold">
                          <h5 className="fw-bold my-auto text-larger">Members Stats</h5>
                          <h6 className="fw-bold text-start my-auto text-muted text-larger">Total - {users.length}</h6>
                        </div>
                        <div className="btn btn-primary d-flex align-items-center fw-bold text-white"> <i class="fa-solid fa-user-plus"></i> </div>
                      </div>
                      <ScrollPanel style={{ width: '100%', height: '350px' }} >
                        <table className="align-middle table my-0" style={styles.table} id="dataTable">
                          <thead>
                            <tr>
                              <th>Profile</th>
                              <th>Name</th>
                              <th>Role</th>
                              <th>Access</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map(
                              (user) => {
                                return (
                                  <tr>
                                    <td>
                                      {/* <img className="img-profile" style={{ width: '5.5rem', height: '5.5rem' }} src={`src/assets/img/avatars/defaultContact.png`} alt="" /> */}
                                      {
                                        user.profile === undefined
                                        ?
                                        <Avatar label={user.name.slice(0)[0]} size="xlarge" className='bg-primary text-white' shape="circle" />
                                        :
                                        <Avatar image={user.profile} size="xlarge" shape="circle" />
                                      }
                                    </td>
                                    <td>{localStorage.getItem('user-id') === user._id.toString() ? `${user.name} (You)` : user.name}</td>
                                    <td>{user.role}</td>
                                    <td>{user.role === 'Admin' ? 'CRUD, Issue' : (user.role === 'Teacher' ? 'Issue' : 'Request')}</td>
                                    <td>
                                      {
                                        user.role !== 'Admin' &&
                                        <>
                                          <div className="btn btn-primary">
                                              <i className="fas text-white fa-pencil " ></i>
                                            </div>
                                            <div className="btn ms-3">
                                              <i className="fa-solid text-danger  fa-trash" ></i>
                                            </div>
                                          
                                        </>
                                      }
                                    </td>
                                  </tr>
                                )
                              }
                            )}
                          </tbody>
                        </table>

                      </ScrollPanel>
                    </div>
                  </div>

                  <div className=" col-md-3 card shadow mb-4" style={{ minHeight: '95%' }}>
                    <div className="card-header text-center py-3 bg-primary text-white">
                      <h6 className="text-uppercase fw-bold m-0">Todo</h6>
                    </div>
                    <ul className="list-group list-group-flush mt-3">
                      <li className="list-group-item">
                        <div className="row align-items-center no-gutters">
                          <div className="col me-2">
                            <h6 className="mb-0"><strong>Lunch meeting</strong></h6><span className="text-xs">10:30 AM</span>
                          </div>
                          <div className="col-auto">
                            <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-1" /><label className="form-check-label" htmlFor="formCheck-1"></label></div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center no-gutters">
                          <div className="col me-2">
                            <h6 className="mb-0"><strong>Lunch meeting</strong></h6><span className="text-xs">11:30 AM</span>
                          </div>
                          <div className="col-auto">
                            <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-2" /><label className="form-check-label" htmlFor="formCheck-2"></label></div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center no-gutters">
                          <div className="col me-2">
                            <h6 className="mb-0"><strong>Lunch meeting</strong></h6><span className="text-xs">12:30 AM</span>
                          </div>
                          <div className="col-auto">
                            <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-3" /><label className="form-check-label" htmlFor="formCheck-3"></label></div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5">
                    <div className="card shadow mb-4 " style={{ height: '95%' }}>
                      <div className="card-header bg-primary  py-3">
                        <h6 className="text-white fw-bold m-0">Department Wise Fine</h6>
                      </div>
                      <div className="card-body" >
                        <div className="container">

                          <h4 className="small fw-bold">CSE<span className="float-end">20%</span></h4>
                          <div className="progress mb-3">
                            <div className="progress-bar bg-danger" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ width: "20%" }}><span className="visually-hidden">20%</span></div>
                          </div>
                          <h4 className="small fw-bold">ECE<span className="float-end">40%</span></h4>
                          <div className="progress mb-3">
                            <div className="progress-bar bg-warning" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ width: "40%" }}><span className="visually-hidden">40%</span></div>
                          </div>
                          <h4 className="small fw-bold">IT<span className="float-end">60%</span></h4>
                          <div className="progress mb-3">
                            <div className="progress-bar bg-primary" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }}><span className="visually-hidden">60%</span></div>
                          </div>
                          <h4 className="small fw-bold">Mechanical<span className="float-end">80%</span></h4>
                          <div className="progress mb-3">
                            <div className="progress-bar bg-info" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }}><span className="visually-hidden">80%</span></div>
                          </div>
                          <h4 className="small fw-bold">Civil<span className="float-end">Complete!</span></h4>
                          <div className="progress mb-3">
                            <div className="progress-bar bg-success" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%" }}><span className="visually-hidden">100%</span></div>
                          </div>
                          <h4 className="small fw-bold">CSE-AI<span className="float-end">40%</span></h4>
                          <div className="progress mb-3">
                            <div className="progress-bar bg-success" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ width: "40%" }}><span className="visually-hidden">40%</span></div>
                          </div>
                          <h4 className="small fw-bold">CSE-AI & DS<span className="float-end">60%</span></h4>
                          <div className="progress mb-3">
                            <div className="progress-bar bg-success" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }}><span className="visually-hidden">60%</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <ChartComponent/> */}

                  </div>
                  <div className=" col-md-7 card shadow mb-4" style={{ minHeight: '95%' }}>
                    <div className="card-header bg-primary  py-3">
                      <h6 className="text-white fw-bold m-0">Activities</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
        <a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
      </>
    )
  }
  navigate('/login')
}

export default Content