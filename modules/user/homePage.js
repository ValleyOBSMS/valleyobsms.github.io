import { d } from "../../asset/js/custom.lib.js";
import { commonLoad } from "./common.js";

const homePage = `
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

            <ul class="navbar-nav">
              <li id="homeBtn">
                <a href="javascript:void(0);" class="active">
                  <span class="txt">Home</span>
                </a>
              </li>
              <li id="historyBtn">
                <a href="javascript:void(0);">
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
        <form name="secure-message-form">
        <section class="user-sms-form-sec">
          <div class="container-fluid">
            <div class="user-sms-form-wrapp">
              <div class="mdl-input-bx">
                <label>Select Message</label>
                <div class="select-input-bx select-input-message-wrapp">
                  <select name="" required class="form-control" id="select-input-message">
                    
                  </select>
                </div>
              </div>

              <div class="mdl-input-bx custom-message-wrapp">
                <label>Custom Message</label>
                <input type="text" name="" id="custom-message" class="form-control" autocomplete="off" placeholder="Enter Custom Message"/>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="mdl-input-bx">
                    <label>Email</label>
                    <input oninput="inputPrevent(event)" type="text" name="" id="Email" class="form-control" autocomplete="off" placeholder="Copy & paste only"/>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="mdl-input-bx">
                    <label>Phone Number</label>
                    <input oninput="inputPrevent(event)" type="text"  name="" id="Phone" class="form-control" autocomplete="off" placeholder="Copy & paste only"/>
                  </div>
                </div>
              </div>
              
              <button id="sendBtn" type="submit" class="custom-btn text-uppercase" style="min-width: 180px;">Send</button>
              <p style="display: none" class="msg-success text-center">
                Message Sent
              </p>
              <p style="display: none" class="msg-error text-center">
                Message Sent
              </p>
            </div>

          </div><!-- container -->
        </section><!-- common-sec -->
        </form>
      </main>
    </section>

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

const showData = (data) => {
  data = data.reverse();
  let messages = document.querySelector("#select-input-message");
  let loading = document.querySelector("#loading");
  let result = "";
  let index = 0;
  let idList = [];
  for (let x of data) {
    idList.push(index);
    result += `<option value="${x[0].substr(1)}">${x[0].substr(1)}</option>`;
    index++;
  }
  messages.innerHTML = `
    <option value="">Select a Message...</option>
    ${result}
    <option value="custom">Custom</option>
  `;

  $("#select-input-message").select2();
	
	$('.custom-message-wrapp').hide();
	$('#custom-message').prop("disabled", true);
	
	$("#select-input-message").change(function() {
		if(( $('option:selected', this).val() =='custom' )){
      $('#custom-message').val('');
			$('.custom-message-wrapp').show();
      $('#custom-message').prop("required", true);
			$('#custom-message').prop("disabled", false);
		}else{
			$('#custom-message').val($('option:selected', this).val());
			$('#custom-message').prop("disabled", true);
      $('#custom-message').prop("required", false);
			$('.custom-message-wrapp').hide();
		}
	});
  
  loading.style.display = "none";
};

const homeLoad = (data, emailEnable) => {
  const { post, GAS, database } = d;
  commonLoad();
  showData(data);

  let Phone = document.querySelector("#Phone");
  let Email = document.querySelector("#Email");
  let button = document.querySelector("#sendBtn");
  let error = document.querySelector(".msg-error");
  let success = document.querySelector(".msg-success");
  let loading = document.querySelector("#loading");

  if(emailEnable){
    Email.disabled = false;
    Email.placeholder = "Copy & paste only"
  } else{
    Email.disabled = true;
    Email.placeholder = "Email Option Temporarily Disabled."
  }

  document.forms["secure-message-form"].onsubmit = async (e) => {
    e.preventDefault();

    let custom_message = document.querySelector("#custom-message");

    error.style.display = "none";

    if(emailEnable){
      if(Email.value.trim() == "" && Phone.value.trim() == ""){
        error.style.display = "block";
        error.innerText = "Email or Phone No. Required.";
        return;
      }

      if(Email.value.trim() != "" && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email.value.trim()) == false){
        error.style.display = "block";
        error.innerText = "Valid Email Required.";
        return;
      }

      if(Phone.value.trim() != "" && /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(Phone.value.trim()) == false){
        error.style.display = "block";
        error.innerText = "Valid Phone No. Required.";
        return;
      }

    } else if(Phone.value.trim() != "" && /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(Phone.value.trim()) == false){
      error.style.display = "block";
      error.innerText = "Valid Phone No. Required.";
      return;
    } else{
      error.style.display = "block";
      error.innerText = "Phone No. Required.";
      return;
    }

    button.innerText = "Sending...";

    success.style.display = "none";
    loading.style.display = "block";

    post(GAS, {
      type: 16,
      data: JSON.stringify({
        time: "",
        email: Email.value.trim(),
        phone: Phone.value.trim().replace(/ /g, "").replace(/-/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\./g, ""),
        sms: custom_message.value,
        database: database,
      }),
    })
      .then((res) => {
        res = JSON.parse(JSON.parse(res).messege);
        const { result, message } = res;
        if (result) {
          e.target.reset();
          $('.custom-message-wrapp').hide();
	        $('#custom-message').prop("disabled", true);
          $("#select-input-message").select2('destroy');
          $("#select-input-message").select2();
          button.innerText = "Send";
          loading.style.display = "none";
          success.style.display = "block";
        } else {
          console.log(res);
          error.style.display = "block";
          error.innerText = message;
          button.innerText = "Send";
          loading.style.display = "none";
        }
      })
      .catch((err) => {
        console.log(err);
        error.style.display = "block";
        error.innerText = "Error found!";
        button.innerText = "Send";
        loading.style.display = "none";
      });
  };
};

export { homePage, homeLoad };
