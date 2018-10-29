var game = new Board(0, 0, 0, 0, 0, null);
var aiMove = -1;

function Board(row, col, depth, turn, tie, b) {
  this.row = row;
  this.col = col;
  this.depth = depth;
  this.turn = turn;
  this.tie = tie;
  this.b = b;
}

function restartGame() {
  var hIndex = document.getElementById("height");
  game.row = hIndex.options[hIndex.selectedIndex].value;
  var wIndex = document.getElementById("width");
  game.col = wIndex.options[wIndex.selectedIndex].value;
  var depthId = document.getElementById("difficulty");
  var starter = document.getElementById("starter");
  game.turn = starter.options[starter.selectedIndex].value;
  game.depth = depthId.options[depthId.selectedIndex].value;
  var aiStarter = game.turn;
  game.b = emptyBoard();
  var filho = document.getElementById("board");
  var pai = document.getElementById("container");
  getName();
  while (document.getElementById("board") != null) {
    pai.removeChild(filho);
  }
  var tie = 0;
  var board = document.createElement("div");
  board.id = "board";
  document.getElementById("container").appendChild(board);
  if (game.turn == 1) {
    showTurn(0);
  } else if (game.turn == 0) {
    showTurn(0);
  }
  for (var i = 0; i < game.row; i++) {
    var rows = document.createElement("div");
    rows.classList.add("row");
    rows.id = i;
    document.getElementById("board").appendChild(rows);
    for (var j = 0; j < game.col; j++) {
      var cols = document.createElement("div");
      cols.classList.add("col");
      cols.id = "col_" + i + "_" + j;
      cols.classList.add("empty");
      cols.onclick = function() {
        var empty = findEmpty(this.id, game.row);
        var colName = "col_" + empty + "_" + this.id.slice(6);
        showTurn(0);
        if (game.turn == 0) {
          if (empty != -1) {
            document.getElementById(colName).classList.add("yellow");
            if (document.getElementById(colName).classList.contains("over")) {
              document.getElementById(colName).classList.remove("over");
            }
            game.b[empty][this.id.slice(6)] = 'O';
            game.turn = 1;
            game.tie++;
            checkIfWin(game.row, game.col);
            setTimeout(showTurn, 1000, 0);
            if (game.tie == (game.row * game.col) && checkIfWin(game.row, game.col) == false) {
              var msg = document.getElementById("Page4");
              msg.style.display = "block";
              removeClick();
            }
          }

        }
        if (game.turn == 1) {
          showTurn(1);
          setTimeout(minimax, 1000);
          if (game.tie == (game.row * game.col) && checkIfWin(game.row, game.col) == false) {
            var msg = document.getElementById("Page6");
            msg.style.display = "block";
            removeClick();
          }
        }
      };
      cols.onmouseover = function() {
        over(this.id, game.row);
      }
      cols.onmouseout = function() {
        notover(this.id, game.row);
      }
      rows.appendChild(cols);
    }
  }
  if (aiStarter == 1) {
    minimax();
    aiStarter = null;
  }
}

function over(id, rows) {
  for (var i = 0; i < rows; i++) {
    var colName = "col_" + i + "_" + id.slice(6);
    if (document.getElementById(colName).classList.contains("empty")) {
      document.getElementById(colName).classList.add("over");
    }
  }
}

function notover(id, rows) {
  for (var i = 0; i < rows; i++) {
    var colName = "col_" + i + "_" + id.slice(6);
    if (document.getElementById(colName).classList.contains("empty")) {
      document.getElementById(colName).classList.remove("over");
    }
  }
}

function show(shown, hidden) {
  document.getElementById(shown).style.display = 'block';
  document.getElementById(hidden).style.display = 'none';
  return false;
}

function hide(id) {
  document.getElementById(id).style.display = 'none';
}

function showTurn(turn) {
  if (turn == 1) {
    var pai = document.getElementById("showturn");
    pai.innerHTML = "Jogada: Computador";
  } else if (turn == 0) {
    var pai = document.getElementById("showturn");
    pai.innerHTML = "Jogada: " + login.elements[0].value;
  }
}

function emptyBoard() {
  b = [];
  for (var i = 0; i < game.row; i++) {
    b[i] = [];
    for (var j = 0; j < game.col; j++) {
      b[i][j] = '-';
    }
  }
  return b;
}

function cloneBoard(board) {
  var clone = [];
  for (var i = 0; i < game.row; i++) {
    clone[i] = [];
    for (var j = 0; j < game.col; j++) {
      clone[i][j] = '-';
    }
  }
  for (var i = 0; i < game.row; i++) {
    for (var j = 0; j < game.col; j++) {
      clone[i][j] = board[i][j];
    }
  }
  return clone;
}

