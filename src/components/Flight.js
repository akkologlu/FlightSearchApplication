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
      <button className="relative">
        <div
          id="card"
          className="flex min-h-24 space-x-12 border border-gray-200 w-full p-2 items-center justify-between mx-24 px-12 shadow-lg rounded-xl"
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
        <MdExpandMore className="absolute -right-[85px] top-9" />
      </button>
    );
  };

  return (
    <div className="flex font-roboto text-xl text-gray-600 ">
      {filterFlights ? (
        <div className="flex flex-col">
          <h1>GİDİŞ</h1>
          {filterFlights[0].map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
          <h1>DÖNÜŞ</h1>
          {filterFlights[1].map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      ) : (
        <FlightCard flight={flight} />
      )}
    </div>
  );
}

export default Flight;
