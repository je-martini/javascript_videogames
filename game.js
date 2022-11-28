const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', set_canvas_sizes);
window.addEventListener('resize', set_canvas_sizes);

document.addEventListener('keydown', key_move);

let canvas_sizes;
let elements_sizes;
let emoji;
let position_x;
let position_y;

const last_player_position = {
    x: 0,
    y: 0
};

const player_position = {
    x: 0,
    y: 0
};
const start_player_position = {
    x: undefined,
    y: undefined
};

function set_canvas_sizes(){
    if (window.innerHeight > window.innerWidth){
        canvas_sizes = window.innerWidth * 0.8
    } else {
        canvas_sizes = window.innerHeight * 0.8
    }
    
    canvas.setAttribute('width', canvas_sizes);
    canvas.setAttribute('height', canvas_sizes);
    
    elements_sizes = canvas_sizes / 10;   
    console.log(canvas_sizes, elements_sizes);
    start_game();
}

function start_game() {

    game.font = elements_sizes + 'px Verdana';          
    game.textAling = 'end'
    
    const map = maps[0];
    
    const map_rows = map.trim().split('\n');

    const map_rows_col_element = map_rows.map(row => row.trim().split(''));
    
    map_rows_col_element.forEach((row, row_index) => {
        
        row.forEach((col, col_index) => {
            emoji = emojis[col];
            position_x = elements_sizes * (col_index)
            position_y = elements_sizes * (row_index + 1)

            if (col == 'O') {
                start_player_position.x = position_x; 
                start_player_position.y = position_y;
                console.log({start_player_position})
            }
            // console.log([`esto es x ${position_x} y esto es y ${position_y}`]);

            game.fillText(emoji, position_x , position_y)
        })
    });
    player_move();
}



function key_move(key_code) {
    if (key_code.keyCode === 38) up_button();
    if (key_code.keyCode === 37) left_button();
    if (key_code.keyCode === 39) rigth_button();
    if (key_code.keyCode === 40) down_button();
}

function up_button() {
    console.log('up');
    if(player_position.y == 0){
        player_position.y = start_player_position.y - elements_sizes
    } else {
        player_position.y -= elements_sizes
        last_player_position.y = player_position.y + elements_sizes
    }
    player_move();
    if (player_move() > 0) {
        if(last_player_position.x !== player_position.x){
            last_player_position.x = player_position.x
        }
        game.clearRect(last_player_position.x + 10, last_player_position.y - elements_sizes + 17, elements_sizes , elements_sizes);
    }
}
function down_button() {
    console.log('down')
    if(player_position.y == 0){
        player_position.y = start_player_position.y + elements_sizes
    } else {
        player_position.y += elements_sizes
        last_player_position.y = player_position.y - elements_sizes
    }
    player_move();
    if (player_move() > 0) {
        if(last_player_position.x !== player_position.x){
            last_player_position.x = player_position.x
        }
        game.clearRect(last_player_position.x + 10, last_player_position.y - elements_sizes, elements_sizes , elements_sizes + 11);
    }
}
function rigth_button() {
    console.log('rigth')
    if(player_position.x == 0){
        player_position.x = start_player_position.x + elements_sizes
    } else {
        player_position.x += elements_sizes
        last_player_position.x = player_position.x - elements_sizes
    }
    player_move();
    if (player_move() > 0) {
        game.clearRect(last_player_position.x + 10, player_position.y - elements_sizes , elements_sizes , elements_sizes + 20);
    }
}

function left_button() {
    console.log('left')
    if(player_position.x == 0){
        player_position.x = start_player_position.x - elements_sizes
    } else {
        player_position.x -= elements_sizes
        last_player_position.x = player_position.x + elements_sizes
    }
    player_move();
    if (player_move() > 0) {
        game.clearRect(last_player_position.x + 10, player_position.y - elements_sizes , elements_sizes , elements_sizes + 20);
    }
}

function player_move() {
    
    let position = player_position.x + player_position.y;
    let last_position = last_player_position.x + last_player_position.y;

    if( position == 0)  {
        game.clearRect(start_player_position.x + 5, start_player_position.y - elements_sizes, elements_sizes, elements_sizes);
        game.fillText(emojis['PLAYER'], start_player_position.x , start_player_position.y - 11)    
    }
    else{
        game.clearRect(start_player_position.x + 10, start_player_position.y - elements_sizes , elements_sizes, elements_sizes);
        game.fillText(emojis['O'], start_player_position.x , start_player_position.y)    
        game.fillText(emojis['PLAYER'], player_position.x , player_position.y)
    }
    return last_position;
}



