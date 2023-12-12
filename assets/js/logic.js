//Main DOM elements to work with
//TIMER
const timer = document.querySelector(".timer"); // timer section
const timeLeft = document.getElementById("time"); // time when quiz starts

//START SCREEN
const startScreen = document.getElementById("start-screen"); // start section content div
const startBtn = document.getElementById("start"); // start page start button

//QUIZ QUESTIONS
const questionsSection = document.getElementById("questions"); // questions section content div
const questionTitle = document.getElementById("question-title"); //question title space
const answerChoices = document.getElementById("choices"); // question answer choices div, add buttons with choices here

//END GAME
const endScreen = document.getElementById("end-screen"); // end game section content div to display final score and player initials input plus submit button that saves to local storage
const finalScore = document.getElementById("final-score"); // displays the score as the time remaining by the end of the questions
const playerInitials = document.getElementById("initials"); //input form for player to add their initials
const submitBtn = document.getElementById("submit"); // submit button to store player initials and high score to local strorage

//ANSWER CHOICE FEEDBACK
const feedbackCorrect = document.getElementById("feedback-correct"); // will show after each correct choice button click
const feedbackWrong = document.getElementById("feedback-wrong");

//OTHER VARIABLES
let currentQuestionIndex = 0;
let remainingTime = questions.length * 10;
let timerId;

// //* A start button that when clicked a timer starts and the first question appears
function startQuiz() {
  timerId = setInterval(quizTimer, 1000);
  timeLeft.textContent = remainingTime;
  startScreen.setAttribute("class", "hide");
  questionsSection.removeAttribute("class");
  displayQuestion();
}

//start quiz click event
startBtn.onclick = startQuiz;

//...*Questions contain buttons for each answer in a list

function displayQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  questionTitle.textContent = currentQuestion.questionTitle;
  answerChoices.innerHTML = "";
  currentQuestion.choices.forEach(function (choice, i) {
    let choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    choiceBtn.onclick = answerClick;
    answerChoices.appendChild(choiceBtn);
  });
}

// //Check player choice and display feedback, followed by displaying the next question when players click on an answer
function answerClick() {
  //If the answer clicked was incorrect then substract time from the clock
  if (this.value !== questions[currentQuestionIndex].correctAnswer) {
    remainingTime -= 10;
    if (remainingTime < 0) {
      remainingTime = 0;
    }
    timeLeft.textContent = remainingTime;

    //show feedback that answer is wrong
    feedbackWrong.removeAttribute("class", "hide");
    //hide feedback after 2 seconds
    setTimeout(function () {
      feedbackWrong.setAttribute("class", "hide");
    }, 2000);

    //if the answer clicked is correct show correct feedback
  } else {
    feedbackCorrect.removeAttribute("class", "hide");
    //hide feedback after 2 seconds
    setTimeout(function () {
      feedbackCorrect.setAttribute("class", "hide");
    }, 2000);
  }

  //show next question
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    displayQuestion();
  }
}

//...*When the game ends, it should display their score and give the user the ability to save their initials and their score.

function endQuiz() {
  clearInterval(timerId);
  endScreen.removeAttribute("class");
  finalScore.textContent = remainingTime;
  questionsSection.setAttribute("class", "hide");
}

//quiz timer function - end quiz if timer gets to 0
function quizTimer() {
  remainingTime--;
  timeLeft.textContent = remainingTime;
  if (remainingTime <= 0) {
    endQuiz();
  }
}

//saving scores to local storage
function saveScore() {
  if (playerInitials !== "") {
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    let savedScore = {
      player: playerInitials,
      highscore: remainingTime,
    };
    highscores.push(savedScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
  }
}

//event listener to save when submit button is clicked
submitBtn.onclick = saveScore;
