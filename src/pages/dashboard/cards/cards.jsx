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
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
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

const Card2 = () => {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex justify-between gap-6 items-center">
        <h2 className="font-semibold text-slate-800">
          Candidates Assigned to you
        </h2>
        {/* <div className="space-x-2">
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
        </div> */}
      </header>
      <div className="flex flex-col justify-center w-full h-full p-4">
        <h1>Today : 34</h1>
        <h1>This Week : 34</h1>
        <h1>This Month : 34</h1>
        <h1>Total : 34</h1>
      </div>
    </div>
  );
};

const Card3 = () => {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex justify-between gap-6 items-center">
        <h2 className="font-semibold text-slate-800">BreakDown Stages</h2>
        {/* <div className="space-x-2">
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
        </div> */}
      </header>
      <div className="flex flex-col justify-center w-full h-full p-4">
        <div className="flex justify-between gap-6">
          <div className="flex flex-col">
            <h2>Assigned : 34</h2>
            <h2>Selected : 34</h2>
            <h2>Offered : 34</h2>
          </div>
          <div className="flex flex-col">
            <h2>Joined : 34</h2>
            <h2>Period Completed : 34</h2>
            <h2>Archived : 34</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Card1, Card2, Card3 };
