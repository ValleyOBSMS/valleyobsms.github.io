import { d } from "../../asset/js/custom.lib.js";
import { commonLoad, searchLoad, sortingLoad, download } from "./common.js";

const historyPage = `
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
                spellchaeck="false"
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
            <li>
              <a href="javascript:void(0);" class="active">
                <span class="icon">
                  <img
                    src="./asset/img/share-clock.png"
                    alt="History"
                    class="iconBlack"
                  />
                  <img
                    src="./asset/img/share-clock-blue.png"
                    alt="History"
                    class="iconBlue"
                  />
                </span>
                <span class="txt">History</span>
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
          <div class="user-backup-table-wrapp pt-5" style="margin-left: 100px;">
            <table class="custom-table"></table>
          </div>
        </div>
        <!-- container -->
      </section>
      <!-- common-sec -->
    </main>
  </section>
  <!-- wrapper -->

 <div id="pagination-short"></div>

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

const getTime = (date) => {
  let time = new Date(date);
  return (
    String(time.getHours()).padStart(2, "0") +
    ":" +
    String(time.getMinutes()).padStart(2, "0") +
    ":" +
    String(time.getSeconds()).padStart(2, "0")
  );
};

const showData = ({ user, database, data: Data }, type = "", page) => {
  let data;
  let num = 0;
  let index = 1;
  if(page == undefined){
    $("#pagination-short").html("");
    let lastPage = Math.floor(Data.length/50);
    if(lastPage != Data.length){
      lastPage++;
    }
    $("#pagination-short").materializePagination({
      align: "center",
      lastPage: lastPage,
      firstPage: 1,
      useUrlParameter: false,
      onClickCallback: function (requestedPage) {
        showData({ user, database, data: Data }, type, requestedPage);
      },
    });
    data = Data.slice(0, 50)
  } else{
    num = (page - 1) * 50;
    index = (page - 1) * 50 + 1;
    data = Data.slice(num , num + 50);
  }
  const { dateCovert } = d;
  const { post, GAS } = d;
  let table = document.querySelector(".custom-table");
  let loading = document.querySelector("#loading");
  let result = "";
  let idList = [];
  for (let x of data) {
    num++;
    let id = index;
    if (type) id = x[6];
    idList.push({
      id,
      name: x[2].substr(1),
    });

    let exportField = `
        <button id="export-${index}" class="tb-btn-smpl download">
          <span class="icon"><img src="asset/img/Icon-feather-trash.png" alt="Download"/></span>
        </button>
      `;

    result += `
    <tr>
      <td>${num}</td>
      <td><span>${dateCovert(x[0])}</span> &nbsp;&nbsp; <span> ${getTime(
      x[0]
    )}</span></td>
      <td>${x[1].substr(1)}</td>
      <td>${x[2].substr(1)}</td>
      <td>${x[3].substr(1).substr(0, 30) + "..."}</td>
      <td class="text-center">
        ${exportField}
      </td>
    </tr>
    `;
    index++;
  }

  table.innerHTML = `
  <caption
    style="
      text-align: center;
      display: table-caption;
      font-weight: 600;
      font-size: 18px;
      caption-side: top;
      color: #000;
      margin-bottom: 10px;
    "
  >
    ${user}
  </caption>
  <tr>
    <th>#</th>
    <th>Date & Time</th>
    <th>Email</th>
    <th>Phone No.</th>
    <th>Message</th>
    <th class="text-center position-relative">
      <button id="clearAllBtn" class="custom-btn popSubmit" style="position: absolute;top: -50px;left: -33px;right: 0;margin: 0 auto; max-width: 230px; padding: 10px 20px; width: 136px;">
        Clear History
      </button>
      <span>Delete</span>
    
    </th>
    <th style="min-width: 180px;"></th>
  </tr>
	${result}
  `;

  for (let x of idList) {
    //console.log(x)
    let exportBtn = document.querySelector(`#export-${x.id}`);
    // delete
    exportBtn.onclick = async () => {
      loading.style.display = "block";
      let res = await post(GAS, {
        type: 11,
        data: JSON.stringify({
          id: x.id,
          database: database,
        }),
      });
      res = JSON.parse(JSON.parse(res).messege);
      showData(res);
      searchLoad(res.data, showData, [1, 2, 3], res);
      document.querySelector("#search").value = "";
    };
  }
  table.style.display = "table";
  loading.style.display = "none";

  // clear all history
  let clearAllBtn = document.querySelector("#clearAllBtn");
  clearAllBtn.onclick = async () => {
    clearAllBtn.innerHTML = "Processing...";
    loading.style.display = "block";
    let res = await post(GAS, {
      type: 12,
      data: JSON.stringify({
        database: database,
      }),
    });
    res = JSON.parse(JSON.parse(res).messege);
    clearAllBtn.innerHTML = "Clear History";
    showData(res);
    searchLoad(res.data, showData, [1, 2, 3], res);
    document.querySelector("#search").value = "";
  };
  sortingLoad(2, data, type, showData, { user, database, data }, page);
};

const historyLoad = (database) => {
  const { post, GAS } = d;
  commonLoad();
  post(GAS, {
    type: 10,
    data: JSON.stringify({
      database: database,
    }),
  })
    .then(async (res) => {
      res = JSON.parse(JSON.parse(res).messege);
      if (res.result) {
        showData(res);
        searchLoad(res.data, showData, [1, 2, 3], res);
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export { historyPage, historyLoad };
