import React from "react";

//users should be an array of objects
function StandingsDisplay({ users }) {
  if (users === []) return <div>NO USERS TO RANK</div>;

  const handleMaping = (item, index) => {
    if (typeof item == "object") {
      return <div key={item.username}>{`${index + 1})   ${item.username}: $${item.currentBalance}`}</div>;
    }
    return <div>{item}</div>;
  };

  return <div>{users.map((item, index) => handleMaping(item,index))}</div>;
}

export default StandingsDisplay;
