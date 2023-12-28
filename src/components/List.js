import React, { useState, useEffect } from "react";
import clouds from "../assets/clouds.gif";
import plane from "../assets/plane.png";
import "../style/List.css";
import axios from "axios";
import Flight from "./Flight";

function List({ waiting, animating, flightData }) {
  const [flights, setFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [returnFetched, setReturnFetched] = useState(false);
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
        })
        .catch((error) => {
          console.log(error);
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
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [flightData]);

  function filterFlights(array, array2) {
    return [
      array.flights.filter(
        (flight) =>
          flightData.fromAirport.code === flight.departureAirport &&
          flightData.toAirport.code === flight.arrivalAirport
      ),
      array2.flights.filter(
        (flight) =>
          flightData.toAirport.code === flight.departureAirport &&
          flightData.fromAirport.code === flight.arrivalAirport
      ),
    ];
  }
  return (
    <div className="m-3 ">
      {animating ? (
        <div
          className="container relative overflow-hidden w-full h-screen bg-blue-400 bg-no-repeat bg-center bg-cover"
          style={style}
        >
          <div className="runway">
            <img src={plane} alt="" className={`airplane animate`} />
          </div>
        </div>
      ) : waiting ? (
        <div className="space-y-2">
          {fetched && returnFetched ? (
            <>
              {<Flight filterFlights={filterFlights(flights, returnFlights)} />}
            </>
          ) : (
            <>
              {fetched && flightData.returnDate === "" ? (
                <>
                  {flights.flights
                    .filter(
                      (flight) =>
                        flightData.fromAirport.code ===
                          flight.departureAirport &&
                        flightData.toAirport.code === flight.arrivalAirport
                    )
                    .map((flight) => {
                      return (
                        <div key={flight.date}>
                          <Flight flight={flight} />
                        </div>
                      );
                    })}
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
            <img src={plane} alt="" className={`airplane `} />
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
