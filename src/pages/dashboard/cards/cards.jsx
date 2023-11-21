import React, { useState } from "react";

const buttons = [
  {
    buttonText: "Monthly",
    filterText: "monthly",
  },
  {
    buttonText: "All time",
    filterText: "all_time",
  },
];

const Card1 = ({ isLoading }) => {
  // if (isLoading)
  //   return (
  //     <div className="h-[400px] col-span-full sm:col-span-6 xl:col-span-4 bg-slate-700 animate-pulse" />
  //   );
  const [filterBy, setFilterBy] = useState("monthly");
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200 h-40">
      <header className="px-5 py-4 border-b border-slate-100 flex justify-between gap-6 items-center">
        <h2 className="font-semibold text-slate-800">Unassigned Candidates</h2>
        <div className="space-x-2">
          {buttons.map((button, index) => (
            <button
              key={`${button.buttonText}_${index}`}
              className={`border ${
                filterBy === button.filterText && "border-primary-400"
              } text-sm px-3 py-1 rounded`}
              onClick={() => setFilterBy(button.filterText)}
            >
              {button.buttonText}
            </button>
          ))}
        </div>
      </header>
      <div className="flex justify-center items-center w-full h-full">
        <h1 className="text-3xl font-bold">34</h1>
      </div>
    </div>
  );
};

const Card2 = ({ funnelData }) => {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex justify-between gap-6 items-center">
        <h2 className="font-semibold text-slate-800">Breakdown by Stages</h2>
      </header>
      <div className="flex flex-col justify-center w-full h-full p-4">
        <div className="flex justify-between gap-6">
          <div className="flex flex-col">
            {funnelData
              .slice(0, Math.ceil(funnelData.length / 2))
              .map((data, index) => (
                <h2 key={index}>
                  {data.name} : {data.candidate_count}
                </h2>
              ))}
          </div>
          <div className="flex flex-col">
            {funnelData
              .slice(Math.ceil(funnelData.length / 2))
              .map((data, index) => (
                <h2 key={index}>
                  {data.name} : {data.candidate_count}
                </h2>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Card3 = ({ referData }) => {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200 h-40">
      <header className="px-5 py-4 border-b border-slate-100 flex justify-between gap-6 items-center">
        <h2 className="font-semibold text-slate-800">Total Referrals</h2>
      </header>
      <div className="flex justify-center items-center w-full h-full">
        <div className="space-x-2">
          <h1>Monthly : {referData?.monthly?.count}</h1>
          <h1>Weekly : {referData?.weekly?.count}</h1>
          <h1>Daily : {referData?.daily?.count}</h1>
        </div>
      </div>
    </div>
  );
};

const Card4 = ({ categoryData }) => {
  const bpoData = categoryData.BPO;
  const nonITData = categoryData.NonIT;
  const itData = categoryData.IT;
  console.log(bpoData,nonITData,itData)
  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200 h-40 w-40">
        <header className="px-5 py-4 border-b border-slate-100 flex justify-between gap-6 items-center">
          <h2 className="font-semibold text-slate-800">BPO</h2>
        </header>
        <div className="flex justify-center items-center w-full h-full">
          <div className="space-x-2">
            <h1>Monthly : {bpoData?.monthly?.count}</h1>
            <h1>Weekly : {bpoData?.weekly?.count}</h1>
            <h1>Daily : {bpoData?.daily?.count}</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200 h-40 w-40">
        <header className="px-5 py-4 border-b border-slate-100 flex justify-between gap-6 items-center">
          <h2 className="font-semibold text-slate-800">NON IT</h2>
        </header>
        <div className="flex justify-center items-center w-full h-full">
          <div className="space-x-2">
            <h1>Monthly : {nonITData?.monthly?.count}</h1>
            <h1>Weekly : {nonITData?.weekly?.count}</h1>
            <h1>Daily : {nonITData?.daily?.count}</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200 h-40 w-40">
        <header className="px-5 py-4 border-b border-slate-100 flex justify-between gap-6 items-center">
          <h2 className="font-semibold text-slate-800">IT</h2>
        </header>
        <div className="flex justify-center items-center w-full h-full">
          <div className="space-x-2">
            <h1>Monthly : {itData?.monthly?.count}</h1>
            <h1>Weekly : {itData?.weekly?.count}</h1>
            <h1>Daily : {itData?.daily?.count}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Card1, Card2, Card3, Card4 };
