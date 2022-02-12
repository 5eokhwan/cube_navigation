import React, { useRef, useEffect } from "react";
import "./Face.scss";
function Face({ isFocus, side, icon, selectFace }) {
  const selectionFace = useRef();
  useEffect(() => {
    if (side !== "front" && isFocus) {
      selectFace(selectionFace.current, side);
    }
  }, [isFocus]);

  return (
    <>
      <div
        className={isFocus ? `face ${side} active` : `face ${side}`}
        ref={selectionFace}
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

      {/* 선택 시 animation용 */}
      {/* {side !== "front" && isFocus ? (
        <div className={`face ${side} selection active`} ref={selectionFace}>
          <img className="nav icon" src={icon} alt="icon" />
        </div>
      ) : null} */}
    </>
  );
}

export default Face;
