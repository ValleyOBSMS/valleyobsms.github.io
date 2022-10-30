import { login, loginLoad } from "../../modules/admin/login.js";

console.log("ValleyOB SMS Application.");

document.querySelector("#root").innerHTML = login;
loginLoad();
