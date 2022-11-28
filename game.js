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



const player_position = {
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
   
    game.clearRect(0, 0, canvas_sizes, canvas_sizes)

    map_rows_col_element.forEach((row, row_index) => {
        
        row.forEach((col, col_index) => {
            emoji = emojis[col];
            position_x = elements_sizes * (col_index)
            position_y = elements_sizes * (row_index + 1)

            if (col == 'O') {
                if(!player_position.x && !player_position.y ){
                player_position.x = position_x; 
                player_position.y = position_y;
                console.log({player_position})
                }
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
    if (player_position.y > (elements_sizes * 2)){
        player_position.y -= elements_sizes;
    }
    start_game(); 
}
function down_button() {
    console.log('down')
    if (player_position.y < canvas_sizes){
        player_position.y += elements_sizes;
    }
    start_game()
}
function rigth_button() {
    console.log('rigth')
    console.log(canvas_sizes - elements_sizes)
    if (player_position.x < (canvas_sizes - elements_sizes - 1)){
        player_position.x += elements_sizes;
    }
    start_game()
}

function left_button() {
    console.log('left')
    if( player_position.x > elements_sizes){
        player_position.x -= elements_sizes;
    }
    start_game()
}

function player_move() {
    game.fillText(emojis['PLAYER'], player_position.x , player_position.y - 11)    
}



