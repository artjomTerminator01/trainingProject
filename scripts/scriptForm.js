import { hasNumber } from "./scriptFormsUtils.js";

window.onscroll = function () {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};

var header = document.getElementById("navigation");

var sticky = header.offsetTop;

const form = document.getElementsByTagName("form")[0];

const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");
let name = document.getElementById("name");
const nameError = document.querySelector("#name + span.name-error");

const age = document.getElementById("age");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const doesSports = document.getElementById("sport");

name.addEventListener("input", function (event) {
  if (!hasNumber(name.value) && name.value != "") {
    nameError.textContent = "";
    nameError.className = "name-error";
  } else {
    nameError.className = "name-error-active";
    nameError.textContent = "Name can not contain numbers";
  }
});

email.addEventListener("input", function (event) {
  if (validateEmail(email.value)) {
    console.log("ok");
    emailError.textContent = "";
    emailError.className = "error";
  } else {
    emailError.className = "error-active";
    emailError.textContent = "Incorrect or empty email";
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault;
  // if (1 == 1) {
  //   alert("hui");
  //   event.pre ventDefault;
  // }
});

function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}
