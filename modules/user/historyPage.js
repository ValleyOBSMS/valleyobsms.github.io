import { d } from "../../asset/js/custom.lib.js";
import { commonLoad, searchLoad, sortingLoad, download } from "./common.js";
import IDB from "../../asset/js/idb.js";
const { PDFDocument, StandardFonts } = PDFLib;

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
            <li id="historyBtn">
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

const breakLine = (data) => {
  let dataArray = data.split(" ");
  let result = "";
  let line = "";
  let maxChr = 67;

  for (let i = 0; i < dataArray.length; i++) {
    let x = dataArray[i];
    line += x + " ";
    if (line.length > maxChr) {
      line = line.substr(0, line.length - x.length - 1);
      result += line + "\n";
      line = x + " ";
    }

    if (i == dataArray.length - 1) {
      result += line;
    }
  }

  return result;
};

const createPdf = async (obj) => {
  const fontSize = 13;
  const size = [];

  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  for (let key in obj) {
    size.push(helveticaBold.widthOfTextAtSize(key, fontSize));
  }

  let initY = 50;
  let maxH = helveticaBold.heightAtSize(fontSize);
  let maxW = Math.max(...size);

  const page = pdfDoc.addPage();

  for (let key in obj) {
    page.drawText(key, {
      x: 50,
      y: page.getHeight() - initY,
      size: fontSize,
      font: helveticaBold,
    });

    page.drawText(":", {
      x: maxW + 60,
      y: page.getHeight() - initY,
      size: fontSize,
      font: helveticaBold,
    });

    page.drawText(obj[key], {
      x: maxW + 70,
      y: page.getHeight() - initY,
      size: fontSize,
      font: helvetica,
    });

    initY += maxH + 10;
  }

  console.log(page);

  let pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });
  return pdfBytes;
};

const showData = (Data, type = "", page) => {
  let data;
  let num = 0;
  let index = 0;
  if (page == undefined) {
    $("#pagination-short").html("");
    let lastPage = Math.floor(Data.length / 50);
    if (lastPage != Data.length) {
      lastPage++;
    }
    $("#pagination-short").materializePagination({
      align: "center",
      lastPage: lastPage,
      firstPage: 1,
      useUrlParameter: false,
      onClickCallback: function (requestedPage) {
        showData(Data, type, requestedPage);
      },
    });
    data = Data.slice(0, 50);
  } else {
    num = (page - 1) * 50;
    index = (page - 1) * 50;
    data = Data.slice(num , num + 50);
  }

  const { dateCovert } = d;
  let table = document.querySelector(".custom-table");
  let loading = document.querySelector("#loading");
  let result = "";
  let idList = [];
  for (let x of data) {
    // console.log(x);
    num++;
    idList.push({
      index,
      name: x[2].substr(1) ? x[2].substr(1) : x[1].substr(1),
      obj: {
        "Date & Time": `${dateCovert(x[0])}  ${getTime(x[0])}`,
        Email: x[1].substr(1),
        "Phone No.": x[2].substr(1),
        Message: breakLine(x[3].substr(1)),
      },
    });

    let exportField = `
        <button id="export-${index}" class="tb-btn-smpl download">
          <span class="icon"><img src="./asset/img/download.png" alt="Download"/></span>
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
  <tr>
    <th>#</th>
    <th>Date & Time</th>
    <th>Email</th>
    <th>Phone No.</th>
    <th>Message</th>
    <th style="min-width: 180px;"></th>
  </tr>
	${result}
  `;

  for (let x of idList) {
    let exportBtn = document.querySelector(`#export-${x.index}`);
    exportBtn.onclick = async () => {
      loading.style.display = "block";
      const base64 = await createPdf(x.obj);
      download(x.name, base64);
    };
  }
  table.style.display = "table";
  loading.style.display = "none";
  sortingLoad(2, data, type, showData, null, page);
};

const historyLoad = async () => {
  const idb = new IDB("com.valleyobSMSApp");
  await idb.createDataBase(d.userEmail, {
    keyPath: "id",
  });

  let data = await idb.getAllValues("value");
  // console.log(data);
  let oldTime = data.length ? data[data.length - 1][0] : "";

  const { post, GAS, database, history } = d;
  commonLoad();
  post(GAS, {
    type: 17,
    data: JSON.stringify({
      database: database,
      history: history,
      oldLength: data.length,
      oldTime,
    }),
  })
    .then(async (res) => {
      res = JSON.parse(JSON.parse(res).messege);
      if (res.result) {
        let resData = res.data;
        const finalData = [];
        resData.forEach((element) => {
          finalData.push({
            id: element[0] + element[1] + element[2],
            value: element,
          });
        });

        if (res.type != "update") {
          await idb.delete();
          await idb.createDataBase(d.userEmail, {
            keyPath: "id",
          });
        }
        if (finalData.length) await idb.add(finalData);
        data = await idb.getAllValues("value");

        const renderData = [];
        data.forEach(async (v) => {
          if (res.now - v[0] > d.history * 24 * 60 * 60 * 1000) {
            await idb.remove(v[4]);
          } else {
            renderData.push(v);
          }
        });

        renderData.sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
        showData(renderData);
        searchLoad(renderData, showData, [1, 2, 3]);
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export { historyPage, historyLoad };
