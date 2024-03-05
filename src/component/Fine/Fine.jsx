import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Lottie from 'lottie-react';
// import animationData from '../assets/Loading/Airplane.json'
import { ScrollPanel } from 'primereact/scrollpanel';
// import Book from '../BookList/Book';
import FineTableRow from './FineTableRow';
import TopNav from '../TopNav/TopNav';

function Fine() {
    const [loading, setLoading] = useState(false);
    const [fines, setFines] = useState([])
    const [totalFine, setTotalFine] = useState(0)
    const getFineHistories = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_HOST}/calculate-fine/fine-history/${localStorage.getItem('user-id')}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setFines(json.response);
            setTotalFine(json.totalFine)
        } catch (error) {
            console.error('Error fetching fines:', error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getFineHistories();
    }, [])

    const styles = {
        table: {
            padding: '0px',
        },
        tableHeader: {
            paddingRight: '0px',
        },
        animation: {
            height: '100dvh',
            width: '100vw',
        }
    };
    document.title = "LMS - Library"
    return (
        <>
            <div className="d-flex flex-column" id="content-wrapper">

                <div id="content">
                    <>
                        <TopNav />
                        <div className="container-fluid">
                            <div className="card shadow">
                                <div className="card-header text-center py-3">
                                    <h3 className="text-primary m-0 fw-bold">Late Fines Imposed (Total : ₹ {totalFine})</h3>
                                </div>
                                <div className="card-body" style={{ maxHeight: '68.8vh' }}>
                                    <ScrollPanel style={{ width: '100%', height: '55vh', marginBottom: '5vh' }} >
                                        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                            <table className="table my-0" style={styles.table} id="dataTable">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">S.No</th>
                                                        <th className="text-center">Fine Date</th>
                                                        <th className="text-center">Fine for Book</th>
                                                        <th className="text-center">Book code</th>
                                                        <th className="text-center">Fine Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        fines.map((fine, i)=>{
                                                            return (
                                                                <FineTableRow 
                                                                    index={i} 
                                                                    date={fine.date} 
                                                                    amount={fine.fine} 
                                                                    code={fine.bookCode}
                                                                    book={fine.bookName} 
                                                                />
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                                <tfoot>
                                                    <tr></tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </ScrollPanel>
                                    {/*<div className="row">
                                        <div className="col-md-6 align-self-center">
                                            <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">
                                                Showing {((currentPage - 1) * PAGE_SIZE) + 1} to {Math.min(currentPage * PAGE_SIZE, allBooks.length)} of {allBooks.length} books
                                            </p>
                                        </div>
                                         <div className="col-md-6">
                                            <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                                                <ul className="pagination" style={{ position: 'relative', bottom: 0 }}>
                                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                        <Link className="page-link" aria-label="Previous" to="#" onClick={() => handlePageChange(currentPage - 1)}>
                                                            <span aria-hidden="true">«</span>
                                                        </Link>
                                                    </li>
                                                    {pages
                                                        .map((_, i) => (
                                                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                                <Link className="page-link" onClick={() => handlePageChange(i + 1)}>
                                                                    {i + 1}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                        <Link className="page-link" aria-label="Next" to="#" onClick={() => handlePageChange(currentPage + 1)}>
                                                            <span aria-hidden="true">»</span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div> 

                                    </div>*/}
                                </div>
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </>
    );
}

export default Fine;
