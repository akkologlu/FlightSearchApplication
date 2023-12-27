import React, { useState, useEffect } from "react";
import clouds from "../assets/clouds.gif";
import plane from "../assets/plane.png";
import "../style/List.css";
import axios from "axios";
import Flight from "./Flight";

function List({ waiting, animating, flightData }) {
  const [flights, setFlights] = useState([]);
  const [fetched, setFetched] = useState(false);
  const style = {
    backgroundImage: `url(${clouds})`,
  };
  useEffect(() => {
    // Only proceed if flightData.departureDate is defined
    if (flightData && flightData.departureDate) {
      axios
        .get(
          `https://658c2164859b3491d3f58900.mockapi.io/flights/${flightData.departureDate}`
        )
        .then((response) => {
          setFlights(response.data);
          setFetched(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [flightData]);
  console.log(flights);
  return (
    <div>
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
        <div>
          {fetched ? (
            <>
              {flights.flights.map((flight) => {
                return (
                  <div key={flight.date}>
                    <Flight flight={flight} />
                  </div>
                );
              })}
            </>
          ) : (
            <>YÜKLENİYOR</>
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
