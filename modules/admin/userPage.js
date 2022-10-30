import { d } from "../../asset/js/custom.lib.js";
import { commonLoad, searchLoad, sortingLoad } from "./common.js";
import { historyPage, historyLoad } from "./historyPage.js";

const userPage = `
<div>
  <section id="wrapper">
    <header class="site-header">
      <div class="container-fluid">
        <nav class="navbar site-navigation">
          <div class="navbar-brand">
            <a href="javascript:void(0);">
              <img src="./asset/img/logo.svg" alt="Logo" />
            </a>
          </div>

          <div class="search-dv">
            <form name="search-form" id="search_form">
              <button type="submit">
                <img src="./asset/img/search-icon.png" alt="Search" />
              </button>
              <input
                type="text"
                name="search"
                id="search"
                autocomplete="off"
                placeholder="Search"
                spellcheck="false"
              />
            </form>
            <span id="sortingBtn" class="ic-dv arrow-ic">
              <a href="javascript:void(0);">
                <img src="./asset/img/up-dwn-arr.png" alt="Icon" />
              </a>
            </span>
          </div>

          <ul class="navbar-nav">
            <li id="homeBtn">
              <a href="javascript:void(0);" class="active">
                <span class="txt">Home</span>
              </a>
            </li>
            <li id="messageBtn">
              <a href="javascript:void(0);" class="">
                <span class="icon">
                  <img
                    src="./asset/img/email.png"
                    alt="Message"
                    class="iconBlack"
                  />
                  <img
                    src="./asset/img/emailblue.png"
                    alt="Message"
                    class="iconBlue"
                  />
                </span>
                <span class="txt">Message</span>
              </a>
            </li>
            <li id="logoutBtn">
              <a href="javascript:void(0);">
                <span class="icon"
                  ><img src="./asset/img/logout.png" alt="LogOut"
                /></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <!-- container -->
    </header>

    <main class="site-main">
      <section class="user-backup-sec">
        <div class="container-fluid">
          <div class="user-backup-table-wrapp">
            <div class="user-popup-btns">
              <button
                class="custom-btn"
                data-toggle="modal"
                data-target="#addNewUserModal"
              >
                Add New User
              </button>
              <button
                class="custom-btn"
                data-toggle="modal"
                data-target="#backupModal"
              >
                Backup
              </button>
              <button id="emailEnable" class="custom-btn"
              >
                Enable Email
              </button>
              <button
                class="custom-btn"
                data-toggle="modal"
                data-target="#changePasswordModal"
              >
                Change Password
              </button>
            </div>
            <!-- user-popup-btns -->

            <table class="custom-table"></table>
          </div>
        </div>
        <!-- container -->
      </section>
      <!-- common-sec -->
    </main>
  </section>
  <!-- wrapper -->

  <!-- Modal Add new user -->
  <div
    class="modal fade custom-modal"
    id="addNewUserModal"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close ml-auto"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <h3 class="modal-title text-center">Add New User</h3>

          <section class="custom-form-sec">
            <form class="icon-form" name="addUserForm">
              <div class="mdl-input-bx">
                <label>Email</label>
                <input
                  type="text"
                  name=""
                  id="addUserEmail"
                  class="form-control"
                  autocomplete="off"
                  required
                  placeholder="Enter Email"
                  spellcheck="false"
                />
              </div>

              <div class="mdl-input-bx">
                <label>Password</label>
                <input
                  type="text"
                  name=""
                  id="addUserPass"
                  class="form-control"
                  autocomplete="off"
                  required
                  placeholder="Enter Password"
                  spellcheck="false"
                />
              </div>

              <div class="mdl-input-bx">
                <label>History</label>
                <select name="" required class="form-control" id="addUserHistory">
                  <option value="0">0 Days</option>
                  <option value="7">7 Days</option>
                  <option value="30">30 Days</option>
                  <option value="90">90 Days</option>
                  <option value="180">180 Days</option>
                  <option value="365">365 Days</option>
                </select>
              </div>

              <div class="mdl-input-bx">
                <label>IP Address (Optional)</label>
                <textarea
                  name=""
                  id="addUserIP"
                  class="form-control"
                  autocomplete="off"
                  placeholder="Enter IP Address"
                  spellcheck="false"
                ></textarea>
              </div>

              <button type="submit" id="addUserBtn" class="custom-btn popSubmit">Add</button>
              <div
                style="
                  color: red;
                  text-align: center;
                  font-size: 14px;
                  margin-top: 15px;
                  display: none;
                "
                id="adduser-error"
              >
                Please try again.
              </div>
              <div
                style="
                  color: green;
                  text-align: center;
                  font-size: 14px;
                  margin-top: 15px;
                  display: none;
                "
                id="adduser-success"
              >
                Success!
              </div>
            </form>
          </section>
          <!-- custom-form-sec -->
        </div>
        <!-- modal-body -->
      </div>
    </div>
  </div>
  <!-- modal -->

  <!-- Modal backup -->
  <div
    class="modal fade custom-modal"
    id="backupModal"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close ml-auto"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <h3 class="modal-title text-center">Backup</h3>

          <section class="custom-form-sec">
            <form id="backup-form" class="icon-form" action="" method="post">
              <div class="mdl-input-bx">
                <label>Enter Backup Email</label>
                <input
                  type="text"
                  name=""
                  id="backupEmail"
                  class="form-control"
                  autocomplete="off"
                  spellcheck="false"
                  placeholder="Enter Backup Email"
                />
              </div>

              <button id="backupBtn" type="submit" class="custom-btn popSubmit">
                Backup
              </button>
              <div
                style="
                  color: red;
                  text-align: center;
                  font-size: 14px;
                  margin-top: 15px;
                  display: none;
                "
                id="backup-error"
              >
                Please try again.
              </div>
              <div
                style="
                  color: green;
                  text-align: center;
                  font-size: 14px;
                  margin-top: 15px;
                  display: none;
                "
                id="backup-success"
              >
                Success!
              </div>
            </form>
          </section>
          <!-- custom-form-sec -->
        </div>
        <!-- modal-body -->
      </div>
    </div>
  </div>
  <!-- modal -->

  <!-- Modal Change Password -->
  <div
    class="modal fade custom-modal"
    id="changePasswordModal"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close ml-auto"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <h3 class="modal-title text-center">Change Password</h3>

          <section class="custom-form-sec">
            <form
              class="icon-form"
              action=""
              name="changePasswordForm"
              method="post"
            >
              <div class="mdl-input-bx">
                <label>Enter Old Password</label>
                <input
                  minlength="5"
                  type="text"
                  spellcheck="false"
                  name=""
                  required
                  id="oldPass"
                  class="form-control"
                  autocomplete="off"
                  spellcheck="false"
                  placeholder="Enter Old Password"
                />
              </div>

              <div class="mdl-input-bx">
                <label>Enter New Password</label>
                <input
                  minlength="5"
                  type="text"
                  spellcheck="false"
                  name=""
                  required
                  id="newPass"
                  class="form-control"
                  autocomplete="off"
                  spellcheck="false"
                  placeholder="Enter New Password"
                />
              </div>

              <div class="mdl-input-bx">
                <label>Confirm New Password</label>
                <input
                  minlength="5"
                  type="text"
                  spellcheck="false"
                  name=""
                  required
                  id="conNewPass"
                  class="form-control"
                  autocomplete="off"
                  spellcheck="false"
                  placeholder="Confirm New Password"
                />
              </div>

              <button
                type="submit"
                id="changePasswordBtn"
                class="custom-btn popSubmit"
              >
                Change
              </button>

              <div
                style="
                  color: red;
                  text-align: center;
                  font-size: 14px;
                  margin-top: 15px;
                  display: none;
                "
                id="changePassword-error"
              >
                Please try again.
              </div>
              <div
                style="
                  color: green;
                  text-align: center;
                  font-size: 14px;
                  margin-top: 15px;
                  display: none;
                "
                id="changePassword-success"
              >
                Success!
              </div>
            </form>
          </section>
          <!-- custom-form-sec -->
        </div>
        <!-- modal-body -->
      </div>
    </div>
  </div>
  <!-- modal -->

  <div style="" id="loading">
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </div>
</div>
`;

