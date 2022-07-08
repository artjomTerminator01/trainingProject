import { generateMealPlan } from "./mealPlan-generator.js";
import "../styles/pages/resultStyle.scss";
import "../styles/base/style.scss";
import "../styles/base/navbar.scss";

window.addEventListener("load", () => {
  const params = new URL(document.location).searchParams;
  const name = params.get("name");
  const age = params.get("age");
  const weight = params.get("weight");
  const height = params.get("height");
  const gender = params.get("gender");
  const activity = params.get("active");
  const allergies = params.getAll("allergie");
  const preferences = params.getAll("pref");

  const calorieIntake = calculateCalories(
    age,
    weight,
    height,
    gender,
    activity
  );
  const carbs = ((calorieIntake * 0.5) / 4).toFixed(2);
  const protein = ((calorieIntake * 0.3) / 4).toFixed(2);
  const fats = ((calorieIntake * 0.2) / 9).toFixed(2);

  const plan = generateMealPlan(calorieIntake, allergies, preferences);

  const dayMealPlan = plan[0];
  const weekMealPlan = plan[1];

  document.getElementById("calories").innerHTML = calorieIntake.toFixed(2);
  document.getElementById("carbs").innerHTML = carbs;
  document.getElementById("proteins").innerHTML = protein;
  document.getElementById("fats").innerHTML = fats;
  document.getElementById("total").innerHTML = dayMealPlan.dayCalories;

  document.getElementById("total-mon").innerHTML = weekMealPlan[0].dayCalories;
  document.getElementById("total-tue").innerHTML = weekMealPlan[1].dayCalories;
  document.getElementById("total-wed").innerHTML = weekMealPlan[2].dayCalories;
  document.getElementById("total-thu").innerHTML = weekMealPlan[3].dayCalories;
  document.getElementById("total-fri").innerHTML = weekMealPlan[4].dayCalories;
  document.getElementById("total-sat").innerHTML = weekMealPlan[5].dayCalories;
  document.getElementById("total-sun").innerHTML = weekMealPlan[6].dayCalories;

  document.getElementById("result-name").innerHTML = name;

  const dayTable = [document.getElementById("day-meal")];
  const weekTableList = Array.from(
    document.getElementsByClassName("week-meal")
  );

  generateTableHeadWeekPlan(dayTable, weekMealPlan, "breakfast");

  generateTableHeadWeekPlan(weekTableList, weekMealPlan, "lunch");

  function generateTableHeadWeekPlan(table, mealPlan, type) {
    let loopStart = 0;
    let loopEnd = weekMealPlan.length;
    if (type == "breakfast") {
      loopStart = 3;
      loopEnd = 4;
    }

    for (let i = loopStart; i < loopEnd; i++) {
      for (let element of mealPlan[i].breakfastList) {
        let row = table[0].insertRow();

        if (type != "breakfast") {
          row = table[i].insertRow();
        }
        let cell = row.insertCell();
        let text = document.createTextNode("BREAKFAST");
        cell.appendChild(text);
        for (let key in element) {
          if (key != "score") {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
          }
        }
      }
      for (let element of mealPlan[i].lunchesAndDinnersList) {
        let row = table[0].insertRow();

        if (type != "breakfast") {
          row = table[i].insertRow();
        }
        let cell = row.insertCell();
        let text = document.createTextNode("LUNCH OR DINNER");
        cell.appendChild(text);
        for (let key in element) {
          if (key != "score") {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
          }
        }
      }
    }
  }
});

function calculateCalories(age, weight, height, gender, activity) {
  let activityMultiplier = 1;
  if (activity == "8-10") {
    activityMultiplier = 1.3;
  } else if (activity == "4-7") {
    activityMultiplier = 1.15;
  }
  if (gender == "male") {
    return (10 * weight + 6.25 * height - 5 * age + 5) * activityMultiplier;
  } else if (gender == "female") {
    return (10 * weight + 6.25 * height - 5 * age - 161) * activityMultiplier;
  }
}
