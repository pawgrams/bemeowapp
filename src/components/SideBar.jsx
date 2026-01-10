import ErrorBoundary from '../ErrorBoundary'; import React, { useState } from "react";
import "./../App.css";
import { useWindowSize } from "../hooks";

const Sidebar = () => {
  const { width } = useWindowSize();
  const [isCollapsed, setIsCollapsed] = useState(true);
  if (width <= 768) {
    return null;
  }
  try{
  return (
    <ErrorBoundary>
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {isCollapsed ? (
        <div className="burger-menu" onClick={() => setIsCollapsed(false)}>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
        </div>
      ) : (
        <div className="collapse-arrow" onClick={() => setIsCollapsed(true)}>
          ←
        </div>
      )}
      {!isCollapsed && (
        <ul className="side-menu">
          <li className="side-menu-item">Presale (ICO)</li>
          <li className="side-menu-item">Referral & Stats</li>
          <li className="side-menu-item">Swap</li>
          <li className="side-menu-item">Bridge</li>
          <li className="side-menu-item">ICO Details</li>
          <li className="side-menu-item">Releases</li>
          <li className="side-menu-item">FAQ</li>
          <li className="side-menu-item">Links</li>
          <li className="side-menu-item">Download App</li>
          <li className="side-menu-item">Terms</li>  
          <li className="side-menu-item">Help</li>  
        </ul>
      )}
    </div>
    </ErrorBoundary>
    
  );
} catch{}
};
export default Sidebar;
