import "./CubeNavigation.scss";
import Face from "./Face";
import { useState, useEffect, useRef } from "react";

const sides = ["front", "left", "back", "right", "top", "bottom"];
const iconNames = [
  null,
  "logo-dropbox",
  "log-in",
  "radio-button-on",
  "map",
  "grid",
];

function returnCurFace(x, y) {
  let nx = (x % 360) / 90;
  const ny = (y % 360) / 90;
  if ((2.5 <= ny && ny < 3.5) || (-1.5 <= ny && ny < -0.5)) return "top";
  else if ((-3.5 <= ny && ny < -2.5) || (0.5 <= ny && ny < 1.5))
    return "bottom";

  if ((1.5 <= ny && ny < 2.5) || (-2.5 <= ny && ny < -1.5)) {
    if (nx > 0) return sides[Math.round(nx + 2) % 4];
    else return sides[(4 + Math.round(nx + 2)) % 4];
  } else {
    if (nx > 0) return sides[Math.round(nx) % 4];
    else return sides[(4 + Math.round(nx)) % 4];
  }
}

function CubeNavigation() {
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
  }

  const [isActive, setIsActive] = useState(false);
  //회전율 0이면 정면을 향하는 것으로 한다.
  const currentRotate = useRef([]);
  const [focus, setFocus] = useState("front");
  const cubeNavigation = useRef();
  const center = useRef();
  const pos = useRef({
    mouse: [300, 300],
    cube: [0, 0],
  });

  useEffect(() => {
    // console.log(pos.current.mouse);
    let mouseMoveInterval;
    if (isActive) {
      cubeNavigation.current.style.transition = "";
      mouseMoveInterval = setInterval(() => {
        updatePos();
        setFocus(
          returnCurFace(currentRotate.current[0], currentRotate.current[1])
        );
        cubeNavigation.current.style.transform =
          "rotateX(" +
          currentRotate.current[1] +
          "deg) rotateY(" +
          currentRotate.current[0] +
          "deg)";
      }, 15);
    }
    window.onclick = updatePos;
    return () => {
      //인라인 스타일을 제거하여 css 스타일을 적용되게 한다
      if (isActive) {
        cubeNavigation.current.style.transform = "";
        cubeNavigation.current.style.transition =
          "width 0.75s, height 0.75s, transform 0.75s";
        clearInterval(mouseMoveInterval);
      } else window.onmousemove = updatePos;
    };
  }, [isActive]);
  const updateCurMenu = () => {
    console.log(focus);
    setIsActive(false);
  };
  return (
    <>
      {isActive && <div id="TouchScreen" onClick={updateCurMenu}></div>}
      <div id="CubeScene" className={isActive ? "active" : ""}>
        <nav
          className="cube"
          onClick={() => {
            if (!isActive) setIsActive(true);
          }}
          ref={cubeNavigation}
        >
          <div className="center" ref={center}></div>
          {sides.map((v, i) => {
            return (
              <Face
                key={v + i}
                side={v}
                name={iconNames[i]}
                isActive={focus === v ? true : false}
              />
            );
          })}
        </nav>
        {isActive && <div id="MenuDesc">{focus}</div>}
      </div>
    </>
  );
}

export default CubeNavigation;
