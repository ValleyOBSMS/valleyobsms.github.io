import { d } from "../asset/js/custom.lib.js";

// search load
const searchLoad = (data, callback, indexs, type = null) => {
  let search = document.querySelector("#search");

  document.forms["search-form"].onsubmit = (e) => {
    e.preventDefault();
    let finalData = [];
    let usedData = [];
    for (let i = 0; i < data.length; i++) {
      indexs.forEach((value) => {
        if (
          data[i][value].toLowerCase().indexOf(search.value.toLowerCase()) >
            -1 &&
          usedData.indexOf(i) == -1
        ) {
          data[i].push(i + 1);
          finalData.push(data[i]);
          usedData.push(i);
        }
      });
    }
    if (type === null) callback(finalData, 1);
    else {
      type.data = finalData;
      callback(type, 1);
    }
  };
};

// sortin load
const sortingLoad = (index, data, type, callback, res = null, page) => {
  let sortingBtn = document.querySelector("#sortingBtn");
  let loading = document.querySelector("#loading");
  sortingBtn.onclick = () => {
    if (data.length) {
      loading.style.display = "block";

      let data1 = data[0][index];
      if (type == "") {
        data.forEach((v, i) => {
          data[i].push(i + 1);
        });
        type = 1;
      }

      data = data.sort((a, b) => {
        let x = a[index].substr(1).toLowerCase();
        let y = b[index].substr(1).toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });

      if (data[0][index] === data1) {
        data = data.reverse();
      }

      if (res === null) callback(data, type, page);
      else {
        res.data = data;
        callback(res, type, page);
      }
    }
  };
};

// download file
const download = async (fileName, base64) => {
  let loading = document.querySelector("#loading");
  loading.style.display = "block";
  const anchor = document.createElement("a");
  if ("download" in anchor) {
    //html5 A[download]
    anchor.href = base64;
    anchor.setAttribute("download", fileName + ".pdf");
    anchor.innerHTML = "downloading...";
    anchor.style.display = "none";
    anchor.addEventListener("click", function (e) {
      e.stopPropagation();
    });
    document.body.appendChild(anchor);
    setTimeout(function () {
      anchor.click();
      document.body.removeChild(anchor);
      loading.style.display = "none";
    }, 66);
  }
};

export { searchLoad, sortingLoad, download };
