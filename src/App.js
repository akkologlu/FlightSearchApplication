import React, { useState, useRef } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";

function App() {
  const [animating, setAnimating] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [flightData, setFlightData] = useState({});
  const listRef = useRef(null); // List komponenti için referans

  const scrollToView = () => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFormSubmit = () => {
    if (!animationPlayed) {
      scrollToView();
      setAnimating(true);
      setAnimationPlayed(true);

      setTimeout(() => {
        setAnimating(false);
        setWaiting(true);
        // Form submit edildiğinde list bölümüne kaydır
      }, 2000);
    } else {
      scrollToView(); // Form daha önce submit edilmişse, yine list bölümüne kaydır
    }
  };

  const flightSearch = (flightData) => {
    setFlightData(flightData);
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
