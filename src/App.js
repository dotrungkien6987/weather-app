import React, { useState, useEffect } from "react";
const api = {
  key: "1c9768b5fa1bb780081b68dac5a29c4e",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      console.log("loading");
      //Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(JSON.stringify(data));
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div>{weatherInfo}</div>
          )}
        </>
      )}
    </>
  );
}

export default App;
