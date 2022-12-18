import { ethers } from "ethers";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/logo.svg';
import { useTransactionContext } from "../contexts/transaction";

export default function Home() {
  const  navigate = useNavigate();
  const { address, connect, transfer } = useTransactionContext();
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
    <div className="min-h-screen h-full bg-gradient-to-br from-slate-900 to-gray-900 to flex flex-col items-center justify-center lg:px-[10em] px-[2em] pb-8 space-y-10">
      <img className="lg:w-[300px] lg:h-[300px] w-[250px] h-[250px] object-cover" src={Logo} />
      <h1 className="text-4xl font-bold text-white font-chivo">Ethers Pay</h1>
      <h3 className="text-2xl font-bold text-white font-chivo">Fast. Convenient. Reliable.</h3>
      {address === undefined  ? 
        <button onClick={()=>{
          connect();
          navigate('/');
        }} className='p-2 bg-blue-500 w-[10%] mt-2 rounded-lg text-white font-semibold font-gothic'>Connect Wallet</button> 
        : (
          <div  className="w-full">
              <form onSubmit={handleSubmit} className='flex flex-col mb-3'>
                <label className="text-xl text-white font-semibold mb-1 font-gothic">Payee Address</label>
                <input onChange={(e) => handleFormChange('payee',e)}  className='border-gray-700 focus:ring-gray-600 border rounded-lg p-2 bg-gray-700 text-white placeholder:text-gray-500 font-gothic' placeholder="0x12345..."/>
                <label className="text-xl text-white font-semibold mt-2 mb-1 font-gothic">Transfer Amount (ETH)</label>
                <input onChange={(e) => handleFormChange('amount',e)} className='border-gray-700 focus:ring-gray-600  border rounded-lg p-2 bg-gray-700 text-white placeholder:text-gray-500 font-gothic' placeholder="0.1" />
                <label className="text-xl text-white font-semibold mt-2  mb-1 font-gothic">Message</label>
                <textarea onChange={(e) => handleFormChange('message',e)} className='border-gray-700 focus:ring-gray-600  border rounded-lg p-2 bg-gray-700 text-white placeholder:text-gray-500 font-gothic' placeholder="Write a message here to send with your ethereum."/>
                <div className="flex flex-row items-center justify-center space-x-4">
                  <button type='submit' className='p-2 bg-blue-500 lg:w-[10%] w-full lg:mt-2 mt-8 rounded-lg text-white font-semibold font-gothic'>Send</button>
                  <button className='p-2 bg-blue-500 lg:w-[10%] w-full lg:mt-2 mt-8 rounded-lg text-white font-semibold font-gothic' onClick={()=>navigate('/stats')}>View Transactions</button>
                </div>
              </form>
              { isLoading && <p className="text-white font-semibold text-xl">Loading...</p> }
          </div>
      )}
    </div>
  );
}
