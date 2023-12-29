import React from "react";
import anadolujet from "../assets/anadolujet.png";
import pegasus from "../assets/pegasus.png";
import sunexpress from "../assets/sunexpress.png";
import turkishairlines from "../assets/turkishAirlines.png";
import { MdExpandMore } from "react-icons/md";

function Flight({ filterFlights, flight }) {
  const getLogo = (airline) => {
    switch (airline) {
      case "Anadolu Jet":
        return anadolujet;
      case "Pegasus":
        return pegasus;
      case "Sun Express":
        return sunexpress;
      case "Turkish Airlines":
        return turkishairlines;
      default:
        return null;
    }
  };

  const FlightCard = ({ flight }) => {
    const logo = getLogo(flight.airline);
    return (
      <button className="relative w-full">
        <div
          id="card"
          className="flex min-h-24 space-x-12 border border-gray-200 w-full p-2 items-center justify-between px-12 shadow-lg rounded-xl"
        >
          <div id="logo">
            {logo && <img src={logo} alt="" className="w-16" />}
          </div>
          <div id="path" className="flex ">
            <p>
              {flight.departureAirport} - {flight.arrivalAirport}
            </p>
          </div>
          <div id="duration" className="flex flex-col items-center">
            <p>
              {flight.departureTime
                .split("T")[1]
                .split(":")
                .slice(0, 2)
                .join(":")}{" "}
              -{" "}
              {flight.arrivalTime
                .split("T")[1]
                .split(":")
                .slice(0, 2)
                .join(":")}
            </p>
            <p className="text-sm text-gray-500">{flight.duration}</p>
          </div>
          <div>
            <p>{flight.price}$</p>
          </div>
        </div>
        <MdExpandMore className="absolute right-3 top-10" />
      </button>
    );
  };
  console.log(filterFlights);
  return (
    <div className="flex w-full font-roboto text-xl text-gray-600">
      <div className="flex flex-col w-full space-y-2">
        <h1>
          {filterFlights[0][0].departureTime
            .split("T")[0]
            .split("-")
            .slice(0, 3)
            .reverse()
            .join(".")}
        </h1>
        {filterFlights[0].map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
        {filterFlights[1] && (
          <>
            <h1>
              {filterFlights[1][0].departureTime
                .split("T")[0]
                .split("-")
                .slice(0, 3)
                .reverse()
                .join(".")}
            </h1>
            {filterFlights[1].map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Flight;
