import React from "react";
import "./LoginPage.css";
function LoginPage() {
  return (
    <div id="Background">
      <div class="container">
        <form>
          <h3>Log In</h3>
          <div class="inputBox">
            <span>Username</span>
            <div class="box">
              <div class="icon">
                <ion-icon name="person"></ion-icon>
              </div>
              <input type="text" />
            </div>
          </div>
          <div class="inputBox">
            <span>Password</span>
            <div class="box">
              <div class="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </div>
              <input type="password" />
            </div>
          </div>
          <label>
            {" "}
            <input type="checkbox" /> Remember me{" "}
          </label>
          <div class="inputBox">
            <div class="box">
              <input type="submit" value="log in" />
            </div>
          </div>
          <a href="#" class="forgot">
            forget Password
          </a>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
