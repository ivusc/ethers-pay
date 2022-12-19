import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useTransactionContext } from '../contexts/transaction';

const Transactions = () => {
  const { getTransactions, getTransactionCount, address } = useTransactionContext();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [noOfTransactions, setNoOfTransactions] = useState<Number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    displayTransactions();
  }, [])

  const displayTransactions = async () => {
    const transactions = await getTransactions();
    const noOfTransactions = await getTransactionCount();
    setTransactions(transactions);
    setNoOfTransactions(noOfTransactions);
    setIsLoading(false);
  }
  
  return (
    <div className='min-h-screen h-full bg-gradient-to-br pb-8 pt-8 from-slate-900 to-gray-900 flex flex-col items-center lg:justify-center justify-start lg:px-[10em] px-[2em] space-y-10 w-full'>
      <h1 className="lg:text-4xl font-bold text-white text-lg font-chivo">View All Transactions</h1>
      <h3 className="lg:text-2xl font-semibold text-white text-base font-chivo"><>Signed in as: { address }</></h3>
      <h3 className="lg:text-2xl font-semibold text-white text-base font-chivo"><>Contract Address: 0xcB37553c8810742f5CB1872fE9D553e21483B5e0</></h3>
      {isLoading ? <Loader/> : (
        <>
          <h3 className="text-2xl font-bold text-white font-chivo"><>Total Transactions: {noOfTransactions} </></h3>
          <div className='rounded-lg border-2 border-gray-600 overflow-x-auto relative'>
            <table className='table-fixed max-sm:w-[700%] p-2 select-none'>
              <thead className='border-b-2 uppercase border-gray-600 text-white'>
                <tr className='text-left lg:text-center font-gothic'>
                  <th scope="col" className="py-3 px-6">Transaction</th>
                  <th scope="col" className="py-3 px-6">Sender</th>
                  <th scope="col" className="py-3 px-6">Receiver</th>
                  <th scope="col" className="py-3 px-6">Amount (ETH)</th>
                  <th scope="col" className="py-3 px-6">Message</th>
                  <th scope="col" className="py-3 px-6">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction,i) => (
                  <tr key={i} className='text-gray-300 p-2 font-gothic'>
                    <td className='font-bold text-start lg:text-center'>{transaction.id + 1}</td>
                    <td className='p-3 text-start lg:text-center'>{transaction.sender}</td>
                    <td className='p-3 text-start lg:text-center'>{transaction.receiver}</td>
                    <td className='p-3 text-start lg:text-center'>{transaction.amount}</td>
                    <td className='p-3 text-start lg:text-center'>{transaction.message}</td>
                    <td className='p-3 text-start lg:text-center'>{transaction.dateTime.toDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row items-center justify-center space-x-4 w-full">
            <button className='p-2 bg-blue-500 lg:w-[10%] w-full mt-2 rounded-lg text-white font-semibold' onClick={()=>navigate('/')}>Home</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Transactions