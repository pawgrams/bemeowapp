import SilentErrorBoundary from '../SilentErrorBoundary'; 
import React, { useState, useEffect } from 'react';
import '../App.css';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const CustomSelect = ({ options, selectedValue, onChange, solPrice }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotationClass, setRotationClass] = useState('');
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  useEffect(() => {
    try{
        if (selectedValue === 'SOL') {
          setRotationClass('rotating');
          const timer = setInterval(() => {
            setRotationClass('');
            setTimeout(() => setRotationClass('rotating'), 0);
          }, 15000);
          return () => clearInterval(timer);
        } else {
          setRotationClass('');
        }
    } catch(e){}
  }, [solPrice, selectedValue]);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  const handleSelect = (value) => {
    try{
        onChange(value);
        setIsOpen(false);
    } catch(e){}
  };
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
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
              {selectedValue === 'SOL' && typeof solPrice === 'number' && (
                <span className="sol-price">(1 SOL = ${solPrice.toFixed(2)})</span>
              )}
              <span className="arrow">▼</span>
              {selectedValue === 'SOL' && (
                <div className={`loading-circle ${rotationClass}`}></div>
              )}
            </div>
            {isOpen && (
              <div className="options">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="option"
                    onClick={() => handleSelect(option.value)}
                  >
                    <img
                      src={`/tokens/${option.value}.png`}
                      alt={option.label}
                      style={{ width: '20px', height: '20px', marginRight: '8px' }}
                    />
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </SilentErrorBoundary>
      );
  } catch(e){}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export default CustomSelect;
