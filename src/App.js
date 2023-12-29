import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";

function App() {
  const [animating, setAnimating] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [flightData, setFlightData] = useState({});

  const handleFormSubmit = () => {
    setAnimating(true); // Animasyonu başlat

    // Animasyonun süresi kadar bekleyin (örneğin 3 saniye)
    setTimeout(() => {
      setAnimating(false); // Animasyonu durdur
      setWaiting(true); // "Veriler geldi" mesajını göstermek için

      // İsteğe bağlı olarak, bir süre sonra "Veriler geldi" mesajını da kaldırabilirsiniz
      // setTimeout(() => {
      //   setWaiting(false);
      // }, 3000);
    }, 2000);
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
        <div className="lg:w-[60%]  w-full ">
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
