function printHighscores() {
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  var highscoreList = document.getElementById("highscore-list");
  highscoreList.innerHTML = "";

  for (var i = 0; i < highscores.length; i += 1) {
    var listItem = document.createElement("li");
    listItem.textContent = highscores[i].initials + " - " + highscores[i].score;

    highscoreList.appendChild(listItem);
  }
}

function clearHighscores() {
  localStorage.removeItem("highscores");

  var highscoreList = document.getElementById("highscore-list");
  highscoreList.innerHTML = "";
}
document.getElementById("clear").addEventListener("click", clearHighscores);

printHighscores();
clearHighscores();
