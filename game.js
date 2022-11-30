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
let level = 0;



const player_position = {
    x: undefined,
    y: undefined
};

const gift_position = {
    x: undefined,
    y: undefined
};

let enemies_positions = [];


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

    if (Math.trunc(player_position.y) == Math.trunc(gift_position.y)) {
        if( Math.trunc(player_position.x) == Math.trunc(gift_position.x) ) {
            level ++
            console.log('w')
        }
    } else if( Math.trunc(player_position.x) == Math.trunc(gift_position.x) ) {
        if (Math.trunc(player_position.y) == Math.trunc(gift_position.y)) {
            level ++
            console.log('w')
        }
    }

    
    const enemies_collision = enemies_positions.find(enemy => {
        const enemy_x = enemy.x.toFixed(3) == player_position.x.toFixed(3)
        const enemy_y = enemy.y.toFixed(3) == player_position.y.toFixed(3)
        return  enemy_x && enemy_y
    });
    if(enemies_collision) {
        console.log('l')
        level = 0
        player_position.x = undefined;
        player_position.y = undefined;
    };

    const map_length = maps.length - 1;
    if(level > map_length){
        prompt('you win all the game')
        level = 0
        player_position.x = undefined;
        player_position.y = undefined;

    }
    
    const map = maps[level];
    
    
    const map_rows = map.trim().split('\n');
    
    const map_rows_col_element = map_rows.map(row => row.trim().split(''));
    
    enemies_positions = [];

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
            } else if (col == 'I') {
                gift_position.x = position_x;
                gift_position.y = position_y
            } else if (col == 'X') {
                enemies_positions.push({
                    x: position_x,
                    y: position_y
                })
            }
            // console.log([`esto es x ${position_x} y esto es y ${position_y}`]);
            
            game.fillText(emoji, position_x , position_y)
        })
    });
    player_move();
    // enemy_collision = false;

}



function key_move(key_code) {
    if (key_code.keyCode === 38) up_button();
    if (key_code.keyCode === 37) left_button();
    if (key_code.keyCode === 39) rigth_button();
    if (key_code.keyCode === 40) down_button();
}

function up_button() {
    console.log('up');
    if ((player_position.y - elements_sizes) < (elements_sizes - 1)){
        console.log('out') 
    } else {        
        player_position.y -= elements_sizes;
        start_game(); 
    }
}
function down_button() {
    console.log('down')
    if ((player_position.y + elements_sizes) > canvas_sizes){
        console.log('out')
    } else {
        player_position.y += elements_sizes;
        
    }
    start_game()
}
function rigth_button() {
    console.log('rigth')
    if (Math.trunc(canvas_sizes) <= Math.trunc((player_position.x + elements_sizes))){
        console.log('out') 
    } else {        
        player_position.x += elements_sizes;
        start_game()
    }
}
function left_button() {
    console.log('left')
    if (Math.trunc((player_position.x * 1.1 ) - elements_sizes) < 0) {
        console.log('out') 
    } else {        
        player_position.x -= elements_sizes;
        start_game()
    }
}

function lose_level(){
    console.log('you lose') 
    level = 0;
    
}

function player_move() {
    // const gift_collision_x = player_position.x.toFixed(3) == gift_position.x.toFixed(3);
    // const gift_collision_y = player_position.y.toFixed(3) == gift_position.y.toFixed(3);
    // const gift_collision = gift_collision_x == gift_collision_y;
 
    // if(gift_collision) {
    //     console.log('w')
    //     level ++
    //     start_game()
    // };

    // const enemies_collision = enemies_positions.find(enemy => {
    //     const enemy_x = enemy.x == player_position.x
    //     const enemy_y = enemy.y == player_position.y
    //     return  enemy_x && enemy_y
    // });

    // if(enemies_collision) {
    //     console.log('l')
    //     // lose_level()
    // };

    game.fillText(emojis['PLAYER'], player_position.x , player_position.y - 11)    
}




