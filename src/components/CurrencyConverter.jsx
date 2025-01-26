import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cur.css";
function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rates, setRates] = useState({});
  const [currencies, setCurrencies] = useState([]);

  const apiKey = "05f5837005b156cdeadf7f6a"; // Replace with your API key
  const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

  // Fetch exchange rates
  useEffect(() => {
    axios
      .get(apiURL)
      .then((response) => {
        setRates(response.data.conversion_rates);
        setCurrencies(Object.keys(response.data.conversion_rates));
      })
      .catch((error) => {
        console.error("Error fetching exchange rates: ", error);
      });
  }, [fromCurrency]);

  // Convert the currency
  useEffect(() => {
    if (rates[toCurrency]) {
      const conversion = (amount * rates[toCurrency]).toFixed(2);
      setConvertedAmount(conversion);
    }
  }, [amount, fromCurrency, toCurrency, rates]);
  return (
    <>
      <div className="app">
        <h2>Currency Converter</h2>
        <div className="fix">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <CurrencySelect
            label="From"
            value={fromCurrency}
            currencies={currencies}
            onChange={(e) => setFromCurrency(e.target.value)}
          />
          <span>to</span>
          <CurrencySelect
            label="To"
            value={toCurrency}
            currencies={currencies}
            onChange={(e) => setToCurrency(e.target.value)}
          />
        </div>
        <div>
          <h3>
            Converted Amount: {convertedAmount} {toCurrency}
          </h3>
        </div>
      </div>
    </>
  );
}
const CurrencySelect = ({ label, value, currencies, onChange }) => (
  <div>
    <label>{label} Currency: </label>
    <select value={value} onChange={onChange}>
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  </div>
);

export default CurrencyConverter;
