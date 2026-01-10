import { useState, useEffect } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      try{
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }catch{} 
    };
    try{
    window.addEventListener("resize", handleResize);
  }catch{} 
  try{
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }catch{} 
  }, []);

  return windowSize;
};

