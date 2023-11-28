import { d } from "../../asset/js/custom.lib.js";
import { homeLoad, homePage } from "./homePage.js";

const login = `
    <section id="wrapper">
      <section class="common-sec login-page-sec">
        <div class="container">
          <div class="logo-dv text-center">
            <a class="navbar-brand" href="./user">
              <span class="site-logo"
                ><img src="./asset/img/logo.svg" alt="Logo"
              /></span>
            </a>
          </div>

          <div class="login-form-dv">
            <section class="custom-form-sec">
              <form class="icon-form" name="form">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="input-bx">
                      <input
                        type="email"
                        id="username"
                        class="form-control"
                        autocomplete="off"
                        required
                        placeholder="Username"
                      />
                    </div>
                  </div>
                  <!-- col -->
                </div>
                <!-- row -->

                <div class="row">
                  <div class="col-sm-12">
                    <div class="input-bx pass-bx">
                      <input
                        type="text"
                        id="password"
                        class="form-control"
                        autocomplete="off"
                        required
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <!-- col -->
                </div>
                <!-- row -->

                <div style="color: red; text-align: center; font-size: 14px; margin-top: 10px; display: none;" id="login-error">
  					      Wrong username and/or password. Please try again.
  					    </div>

                <div class="submit mt-4">
                  <button id="loginBtn" type="submit" class="custom-btn round-btn">
                    Login
                  </button>
                </div>
              </form>
            </section>
            <!-- custom-form-sec -->
          </div>
          <!-- login-form-dv -->
        </div>
        <!-- container -->
      </section>
      <!-- common-sec -->
    </section>
    <!-- wrapper -->

    <div style="display: none" id="loading">
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </div>
`;

const { GAS, post, customPasword } = d;

const loginLoad = () => {
  let username = document.querySelector("#username");
  let password = document.querySelector("#password");
  let loginBtn = document.querySelector("#loginBtn");
  const { $password } = customPasword(password);

  document.forms["form"].onsubmit = async (e) => {
    e.preventDefault();
    loginBtn.disabled = true;
    loginBtn.innerText = "Please Wait..";
    document.querySelector("#login-error").style.display = "none";
    let ipAddress = "";
    try {
      ipAddress = await d.get("https://ip.39vz8-ip.workers.dev/");
    } catch (err) {
      document.querySelector("#login-error").innerText =
        "Please deactivate adblock and reload again.";
      document.querySelector("#login-error").style.display = "block";
      loginBtn.disabled = false;
      loginBtn.innerText = "Login";
      return;
    }
    post(GAS, {
      type: 14,
      data: JSON.stringify({
        userName: username.value.trim(),
        password: $password(),
        ip: ipAddress,
      }),
    }).then(async (res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, data, messege, history, emailEnable } = res;
      if (result && messege != "ip") {
        document.querySelector("#root").innerHTML = homePage;
        d.userEmail = username.value.trim();
        d.database = messege;
        d.history = history;
        d.emailEnable = emailEnable;
        homeLoad(data, emailEnable);
      } else if (result && messege == "ip") {
        document.querySelector("#login-error").innerText =
          "Unauthorized Access. Contact System Administrator.";
        document.querySelector("#login-error").style.display = "block";
        loginBtn.disabled = false;
        loginBtn.innerText = "Login";
      } else {
        document.querySelector("#login-error").innerText =
          "Wrong username and/or password. Please try again.";
        document.querySelector("#login-error").style.display = "block";
        loginBtn.disabled = false;
        loginBtn.innerText = "Login";
      }
    });
  };
};

export { login, loginLoad };
