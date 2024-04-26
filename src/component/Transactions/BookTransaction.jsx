import React, { useEffect, useState } from 'react'
import getTransaction from './TransactionAPI'
import Lottie from 'lottie-react';
import animationData from '../../assets/Loading/Airplane.json'
import TopNav from '../TopNav/TopNav';
import moment from 'moment/moment';
import { ScrollPanel } from 'primereact/scrollpanel';


export default function BookTransaction() {

    const [Transactions, setTransactions] = useState([]); // Array to store the transactions made by the user
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)
    const getTransactions = async () => {
        setLoading(true)
        try {
            const response = await getTransaction();
            console.log(response)
            if (response.success) {
                setTransactions(response.transactions);
                setCount(response.count)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTransactions();
    }, []);

    const itemTemplate = (transaction) => {
        return (
            <div className="d-flex align-items-center  p-2 ">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`/img/illustrations/book.png`} width={100} alt="Book" />
                <div className="flex-1 flex flex-column w-100 px-3 ">
                    <h4 className="fw-bold text-primary " >{transaction.bookName}</h4>
                    <div className="flex align-items-center gap-2 ">
                        <i className="fa-solid fa-calendar-days text-sm "></i>
                        <span className='px-2'>Requested On - {moment(transaction.time).format('DD-MM-YYYY')}</span>
                    </div>
                </div>
                {transaction.issueDate 
                ? 
                <div className="flex align-items-center text-end gap-2 w-100">
                        <i className="fa-solid text-success fa-calendar-days text-sm "></i>
                    <span className='px-2 text-success'>Issue Date - {moment(transaction.issueDate).format('DD-MM-YYYY')}</span>
                </div>
                :
                <div className="flex align-items-center text-end gap-2 w-100">
                    <span className='px-2 text-warning'>Request sent to Admin</span>
                </div>

            }
                <div className="flex align-items-center text-end gap-2 w-100">
                    <span className="font-bold text-end w-100 fw-bold align-middle">Status - {transaction.issueDate ? "Issued" : (transaction.isReturned ? 'Returned' : "Pending")}</span>
                </div>
            </div>
        );
    };
    const styles = {
        animation: {
            height: '100dvh',
            width: '100vw',
        }
    };
    document.title = "LMS - Transactions"

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
                            {!(count===0) && <h2 className="text-primary text-center fw-bold">Book Request Records</h2>}
                            <div className="container-fluid h-100 mt-5">
                                {count !== 0
                                    ?
                                    <div className="card xl:flex xl:justify-content-center">
                                        {/* <OrderList dataKey="id" value={Transactions} onChange={(e) => setTransactions(e.value)} itemTemplate={itemTemplate} header="Book Transactions"></OrderList> */}
                                        <ScrollPanel style={{ width: '100%', height: '100%' }} >
                                            {Transactions.map((transaction) => {
                                                return (itemTemplate(transaction))
                                            })}
                                        </ScrollPanel>
                                    </div>
                                    :
                                    <h2 className="text-primary text-center fw-bold">No Transaction Records</h2>
                                }
                            </div>
                        </>
                    </div>
                </div>
            }
        </>
    );
}
