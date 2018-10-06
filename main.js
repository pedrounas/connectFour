function login() {
  prompt("Nome de Utilizador");
  prompt("Palavra Passe");
}

function makeBoard() {
  var row = 6;
  var col = 7;
  var turn = 0;
  for (var i = 0; i < 6; i++) {
    var rows = document.createElement("div");
    rows.classList.add("row");
    rows.id = i;
    document.getElementById("board").appendChild(rows)
    for (var j = 0; j < 7; j++) {
      var cols = document.createElement("div");
      cols.classList.add("col");
      cols.id = "col_" + i + "_" + j;
      cols.classList.add("empty");
      cols.onclick = function() {
        var empty = findEmpty(this.id, row);
        var colName = "col_" + empty + "_" + this.id.slice(6);
        if (turn == 0) {
          if (empty != -1) {
            document.getElementById(colName).classList.add("red");
            turn = 1;
            checkIfWin(row, col);
          }
        } else if (turn == 1) {
          if (empty != -1) {
            document.getElementById(colName).classList.add("yellow");
            turn = 0;
            checkIfWin(row, col);
          }
        }
      };
      rows.appendChild(cols);
    }
  }
}

function restartGame() {
  var size = document.getElementById("difficulty").selectedIndex;
  var filho = document.getElementById("board");
  var pai = document.getElementById("container");

  if (size == 0) {
    row = 4;
    col = 5;
    if (document.getElementById("board") != null) {
      pai.removeChild(filho);
    }
  }
  if (size == 1) {
    row = 6;
    col = 7;
    if (document.getElementById("board") != null) {
      pai.removeChild(filho);
    }
  }
  if (size == 2) {
    row = 9;
    col = 10;
    if (document.getElementById("board") != null) {
      pai.removeChild(filho);
    }
  }
  var turn = 0;

  console.log(row + " " + col);
  for (var i = 0; i < row; i++) {
    var board = document.createElement("div");
    board.id = "board";
    var rows = document.createElement("div");
    rows.classList.add("row");
    rows.id = i;
    document.getElementById("container").appendChild(board);
    document.getElementById("board").appendChild(rows);
    for (var j = 0; j < col; j++) {
      var cols = document.createElement("div");
      cols.classList.add("col");
      cols.id = "col_" + i + "_" + j;
      cols.classList.add("empty");
      cols.onclick = function() {
        var empty = findEmpty(this.id, row);
        var colName = "col_" + empty + "_" + this.id.slice(6);
        if (turn == 0) {
          if (empty != -1) {
            document.getElementById(colName).classList.add("red");
            turn = 1;
            checkIfWin(row, col);
          }
        } else if (turn == 1) {
          if (empty != -1) {
            document.getElementById(colName).classList.add("yellow");
            turn = 0;
            checkIfWin(row, col);
          }
        }
      };
      rows.appendChild(cols);
    }
  }

}

function quitGame() {
  alert("O jogador desistiu do jogo!");
  location.reload();
}

function findEmpty(x, rows) {
  var colN = x.slice(6);
  for (var i = rows - 1; i >= 0; i--) {
    var id = "col_" + i + "_" + colN;
    if (document.getElementById(id).classList.contains("empty")) {
      document.getElementById(id).classList.remove("empty");
      return i;
    }
  }
  return -1;
}

function checkIfWin(a, b) {
  var yellowC = false;
  var redC = false;
  for (var i = a - 1; i >= 0; i--) {
    for (var j = 0; j < b - 3; j++) {
      var id = "col_" + i + "_" + j;
      var id2 = "col_" + i + "_" + (j + 1);
      var id3 = "col_" + i + "_" + (j + 2);
      var id4 = "col_" + i + "_" + (j + 3);
      if (document.getElementById(id).classList.contains("red") && document.getElementById(id2).classList.contains("red") &&
        document.getElementById(id3).classList.contains("red") && document.getElementById(id4).classList.contains("red")) {
        alert("O jogador vermelho ganhou!");
      }
      if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
        document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
        alert("O jogador amarelo ganhou!");
      }
    }
  }

  for (var i = 0; i < b; i++) {
    for (var j = a - 1; j >= a - 3; j--) {
      var id = "col_" + j + "_" + i;
      var id2 = "col_" + (j - 1) + "_" + i;
      var id3 = "col_" + (j - 2) + "_" + i;
      var id4 = "col_" + (j - 3) + "_" + i;
      if (document.getElementById(id).classList.contains("red") && document.getElementById(id2).classList.contains("red") &&
        document.getElementById(id3).classList.contains("red") && document.getElementById(id4).classList.contains("red")) {
        alert("O jogador vermelho ganhou!");
      }
      if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
        document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
        alert("O jogador amarelo ganhou!");
      }
    }
  }
  for (var i = a - 1; i > 2; i--) {
    for (var j = 0; j < b - 3; j++) {
      var id = "col_" + i + "_" + j;
      var id2 = "col_" + (i - 1) + "_" + (j + 1);
      var id3 = "col_" + (i - 2) + "_" + (j + 2);
      var id4 = "col_" + (i - 3) + "_" + (j + 3);

      if (document.getElementById(id).classList.contains("red") && document.getElementById(id2).classList.contains("red") &&
        document.getElementById(id3).classList.contains("red") && document.getElementById(id4).classList.contains("red")) {
        alert("O jogador vermelho ganhou!");
      }
      if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
        document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
        alert("O jogador amarelo ganhou!");

      }
    }
  }

  for (var i = 0; i < a - 3; i++) {
    for (var j = 0; j < b - 3; j++) {
      var id = "col_" + i + "_" + j;
      var id2 = "col_" + (i + 1) + "_" + (j + 1);
      var id3 = "col_" + (i + 2) + "_" + (j + 2);
      var id4 = "col_" + (i + 3) + "_" + (j + 3);

      if (document.getElementById(id).classList.contains("red") && document.getElementById(id2).classList.contains("red") &&
        document.getElementById(id3).classList.contains("red") && document.getElementById(id4).classList.contains("red")) {
        alert("O jogador vermelho ganhou!");
      }
      if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
        document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
        alert("O jogador amarelo ganhou!");
      }
    }
  }

}

function popupInst() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}
