import { d } from "../../asset/js/custom.lib.js";
import { commonLoad, searchLoad, sortingLoad } from "./common.js";

const messagePage = `
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
                placeholder="Search"
                autocomplete="off"
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
              <a href="javascript:void(0);" class="">
                <span class="txt">Home</span>
              </a>
            </li>
            <li id="messageBtn">
              <a href="javascript:void(0);" class="active">
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
                data-target="#messageModal"
              >
                Add New Message
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

  <!-- Modal Message -->
  <div
    class="modal fade custom-modal"
    id="messageModal"
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
          <h3 class="modal-title text-center">Message</h3>

          <section class="custom-form-sec">
            <form name="addMessageForm" class="icon-form" action="" method="post">
              <div class="mdl-input-bx">
                <label>Enter Your Message</label>
                <textarea
                  name=""
                  id="addMessageValue"
                  class="form-control"
                  autocomplete="off"
                  required
                  placeholder="Enter Your Message"
                  spellcheck="false"
                ></textarea>
              </div>

              <button type="submit" id="addMessageBtn" class="custom-btn popSubmit">Save</button>
              <div
              style="
                color: red;
                text-align: center;
                font-size: 14px;
                margin-top: 15px;
                display: none;
              "
              id="addMessage-error"
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
              id="addMessage-success"
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
  const { post, GAS, database, dateCovert } = d;
  let table = document.querySelector(".custom-table");
  let loading = document.querySelector("#loading");
  let result = "";
  let index = 1;
  let idList = [];
  for (let x of data) {
    let id = index;
    if (type) id = x[2];
    idList.push(id);
    result += `
    <tr>
  		<td>${dateCovert(x[0].substr(1))}</td>
  		<td>${x[1].substr(1)}</td>
      <td class="text-center">
        <button id="delete-${id}" class="tb-btn-smpl delete text-center">
          <span class="icon"><img src="./asset/img/Icon-feather-trash.png" alt="Trash"/></span>
        </button>
      </td>
  	</tr>
    `;
    index++;
  }

  table.innerHTML = `
  <tr>
    <th>Date</th>
    <th>Message</th>
    <th class="text-center"></th>
  </tr>
	${result}
  `;

  for (let x of idList) {
    let button = document.querySelector(`#delete-${x}`);
    // delete
    button.onclick = async () => {
      loading.style.display = "block";
      let res = await post(GAS, {
        type: 9,
        data: JSON.stringify({
          id: x,
          database: database,
        }),
      });
      res = JSON.parse(JSON.parse(res).messege);
      showData(res.data);
      searchLoad(res.data, showData, [1]);
      document.querySelector("#search").value = "";
    };
  }
  table.style.display = "table";
  loading.style.display = "none";
  sortingLoad(0, data, type, showData);
};

const addMessageLoad = (data) => {
  const { post, GAS, database } = d;
  commonLoad();
  showData(data);
  searchLoad(data, showData, [1]);
  let message = document.querySelector("#addMessageValue");
  let button = document.querySelector("#addMessageBtn");
  let error = document.querySelector("#addMessage-error");
  let success = document.querySelector("#addMessage-success");
  let loading = document.querySelector("#loading");

  document.forms["addMessageForm"].onsubmit = (e) => {
    e.preventDefault();
    button.innerText = "Saving..";
    error.style.display = "none";
    success.style.display = "none";
    loading.style.display = "block";

    post(GAS, {
      type: 7,
      data: JSON.stringify({
        date: "",
        message: message.value.trim(),
        database: database,
      }),
    })
      .then(async (res) => {
        res = JSON.parse(JSON.parse(res).messege);
        const { result, data } = res;
        if (result) {
          showData(data);
          searchLoad(data, showData, [1]);
          e.target.reset();
          button.innerText = "Save";
          success.innerText = "Successfully saved new message!";
          success.style.display = "block";
          loading.style.display = "none";
        } else {
          console.log(res);
          button.innerText = "Save";
          error.innerHTML = "Error Found! Please try again.";
          error.style.display = "block";
          loading.style.display = "none";
        }
      })
      .catch((err) => {
        console.log(err);
        button.innerText = "Save";
        error.innerText = "Error Found! Please try again.";
        error.style.display = "block";
        loading.style.display = "none";
      });
  };
};

export { messagePage, addMessageLoad };
