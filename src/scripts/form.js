import { hasNumber } from "./formsUtils.js";
import "../styles/pages/formStyle.scss";
import "../styles/base/style.scss";
import "../styles/base/navbar.scss";

const form = document.getElementsByTagName("form")[0];

const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");
let name = document.getElementById("name");
const nameError = document.querySelector("#name + span.name-error");

const age = document.getElementById("age");
const weight = document.getElementById("weight");
const height = document.getElementById("height");

if (document.getElementById("male").checked) {
  console.log("male");
} else if (document.getElementById("female").checked) {
  console.log("female");
} else {
  console.log("none");
}

name.addEventListener("input", function (event) {
  if (!hasNumber(name.value) && name.value != "") {
    nameError.textContent = "";
    nameError.className = "name-error";
  } else {
    nameError.className = "name-error-active";
    nameError.textContent = "Name can not contain numbers or be empty";
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

function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

form.addEventListener("submit", function (event) {
  if (
    !validateEmail(email.value) ||
    hasNumber(name.value) ||
    !name.value ||
    !age.value ||
    !weight.value ||
    !height.value ||
    (!document.getElementById("male").checked &&
      !document.getElementById("female").checked)
  ) {
    event.preventDefault();
  }
});
