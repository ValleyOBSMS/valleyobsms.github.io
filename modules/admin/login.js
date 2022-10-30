import { d } from "../../asset/js/custom.lib.js";
import { userPage, addUserLoad } from "./userPage.js";

const login = `
    <section id="wrapper">
      <section class="common-sec login-page-sec">
        <div class="container">
          <div class="logo-dv text-center">
            <a class="navbar-brand" href="./">
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

                <div class="text-right my-0">
                  <a id="forgotBtn" href="javascript:void(0);">Forgot Password</a>
                </div>

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

    <!-- Modal Thank you Success message -->
    <div class="modal fade custom-modal success-modal" id="sentEmailModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close ml-auto" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body text-center">
            <div class="img mb-4">
              <img src="./asset/img/verified.png" alt="Success">
            </div>
            <h3 class="modal-title text-center">Thank You!</h3>
            <p>Password sent.</p>

          </div><!-- modal-body -->
        </div>
      </div>
    </div>
    <!-- modal -->

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

  forgotPasswordLoad(); // forget password load

  const { $password } = customPasword(password);

  document.forms["form"].onsubmit = (e) => {
    e.preventDefault();
    loginBtn.disabled = true;
    loginBtn.innerText = "Please Wait..";
    document.querySelector("#login-error").style.display = "none";
    post(GAS, {
      type: 0,
      data: JSON.stringify({
        userName: username.value.trim(),
        password: $password(),
      }),
    }).then(async (res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, data, messege, backup, emailEnable } = res;
      if (result) {
        document.querySelector("#root").innerHTML = userPage;
        let button = document.querySelector("#emailEnable");
        document.querySelector("#backupEmail").value = backup ? backup : "";
        d.database = messege;
        d.backup = backup;
        d.emailEnable = emailEnable;
        button.innerText = d.emailEnable ? "Disable Email" : "Enable Email";
        addUserLoad(data);
      } else {
        document.querySelector("#login-error").style.display = "block";
        loginBtn.disabled = false;
        loginBtn.innerText = "Login";
      }
    });
  };
};

const forgotPasswordLoad = () => {
  let forgotBtn = document.querySelector("#forgotBtn");
  let loading = document.querySelector("#loading");

  forgotBtn.onclick = () => {
    loading.style.display = "block";

    post(GAS, {
      type: 1,
      data: JSON.stringify({}),
    }).then(async (res) => {
      res = JSON.parse(JSON.parse(res).messege);
      const { result, messege } = res;
      if (result) {
        loading.style.display = "none";
        $("#sentEmailModal").modal("show");
      }
    });
  };
};

export { login, loginLoad };
