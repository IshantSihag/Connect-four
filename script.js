let rows = 6;
let cols = 7;

let row = '<tr>'+'<td><div class="circle"></div></td>'.repeat(cols)+'</tr>';
let grid = row.repeat(rows);

$("table").html(grid);

let turn = true;
let player1 = "red";
let player2 = "blue";
function changeMessage(player){
    let message = player + "'s turn: Pick a column to drop your chip";
    $('.turn').text(message);
}
grid = Array(cols).fill(-1);
// let finalGrid = new Array(rows).fill(grid);
let finalGrid = [];
for(let i=0; i<rows; i++){
    finalGrid[i]=[];
    for(let j=0; j<cols; j++)
        finalGrid[i][j]=-1;
}

let lastRow = Array(cols).fill(-1);

function move(){
    console.log(finalGrid)
    let col = $(this).parent().index();
    if(lastRow[col] == rows-1){
        $('.turn').text("This column is full. Please pick another column");
        $('.turn').addClass('error');
        $('.turn').removeClass('no-error');
        return;
    }
    $('.turn').addClass('no-error');
    $('.turn').removeClass('error');
    lastRow[col]++;
    console.log($('tr').eq(rows-lastRow[col]-1))
    $('tr').eq(rows-lastRow[col]-1).find('td').eq(col).find('div').addClass(turn==1?'player1':'player2');;
    finalGrid[rows-lastRow[col]-1][col] = turn;
    console.log(finalGrid);
    if(checkWin()==-1)
    {
        turn =!turn;
        changeMessage(turn==1?player1:player2);
    }
    else
    {
        $('.turn').addClass('winner');
        $('.turn').removeClass('no-error');
        let message = "Congratulations "+turn==1?player2:player1 + " won the game!";
        $('.turn').text(message);
        $('.circle').off('click');

        $('body').blur();
        setInterval(() => {
            location.reload();
        }, 10000);
    }

}
function reload(){
    location.reload();
}

function checkWin(){
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols-3; j++){
            let val=finalGrid[i][j];
            for(let k=0; k<4; k++){
                if(finalGrid[i][j+k]!=val)
                    break;
                if(k==3 && val!=-1)
                    return val;
            }
        }
    }
    for(let i=0; i<rows-3; i++){
        for(let j=0; j<cols; j++){
            let val=finalGrid[i][j];
            for(let k=0; k<4; k++){
                if(finalGrid[i+k][j]!=val)
                    break;
                if(k==3 && val!=-1)
                    return val;
            }

        }
    }
    return -1;
}

$('.circle').click(move);
$('.circle').hover(function(){$(this).addClass('hovering')}, function(){$(this).removeClass('hovering')});