// "use strict";

//index.html
// Questions, choices and answers, put in 'questions' variable in questions.js file

const timerSection = document.querySelector("#timer");
const questionsSection = document.querySelector("#questions");
const answerChoices = document.querySelector("#choices");
const startBtn = document.querySelector("#start");
const submitBtn = document.querySelector("#submit");
const startScreen = document.querySelector("#start-screen");
const feedbackSection = document.querySelector("#feedback");

//- Timer -> add click event listener to 'start quiz' button and trigger the timer
//initial quiz state
let visibleQuestionIndex = 0;
let time = questions.length * 20;
let timerStatus;
let choiceButton;

//Add click event listener to 'start quiz' button
const quizStart = startBtn.addEventListener("click", function () {
  timerStatus = setInterval(timeLeft, 1000);
  document.querySelector("#time").textContent = time;
  //Hide the start screen
  startScreen.setAttribute("class", "hide");
  //Show questions screen and populate it with questions and the choices
  questionsSection.removeAttribute("class");
  displayQuestion();
});
// Add click event listener to the choices div and checking if the choice button is clicked
document.getElementById("choices").addEventListener("click", function (event) {
  if (event.target.tagName === "choiceButton") {
    let selectedChoice = event.target.value;
    // Check the answer based on the selected choice
    checkAnswer(selectedChoice);
  }

  //If incorrect substract 10 from the time, display 'wrong answer' in feedback div + check the timer
  if (choiceButton.value !== questions[visibleQuestionIndex]) {
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    document.querySelector("#time").textContent = time;
    feedbackSection.textContent = `Oops, incorrect answer!`;
    feedbackSection.style.color = "#fc1c49";
  }

  //Check if the answer is correct, if the answer is correct then display 'correct answer' in feedback div
  else {
    feedbackSection.textContent = `Well done, correct answer!`;
    feedbackSection.style.color = "#02e4c8";
  }

  //Hide feedback div then display next question or end the quiz;

  setTimeout(function () {
    feedbackSection.removeAttribute("class", "hide");
  }, 2000);

  visibleQuestionIndex++;
  if (visibleQuestionIndex === questions.length) {
    endQuiz();
  } else {
    displayQuestion();
  }
});

// Display the first question based on the questions that we have defined
const displayQuestion = function () {
  let currentQuestion = questions[visibleQuestionIndex];
  let questionTitle = document.getElementById("question-title");
  questionTitle.textContent = currentQuestion.question;
  answerChoices.innerHTML = "";

  // forEach loop to create choice buttons and attach the event listener
  currentQuestion.options.forEach(function (choice, i) {
    choiceButton = document.createElement("button");
    choiceButton.setAttribute("value", choice);
    choiceButton.textContent = i + 1 + "." + choice;

    // Click event listener
    choiceButton.addEventListener("click", function () {
      checkAnswer(choiceButton.value);
    });

    answerChoices.appendChild(choiceButton);
  });
};

//When quiz ends, show end screen and update final score according to the time left, and hide the questions section.
const endQuiz = function () {
  clearInterval(timerStatus);
  let endScreen = document.querySelector("#end-screen");
  endScreen.removeAttribute("class");
  let finalScore = document.querySelector("#final-score");
  finalScore.textContent = time;
  questionsSection.setAttribute("class", "hide");
};

//End the quiz when the timer reaches 0 and start end of quiz process

const timeLeft = function () {
  time--;
  document.querySelector("#time").textContent = time;
  if (time <= 0) {
    endQuiz();
  }
};

//highscores.html
//-Retrieve highscores from local storage
//- Sort the scores from higher score to lower score
//- Display the highscores as a list
