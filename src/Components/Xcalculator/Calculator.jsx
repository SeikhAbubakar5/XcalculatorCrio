import React, { useState } from 'react';
import "./Styles.css";

function Calculator() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const calculate = (expression) => {
    const operators = [];
    const values = [];

    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2
    };

    const applyOperator = () => {
      const b = values.pop();
      const a = values.pop();
      const operator = operators.pop();
      switch (operator) {
        case '+': values.push(a + b); break;
        case '-': values.push(a - b); break;
        case '*': values.push(a * b); break;
        case '/': values.push(a / b); break;
        default: throw new Error("Invalid operator");
      }
    };

    let number = "";
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      if (!isNaN(char) || char === '.') {
        number += char;
      } else {
        if (number) {
          values.push(parseFloat(number));
          number = "";
        }
        while (
          operators.length > 0 &&
          precedence[operators[operators.length - 1]] >= precedence[char]
        ) {
          applyOperator();
        }
        operators.push(char);
      }
    }

    if (number) {
      values.push(parseFloat(number));
    }

    while (operators.length > 0) {
      applyOperator();
    }

    return values.pop();
  };

  const handleButtonClick = (value) => {
    if (value === "C") {
      setCalc("");
      setResult("");
      setIsVisible(false);
    } else if (value === "=") {
      if (!calc || /[+\-*/]$/.test(calc)) {
        setResult("Incomplete Expression");
        setIsVisible(true);
        return;
      }
      try {
        const evaluatedResult = calculate(calc);
        setResult(evaluatedResult);
        setIsVisible(true);
      } catch (error) {
        setResult("Error");
        setIsVisible(true); 
      }
    } else {
      setCalc((prevCalc) => prevCalc + value);
      setIsVisible(false);
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <h2>React Calculator</h2>
      </div>
      <div className='display'>
        <input type='text' value={calc} placeholder='0'/>
        <p>{isVisible ? result : ""}</p>
      </div>
      <div className='btnContainer'>
        <div className='btn'>
          <button onClick={() => handleClick("7")} value="7">7</button>
          <button onClick={() => handleClick("8")} value="8">8</button>
          <button onClick={() => handleClick("9")} value="9">9</button>
          <button onClick={() => handleClick("+")} value="+">+</button>
        </div>
        <div className='btn'>
          <button onClick={() => handleClick("4")} value="4">4</button>
          <button onClick={() => handleClick("5")} value="5">5</button>
          <button onClick={() => handleClick("6")} value="6">6</button>
          <button onClick={() => handleClick("-")} value="-">-</button>
        </div>
        <div className='btn'>
          <button onClick={() => handleClick("1")} value="1">1</button>
          <button onClick={() => handleClick("2")} value="2">2</button>
          <button onClick={() => handleClick("3")} value="3">3</button>
          <button onClick={() => handleClick("*")} value="*">*</button>
        </div>
        <div className='btn'>
          <button onClick={() => handleClick("C")} value="C">C</button>
          <button onClick={() => handleClick("0")} value="0">0</button>
          <button onClick={() => handleClick("=")} value="=">=</button>
          <button onClick={() => handleClick("/")} value="/">/</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
