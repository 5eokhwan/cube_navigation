import "./CubeNavigation.scss";
import Face from "./Face";
import { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { faceTransform } from "./data.js";
const sides = ["front", "left", "back", "right", "top", "bottom"];

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

function CubeNavigation({ data, history }) {
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
  const currentRotate = useRef([]);
  const [focus, setFocus] = useState("front");
  const [datas, setDatas] = useState(data);
  const cubeNavigation = useRef();
  const focusedFaceContainer = useRef();
  const scene = useRef();
  const center = useRef();
  const pos = useRef({
    mouse: [300, 300],
    cube: [0, 0],
  });

  useEffect(() => {
    let mouseMoveInterval;
    if (isActive) {
      cubeNavigation.current.style.transition = "";
      mouseMoveInterval = setInterval(() => {
        updatePos();
        const curFocus = returnCurFace(
          currentRotate.current[0],
          currentRotate.current[1]
        );
        setFocus(curFocus);
        cubeNavigation.current.style.transform =
          "rotateX(" +
          currentRotate.current[1] +
          "deg) rotateY(" +
          currentRotate.current[0] +
          "deg)";
        focusedFaceContainer.current.style.transform =
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
        window.onmousemove = null;
      } else window.onmousemove = updatePos;
    };
  }, [isActive]);
  const selectFace = (ref, side) => {
    const node = ref.cloneNode(true);
    console.log("ref", ref, node);
    // ref.remove();
    if (focusedFaceContainer.current.firstChild)
      focusedFaceContainer.current.firstChild.remove();
    focusedFaceContainer.current.appendChild(node);
    node.classList.add(side);
    // node.classList.add("selection");
    console.log("faceTransform", faceTransform[side]);
    node.style.background = "black";
    // node.style.animation = "fadeOut 1s infinite";
  };
  const updateCurMenu = () => {
    setIsActive(false);
    if (focus === "front") return;
    history.push(datas[`${focus}`].path);
    const newDatas = { ...datas };
    [newDatas[`${focus}`], newDatas["front"]] = [
      datas["front"],
      datas[`${focus}`],
    ];
    setDatas(newDatas);
  };
  return (
    <>
      {isActive && <div id="TouchScreen" onClick={updateCurMenu}></div>}
      <div className={isActive ? "CubeScene active" : "CubeScene"}>
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
                isFocus={focus === v ? true : false}
                icon={datas[`${v}`].icon}
                selectFace={selectFace}
              />
            );
          })}
        </nav>
        {isActive && <div id="MenuDesc">{focus}</div>}
      </div>
      <div className="CubeScene active selectorScene">
        <div className="cube selectorCube" ref={focusedFaceContainer}></div>
      </div>
    </>
  );
}

export default withRouter(CubeNavigation);
