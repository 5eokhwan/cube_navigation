import React from "react";
import "./LoginPage.css";
function LoginPage() {
  return (
    <div id="Background">
      <div className="container">
        <form>
          <h3>Log In</h3>
          <div className="inputBox">
            <span>Username</span>
            <div className="box">
              <div className="icon">
                <ion-icon name="person"></ion-icon>
              </div>
              <input type="text" />
            </div>
          </div>
          <div className="inputBox">
            <span>Password</span>
            <div className="box">
              <div className="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </div>
              <input type="password" />
            </div>
          </div>
          <label>
            {" "}
            <input type="checkbox" /> Remember me{" "}
          </label>
          <div className="inputBox">
            <div className="box">
              <input type="submit" value="log in" />
            </div>
          </div>
          <a href="#" className="forgot">
            forget Password
          </a>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
