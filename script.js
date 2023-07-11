let rows = 6;
let cols = 7;

let row = '<tr>'+'<td><div class="circle"></div></td>'.repeat(cols)+'</tr>';
let grid = row.repeat(rows);

$("table").html(grid);

let turn = 1;
let player1 = "red";
let player2 = "blue";
function changeMessage(player){
    let message = player + "'s turn: Pick a column to drop your chip";
    $('.turn').text(message);
}
grid = Array(cols).fill(-1);
let finalGrid = Array(rows).fill(grid);
let lastRow = Array(rows).fill(-1);

function move(){
    let col = $(this).parent().index();
    if(lastRow[col] == rows-1){
        alert("This column is full. Please pick another column");
        return;
    }
    lastRow[col]++;
    console.log($('tr').eq(rows-lastRow[col]-1))
    $('tr').eq(rows-lastRow[col]-1).find('td').eq(col).find('div').addClass(turn==1?'player1':'player2');
    turn =!turn;
}

$('.circle').click(move);