function Application(maxAnswer) {
  this.scoreVal = 0;

  this.maxAnswer = maxAnswer;

  this.score = document.querySelector("#score");
  this.userInput = document.querySelector("#input");
  this.message = document.querySelector("#message");
  this.question = document.querySelector("#question");

  this.submitBtn = document.querySelector("#submit");
  this.skipBtn = document.querySelector("#skip");

  this.score.textContent = 0;
  //You will need to create event bindings for the:
  //Button to evaluate (or the event that occurs when you want to evaluate)
  this.submitBtn.onclick = this.submitQuestion.bind(this);
  //Button to skip the question
  this.skipBtn.onclick = this.nextQuestion.bind(this);

  if (window.localStorage.getItem("gamestate") === null)
    this.generateRandomQuestion();
  else this.loadAll();
}

Application.prototype.nextQuestion = function() {
  console.log("nextQuestion");
  this.userInput.textContent = "";
  this.generateRandomQuestion();
  this.storeAll();
};

Application.prototype.loadAll = function() {
  const gamestateJSON = window.localStorage.getItem("gamestate");
  if (gamestateJSON != null) {
    const gamestate = JSON.parse(gamestateJSON);

    document.querySelector("#score").textContent = gamestate.score;
    document.querySelector("#message").textContent = gamestate.message;
    document.querySelector("#question").textContent = gamestate.question;
    document.querySelector("#input").textContent = gamestate.input;
  }
};
//You need to store the user’s current question, score, and any other details you feel important to the user’s session in local storage
Application.prototype.storeAll = function() {
  let gamestate = {};
  gamestate.score = document.querySelector("#score").textContent;
  gamestate.message = document.querySelector("#message").textContent;
  gamestate.question = document.querySelector("#question").textContent;
  gamestate.input = document.querySelector("#input").textContent;

  window.localStorage.setItem("gamestate", JSON.stringify(gamestate));
};

//You will need a prototype method that evaluates the equation and the user’s answer
Application.prototype.submitQuestion = function() {
  console.log("submitQuestion");
  console.log(this.evaluateExpr(this.question.textContent));
  console.log(this.evaluateUserInput());
  if (
    this.evaluateExpr(this.question.textContent) == this.evaluateUserInput()
  ) {
    this.message.textContent =
      "You are right, " +
      this.question.textContent +
      " is " +
      this.evaluateUserInput();
    this.correctAnswer();
  } else {
    this.message.textContent =
      "You are wrong! " +
      this.question.textContent +
      " is " +
      this.evaluateExpr(this.question.textContent);
    this.wrongAnswer();
  }
  this.nextQuestion();
};

//You will need a prototype method that executes when they win a question
Application.prototype.correctAnswer = function() {
  console.log("correct answer");
  console.log(document.querySelector("#score").textContent);
  document.querySelector("#score").textContent =
    Number(document.querySelector("#score").textContent) + 1;
};

//You will need a prototype method that executes when they lose a question
Application.prototype.wrongAnswer = function() {
  console.log("wrong answer");
  document.querySelector("#score").textContent =
    Number(document.querySelector("#score").textContent) - 1;
};

Application.prototype.evaluateUserInput = function() {
  return Number(document.querySelector("#input").value);
};

//You will need to create a prototype method that generates a random addition/subtraction/multiplication/division question and populates the interface with the equation
Application.prototype.generateRandomQuestion = function() {
  let funcArray = [
    this.generateAdd,
    this.generateSubstract,
    this.generateDivision,
    this.generateMult
  ];
  this.question.textContent = funcArray[getRandomValue(4)](this.maxAnswer);
  console.log("generateRandomQuestion");
};
//You will need a prototype method for adding
Application.prototype.generateAdd = function(maxAnswer) {
  return getRandomValue(maxAnswer) + " + " + getRandomValue(maxAnswer);
};
//You will need a prototype method for subtracting
Application.prototype.generateSubstract = function(maxAnswer) {
  return getRandomValue(maxAnswer) + " - " + getRandomValue(maxAnswer);
};
//You will need a prototype method for multiplying
Application.prototype.generateMult = function(maxAnswer) {
  return (
    getRandomValue(Math.sqrt(maxAnswer) * 2) +
    " * " +
    getRandomValue(Math.sqrt(maxAnswer) * 2)
  );
};
//You will need a prototype method for dividing
Application.prototype.generateDivision = function(maxAnswer) {
  let a = getRandomValue(Math.sqrt(maxAnswer) * 2);
  let b = getRandomValue(Math.sqrt(maxAnswer) * 2) + 1;
  return a * b + " / " + b;
};

Application.prototype.evaluateExpr = function(expression) {
  console.log("expression " + expression);
  let split;
  if (expression.indexOf("+") > 0) {
    split = expression.split(" + ");
    return Number(split[0]) + Number(split[1]);
  } else if (expression.indexOf("-") > 0) {
    split = expression.split(" - ");
    return split[0] - split[1];
  } else if (expression.indexOf("*") > 0) {
    split = expression.split(" * ");
    return split[0] * split[1];
  } else {
    split = expression.split(" / ");
    return split[0] / split[1];
  }
};

function getRandomValue(maxNum) {
  return Math.floor(Math.random() * maxNum);
}

new Application(100);
