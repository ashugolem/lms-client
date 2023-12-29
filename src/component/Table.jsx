import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TopNav from './TopNav/TopNav';
import Book from './BookList/Book';
import { useSelector } from 'react-redux';
import Lottie from 'lottie-react';
import animationData from '../../src/assets/Loading/Airplane.json'


function Table() {
    const [search, setSearch] = useState('')
    const role = useSelector((state) => state.setLog.role)
    const styles = {
        table: {
            padding: '0px',
        },
        tableHeader: {
            paddingRight: '0px',
        },
    };
    const [loading, setLoading] = useState(true)
    const initials = []
    const [allBooks, setAllBooks] = useState(initials)
    const [PAGE_SIZE, setPAGE_SIZE] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    // Pagination Logic
    const [totalPages, setTotalPage] = useState(Math.ceil(allBooks.length / PAGE_SIZE));
    const paginatedBooks = allBooks.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getBooks = async () => {
        try {
            const response = await fetch(`http://localhost:5000/book/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setAllBooks(json);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getBooks();
    }, [])
    return (
        <>
            <div className="d-flex flex-column" id="content-wrapper">

                <div id="content">
                    {
                        loading ? (
                            // Display Lottie animation while loading
                            <div className="container" style={{zIndex:'99999', width: '60vw', height: '50vh' }}>
                                <Lottie animationData={animationData} loop={true} width={'120vw'} height={'100vh'} />
                            </div>
                        ) :

                            <>
                                <TopNav />
                                <div className="container-fluid">
                                    <h3 className="text-dark mb-4">Books - Library</h3>
                                    <div className="card shadow">
                                        <div className="card-header py-3">
                                            <p className="text-primary m-0 fw-bold">Books Info</p>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6 text-nowrap">
                                                    <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable">
                                                        <label className="form-label">Show&nbsp;
                                                            <select name='totalPage' onChange={(e) => setPAGE_SIZE(e.target.value)} className="d-inline-block form-select form-select-sm" defaultValue="10">
                                                                <option value="10">10</option>
                                                                <option value="15">15</option>
                                                                <option value="25">25</option>
                                                                <option value="50">50</option>
                                                            </select>&nbsp;
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="text-md-end dataTables_filter" id="dataTable_filter">
                                                        <label className="form-label">
                                                            <input
                                                                type="search"
                                                                className="form-control form-control-sm" aria-controls="dataTable"
                                                                name='search' placeholder="Search"
                                                                onChange={(e) => setSearch(e.target.value)}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                                <table className="table my-0" style={styles.table} id="dataTable">
                                                    <thead>
                                                        <tr>
                                                            <th>Code</th>
                                                            <th>Title</th>
                                                            <th>Author</th>
                                                            <th className="text-center">Publishion</th>
                                                            <th className="text-center">Self No.</th>
                                                            {(role === "Admin" || role === "Teacher") &&
                                                                <>
                                                                    <th className="text-center">ISBN</th>
                                                                    <th className="text-center">Price</th>
                                                                    <th className="text-center" style={styles.tableHeader}>Stock Available</th>
                                                                    <th className="text-center">Total Stock</th>
                                                                    <th className="text-center">Registered On</th>
                                                                </>
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            paginatedBooks.map((Boook, index) => {
                                                                return (
                                                                    <Book title={Boook.title}
                                                                        key={Boook._id}
                                                                        _id={Boook._id}
                                                                        code={Boook.code}
                                                                        index={index}
                                                                        author={Boook.author}
                                                                        isbn={Boook.isbn}
                                                                        subject={Boook.subject}
                                                                        isAvailable={Boook.isAvailable}
                                                                        total={Boook.total}
                                                                        stock={Boook.stock}
                                                                        price={Boook.price}
                                                                        selfNo={Boook.selfNo}
                                                                        publishedOn={Boook.publishedOn}
                                                                        registeredAt={Boook.registeredAT} />)
                                                            })
                                                        }
                                                    </tbody>
                                                    <tfoot>
                                                        <tr></tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 align-self-center">
                                                    <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">
                                                        Showing {((currentPage - 1) * PAGE_SIZE) + 1} to {Math.min(currentPage * PAGE_SIZE, allBooks.length)} of {allBooks.length} books
                                                    </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                                                        <ul className="pagination">
                                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                                <Link className="page-link" aria-label="Previous" to="#" onClick={() => handlePageChange(currentPage - 1)}>
                                                                    <span aria-hidden="true">«</span>
                                                                </Link>
                                                            </li>
                                                            {Array.from({ length: totalPages }, (_, i) => (
                                                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                                    <Link className="page-link" to="#" onClick={() => handlePageChange(i + 1)}>
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

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    );
}

export default Table;
