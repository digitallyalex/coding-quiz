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

//* A start button that when clicked a timer starts and the first question appears
//...*Questions contain buttons for each answer
//...*When answer is clicked, the next question appears
//...*If the answer clicked was incorrect then substract time from the clock
//*The quiz should end when all questions are answered or the timer reaches 0.
//...*When the game ends, it should display their score and give the user the ability to save their initials and their score.

//index.html
//-Define the questions and the choices and the answers, put it in a variable in questions.js file
//- Timer -> add click event listener to 'start quiz' button and trigger the timer
//- Display first question
//.....add click event listener to 'start quiz' button
//.....display the first question based on the questions that we have defined
//.....hide the start screen
//......show questions screen and populate it with questions and the choices

//-Add click event listener to the choices div and check if the choice button is clicked
//........Check if the answer is correct
//.............if the answer is correct
//................display 'correct answer' in feedback div
//.................hide feedback div then display next question
//.............if incorrect
//.................substract 10 from the timer
//..................display 'wrong answer' in feedback div
//..................check the timer,
//........................if timer >0, hide feedback div then display next question
//........................if timer <= 0, hide feedback div then go display 'end-screen' screen and hide question screen
