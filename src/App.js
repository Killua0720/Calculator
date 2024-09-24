import './App.css';
import React, { useState } from 'react';

// Key component to display a button and handle clicks
function Key({ label, clickHandler }) {
  return (
    <button onClick={() => clickHandler(label)}>
      {label}
    </button>
  );
}

// Display component to show the current value
function Display({ value }) {
  return (
    <div className="display">
      {value}
    </div>
  );
}

function App() {
  const [displayValue, setDisplayValue] = useState('0'); 
  const [firstOperand, setFirstOperand] = useState(null); 
  const [operator, setOperator] = useState(null); 
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false); 

 
  const clickHandler = (label) => {
    if (typeof label === 'number') {
      handleNumber(label);
    } else if (label === 'C') {
      clear();
    } else if (label === '=') {
      calculate();
    } else {
      handleOperator(label);
    }
  };

 
  const handleNumber = (num) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(num));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(num) : displayValue + num);
    }
  };


  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand == null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation[operator](firstOperand, inputValue);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = {
    '+': (first, second) => first + second,
    '-': (first, second) => first - second,
    'x': (first, second) => first * second,
    '÷': (first, second) => first / second
  };

 
  const calculate = () => {
    if (operator && firstOperand != null) {
      const secondOperand = parseFloat(displayValue);
      const result = performCalculation[operator](firstOperand, secondOperand);
      setDisplayValue(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };


  const clear = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <div className="App">
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
      </div>
    </div>
  );
}

export default App;
