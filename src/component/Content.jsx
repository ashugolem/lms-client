import React, { useRef } from 'react'
import TopNav from './TopNav/TopNav'
import { Toast } from 'primereact/toast';
import Alert from './Admin/Alert'
import Members from './Admin/Members'
import CountContainer from './Admin/CountContainer'
import './Admin/Admin.css'
import Activities from './Admin/Activities';

const Content = () => {
  document.title = "LMS - Admin"
  const toast = useRef(null);
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
            <div className="row-50">

              {/* Total Books in the library */}
              <CountContainer count={4000} color={'#139b2bad'} icon={'book'} header={'Total Books'} />

              {/* Total Registered Students */}
              <CountContainer count={12000} color={'#fb6f92'} icon={'user'} header={'Total Students'} />

              {/* Issued Books */}
              <CountContainer count={60} text="%" color={'#8338ec'} icon={'clipboard-list'} header={'Issued Books'} progressBar={true} />

              {/* Pending Request Count For Admin */}
              <CountContainer count={18} color={'#9f86c0'} icon={'bell'} header={'Pending Requests'} />
            </div>
            <div className="row row-1200 d-flex justify-content-between">
              <Members />
            </div>
            <div className="row row-1000">              
              <Activities />
              <Alert />
            </div>
          </div>
        </div>
      </div >
      <a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
    </>
  )
}

export default Content