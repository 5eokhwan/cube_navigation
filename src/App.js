import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [isActive, setIsActive] = useState(false);
  //회전율 0이면 정면을 향하는 것으로 한다.
  const [currentRotate, setCurrentRetrotate] = useState(0);
  useEffect(() => {
    window.onmousemove = (e) => {
      console.log(
        "rotateX(" +
          (e.clientY % 360) +
          "deg) rotateY(" +
          (e.clientX % 360) +
          "deg)"
      );
    };
  }, []);

  return (
    <>
      <div id="CubeScene" className={isActive ? "active" : ""}>
        <div
          className="cube"
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          <div className="face top"></div>
          <div className="face left">left</div>
          <div className="face front">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="face right">right</div>
          <div className="face back">back</div>
          <div className="face bottom">bottom</div>
        </div>
      </div>
      <div id="MenuDesc">Menu</div>
    </>
  );
}

export default App;
