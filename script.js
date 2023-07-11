var rows = 6;
var cols = 7;
var row = '<tr>'+'<td><div class="circle"></div></td>'.repeat(cols)+'</tr>';
var grid = row.repeat(rows);

// $("table").html(grid);
document.querySelector("table").innerHTML = grid;