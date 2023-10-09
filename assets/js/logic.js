


var currentQuestionIndex = 0;
var time = questions.length * 20;
var timerId;

var startScreen = document.getElementById("start-screen");
var questionsSection = document.getElementById("questions-section");
var questionsTitle = document.getElementById("question-title");
var timerDisplay = document.getElementById("timer-display");
var choicesContainer = document.getElementById("choices-container");
var endScreen = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");
var initialsInput = document.getElementById("initials-input");
var submitButton = document.getElementById("submit-button");
var feedbackDisplay = document.getElementById("feedback-display");

function startQuiz() {

  startScreen.style.display = "none";
  timerDisplay.textContent = time; 
  questionsSection.style.display = "block";
  timerId = setInterval(clockTick, 1000);
  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionsTitle.textContent = currentQuestion.title;
  choicesContainer.innerHTML = "";
console.log(currentQuestion)
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choiceButton = document.createElement("button");
    choiceButton.innerHTML = currentQuestion.choices[i];

    choiceButton.addEventListener("click", questionClick);

    choicesContainer.appendChild(choiceButton);
  }
}

function questionClick(event) {
  if (event.target.tagName !== "BUTTON") {
    return;
  }

  var selectedChoice = event.target.textContent;
  var currentQuestion = questions[currentQuestionIndex];

  if (selectedChoice !== currentQuestion.answer) {
    time -= 5;
    timerDisplay.textContent = time;
    feedbackDisplay.textContent = "Wrong!";
  } else {
    feedbackDisplay.textContent = "Correct!";
  }

  setTimeout(function () {
    feedbackDisplay.textContent = "";
  }, 500);

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);
  questionsSection.style.display = "none";
  endScreen.style.display = "block";
  finalScore.textContent = time;
}

function clockTick() {
  time--;
  timerDisplay.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  var initials = initialsInput.value.trim();
  if (initials !== "") {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    var newScore = {
      initials: initials,
      score: time,
    };

    highscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  if (event.keyCode === 13) {
    saveHighscore();
  }
}

submitButton.addEventListener("click", saveHighscore);
initialsInput.addEventListener("keyup",checkForEnter);

var startButton = document.getElementById("start-button");
startButton.addEventListener("click", startQuiz);
