import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/Form.css";
import { IoIosSwap } from "react-icons/io";
import { TiPlus, TiMinus } from "react-icons/ti";

function Form({ onFormSubmit, flightSearch }) {
  const [radioButton, setRadioButton] = useState(false);
  const [airports, setAirports] = useState([]);
  const [fromAirport, setFromAirport] = useState({
    city: "",
    code: "",
  });
  const [toAirport, setToAirport] = useState({
    city: "",
    code: "",
  });
  const [filteredFromAirports, setFilteredFromAirports] = useState([]);
  const [filteredToAirports, setFilteredToAirports] = useState([]);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [fromAirportError, setFromAirportError] = useState(false);
  const [toAirportError, setToAirportError] = useState(false);
  const [departureDateError, setDepartureDateError] = useState(false);
  const [returnDateError, setReturnDateError] = useState(false);

  useEffect(() => {
    axios
      .get("https://658c2164859b3491d3f58900.mockapi.io/airports")
      .then((response) => {
        setAirports(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filterAirports = (inputValue, setter) => {
    const filtered = airports.filter(
      (airport) =>
        airport.city.toLowerCase().includes(inputValue.toLowerCase()) ||
        airport.code.toLowerCase().includes(inputValue.toLowerCase())
    );
    setter(filtered);
  };

  const handleAirportChange = (event, isFrom) => {
    const value = event.target.value;
    if (isFrom) {
      setFromAirport(value);
      filterAirports(value, setFilteredFromAirports);
      setFromAirportError(false);
    } else {
      setToAirport(value);
      filterAirports(value, setFilteredToAirports);
      setToAirportError(false);
    }
  };

  const handleAirportClick = (airport, isFrom) => {
    if (isFrom) {
      setFromAirport({ city: airport.city, code: airport.code });
      setFilteredFromAirports([]);
      setFromAirportError(false);
    } else {
      setToAirport({ city: airport.city, code: airport.code });
      setFilteredToAirports([]);
      setToAirportError(false);
    }
  };

  const swapAirports = (e) => {
    e.preventDefault();
    setFromAirport(toAirport);
    setToAirport(fromAirport);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    let isValid = true;
    const fromAirportValid = airports.some(
      (airport) =>
        airport.city === fromAirport.city && airport.code === fromAirport.code
    );
    const toAirportValid = airports.some(
      (airport) =>
        airport.city === toAirport.city && airport.code === toAirport.code
    );
    // fromAirport kontrolü
    if (!fromAirportValid) {
      setFromAirportError(true);
      isValid = false;
    }

    if (!toAirportValid) {
      setToAirportError(true);
      isValid = false;
    }

    // departureDate kontrolü
    if (!departureDate) {
      setDepartureDateError(true);
      isValid = false;
    } else {
      setDepartureDateError(false);
    }

    // radioButton durumuna göre returnDate kontrolü
    if (!radioButton && !returnDate) {
      setReturnDateError(true);
      isValid = false;
    } else {
      setReturnDateError(false);
    }

    if (isValid) {
      onFormSubmit();
      flightSearch({
        fromAirport,
        toAirport,
        departureDate,
        returnDate: radioButton ? "" : returnDate,
        adults,
        children,
        infants,
      });
    }
  };

  const updatePassengers = (category, operation) => {
    switch (category) {
      case "adults":
        setAdults(
          operation === "increment" ? adults + 1 : Math.max(adults - 1, 0)
        );
        break;
      case "children":
        setChildren(
          operation === "increment" ? children + 1 : Math.max(children - 1, 0)
        );
        break;
      case "infants":
        setInfants(
          operation === "increment" ? infants + 1 : Math.max(infants - 1, 0)
        );
        break;
      default:
    }
  };
  return (
    <div>
      <div className="flex mt-12 lg:mt-0 lg:h-screen items-center justify-center font-roboto">
        <form className=" flex flex-col space-y-12 ">
          {/* Radio Buttons */}
          <div
            id="radioButtons"
            className="flex space-x-11 md:justify-start justify-center"
          >
            <div id="radio1 flex">
              <input
                type="radio"
                name="radioButton"
                value="OneWay"
                onChange={(e) => setRadioButton(true)}
                className="mr-2 "
              />
              <label className="radioLabel">One Way</label>
            </div>
            <div id="radio2">
              <input
                type="radio"
                name="radioButton"
                value="RoundTrip"
                onChange={(e) => setRadioButton(false)}
                checked={radioButton === false}
                className="mr-2"
              />
              <label className="radioLabel">Round Trip</label>
            </div>
          </div>
          {/* Airports Form */}
          <div
            id="airportForm"
            className="flex md:space-x-5 items-center  flex-col md:flex-row "
          >
            {/* From Airport */}
            <div className="relative flex flex-col">
              <div>
                <label className="font-bold text-blue-900">Flying from</label>
              </div>
              <div>
                <input
                  type="text"
                  value={fromAirport.city}
                  onChange={(e) => handleAirportChange(e, true)}
                  className="inputStyle"
                />
                {fromAirport && (
                  <ul className="ulStyle">
                    {filteredFromAirports.map((airport) => (
                      <li
                        key={airport.code}
                        onClick={() => handleAirportClick(airport, true)}
                        className="liStyle"
                      >
                        {airport.city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {fromAirportError && (
                <div className="error">* Please enter a valid airport.</div>
              )}
            </div>
            {/*Swap button */}
            <div>
              <button
                onClick={swapAirports}
                className="mt-8 text-blue-900 text-2xl"
              >
                <IoIosSwap />
              </button>
            </div>

            {/* To Airport */}
            <div className="relative">
              <div>
                {" "}
                <label className="font-bold text-blue-900">Flying to</label>
              </div>
              <div>
                <input
                  type="text"
                  value={toAirport.city}
                  onChange={(e) => handleAirportChange(e, false)}
                  className="inputStyle"
                />
                {toAirport && (
                  <ul className="ulStyle">
                    {filteredToAirports.map((airport) => (
                      <li
                        key={airport.code}
                        onClick={() => handleAirportClick(airport, false)}
                        className="liStyle"
                      >
                        {airport.city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                {toAirportError && (
                  <div className="error">* Please enter a valid airport.</div>
                )}
              </div>
            </div>
          </div>
          {/* Date Picker */}
          <div
            id="datePicker"
            className="flex md:space-x-16 flex-col md:flex-row items-center space-y-5 md:space-y-0"
          >
            <div className="flex flex-col">
              <div>
                <label className="font-bold text-blue-900">
                  Departure Date
                </label>
              </div>
              <div>
                <input
                  type="date"
                  onChange={(e) => {
                    setDepartureDate(e.target.value);
                    setDepartureDateError(false);
                  }}
                  min={"2024-01-07"}
                  max={returnDate ? returnDate : "2024-01-10"}
                  className="inputStyle"
                />
              </div>
              {departureDateError && (
                <div className="error">* Please select a departure date.</div>
              )}
            </div>
            <div>
              {radioButton === false ? (
                <div className="flex flex-col">
                  <div>
                    <label className="font-bold text-blue-900">
                      Return Date
                    </label>
                  </div>
                  <div>
                    <input
                      type="date"
                      onChange={(e) => {
                        setReturnDate(e.target.value);
                        setReturnDateError(false);
                      }}
                      min={departureDate ? departureDate : "2024-01-07"}
                      max={"2024-01-10"}
                      className="inputStyle"
                    />
                  </div>
                  <div>
                    {radioButton === false && returnDateError && (
                      <div className="error">
                        * Please select a departure date.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col opacity-50 select-none">
                  <div>
                    <label className="font-bold text-blue-900">
                      Return Date
                    </label>
                  </div>
                  <div>
                    <input
                      disabled
                      type="date"
                      onChange={(e) => {
                        setReturnDate(e.target.value);
                        setReturnDateError(false);
                      }}
                      min={departureDate}
                      className=" inputStyle"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Passengers */}
          <div className="flex md:space-x-16 flex-col md:flex-row space-x-0 items-center space-y-4 md:space-y-0">
            <div className="flex flex-col space-y-2">
              {/* Adults */}
              <div>
                <label className="passengerLabel">
                  Adults <span className="passengerAgeSpan">12+ years</span>
                </label>
              </div>
              <div className="passengerButtonsDiv">
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    updatePassengers("adults", "decrement");
                  }}
                  disabled={adults === 0}
                >
                  <div className="passengerButton">
                    <TiMinus />
                  </div>
                </button>
                <span className="text-xl">{adults}</span>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    updatePassengers("adults", "increment");
                  }}
                >
                  <div className="passengerButton">
                    <TiPlus />
                  </div>
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex flex-col space-y-2 items-center">
              <div>
                <label className="passengerLabel">
                  Children <span className="passengerAgeSpan">2-12 years</span>
                </label>
              </div>
              <div className="passengerButtonsDiv">
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    updatePassengers("children", "decrement");
                  }}
                  disabled={children === 0}
                >
                  <div className="passengerButton">
                    <TiMinus />{" "}
                  </div>
                </button>
                <span className="text-xl">{children}</span>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    updatePassengers("children", "increment");
                  }}
                >
                  <div className="passengerButton">
                    <TiPlus />
                  </div>
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="passengerLabel">
                <label>
                  Infants <span className="passengerAgeSpan">0-2 years</span>
                </label>
              </div>
              <div className="passengerButtonsDiv">
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    updatePassengers("infants", "decrement");
                  }}
                  disabled={infants === 0}
                >
                  <div className="passengerButton">
                    <TiMinus />
                  </div>
                </button>
                <span className="text-xl">{infants}</span>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    updatePassengers("infants", "increment");
                  }}
                >
                  <div className="passengerButton">
                    <TiPlus />
                  </div>
                </button>
              </div>
            </div>

            {/* Infants */}
          </div>
          {/* Button */}
          <div id="button" className="flex justify-center md:justify-start">
            <button
              className="bg-blue-900 px-4 py-2 text-white rounded-xl"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