function findUtil(s, colN, rows) {
  for (var i = rows - 1; i >= 0; i--) {
    if (s[i][colN] == '-') {
      return i;
    }
  }
  return -1;
}

function addPiece(colN, rows) {
  for (var i = rows - 1; i >= 0; i--) {
    var id = "col_" + i + "_" + colN;
    if (document.getElementById(id).classList.contains("empty")) {
      document.getElementById(id).classList.remove("empty");
      document.getElementById(id).classList.add("red");
      return i;
    }
  }
  return -1;
}

function removePiece(colN, rowN) {
  var id = "col_" + rowN + "_" + colN;
  document.getElementById(id).classList.add("empty");
  document.getElementById(id).classList.remove("red");
}

function getName() {
  var form = document.getElementById("login");
  document.getElementById("test").rows[1].cells[0].innerHTML = login.elements[0].value;
}

function updateTable(player) {
  var currG = parseInt(document.getElementById("test").rows[1].cells[1].innerHTML);
  if (player === "ai") {
    document.getElementById("test").rows[2].cells[1].innerHTML = (currG + 1);
    document.getElementById("test").rows[1].cells[1].innerHTML = (currG + 1);
    var currW = parseInt(document.getElementById("test").rows[2].cells[2].innerHTML);
    document.getElementById("test").rows[2].cells[2].innerHTML = (currW + 1);
    document.getElementById("test").rows[2].cells[3].innerHTML = ((currW + 1) / (currG + 1) * 100) + "%";
  } else {
    document.getElementById("test").rows[2].cells[1].innerHTML = (currG + 1);
    document.getElementById("test").rows[1].cells[1].innerHTML = (currG + 1);
    var currW = parseInt(document.getElementById("test").rows[1].cells[2].innerHTML);
    document.getElementById("test").rows[1].cells[2].innerHTML = (currW + 1);
    document.getElementById("test").rows[1].cells[3].innerHTML = ((currW + 1) / (currG + 1) * 100) + "%";
  }
}

function quit() {
  updateTable("ai");
  restartGame();
}

function minimax() {
  var v;
  v = max(game.b, 0);
  if (aiMove == -1) {
    for (var i = 0; i < game.col; i++) {
      var free = findUtil(game.b, i, game.row);
      if (free != -1) {
        aiMove = i;
        break;
      }
    }
  }
  var empty = findUtil(game.b, aiMove, game.row);
  var colName = "col_" + empty + "_" + aiMove;
  document.getElementById(colName).classList.add("red");
  if (document.getElementById(colName).classList.contains("over")) {
    document.getElementById(colName).classList.remove("over");
  }
  document.getElementById(colName).classList.remove("empty");
  game.b[empty][aiMove] = 'X';
  game.turn = 0;
  game.tie++;
  checkIfWin(game.row, game.col);
  aiMove = -1;
}

function max(clone, depth) {
  if (depth == game.depth) {
    return utilityVal(clone);
  }
  var v = -99999;
  var max = -99999;

  for (var i = 0; i < game.col; i++) {

    if (findUtil(clone, i, game.row) == -1) {
      break;
    }

    var s = cloneBoard(clone);
    var empty = findUtil(s, i, game.row);
    s[empty][i] = 'X';
    v = Math.max(v, min(s, depth + 1));
    if (v > max) {
      max = v;
      aiMove = i;
    }
  }
  return v;
}

function min(clone, depth) {
  if (depth == game.epth) {
    return utilityVal(clone);
  }
  var v = 99999;
  for (var i = 0; i < game.col; i++) {

    if (findUtil(clone, i, game.row) == -1) {
      break;
    }
    var s = cloneBoard(clone);
    var empty = findUtil(s, i, game.row);
    s[empty][i] = 'O';
    v = Math.min(v, max(s, depth + 1));
  }
  return v;
}