const showData = (data, type = "") => {
  const { post, GAS, database } = d;
  let table = document.querySelector(".custom-table");
  let loading = document.querySelector("#loading");
  let result = "";
  let index = 1;
  let idList = [];
  for (let x of data) {
    let id = index;
    if (type) id = x[5];
    idList.push({ id: id, database: x[4] });
    result += `
    <tr>
  		<td>${x[0].substr(1)}</td>
  		<td>${x[1].substr(1)}</td>
  		<td>${x[2].substr(1)} Days</td>
  		<td>${x[3] != "x" ? x[3].substr(1).replace(/,/g, "<br>") : "-"}</td>
      <td style="min-width: 100px">
        <button id="history-${id}" class="tb-btn-smpl delete text-center">
          <span class="icon"
            ><img
              src="./asset/img/share-clock.png"
              alt="History"
          /></span>
        </button>
      </td>
      <td  style="min-width: 100px">
        <button id="delete-${id}" class="tb-btn-smpl delete text-center">
          <span class="icon"
            ><img
              src="./asset/img/Icon-feather-trash.png"
              alt="Trash"
          /></span>
        </button>
      </td>
  	</tr>
    `;
    index++;
  }

  table.innerHTML = `
  <tr>
		<th>Email</th>
		<th>Password</th>
		<th>History</th>
		<th>IP Address</th>
		<th style="min-width: 100px" class="text-center"></th>
    <th  style="min-width: 100px" class="text-center"></th>
	</tr>
	${result}
  `;

  for (let x of idList) {
    let button = document.querySelector(`#delete-${x.id}`);
    let history = document.querySelector(`#history-${x.id}`);
    // delete
    button.onclick = async () => {
      loading.style.display = "block";
      let res = await post(GAS, {
        type: 6,
        data: JSON.stringify({
          id: x.id,
          database: database,
        }),
      });
      res = JSON.parse(JSON.parse(res).messege);
      showData(res.data);
      searchLoad(res.data, showData, [0]);
      document.querySelector("#search").value = "";
    };

    // history load
    history.onclick = async () => {
      document.querySelector("#root").innerHTML = historyPage;
      historyLoad(x.database.substr(1));
    };
  }
  table.style.display = "table";
  loading.style.display = "none";
  sortingLoad(0, data, type, showData);
};

