// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  myFunction();
};

// Get the header
var header = document.getElementById("navigation");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function pConsole() {
  let name = document.getElementById("name");

  if (name.value !== "") {
    console.log("Your name:" + name.value);
  } else {
    alert("Enter your name");
  }

  let email = document.getElementById("email");
  if (validateEmail(email)) {
    console.log("correct email");
  }

  let age = document.getElementById("age");
  if (validateAge(age.value)) {
    console.log("Age: " + age.value);
  }

  let weight = document.getElementById("weight");
  if (validateWeight(weight.value)) {
    console.log("Your weight: " + weight.value + " kg");
  }

  let height = document.getElementById("height");

  if (validateHeight(height.value)) {
    console.log("Your height: " + height.value + " cm");
  }

  if (document.querySelector('input[name="gender"]:checked')) {
    console.log(
      "Gender: " + document.querySelector('input[name="gender"]:checked'.value)
    );
  } else {
    alert("Choose your gender!");
  }

  if (document.querySelector('input[name="activity"]:checked')) {
    console.log("Activity: " + activity.value);
  } else {
    alert("Choose activity!");
  }

  let doesSports = document.getElementById("sport");
  if (doesSports.checked == true) {
    console.log("Does sports");
  } else {
    console.log("Does not do sports");
  }

  let hasADog = document.getElementById("dog");
  if (hasADog.checked == true) {
    console.log("Has a dog");
  } else {
    console.log("Does not have a dog");
  }
}

function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
}

function validateWeight(weight) {
  if (weight < 300 && weight > 30) {
    return true;
  } else {
    alert("Your weight is strange");
    return false;
  }
}

function validateAge(age) {
  if (age < 100 && age > 17) {
    return true;
  } else {
    alert("You are too young or too old!");
    return false;
  }
}

function validateHeight(height) {
  if (height < 250 && height > 100) {
    return true;
  } else {
    alert("Invalid height");
    return false;
  }
}
