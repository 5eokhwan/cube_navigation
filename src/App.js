import CubeNavigation from "./component/CubeNavigation";
import "./App.scss";
import { Route, Switch } from "react-router-dom";

import AmazonBoxPage from "./page/AmazonBoxPage";
import LoginPage from "./page/LoginPage";
import NeumorphismEffect from "./page/NeumorphismEffect";
import HoverButton from "./page/HoverButton";
import NavigationMenu from "./page/NavigationMenu";

function App() {
  const linkData = {
    front: "/",
    left: "/box",
    back: "/",
    right: "/neumorphism",
    top: "/hoverButton",
    bottom: "/navigationMenu",
  };
  return (
    <>
      <CubeNavigation linkData={linkData} />
      <>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/box" component={AmazonBoxPage} />
          <Route exact path="/neumorphism" component={NeumorphismEffect} />
          <Route exact path="/hoverButton" component={HoverButton} />
          <Route exact path="/navigationMenu" component={NavigationMenu} />
        </Switch>
      </>
    </>
  );
}

export default App;
