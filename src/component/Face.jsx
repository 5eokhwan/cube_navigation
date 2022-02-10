import React from "react";
import "./Face.scss";
function face({ isActive, side, icon }) {
  return (
    <>
      <div className={isActive ? `face ${side} active` : `face ${side}`}>
        {side === "front" ? (
          <>
            <span></span>
            <span></span>
            <span></span>
          </>
        ) : (
          <img className="nav icon" src={icon} alt="icon" />
        )}
      </div>

      {/* 선택 시 animation용 */}
      {/* <div className={isActive ? `face ${side} active` : `face ${side}`}>
        {side === "front" ? null : (
          <img className="nav icon" src={icon} alt="icon" />
        )}
      </div> */}
    </>
  );
}

export default face;
