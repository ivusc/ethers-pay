import React, { useContext, createContext } from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from "@thirdweb-dev/react";
import{ ethers } from 'ethers';
import { SmartContract } from "@thirdweb-dev/sdk";

interface ITransactionContext {
  connect: () => Promise<{
    data?: any | undefined;
      error?: Error | undefined;
  } | {
      error: Error;
  }>;
  address: string | undefined;
  contract: SmartContract<ethers.BaseContract> | undefined;
  getTransactions: () => Promise<any[]>;
  getTransactionCount: () => Promise<number>;
  transfer: (form: any) => Promise<void>;
}

const TransactionContext = createContext({} as ITransactionContext);

export const TransactionContextProvider = ({ children } : { children: React.ReactNode }) => {
  const { contract } = useContract("0xcB37553c8810742f5CB1872fE9D553e21483B5e0");
  
  const { mutateAsync: transferEthers } = useContractWrite(contract, "transferEthers");

  const address = useAddress();
  const connect = useMetamask();

  const getTransactions = async () => {
    const transactions : any[] = await contract?.call('getTransactions');
    console.log(transactions);
    const parsedTransactions : ITransaction[] = transactions.map((transaction:any, i: number) => ({
      sender: transaction.payer,
      receiver: transaction.payee,
      amount: Number(ethers.utils.formatEther(transaction.amount.toString())),
      message: transaction.message,
      dateTime: new Date(transaction.datetime.toNumber() * 1000),
      id: i,
    }))
    console.log(parsedTransactions)
    return parsedTransactions;
  }
  
  const transfer = async (form:any) => {
    try {
      const data = await transferEthers([ form.payee, form.message, { value: form.amount } ]);
      return data;
    } catch (error) {
      alert(error);
    }
  }

  const getTransactionCount = async () => {
    const transactionCount = await contract?.call('getTransactionCount');
    console.log(transactionCount.toNumber());

    return Number(transactionCount.toNumber());
  }

  return (
    <TransactionContext.Provider value={{
      connect,
      address,
      contract,
      transfer,
      getTransactions,
      getTransactionCount
    }}>
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => useContext(TransactionContext)