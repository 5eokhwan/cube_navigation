import React, { useRef, useEffect } from "react";
import "./Face.scss";
function Face({ isFocus, side, icon, selectFace, isActive }) {
  const $selectionFace = useRef();
  useEffect(() => {
    if (isFocus && !isActive && side !== "front")
      selectFace($selectionFace.current, side);
  }, [isActive]);

  return (
    <>
      <div
        className={isFocus ? `face ${side} active` : `face ${side}`}
        ref={$selectionFace}
      >
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
    </>
  );
}

export default Face;
