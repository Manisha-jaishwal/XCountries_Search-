import React, { useEffect, useState } from "react";
import "./countries.css";

const Card = ({ png, common }) => {
  return (
    <div className="card1">
      <img src={png} alt={common} style={{ width: "100px" }} />
      <h2>{common}</h2>
    </div>
  );
};

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        const json = await res.json();
        setCountries(json);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((item) =>
    item.common.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search for countries..."
          className="searchInput"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="container">
        {filteredCountries.map((item) => (
          <Card key={item.common} common={item.common} png={item.png} />
        ))}
      </div>
    </>
  );
}
