import React, { useState } from "react";
import anadolujet from "../assets/anadolujet.png";
import pegasus from "../assets/pegasus.png";
import sunexpress from "../assets/sunexpress.png";
import turkishairlines from "../assets/turkishAirlines.png";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { TbLuggage } from "react-icons/tb";
import { BsFillLuggageFill } from "react-icons/bs";
import { FaGamepad } from "react-icons/fa";
import { GrLounge } from "react-icons/gr";
import { MdBrunchDining } from "react-icons/md";
import { RiVipLine } from "react-icons/ri";
import { MdOutlineEventSeat } from "react-icons/md";
import { MdOutlinePrivacyTip, MdOutlineDining } from "react-icons/md";
import { PiTelevision } from "react-icons/pi";
import { FaCarRear } from "react-icons/fa6";
import { RiVipCrown2Line } from "react-icons/ri";
import { RiLuggageCartLine } from "react-icons/ri";

function Flight({ filterFlights }) {
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
    const [detail, setDetail] = useState(false);
    const logo = getLogo(flight.airline);
    return (
      <div className="flex flex-col items-center">
        <button
          onClick={() => setDetail(!detail)}
          className="relative md:w-full"
        >
          <div
            id="card"
            className="flex md:min-h-24 md:space-x-12 border border-gray-200 md:w-full w-72 md:p-2 items-center justify-evenly md:justify-between md:px-12 shadow-lg rounded-xl text-sm md:text-xl"
          >
            <div id="logo">
              {logo && <img src={logo} alt="" className="md:w-16 w-8" />}
            </div>
            <div id="path" className="flex ">
              <p className="hidden md:block">
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
          {detail ? (
            <MdExpandLess className="absolute md:right-3 md:top-10 right-1 top-3" />
          ) : (
            <MdExpandMore className="absolute md:right-3 md:top-10 right-1 top-3" />
          )}
        </button>
        {detail && (
          <div className="flex md:flex-row flex-col my-2 md:text-base text-xs md:w-full justify-around text-gray-600">
            <div className="detailCard">
              <h1 className="detailh1">Economy</h1>
              <div>
                <div className="detailItem">
                  <TbLuggage className="text-blue-900" />
                  <p>8kg Cabin Baggage</p>
                </div>
                <div className="detailItem">
                  <BsFillLuggageFill className="text-blue-900" />
                  <p>20kg Checked Baggage</p>
                </div>
                <div className="detailItem">
                  <FaGamepad className="text-blue-900" />
                  <p>In-flight Entertainment</p>
                </div>
              </div>
              <div className="detailPrice">
                <button>{flight.price}$</button>
              </div>
            </div>
            <div className="detailCard">
              <h1 className="detailh1">Business</h1>
              <div>
                <div className="detailItem">
                  <TbLuggage className="text-blue-900" />
                  <p>30kg Checked Baggage</p>
                </div>
                <div className="detailItem">
                  <MdOutlineEventSeat className="text-blue-900" />
                  <p>Luxurious Seating</p>
                </div>
                <div className="detailItem">
                  <RiVipLine className="text-blue-900" />
                  <p>Priority Services</p>
                </div>
                <div className="detailItem">
                  <MdOutlineDining className="text-blue-900" />
                  <p>Gourmet Dining Experience</p>
                </div>
                <div className="detailItem">
                  <GrLounge className="text-blue-900" />
                  <p>Lounge Access</p>
                </div>
              </div>
              <div className="detailPrice">
                <button>{flight.price * 1.5}$</button>
              </div>
            </div>
            <div className="detailCard">
              <h1 className="detailh1">First Class</h1>
              <div>
                <div className="detailItem">
                  <MdOutlinePrivacyTip className="text-blue-900" />
                  <p>Ultimate Privacy & Comfort</p>
                </div>
                <div className="detailItem">
                  <MdBrunchDining className="text-blue-900" />
                  <p>Fine Dining at 30,000 Feet</p>
                </div>
                <div className="detailItem">
                  <PiTelevision className="text-blue-900" />
                  <p>On-demand Entertainment</p>
                </div>
                <div className="detailItem">
                  <FaCarRear className="text-blue-900" />
                  <p>Complimentary Limousine Service</p>
                </div>
                <div className="detailItem">
                  <RiVipCrown2Line className="text-blue-900" />
                  <p>Exclusive Lounge Access</p>
                </div>
                <div className="detailItem">
                  <RiLuggageCartLine className="text-blue-900" />
                  <p>Generous Baggage Allowance</p>
                </div>
              </div>
              <div className="detailPrice">
                <button>{flight.price * 3}$</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="flex w-full font-roboto text-xl text-gray-600">
      <div className="flex flex-col w-full space-y-2">
        <h1 className="text-center lg:text-start lg:text-3xl text-base">
          {filterFlights[0][0].departureTime
            .split("T")[0]
            .split("-")
            .slice(0, 3)
            .reverse()
            .join(".")}{" "}
        </h1>
        {filterFlights[0].map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
        {filterFlights[1] && (
          <>
            <h1 className="text-center lg:text-start lg:text-3xl text-base">
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
