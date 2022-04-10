import "./CubeNavigation.scss";
import Face from "./Face";
import { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
const sides = ["front", "left", "back", "right", "top", "bottom"];

function returnCurFace(x, y) {
  let nx = (x % 360) / 90; // 0~3
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
      $center.current.getBoundingClientRect().left,
      $center.current.getBoundingClientRect().top,
    ];
    currentRotate.current = [
      pos.current.mouse[0] - pos.current.cube[0],
      pos.current.mouse[1] - pos.current.cube[1],
    ];
    console.log(pos.current, currentRotate.current);
  }

  const [isActive, setIsActive] = useState(false);
  const currentRotate = useRef([]);
  const [focus, setFocus] = useState("front");
  const [datas, setDatas] = useState(data);
  const $cubeNavigation = useRef();
  const $selectorCube = useRef();
  const $center = useRef();
  const pos = useRef({
    mouse: [300, 300],
    cube: [0, 0],
  });

  useEffect(() => {
    let mouseMoveInterval;
    if (isActive) {
      window.onmousemove = updatePos;
      $cubeNavigation.current.style.transition = "";
      mouseMoveInterval = setInterval(() => {
        //마우스가 움직이지 않아도 큐브 위치와 회전 변수 인터벌마다 업데이트
        updatePos();
        //포커스 된 메뉴 면 업데이트
        const curFocus = returnCurFace(
          currentRotate.current[0],
          currentRotate.current[1]
        );
        setFocus(curFocus);
        //큐브 회전
        $cubeNavigation.current.style.transform =
          "rotateX(" +
          currentRotate.current[1] +
          "deg) rotateY(" +
          currentRotate.current[0] +
          "deg)";
      }, 15);
    } else {
      //인라인 스타일을 제거하여 css 스타일을 적용되게 한다
      //비동기로 실행
      setTimeout(() => {
        $cubeNavigation.current.style.transform = "";
        $cubeNavigation.current.style.transition =
          "width 0.75s, height 0.75s, transform 0.75s";
      });
    }
    window.onclick = updatePos;
    return () => {
      if (isActive) {
        clearInterval(mouseMoveInterval);
        window.onmousemove = null;
      }
    };
  }, [isActive]);

  //애니메이션 효과 노드 생성 및 실행
  const selectFace = (ref, side) => {
    $selectorCube.current.style.display = "block";
    $selectorCube.current.style.transform =
      "rotateX(" +
      currentRotate.current[1] +
      "deg) rotateY(" +
      currentRotate.current[0] +
      "deg)";
    const node = ref.cloneNode(true);
    console.log("ref", ref, node);
    $selectorCube.current.appendChild(node);
    node.classList.add(side);
    node.querySelector("img").src = datas["front"].icon;
    node.style.animation =
      "fadeOut" + side[0].toUpperCase() + side.substr(1) + " 0.75s both";
    setTimeout(() => {
      $selectorCube.current.firstChild.remove();
      $selectorCube.current.style.display = "none";
    }, 750);
  };

  const updateCurMenu = () => {
    setIsActive(false);
    if (focus === "front") return;
    history.push(datas[focus].path);
    const newDatas = { ...datas };
    //front면은 다른 메뉴정보를 저장만 시키고 노출시키진 않음(front는 X를 렌더링)
    [newDatas[focus], newDatas["front"]] = [datas["front"], datas[focus]];
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
          ref={$cubeNavigation}
        >
          <div className="center" ref={$center}></div>
          {sides.map((v, i) => {
            return (
              <Face
                key={v + i}
                side={v}
                isFocus={focus === v ? true : false}
                icon={datas[`${v}`].icon}
                selectFace={selectFace}
                isActive={isActive}
              />
            );
          })}
        </nav>
        {isActive && <div id="MenuDesc">{focus}</div>}
      </div>
      <div className="CubeScene active selectorScene">
        <div className="cube selectorCube" ref={$selectorCube}></div>
      </div>
    </>
  );
}

export default withRouter(CubeNavigation);
