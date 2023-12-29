import React from 'react'
import TopNav from './TopNav/TopNav'

export default function Blocked() {
    return (
        <div className="d-flex flex-column" id="content-wrapper">

            <div id="content">
                <TopNav />
                <div>
                    <h1 className="text-center">You are Blocked!</h1>
                </div>
            </div>
        </div>
    )
}
