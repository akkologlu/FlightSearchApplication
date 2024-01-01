import React, { useState, useRef } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";

function App() {
  const [animating, setAnimating] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [flightData, setFlightData] = useState({});
  const listRef = useRef(null);

  const scrollToView = () => {
    if (listRef.current) {
      // If listRef.current is defined
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); // Scroll to the list
    }
  };

  const handleFormSubmit = () => {
    if (!animationPlayed) {
      scrollToView(); // Scroll to the list
      setAnimating(true); // Start animating
      setAnimationPlayed(true); // Set animation played to true

      setTimeout(() => {
        setAnimating(false); // Stop animating
        setWaiting(true); // Set waiting to true
      }, 2000);
    } else {
      scrollToView(); // Scroll to the list
    }
  };

  const flightSearch = (flightData) => {
    setFlightData(flightData); // Set flight data
  };

  return (
    <div className="App">
      <div className="flex flex-wrap">
        <div className="lg:w-[40%] flex justify-center w-full">
          <Form onFormSubmit={handleFormSubmit} flightSearch={flightSearch} />
        </div>
        <div className="lg:w-[60%] w-full" ref={listRef}>
          <List
            waiting={waiting}
            animating={animating}
            flightData={flightData}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
