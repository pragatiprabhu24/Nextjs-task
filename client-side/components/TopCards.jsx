import React, { useState, useEffect } from "react";
import { MdOutlineAccountBalance } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";

const TopCards = () => {
  const [financeOverview, setFinanceOverview] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/financial-overview")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received:", data);
        setFinanceOverview(data);
      })
      .catch((error) =>
        console.error("Error fetching financial overview:", error)
      );
  }, [financeOverview]);

  return (
    <div className="grid lg:grid-cols-5 gap-4 p-4">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">₹ {financeOverview?.balance}</p>
          <p className="text-gray-600">Total Balance</p>
        </div>
        <p className="bg-green-200  flex justify-center items-center p-2 rounded-lg">
          <MdOutlineAccountBalance size={30} />
        </p>
      </div>
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">₹ {financeOverview?.income}</p>
          <p className="text-gray-600">Income</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
          <FaMoneyBillWave size={30} />
        </p>
      </div>
      <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">₹ {financeOverview?.expense}</p>
          <p className="text-gray-600">Expenses</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
          <GiExpense size={30} />
        </p>
      </div>
    </div>
  );
};

export default TopCards;
