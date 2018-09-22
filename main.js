function makeBoard() {
  row = window.prompt("Número de filas", 6);
  col = window.prompt("Número de colunas", 7);

  for (var i = 0; i < parseInt(row);i++) {
    var rows = document.createElement("div");
    console.log(rows);
    rows.classList.add("row");
    document.getElementById("board").appendChild(rows)
    for (var j = 0; j < parseInt(col);j++) {
      var cols = document.createElement("div");
      cols.classList.add("col");
      rows.appendChild(cols);

    }
  }
}
