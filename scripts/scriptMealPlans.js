function pConsole() {
    let name = document.getElementById("name");
    console.log("Your name:" + name.value);

    let weight = document.getElementById("weight");
    console.log("Your weight:" + weight.value + " kg");

    let height = document.getElementById("height");
    console.log("Your height:" + height.value + " cm");

    let gender = document.querySelector('input[name="gender"]:checked');
    console.log("Gender: " + gender.value);

    let doesSports = document.getElementById("sport");
    if (doesSports.checked == true){
        console.log("Does sports");
    } else {
        console.log("Does not do sports");
    }

    let hasADog = document.getElementById("dog");
    if (hasADog.checked == true){
        console.log("Has a dog");
    } else {
        console.log("Does not have a dog");
    }
  }
