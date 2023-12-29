import React from 'react'
import AddBookForm from './AddBookForm'
import TopNav from '../TopNav/TopNav'

function AddBooks() {
    return (
        <>
            <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                    <TopNav />
                    <AddBookForm />
                    
                </div>
            </div>
        </>
    )
}

export default AddBooks