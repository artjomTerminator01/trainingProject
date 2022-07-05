class MealPlan {
  constructor(calorieLimit) {
    this.calorieLimit = calorieLimit;
    this.dayCalories = 0;
    this.carbs = 0;
    this.proteins = 0;
    this.fats = 0;
    this.breakfastList = [];
    this.lunchesAndDinnersList = [];
  }

  addMeal(meal, mealType) {
    if (this.dayCalories + meal.kcal <= this.calorieLimit + 100) {
      if (mealType === "breakfast") {
        this.breakfastList.push(meal);
      } else {
        this.lunchesAndDinnersList.push(meal);
      }
      this.dayCalories += meal.kcal;
      this.carbs += meal.carbs;
      this.proteins += meal.protein;
      this.fats += meal.fat;
    }
  }

  static removeMealsWithAllergenes(allergies) {
    for (const [parent, child] of Object.entries(meals)) {
      for (const [parent2, child2] of Object.entries(child)) {
        if (child2.allergenes.some((el) => allergies.includes(el))) {
          delete child[parent2];
        }
      }
    }
  }

  static checkPreferences(allPreferences, mealIngredients) {
    let counter = 0;
    for (let i = 0; i < mealIngredients.length; i++) {
      const al = mealIngredients[i];
      if (allPreferences.includes(al)) {
        counter++;
      }
    }
    return counter;
  }
}

let meals = {
  breakfasts: {
    apple: {
      name: "an apple",
      kcal: 120,
      protein: 1,
      fat: 1,
      carbs: 23,
      ingredients: ["apple"],
      allergenes: [],
      score: 0,
    },

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
      allergenes: ["lactose"],
      score: 0,
    },
    niceOne: {
      name: "nice one",
      kcal: 451,
      protein: 15,
      fat: 12,
      carbs: 18,
      ingredients: ["tomato", "egg", "kale", "toast"],
      allergenes: ["egg", "gluten"],
      score: 0,
    },
    blueberryPorridge: {
      name: "blueberry porridge",
      kcal: 314,
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
    chickenPaprika: {
      name: "chicken potato paprika",
      kcal: 612,
      protein: 45,
      fat: 23,
      carbs: 35,
      ingredients: ["chicken", "potato", "paprika"],
      allergenes: [],
      score: 0,
    },
    teriyaki: {
      name: "teriyaki",
      kcal: 672,
      protein: 44,
      fat: 10,
      carbs: 24,
      ingredients: ["soy", "steak", "garlic", "cornstarch"],
      allergenes: ["soy"],
      score: 0,
    },
    kedgeree: {
      name: "kedgeree",
      kcal: 518,
      protein: 36,
      fat: 10,
      carbs: 45,
      ingredients: ["onion", "coriander", "egg", "rice", "fish"],
      allergenes: ["egg", "fish"],
      score: 0,
    },

    fishAndRice: {
      name: "fish and rice",
      kcal: 778,
      protein: 45,
      fat: 15,
      carbs: 45,
      ingredients: ["rice", "fish"],
      allergenes: ["egg", "fish"],
      score: 0,
    },

    leanChicken: {
      name: "lean chicken",
      kcal: 350,
      protein: 50,
      fat: 3,
      carbs: 0,
      ingredients: ["chicken"],
      allergenes: [],
      score: 0,
    },

    chickenSalad: {
      name: "chicken salad",
      kcal: 250,
      protein: 25,
      fat: 3,
      carbs: 5,
      ingredients: ["chicken", "tomato", "olive oil"],
      allergenes: [],
      score: 0,
    },
  },
};

export function generateMealPlan(dayCalories, allergies, preferences) {
  MealPlan.removeMealsWithAllergenes(allergies);

  for (const times in meals) {
    for (const meal in meals[times]) {
      meals[times][meal].score +=
        MealPlan.checkPreferences(preferences, meals[times][meal].ingredients) *
        5;
    }
  }

  let mealplan = new MealPlan(dayCalories);
  let weekPlan = [
    new MealPlan(dayCalories),
    new MealPlan(dayCalories),
    new MealPlan(dayCalories),
    mealplan,
    new MealPlan(dayCalories),
    new MealPlan(dayCalories),
    new MealPlan(dayCalories),
  ];

  const breakfasts = sortMeals(meals, "breakfast");
  const lunchesAndDinners = sortMeals(meals, "lunch");

  //DayMealPlan
  mealplan.addMeal(breakfasts[0], "breakfast"); //add best suitable breakfast
  for (let i = 0; i < lunchesAndDinners.length; i++) {
    mealplan.addMeal(lunchesAndDinners[i], "lunchOrDinner"); //add best suitable dinners till there is enough calories
  }

  //WeekMealPlan
  for (let i = 0; i < weekPlan.length; i++) {
    weekPlan[i].addMeal(
      breakfasts[Math.floor(Math.random() * (breakfasts.length - 1))],
      "breakfast"
    );
    for (let j = 0; j < lunchesAndDinners.length; j++) {
      weekPlan[i].addMeal(
        lunchesAndDinners[
          Math.floor(Math.random() * (lunchesAndDinners.length - 1))
        ],
        "lunchOrDinner"
      );
    }
  }

  return [mealplan, weekPlan];
}

function sortMeals(meals, mealType) {
  const filtered = [];

  let mealsToSort;
  if (mealType == "breakfast") {
    mealsToSort = meals.breakfasts;
  } else {
    mealsToSort = meals.lunchesAndDinners;
  }

  for (const meal in mealsToSort) {
    if (mealsToSort[meal].score >= 0) {
      filtered.push(mealsToSort[meal]);
    }
  }

  filtered.sort(function (a, b) {
    if (a.score === b.score) {
      if (mealType === "breakfast") {
        return b.carbs - a.carbs;
      } else {
        return b.protein - a.protein;
      }
    }
    return a.score < b.score ? 1 : -1;
  });

  return filtered;
}
