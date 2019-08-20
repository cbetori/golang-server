import React from "react";

function Funds(props) {
  return (
    <div>
    <p className="App-intro">{props.funds.map((row,index) => (
        <li key={index}>  {row.Fund_ID}, {row.Feeder} </li>
      ))}</p>
    </div>
  );
}
export default Funds;