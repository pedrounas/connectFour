function makeBoard() {
  row = prompt("Número de filas", 6);
  col = prompt("Número de colunas", 7);
  var i = 0;
  var j = 0;
  for (i = 0; i < parseInt(row);i++) {
    var rows = document.createElement("div");
    console.log(rows);
    rows.id = "row" + i;
    document.getElementById("board").appendChild(rows)
    for (j = 0; j < parseInt(col);j++) {
      var cols = document.createElement("div");
      cols.id = "col" + i + j;
      rows.appendChild(cols);

    }
  }
}
