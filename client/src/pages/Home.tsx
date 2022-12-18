import { ethers } from "ethers";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTransactionContext } from "../contexts/transaction";

export default function Home() {
  const  navigate = useNavigate();
  const { address, connect, transfer, getTransactions, getTransactionCount } = useTransactionContext();
  const [form, setForm] = useState({
    payee: '',
    amount: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (fieldName:string,e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    console.log(form);
    setIsLoading(true);
    await transfer({ ...form, amount:  ethers.utils.parseEther(form.amount)});
    setForm({ payee: '', amount: '', message: ''})
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen h-full bg-gradient-to-br from-slate-900 to-gray-900 to flex flex-col items-center justify-center px-[10em] space-y-10">
      <h1 className="text-4xl font-bold text-white">Ethers Pay</h1>
      <h3 className="text-2xl font-bold text-white">Fast. Convenient. Reliable.</h3>
      {address === undefined  && <button onClick={()=>connect()}>Connect Wallet</button> }
      <div className="w-full">
        <form onSubmit={handleSubmit} className='flex flex-col mb-3'>
          <label className="text-xl text-white font-semibold mb-1">Payee Address</label>
          <input onChange={(e) => handleFormChange('payee',e)}  className='border-gray-700 focus:ring-gray-600 border rounded-lg p-2 bg-gray-700 text-white placeholder:text-white' placeholder="hello"/>
          <label className="text-xl text-white font-semibold mt-2 mb-1">Transfer Amount</label>
          <input onChange={(e) => handleFormChange('amount',e)} className='border-gray-700 focus:ring-gray-600  border rounded-lg p-2 bg-gray-700 text-white' />
          <label className="text-xl text-white font-semibold mt-2  mb-1">Message</label>
          <textarea onChange={(e) => handleFormChange('message',e)} className='border-gray-700 focus:ring-gray-600  border rounded-lg p-2 bg-gray-700 text-white'/>
          <div className="flex flex-row items-center justify-center space-x-4">
            <button type='submit' className='p-2 bg-blue-500 w-[10%] mt-2 rounded-lg text-white font-semibold'>Send</button>
            <button className='p-2 bg-blue-500 w-[10%] mt-2 rounded-lg text-white font-semibold' onClick={()=>navigate('/stats')}>View Transactions</button>
          </div>
        </form>
      </div>
      { isLoading && <p className="text-white font-semibold text-xl">Loading...</p> }
    </div>
  );
}
