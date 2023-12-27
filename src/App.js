import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";

function App() {
  const [animating, setAnimating] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const handleFormSubmit = () => {
    setAnimating(true); // Animasyonu başlat

    // Animasyonun süresi kadar bekleyin (örneğin 3 saniye)
    setTimeout(() => {
      setAnimating(false); // Animasyonu durdur
      setWaiting(true); // "Veriler geldi" mesajını göstermek için

      // İsteğe bağlı olarak, bir süre sonra "Veriler geldi" mesajını da kaldırabilirsiniz
      setTimeout(() => {
        setWaiting(false);
      }, 3000);
    }, 2000);
  };
  return (
    <div className="App">
      <div className="flex">
        <div className="w-[40%]">
          <Form onFormSubmit={handleFormSubmit} />
        </div>
        <div className="w-[60%]">
          <List waiting={waiting} animating={animating} />
        </div>
      </div>
    </div>
  );
}

export default App;
