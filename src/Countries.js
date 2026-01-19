import React, { useEffect, useState } from "react";
import "./countries.css";
//....
export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error(error));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className="container">
        <input
          type="text"
          placeholder="Search for countries"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="countriesContainer">
        {filteredCountries.map((country) => (
          <div className="countryCard" key={country.common}>
            <img src={country.png} alt={country.common} />
            <p>{country.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
