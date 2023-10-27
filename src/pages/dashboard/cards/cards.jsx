import React from "react";

const Card1 = () => {
  return (
    <div className="my-2 mx-4 flex flex-col border rounded-lg p-3">
      <h1>Unassigned Candidates</h1>
      <div className="flex justify-center mt-8">
        <h1>56</h1>
      </div>
    </div>
  );
};

const Card2 = () => {
  return (
    <div className="my-2 mx-4 flex flex-col border rounded-lg p-3">
      <h1>Candidates Assigned to you</h1>
      <div className="flex flex-col mt-8">
        <h2>Today : 34</h2>
        <h2>This Week : 34</h2>
        <h2>This Month : 34</h2>
        <h2>Total : 34</h2>
      </div>
    </div>
  );
};

const Card3 = () => {
  return (
    <div className="my-2 mx-4 flex flex-col border rounded-lg p-3">
      <h1>Breakdown by Stages</h1>
      <div className="flex justify-between gap-6">
        <div className="flex flex-col mt-8">
          <h2>Assigned : 34</h2>
          <h2>Selected : 34</h2>
          <h2>Offered : 34</h2>
        </div>
        <div className="flex flex-col mt-8">
          <h2>Joined : 34</h2>
          <h2>Period Completed : 34</h2>
          <h2>Archived : 34</h2>
        </div>
      </div>
    </div>
  );
};

export { Card1, Card2, Card3 };
