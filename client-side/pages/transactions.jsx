import React, { useState, useEffect } from "react";
import Header from "@/components/Header.jsx";
import AddTransaction from "@/components/AddTransaction.jsx";
import { IoAddOutline } from "react-icons/io5";

const transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/transaction-history")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) =>
        console.error("Error fetching financial overview:", error)
      );
  }, [transactions]);
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <div className="flex justify-between items-center p-6">
          <h4 className="text-xl font-semibold">Transactions History</h4>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center bg-purple-800 hover:bg-purple-500 text-white rounded-lg p-2"
          >
           <IoAddOutline/> New Transaction
          </button>
        </div>
        <div className="p-4">
          <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
            <div className="my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
              <span>Sr No</span>
              <span className="sm:text-left text-right">Description</span>
              <span className="hidden md:grid">Amount</span>
              <span className="hidden sm:grid">Category</span>
              <span className="hidden sm:grid">Date</span>
            </div>
            <ul>
              {transactions.map((transaction, id) => (
                <li
                  key={id}
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
                >
                  <p className="text-gray-600 sm:text-left text-right">
                    {id + 1}
                  </p>
                  <p className="text-gray-600 sm:text-left text-right">
                    {transaction.description}
                  </p>
                  <p className="text-gray-600 sm:text-left text-right">
                    {transaction.amount}
                  </p>
                  <p className="text-gray-600 sm:text-left text-right">
                    {transaction.category}
                  </p>
                  <p className="text-gray-600 sm:text-left text-right">
                    {transaction.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <AddTransaction open={open} setOpen={setOpen} />
    </>
  );
};

export default transactions;
