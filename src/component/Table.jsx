import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TopNav from './TopNav/TopNav';
import Book from './BookList/Book';
import { useSelector } from 'react-redux';
import Lottie from 'lottie-react';
import animationData from '../assets/Loading/Airplane.json'
import { ScrollPanel } from 'primereact/scrollpanel';
import { InputText } from 'primereact/inputtext';

function Table() {
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [allBooks, setAllBooks] = useState([])
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(20)
    const [lazyLoadingConstant, setLazyLoadingConstant] = useState(20)
    const [totalBooksCount,  setTotalBooksCount] = useState(-1)
    const [currentlyLoaded,  setCurrentlyLoaded] = useState(0)
    const role = useSelector((state) => state.setLog.role)
    const [PAGE_SIZE, setPAGE_SIZE] = useState(5);
    const [pages, setPages] = useState([])
    const [totalPages, setTotalPage] = useState(0);

    const getBooks = async (start, end) => {
        try {
            setLoading(true)
            
            console.log("Calling API with start-", start, "end-", end)
            const response = await fetch(`${import.meta.env.VITE_HOST}/book/${start}/${end}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setAllBooks(allBooks.concat(json.books));     
            setTotalBooksCount(json.totalBooks)       
            const totalPage = Math.ceil(Number(json.totalBooks) / PAGE_SIZE)
            setTotalPage(totalPage)
            setPages(Array.from({ length: totalPage }))
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getBooks(start, end);
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
    // Pagination Logic
    const [currentPage, setCurrentPage] = useState(1);
    const paginatedBooks = allBooks.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );
    const handleLazyLoading = async () => {
        const newStart = end;
        const newEnd = end + lazyLoadingConstant;

        console.log("Lazy Loading Called start-", newStart, "end-", newEnd);

        setStart(newStart);
        setEnd(newEnd);

        await getBooks(newStart, newEnd);
        setCurrentlyLoaded(newEnd);
    };

    const handlePageChange = async (page) => {
        setCurrentPage(page);
        setStart(start +  PAGE_SIZE);
        const totalPagePerLoad = Math.ceil(Number(allBooks.length) / PAGE_SIZE)
        console.log(totalPages, totalPagePerLoad, currentPage)
        if ((totalPagePerLoad === currentPage+1) && currentlyLoaded <= end && end<totalBooksCount ) {
            await handleLazyLoading();
        }
    };

    return (
        <>
            {loading
                ?
                <div className="container d-flex justify-content-center" style={styles.animation}>
                    <Lottie animationData={animationData} loop={true} style={{ width: '250px' }} />
                </div>

                :
                <div className="d-flex flex-column" id="content-wrapper">

                    <div id="content">
                        <>
                            <TopNav />
                            <div className="container-fluid">
                                <div className="card shadow">
                                    <div className="card-header text-center py-3">
                                        <h3 className="text-primary m-0 fw-bold">Library</h3>
                                    </div>
                                    <div className="card-body" style={{ maxHeight: '68.8vh' }}>
                                        <div className="row">
                                            <div className="col-md-10 d-flex">
                                                <div className="text-md-end dataTables_filter" id="dataTable_filter">
                                                    <label className="form-label">
                                                        <span className="p-input-icon-left" >
                                                            <i className="fa fa-search" />
                                                            <InputText
                                                                className="p-inputtext-sm"
                                                                type='search'
                                                                name='search' 
                                                                placeholder="Search"
                                                                onChange={(e) => {
                                                                    setTimeout(async () => {
                                                                        setSearch(e.target.value)
                                                                        await getBooks(0, totalBooksCount)
                                                                    }, 500);
                                                                }}
                                                            />
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            {
                                                search === '' &&
                                                <div className="col-md-2 text-nowrap">
                                                    <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable">
                                                        <label className="form-label">Show&nbsp;
                                                            <select name='totalPage' onChange={ (e) => {
                                                                setPAGE_SIZE(e.target.value)
                                                                setPages(Array.from({ length: Math.ceil(allBooks.length / e.target.value) }))

                                                            }} className="d-inline-block form-select form-select-sm" defaultValue="5">
                                                                <option value="5">5</option>
                                                                <option value="10">10</option>
                                                                <option value="15">15</option>
                                                                <option value="25">25</option>
                                                                <option value="50">50</option>
                                                            </select>&nbsp;
                                                        </label>
                                                    </div>
                                                </div>}

                                        </div>
                                        <ScrollPanel style={{ width: '100%', height: '55vh', marginBottom: '5vh' }} >


                                            <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                                <table className="table my-0" style={styles.table} id="dataTable">
                                                    <thead>
                                                        <tr>
                                                            <th>Code</th>
                                                            <th>Title</th>
                                                            <th>Author</th>
                                                            <th className="text-center">Publishion</th>
                                                            <th className="text-center">Self No.</th>
                                                            {role === "Student" && <th className="text-center">Lent</th>}
                                                            {(role === "Admin" || role === "Teacher") &&
                                                                <>
                                                                    <th className="text-center">ISBN</th>
                                                                    <th className="text-center">Price</th>
                                                                    <th className="text-center" style={styles.tableHeader}>Stock</th>
                                                                </>
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            search === '' ?
                                                                paginatedBooks.map((book) => {
                                                                    return (
                                                                        <Book title={book.title}
                                                                            key={book._id}
                                                                            _id={book._id}
                                                                            code={book.code}
                                                                            author={book.author}
                                                                            isbn={book.isbn}
                                                                            subject={book.subject}
                                                                            isAvailable={book.isAvailable}
                                                                            total={book.total}
                                                                            stock={book.stock}
                                                                            price={book.price}
                                                                            selfNo={book.selfNo}
                                                                            publishedOn={book.publishedOn}
                                                                            registeredAt={book.registeredAT} />)
                                                                })
                                                                :
                                                                allBooks.filter(
                                                                    (item) => {
                                                                        return (
                                                                            item.title.toLowerCase().includes(search.toLowerCase())
                                                                            || item.code.toString() === search
                                                                            || item.author.toLowerCase().includes(search.toLowerCase())
                                                                            || item.isbn.toLowerCase().includes(search.toLowerCase())
                                                                        )
                                                                    }
                                                                ).map((Boook, index) => {
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
                                        </ScrollPanel>
                                        <div className="row">
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

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            }
        </>
    );
}

export default Table;
