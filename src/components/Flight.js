import React from "react";

function Flight({ flight }) {
  console.log(flight);
  return (
    <div className="flex space-x-3">
      <p>{flight.departureAirport}</p>
      <p>{flight.arrivalAirport}</p>
    </div>
  );
}

export default Flight;
