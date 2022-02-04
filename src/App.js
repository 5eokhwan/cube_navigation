import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  function updatePos(e) {
    //마우스 이벤트 발생시 마우스 갱신
    if (e) pos.current.mouse = [e.clientX, e.clientY];
    pos.current.cube = [
      center.current.getBoundingClientRect().left,
      center.current.getBoundingClientRect().top,
    ];
    currentRotate.current = [
      pos.current.mouse[0] - pos.current.cube[0],
      pos.current.mouse[1] - pos.current.cube[1],
    ];
    //console.log("mousePos:", pos.current.mouse, "mouseCube:", pos.current.cube);
  }
  const [isActive, setIsActive] = useState(false);
  //회전율 0이면 정면을 향하는 것으로 한다.
  const currentRotate = useRef([]);
  const cubeNavigation = useRef();
  const center = useRef();

  const pos = useRef({
    mouse: [0, 0],
    cube: [0, 0],
  });

  useEffect(() => {
    console.log(pos.current.mouse);
    let mouseMoveInterval;
    if (isActive) {
      mouseMoveInterval = setInterval(() => {
        updatePos();
        cubeNavigation.current.style.transform =
          "rotateX(" +
          (pos.current.mouse[1] - pos.current.cube[1]) +
          "deg) rotateY(" +
          (pos.current.mouse[0] - pos.current.cube[0]) +
          "deg)";
      }, 15);
      window.onclick = updatePos;
      window.onmousemove = updatePos;
    } else {
    }
    return () => {
      clearInterval(mouseMoveInterval);
    };
  }, [isActive]);

  return (
    <>
      <div id="CubeScene" className={isActive ? "active" : ""}>
        <nav
          className="cube"
          onClick={() => {
            setIsActive(!isActive);
          }}
          ref={cubeNavigation}
        >
          <div className="center" ref={center}></div>
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
        </nav>
      </div>
      <div id="MenuDesc">Menu</div>
    </>
  );
}

export default App;
