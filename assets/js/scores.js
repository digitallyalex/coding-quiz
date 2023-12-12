//Main DOM elements to work with

//ordered list of highscores
const scoreList = document.getElementById("highscores");

//clear highscores button
const clearScoreBtn = document.getElementById("clear");

//-Retrieve highscores from local storage
function displayScores() {
  let highscores = JSON.parse(window.localStorage.getItem("highscores"));

  //- Sort the scores from higher score to lower score
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  //append new scores to highscores list
  highscores.forEach(function (score) {
    let scoreItem = document.createElement("li");
    scoreItem.textContent = score.player + " - " + score.highscore;
    scoreList.appendChild(scoreItem);
  });
}

// Clear highscores when clear button is clicked
function clearScores() {
  localStorage.removeItem("highscores");
  location.reload();
}

clearScoreBtn.onclick = clearScores;

//display current highscores
displayScores();
