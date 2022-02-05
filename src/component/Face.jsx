import React from "react";

function face({ isActive, side, name }) {
  return (
    <div className={isActive ? `face ${side} active` : `face ${side}`}>
      {side === "front" ? (
        <>
          <span></span>
          <span></span>
          <span></span>
        </>
      ) : (
        <ion-icon
          name={name}
          style={{ width: "75%", height: "75%" }}
        ></ion-icon>
      )}
    </div>
  );
}

export default face;
