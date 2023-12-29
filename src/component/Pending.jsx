import React from 'react'
import TopNav from './TopNav/TopNav'

export default function Blocked() {
    return (
        <div className="d-flex flex-column" id="content-wrapper">

            <div id="content">
                <TopNav />
                <div>
                    <h1 className="text-center">Request has been sent to admin</h1>
                    <h2 className="text-center">Wait for approval</h2>
                </div>
            </div>
        </div>
    )
}
