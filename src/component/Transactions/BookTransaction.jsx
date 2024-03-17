import React, { useEffect, useState } from 'react'
import getTransaction from './TransactionAPI'
import { OrderList } from 'primereact/orderlist';
import Lottie from 'lottie-react';
import animationData from '../../assets/Loading/Airplane.json'
import TopNav from '../TopNav/TopNav';
import moment from 'moment/moment';
export default function BookTransaction() {

    const [Transactions, setTransactions] = useState([]); // Array to store the transactions made by the user
    const  [loading, setLoading] = useState(false)
    const getTransactions = async () => {
        setLoading(true)
        const response = await getTransaction();
        setLoading(false)
        setTransactions(response);
    }

    useEffect(() => {
        getTransactions();
    }, []); // Empty dependency array means this effect will run only once when the component mounts

    const itemTemplate = (transaction) => {
        return (
            <div className="d-flex align-items-center  p-2 ">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`/img/illustrations/book.png`} width={100} alt="Book" />
                <div className="flex-1 flex flex-column w-100 px-3 ">
                    <h4 className="fw-bold text-primary " >{transaction.bookName}</h4>
                    <div className="flex align-items-center gap-2 ">
                        <i class="fa-solid fa-calendar-days text-sm "></i>
                        <span className='px-2'>Issue Date - {moment(transaction.date).format('DD-MM-YYYY')}</span>
                    </div>
                </div>
                <span className="font-bold text-end w-100 fw-bold align-middle">Status - {transaction.isReturned ? 'Returned' : "Borrowed"}</span>
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
                            <div className="container-fluid">
                                <div className="card xl:flex xl:justify-content-center">
                                    <OrderList dataKey="id" value={Transactions} onChange={(e) => setTransactions(e.value)} itemTemplate={itemTemplate} header="Book Transactions"></OrderList>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            }
        </>
    );
}
