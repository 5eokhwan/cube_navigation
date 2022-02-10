import CubeNavigation from "./component/CubeNavigation";
import "./App.scss";
import { Route, Switch } from "react-router-dom";

import AmazonBoxPage from "./page/AmazonBoxPage";
import LoginPage from "./page/LoginPage";
import NeumorphismEffect from "./page/NeumorphismEffect";
import HoverButton from "./page/HoverButton";
import NavigationMenu from "./page/NavigationMenu";
import spinnerPage from "./page/SpinnerPage";

import box_icon from "./icons/box_icon.png";
import btn_icon from "./icons/btn_icon.png";
import circle_line_icon from "./icons/circle_line_icon.png";
import home_icon from "./icons/home_icon.png";
import login_icon from "./icons/login_icon.png";
import spin_icon from "./icons/spin_icon.png";

const cubeNavData = {
  front: { path: "/", icon: box_icon, name: "메뉴1", desc: "" },
  left: { path: "/box", icon: btn_icon, name: "메뉴2", desc: "" },
  back: { path: "/spinner", icon: circle_line_icon, name: "메뉴3", desc: "" },
  right: { path: "/neumorphism", icon: home_icon, name: "메뉴4", desc: "" },
  top: { path: "/hoverButton", icon: login_icon, name: "메뉴5", desc: "" },
  bottom: { path: "/navigationMenu", icon: spin_icon, name: "메뉴6", desc: "" },
};

function App() {
  return (
    <>
      <CubeNavigation data={cubeNavData} />
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/box" component={AmazonBoxPage} />
        <Route exact path="/neumorphism" component={NeumorphismEffect} />
        <Route exact path="/hoverButton" component={HoverButton} />
        <Route exact path="/navigationMenu" component={NavigationMenu} />
        <Route exact path="/spinner" component={spinnerPage} />
      </Switch>
    </>
  );
}

export default App;
