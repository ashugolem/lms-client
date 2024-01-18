import React from 'react'

export default function Alert() {
  return (
      <div className=" col-md-3 card shadow mb-4" style={{ minHeight: '97%' }}>
          <div className="card-header text-center py-3 bg-primary text-white">
              <h6 className="text-uppercase fw-bold m-0">Alerts</h6>
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
  )
}
