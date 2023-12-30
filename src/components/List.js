import React, { useState, useEffect } from "react";
import clouds from "../assets/clouds.gif";
import plane from "../assets/plane.png";
import "../style/List.css";
import axios from "axios";
import Flight from "./Flight";
import sadplane from "../assets/sadplane.png";

function List({ waiting, animating, flightData }) {
  const [flights, setFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [returnFetched, setReturnFetched] = useState(false);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [activeButton, setActiveButton] = useState("");
  const [outOfDateDeparture, setOutOfDateDeparture] = useState(false);
  const [outOfDateReturn, setOutOfDateReturn] = useState(false);
  const style = {
    backgroundImage: `url(${clouds})`,
  };
  useEffect(() => {
    function calculateTimeDifference(startDateTime, endDateTime) {
      const startTime = new Date(startDateTime);
      const endTime = new Date(endDateTime);
      const differenceInMs = endTime - startTime;

      const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
      const minutes = Math.floor(
        (differenceInMs % (1000 * 60 * 60)) / (1000 * 60)
      );

      return `${hours}h ${minutes}m`;
    }
    if (flightData && flightData.returnDate) {
      axios
        .get(
          `https://658c2164859b3491d3f58900.mockapi.io/flights/${flightData.returnDate}`
        )
        .then((response) => {
          response.data.flights.forEach((flight) => {
            flight.duration = calculateTimeDifference(
              flight.departureTime,
              flight.arrivalTime
            );
          });
          setReturnFlights(response.data);
          setReturnFetched(true);
          setOutOfDateReturn(false);
        })
        .catch((error) => {
          console.log(error);
          setOutOfDateReturn(true);
        });
    }
    // Only proceed if flightData.departureDate is defined
    if (flightData && flightData.departureDate) {
      axios
        .get(
          `https://658c2164859b3491d3f58900.mockapi.io/flights/${flightData.departureDate}`
        )
        .then((response) => {
          response.data.flights.forEach((flight) => {
            flight.duration = calculateTimeDifference(
              flight.departureTime,
              flight.arrivalTime
            );
          });
          setFlights(response.data);
          setFetched(true);
          setOutOfDateDeparture(false);
        })
        .catch((error) => {
          console.log(error);
          setOutOfDateDeparture(true);
        });
    }
  }, [flightData]);

  const sortFlights = (flightsArray) => {
    return flightsArray.sort((a, b) => {
      let comparisonResult = 0;
      if (sortKey === "duration") {
        const durationA = durationInMinutes(a.duration);
        const durationB = durationInMinutes(b.duration);
        comparisonResult = durationA - durationB;
      } else if (sortKey === "departureTime") {
        comparisonResult =
          new Date(a.departureTime) - new Date(b.departureTime);
      } else if (sortKey === "price") {
        comparisonResult = a.price - b.price;
      }
      return sortDirection === "asc" ? comparisonResult : -comparisonResult;
    });
  };

  const durationInMinutes = (duration) => {
    const [hours, minutes] = duration.split("h").map((v) => parseInt(v));
    return hours * 60 + minutes;
  };

  const sortedDepartureFlights =
    flights.flights &&
    sortFlights(
      flights.flights.filter(
        (flight) =>
          flightData.fromAirport.code === flight.departureAirport &&
          flightData.toAirport.code === flight.arrivalAirport
      )
    );

  const sortedReturnFlights =
    flightData.returnDate &&
    returnFlights.flights &&
    sortFlights(
      returnFlights.flights.filter(
        (flight) =>
          flightData.toAirport.code === flight.departureAirport &&
          flightData.fromAirport.code === flight.arrivalAirport
      )
    );
  return (
    <div className=" font-roboto">
      {waiting && !animating ? (
        <div className="space-y-2 lg:pr-12 lg:my-12 my-2 lg:m-3 w-full">
          {outOfDateDeparture && outOfDateReturn ? (
            <div className="text-blue-800 h-screen flex flex-col justify-center items-center space-y-12 text-3xl">
              <div className="">
                <img
                  src={sadplane}
                  alt=""
                  className="md:w-[500px] w-[150px] rounded-full"
                />
              </div>
              <p>
                Unfortunately, there are no flights available for the selected
                date.
              </p>
            </div>
          ) : (
            <>
              {fetched && (returnFetched || flightData.returnDate === "") ? (
                <>
                  <div className="flex md:space-x-4 md:flex-row flex-col space-y-2 md:space-y-0 items-center mt-10 justify-center lg:justify-start">
                    <button
                      className={
                        activeButton === "shortest"
                          ? `sortButtonActive`
                          : `sortButtonPassive`
                      }
                      onClick={() => {
                        setSortKey("duration");
                        setSortDirection("asc");
                        setActiveButton("shortest");
                      }}
                    >
                      Shortest
                    </button>
                    <button
                      className={
                        activeButton === "earliest"
                          ? `sortButtonActive`
                          : `sortButtonPassive`
                      }
                      onClick={() => {
                        setSortKey("departureTime");
                        setSortDirection("asc");
                        setActiveButton("earliest");
                      }}
                    >
                      Earliest
                    </button>
                    <button
                      className={
                        activeButton === "cheapest"
                          ? `sortButtonActive`
                          : `sortButtonPassive`
                      }
                      onClick={() => {
                        setSortKey("price");
                        setSortDirection("asc");
                        setActiveButton("cheapest");
                      }}
                    >
                      Cheapest
                    </button>
                  </div>
                  <Flight
                    filterFlights={[
                      sortedDepartureFlights,
                      sortedReturnFlights,
                    ]}
                  />
                </>
              ) : (
                <>Yükleniyor</>
              )}
            </>
          )}
        </div>
      ) : (
        <div
          className="container relative overflow-hidden w-full h-screen bg-blue-400 bg-no-repeat bg-center bg-cover"
          style={style}
        >
          <div className="runway">
            <img
              src={plane}
              alt=""
              className={`airplane ${animating ? "animate" : ""}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
