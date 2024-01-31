import React, { useState, useEffect } from 'react';
import './App.css';
import { FlagIcon } from 'react-flag-kit';
// import debounce from 'lodash.debounce';

// Define fetchFilteredData outside the component
const fetchFilteredData = async (currency, setCountries, setTotalPages) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await response.json();
    console.log(data); // Log the fetched data
    const trimmedCurrency = currency.trim().toUpperCase(); // Trim any whitespace and convert to uppercase
    const filteredCountries = data.filter(country => {
      const currencies = country.currencies;
      return currencies && currencies[trimmedCurrency];
    });
    console.log(filteredCountries); // Log the filtered countries
    setCountries(filteredCountries);
    setTotalPages(Math.ceil(filteredCountries.length / 10)); // Assuming 10 results per page
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


function App() {
  const [currency, setCurrency] = useState('');
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Reset pagination when currency changes
    setCurrentPage(1);
    if (currency.trim() === '') {
      // If search bar is empty, fetch all countries again
      fetchData();
    } else {
      // If search bar has input, filter countries based on currency
      fetchFilteredData(currency, setCountries, setTotalPages);
    }
  }, [currency]);

  const handleChange = (e) => {
    const inputValue = e.target.value.toUpperCase().trim(); // Convert input to uppercase and trim whitespace
    setCurrency(inputValue); // Update the state with the full input value
    fetchFilteredData(inputValue, setCountries, setTotalPages); // Call fetchFilteredData with the current input value
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await response.json();
      setCountries(data);
      setTotalPages(Math.ceil(data.length / 10)); // Assuming 10 results per page
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderCountries = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    return countries.slice(startIndex, endIndex).map((country, index) => (
      <li key={index}>
        <FlagIcon code={country.cca2} size={24} /> {country.name.common}
      </li>
    ));
  };

  return (
    <div className="App">
      <h1>Currency to Country Converter</h1>
      <form>
        <input
          type="text"
          placeholder="Enter currency code (e.g., INR)"
          value={currency}
          onChange={handleChange}
        />
      </form>
      <div className="results">
        {countries.length > 0 ? (
          <>
            <ul>{renderCountries()}</ul>
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={pageNumber === currentPage ? 'active' : ''}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p>No countries found for the entered currency code.</p>
        )}
      </div>
    </div>
  );
}

export default App;
