class mealPlan {
  constructor(calorieLimit) {
    this.calorieLimit = calorieLimit;
    this.dayCalories = 0;
    this.carbs = 0;
    this.proteins = 0;
    this.fats = 0;
    this.breakfastList = [];
    this.lunchesAndDinnersList = [];
  }

  addBreakfast(breakfast) {
    if (this.dayCalories + breakfast.kcal <= this.calorieLimit) {
      this.breakfastList.push(breakfast);
      this.dayCalories += breakfast.kcal;
      this.carbs += breakfast.carbs;
      this.proteins += breakfast.protein;
      this.fats += breakfast.fat;
    }
  }

  addLunchAndDinner(dinnerOrLunch) {
    console.log(dinnerOrLunch.kcal);
    if (this.dayCalories + dinnerOrLunch.kcal <= this.calorieLimit) {
      this.lunchesAndDinnersList.push(dinnerOrLunch);
      this.dayCalories += dinnerOrLunch.kcal;
      this.carbs += dinnerOrLunch.carbs;
      this.proteins += dinnerOrLunch.protein;
      this.fats += dinnerOrLunch.fat;
    }
  }
}

export function generateMealPlan(
  dayCalories,
  carbs,
  proteins,
  fats,
  allergies,
  preferences
) {
  let meals = {
    breakfasts: {
      scrambledEggs: {
        name: "scrambled eggs",
        kcal: 350,
        protein: 33,
        fat: 15,
        carbs: 4,
        ingredients: ["mils", "egg"],
        allergenes: ["egg", "lactose"],
        score: 0,
      },

      oatMeal: {
        name: "oat meal",
        kcal: 400,
        protein: 6,
        fat: 2,
        carbs: 45,
        ingredients: ["oats", "milk"],
        allergenes: ["lactose"],
        score: 0,
      },

      veganProtein: {
        name: "vegan protein",
        kcal: 150,
        protein: 30,
        fat: 0,
        carbs: 2,
        ingredients: ["water", "protein"],
        allergenes: [],
        score: 0,
      },

      bananaPancake: {
        name: "banana pancake",
        kcal: 243,
        protein: 9,
        fat: 15,
        carbs: 15,
        ingredients: ["banana", "egg"],
        allergenes: ["egg"],
        score: 0,
      },
      peachPorridge: {
        name: "peach porridge",
        kcal: 231,
        protein: 8,
        fat: 4,
        carbs: 37,
        ingredients: ["quinoa", "milk", "peach", "porridge"],
        allergenes: ["milk"],
        score: 0,
      },
      niceOne: {
        name: "nice one",
        kcal: 251,
        protein: 15,
        fat: 12,
        carbs: 18,
        ingredients: ["tomato", "egg", "kale", "toast"],
        allergenes: ["egg", "gluten"],
        score: 0,
      },
      blueberryPorridge: {
        name: "blueberry porridge",
        kcal: 214,
        protein: 13,
        fat: 4,
        carbs: 35,
        ingredients: ["blueberry", "yogurt", "porridge"],
        allergenes: ["lactose"],
        score: 0,
      },
    },
    lunchesAndDinners: {
      loafTinLasagne: {
        name: "loaf tin lasagne",
        kcal: 556,
        protein: 46,
        fat: 13,
        carbs: 67,
        ingredients: ["egg", "tomato", "cheese", "garlic", "onion"],
        allergenes: ["egg", "lactose"],
        score: 0,
      },
      buffaloChickenPastaSalad: {
        name: "chicken pasta salad",
        kcal: 485,
        protein: 49,
        fat: 20,
        carbs: 30,
        ingredients: ["chicken", "pasta", "tomato", "celery"],
        allergenes: ["gluten"],
        score: 0,
      },
      someRandomShit: {
        name: "random shit",
        kcal: 512,
        protein: 45,
        fat: 23,
        carbs: 35,
        ingredients: ["chicken", "potato", "paprika"],
        allergenes: [],
        score: 0,
      },
      teriyaki: {
        name: "teriyaki",
        kcal: 372,
        protein: 44,
        fat: 10,
        carbs: 24,
        ingredients: ["soy", "steak", "garlic", "cornstarch"],
        allergenes: ["soy"],
        score: 0,
      },
      kedgeree: {
        name: "kedgeree",
        kcal: 418,
        protein: 36,
        fat: 10,
        carbs: 45,
        ingredients: ["onion", "coriander", "egg", "rice", "fish"],
        allergenes: ["egg", "fish"],
        score: 0,
      },

      fishAndRice: {
        name: "fish and rice",
        kcal: 578,
        protein: 45,
        fat: 15,
        carbs: 45,
        ingredients: ["rice", "fish"],
        allergenes: ["egg", "fish"],
        score: 0,
      },

      leanChicken: {
        name: "lean chicken",
        kcal: 250,
        protein: 50,
        fat: 3,
        carbs: 0,
        ingredients: ["chicken"],
        allergenes: [],
        score: 0,
      },
    },
  };

  for (const times in meals) {
    console.log(meals[times]);
    for (const meal in meals[times]) {
      meals[times][meal].score +=
        checkAllergies(allergies, meals[times][meal].allergenes) * -10 +
        checkPreferences(preferences, meals[times][meal].ingredients) * 5;
      // console.log(meals[times][meal].name);
      // console.log(meals[times][meal].score);
    }

    //console.log(sortLunchAndDinners(meals));
  }

  let mealplan = new mealPlan(dayCalories);
  dayMealPlan();

  function dayMealPlan() {
    const breakfasts = sortBreakfast(meals);
    const lunchesAndDinners = sortLunchAndDinners(meals);
    mealplan.addBreakfast(breakfasts[0]);
    for (let i = 0; i < lunchesAndDinners.length; i++) {
      mealplan.addLunchAndDinner(lunchesAndDinners[i]);
    }
  }

  return mealplan;
}

function checkAllergies(allAllergies, mealAllergies) {
  let counter = 0;
  for (let i = 0; i < mealAllergies.length; i++) {
    const al = mealAllergies[i];
    if (allAllergies.includes(al)) {
      counter++;
    }
  }
  return counter;
}

function checkPreferences(allPreferences, mealIngredients) {
  let counter = 0;
  for (let i = 0; i < mealIngredients.length; i++) {
    const al = mealIngredients[i];
    if (allPreferences.includes(al)) {
      counter++;
    }
  }
  return counter;
}

function sortBreakfast(meals) {
  const sorted = [];
  for (const breakfastMeal in meals.breakfasts) {
    sorted.push(meals.breakfasts[breakfastMeal]);
  }
  sorted.sort((a, b) =>
    a.score < b.score
      ? 1
      : a.score === b.score
      ? a.carbs < b.carbs
        ? 1
        : -1
      : -1
  );

  return sorted;
}

function sortLunchAndDinners(meals) {
  const sorted = [];
  for (const lunchOrDinner in meals.lunchesAndDinners) {
    sorted.push(meals.lunchesAndDinners[lunchOrDinner]);
  }
  sorted.sort((a, b) =>
    a.score < b.score
      ? 1
      : a.score === b.score
      ? a.protein < b.protein
        ? 1
        : -1
      : -1
  );

  return sorted;
}