function utilityVal(board) {
  var totalUtility = 0;
  var nReds = 0;
  var nYellows = 0;
  //horizontal
  for (var i = game.row - 1; i >= 0; i--) {
    for (var j = 0; j < game.col - 3; j++) {
      if (board[i][j] != 'O' && board[i][j + 1] != 'O' && board[i][j + 2] != 'O' && board[i][j + 3] != 'O') {
        if (board[i][j] == 'X') {
          nReds++;
        }
        if (board[i][j + 1] == 'X') {
          nReds++;
        }
        if (board[i][j + 2] == 'X') {
          nReds++;
        }
        if (board[i][j + 3] == 'X') {
          nReds++;
        }
        if (nReds == 1) {
          totalUtility = totalUtility + 1;
        }
        if (nReds == 2) {
          totalUtility = totalUtility + 10;
        }
        if (nReds == 3) {
          totalUtility = totalUtility + 50;
        }
        if (nReds == 4) {
          totalUtility = totalUtility + 512;
        }
        nReds = 0;
      }

      if (board[i][j] != 'X' && board[i][j + 1] != 'X' && board[i][j + 2] != 'X' && board[i][j + 3] != 'X') {
        if (board[i][j] == 'O') {
          nYellows++;
        }
        if (board[i][j + 1] == 'O') {
          nYellows++;
        }
        if (board[i][j + 2] == 'O') {
          nYellows++;
        }
        if (board[i][j + 3] == 'O') {
          nYellows++;
        }
        if (nYellows == 1) {
          totalUtility = totalUtility - 1;
        }
        if (nYellows == 2) {
          totalUtility = totalUtility - 10;
        }
        if (nYellows == 3) {
          totalUtility = totalUtility - 50;
        }
        if (nYellows == 4) {
          totalUtility = totalUtility - 512;
        }
        nYellows = 0;
      }
    }
  }

  //vertical
  for (var i = 0; i < game.col; i++) {
    for (var j = game.row - 1; j >= game.row - 3; j--) {
      if (board[j][i] != 'O' && board[j - 1][i] != 'O' && board[j - 2][i] != 'O' && board[j - 3][i] != 'O') {
        if (board[j][i] == 'X') {
          nReds++;
        }
        if (board[j - 1][i] == 'X') {
          nReds++;
        }
        if (board[j - 2][i] == 'X') {
          nReds++;
        }
        if (board[j - 3][i] == 'X') {
          nReds++;
        }
        if (nReds == 1) {
          totalUtility = totalUtility + 1;
        }
        if (nReds == 2) {
          totalUtility = totalUtility + 10;
        }
        if (nReds == 3) {
          totalUtility = totalUtility + 50;
        }
        if (nReds == 4) {
          totalUtility = totalUtility + 512;
        }
        nReds = 0;
      }

      if (board[j][i] != 'X' && board[j - 1][i] != 'X' && board[j - 2][i] != 'X' && board[j - 3][i] != 'X') {
        if (board[j][i] == 'O') {
          nYellows++;
        }
        if (board[j - 1][i] == 'O') {
          nYellows++;
        }
        if (board[j - 2][i] == 'O') {
          nYellows++;
        }
        if (board[j - 3][i] == 'O') {
          nYellows++;
        }
        if (nYellows == 1) {
          totalUtility = totalUtility - 1;
        }
        if (nYellows == 2) {
          totalUtility = totalUtility - 10;
        }
        if (nYellows == 3) {
          totalUtility = totalUtility - 50;
        }
        if (nYellows == 4) {
          totalUtility = totalUtility - 512;
        }
        nYellows = 0;
      }
      if (j - 4 < 0) {
        break;
      }
    }
  }

  //diagonal1
  for (var i = game.row - 1; i > 2; i--) {
    for (var j = 0; j < game.col - 3; j++) {
      if (board[i][j] != 'O' && board[i - 1][j + 1] != 'O' && board[i - 2][j + 2] != 'O' && board[i - 3][j + 3] != 'O') {
        if (board[i][j] == 'X') {
          nReds++;
        }
        if (board[i - 1][j + 1] == 'X') {
          nReds++;
        }
        if (board[i - 2][j + 2] == 'X') {
          nReds++;
        }
        if (board[i - 3][j + 3] == 'X') {
          nReds++;
        }
        if (nReds == 1) {
          totalUtility = totalUtility + 1;

        }
        if (nReds == 2) {
          totalUtility = totalUtility + 10;
        }
        if (nReds == 3) {
          totalUtility = totalUtility + 50;
        }
        if (nReds == 4) {
          totalUtility = totalUtility + 512;
        }
        nReds = 0;
      }

      if (board[i][j] != 'X' && board[i - 1][j + 1] != 'X' && board[i - 2][j + 2] != 'X' && board[i - 3][j + 3] != 'X') {
        if (board[i][j] == 'O') {
          nYellows++;
        }
        if (board[i - 1][j + 1] == 'O') {
          nYellows++;
        }
        if (board[i - 2][j + 2] == 'O') {
          nYellows++;
        }
        if (board[i - 3][j + 3] == 'O') {
          nYellows++;
        }
        if (nYellows == 1) {
          totalUtility = totalUtility - 1;
        }
        if (nYellows == 2) {
          totalUtility = totalUtility - 10;
        }
        if (nYellows == 3) {
          totalUtility = totalUtility - 50;
        }
        if (nYellows == 4) {
          totalUtility = totalUtility - 512;
        }
        nYellows = 0;
      }
    }
  }

  //diagonal2
  for (var i = 0; i < game.row - 3; i++) {
    for (var j = 0; j < game.col - 3; j++) {
      if (board[i][j] != 'O' && board[i + 1][j + 1] != 'O' && board[i + 2][j + 2] != 'O' && board[i + 3][j + 3] != 'O') {
        if (board[i][j] == 'X') {
          nReds++;
        }
        if (board[i + 1][j + 1] == 'X') {
          nReds++;
        }
        if (board[i + 2][j + 2] == 'X') {
          nReds++;
        }
        if (board[i + 3][j + 3] == 'X') {
          nReds++;
        }
        if (nReds == 1) {
          totalUtility = totalUtility + 1;

        }
        if (nReds == 2) {
          totalUtility = totalUtility + 10;
        }
        if (nReds == 3) {
          totalUtility = totalUtility + 50;
        }
        if (nReds == 4) {
          totalUtility = totalUtility + 512;
        }
        nReds = 0;
      }

      if (board[i][j] != 'X' && board[i + 1][j + 1] != 'X' && board[i + 2][j + 2] != 'X' && board[i + 3][j + 3] != 'X') {
        if (board[i][j] == 'O') {
          nYellows++;
        }
        if (board[i + 1][j + 1] == 'O') {
          nYellows++;
        }
        if (board[i + 2][j + 2] == 'O') {
          nYellows++;
        }
        if (board[i + 3][j + 3] == 'O') {
          nYellows++;
        }
        if (nYellows == 1) {
          totalUtility = totalUtility - 1;
        }
        if (nYellows == 2) {
          totalUtility = totalUtility - 10;
        }
        if (nYellows == 3) {
          totalUtility = totalUtility - 50;
        }
        if (nYellows == 4) {
          totalUtility = totalUtility - 512;
        }
        nYellows = 0;
      }
    }
  }
  return totalUtility;
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

function removeClick() {
  for (var i = 0; i < game.row; i++) {
    for (var j = 0; j < game.col; j++) {
      var id = "col_" + i + "_" + j;
      var element = document.getElementById(id);
      element.classList.add('noclick');
      element.onclick = function() {
        return false;
      }
    }
  }
}

function showWinner(player) {
  if (player === "ai") {
    updateTable(player);
    var pai = document.getElementById("showturn");
    pai.innerHTML = "Jogo Acabado!";
    var msg = document.getElementById("Page4");
    msg.style.display = "block";
    removeClick();
    return;
  } else {
    updateTable(player);
    var pai = document.getElementById("showturn");
    pai.innerHTML = "Jogo Acabado!";
    var msg = document.getElementById("Page5");
    msg.style.display = "block";
    removeClick();
    return;
  }
}

function checkIfWin(a, b) {
  var yellowC = false;
  var redC = false;
  var ai = "ai";
  var human = "human";
  for (var i = a - 1; i >= 0; i--) {
    for (var j = 0; j < b - 3; j++) {
      var id = "col_" + i + "_" + j;
      var id2 = "col_" + i + "_" + (j + 1);
      var id3 = "col_" + i + "_" + (j + 2);
      var id4 = "col_" + i + "_" + (j + 3);
      if (document.getElementById(id).classList.contains("red") && document.getElementById(id2).classList.contains("red") &&
        document.getElementById(id3).classList.contains("red") && document.getElementById(id4).classList.contains("red")) {
        showWinner(ai);
        return true;
      }
      if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
        document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
        showWinner(human);
        return true;
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
        showWinner(ai);
        return true;
      }
      if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
        document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
        showWinner(human);
        return true;
      }

      if (j - 4 < 0) {
        break;
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
        showWinner(ai);
        return true;
      }
      if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
        document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
        showWinner(human);
        return true;

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
        showWinner(ai);
        return true;

      }
      if (document.getElementById(id).classList.contains("yellow") && document.getElementById(id2).classList.contains("yellow") &&
        document.getElementById(id3).classList.contains("yellow") && document.getElementById(id4).classList.contains("yellow")) {
        showWinner(human);
        return true;

      }
    }
  }
  return false;
}