const addUserLoad = (data) => {
  const { post, GAS, database } = d;
  commonLoad(1);
  showData(data);
  searchLoad(data, showData, [0]);
  let email = document.querySelector("#addUserEmail");
  let password = document.querySelector("#addUserPass");
  let history = document.querySelector("#addUserHistory");
  let ip = document.querySelector("#addUserIP");
  let button = document.querySelector("#addUserBtn");
  let error = document.querySelector("#adduser-error");
  let success = document.querySelector("#adduser-success");
  let loading = document.querySelector("#loading");

  document.forms["addUserForm"].onsubmit = (e) => {
    e.preventDefault();
    button.innerText = "Adding..";
    error.style.display = "none";
    success.style.display = "none";
    loading.style.display = "block";

    let ipValue = ip.value.replace(/\n/g, ",");
    if (ipValue.slice(-1) == ",") {
      ipValue = ipValue.slice(0, -1);
    }
    post(GAS, {
      type: 4,
      data: JSON.stringify({
        date: "",
        email: email.value.trim(),
        pass: password.value,
        history: history.value,
        ip: ipValue,
        database: database,
      }),
    })
      .then(async (res) => {
        res = JSON.parse(JSON.parse(res).messege);
        const { result, messege, data } = res;
        if (result) {
          if (messege != "success") {
            button.innerText = "Add";
            error.innerHTML = "User already exist!";
            error.style.display = "block";
            loading.style.display = "none";
          } else {
            showData(data);
            searchLoad(data, showData, [0]);
            e.target.reset();
            button.innerText = "Add";
            success.innerText = "Successfully added new user!";
            success.style.display = "block";
            loading.style.display = "none";
          }
        } else {
          console.log(res);
          button.innerText = "Add";
          error.innerHTML = "Error Found! Please try again.";
          error.style.display = "block";
          loading.style.display = "none";
        }
      })
      .catch((err) => {
        console.log(err);
        button.innerText = "Add";
        error.innerText = "Error Found! Please try again.";
        error.style.display = "block";
        loading.style.display = "none";
      });
  };
};

export { userPage, addUserLoad };
