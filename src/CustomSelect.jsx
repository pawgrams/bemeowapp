import SilentErrorBoundary from './SilentErrorBoundary'; 
import React, { useState, useEffect } from 'react';
import './App.css';
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const CustomSelect = ({ options, selectedValue, onChange, assetPrice }) => {
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [isOpen, setIsOpen] = useState(false);
  const [rotationClass, setRotationClass] = useState('');
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const lowerNumMap = {
    "1": "₁",
    "2": "₂",
    "3": "₃",
    "4": "₄",
    "5": "₅",
    "6": "₆",
    "7": "₇",
    "8": "₈",
    "9": "₉"
  };
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const formatPriceWithSubscript = (price) => {
    try{
        if (typeof price !== 'number' || isNaN(price)) {
          return "...";
        }
        if (price < 0.0001) {
          const parts = price.toString().split('.');
          let decimalPart = parts[1] || "";
          const firstNonZeroIndex = decimalPart.split('').findIndex(char => char !== '0');
          const countZeros = firstNonZeroIndex;
          const replaceZeros = countZeros - 1;
          const subscriptLeadingZero = lowerNumMap[String(replaceZeros)] || '';
          const significantDigits = decimalPart.slice(firstNonZeroIndex);
          return `0.0${subscriptLeadingZero}${significantDigits}`;
        } else if (price < 1) {
          return price.toFixed(4);
        } else {
          return price.toFixed(2);
        }
    } catch(e){}
  };
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useEffect(() => {
    try{
        setRotationClass('rotating');
        const timer = setInterval(() => {
          setRotationClass('');
          setTimeout(() => setRotationClass('rotating'), 0);
        }, 5000);
        return () => clearInterval(timer);
    } catch(e){}
  }, [assetPrice, selectedValue]);
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const handleSelect = (value) => {
    try{
      onChange(value);
      setIsOpen(false);
  } catch(e){}
  };
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const filteredOptions = options.filter(option => option !== selectedValue);
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  try{
    return (
      <SilentErrorBoundary>
        <div className="custom-select-container">
          <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
            <img
              src={`/tokens/${selectedValue}.png`}
              alt={selectedValue}
              style={{ width: '20px', height: '20px', marginRight: '8px' }}
            />
            {selectedValue}
            {assetPrice !== null && !isNaN(assetPrice) && (
              <span className="asset-price">
                <span> ${formatPriceWithSubscript(assetPrice)}</span>
              </span>
            )}
            <span className="arrow">▼</span>
            {true && (
              <div className={`loading-circle ${rotationClass}`}></div>
            )}
          </div>
          {isOpen && (
            <div className="options">
              {filteredOptions.map((option) => (
                <div
                  key={option}
                  className="option"
                  onClick={() => handleSelect(option)}
                >
                  <img
                    src={`/tokens/${option}.png`}
                    alt={option}
                    style={{ width: '20px', height: '20px', marginRight: '8px' }}
                  />
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </SilentErrorBoundary>
    );
  } catch(e){}
};
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default CustomSelect;
