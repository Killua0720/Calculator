import './App.css';
import React, { useState } from 'react';

// Button component
function Key({ label, clickHandler }) {
  return (
    <button onClick={() => clickHandler(label)}>
      {label}
    </button>
  );
}

// Display component
function Display({ value }) {
  return (
    <div className="display">
      {value}
    </div>
  );
}

// Main Calculator App
function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);

  const clickHandler = (label) => {
    if (label === "SORIANO") {
      setDisplayValue("Jan Raymond Soriano");
      return;
    }

    if (label === "C") {
      setDisplayValue("0");
      setPreviousValue(null);
      setOperator(null);
      return;
    }

    if (["+", "-", "x", "÷"].includes(label)) {
      setOperator(label);
      setPreviousValue(displayValue);
      setDisplayValue("0");
      return;
    }

    if (label === "=") {
      if (operator && previousValue !== null) {
        const current = parseFloat(displayValue);
        const previous = parseFloat(previousValue);
        let result;

        switch (operator) {
          case "+":
            result = previous + current;
            break;
          case "-":
            result = previous - current;
            break;
          case "x":
            result = previous * current;
            break;
          case "÷":
            result = previous / current;
            break;
          default:
            result = displayValue;
        }

        setDisplayValue(result.toString());
        setOperator(null);
        setPreviousValue(null);
      }
      return;
    }

    setDisplayValue((prev) => (prev === "0" ? label.toString() : prev + label.toString()));
  };

  return (
    <div className="App">
      <h1>Calculator of Jan Raymond Soriano - IT3A</h1>

      <div className="Calc">
        <div className="Disp">
          <Display value={displayValue} />
        </div>

        <div className="Buttons">
          <Key label={7} clickHandler={clickHandler} />
          <Key label={8} clickHandler={clickHandler} />
          <Key label={9} clickHandler={clickHandler} />
          <Key label={"÷"} clickHandler={clickHandler} />
          <Key label={4} clickHandler={clickHandler} />
          <Key label={5} clickHandler={clickHandler} />
          <Key label={6} clickHandler={clickHandler} />
          <Key label={"x"} clickHandler={clickHandler} />
          <Key label={1} clickHandler={clickHandler} />
          <Key label={2} clickHandler={clickHandler} />
          <Key label={3} clickHandler={clickHandler} />
          <Key label={"-"} clickHandler={clickHandler} />
          <Key label={"C"} clickHandler={clickHandler} />
          <Key label={0} clickHandler={clickHandler} />
          <Key label={"+"} clickHandler={clickHandler} />
          <Key label={"="} clickHandler={clickHandler} />
        </div>

        <div className="surnameButton">
          <Key label={"SORIANO"} clickHandler={clickHandler} />
        </div>
      </div>
    </div>
  );
}

export default App;
