const canvas = document.querySelector('#game');
const span_lives = document.querySelector('#lives');
const span_time =  document.querySelector('#time');
const span_record = document.querySelector('#record')
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
let life = 3;

let time_start;
let time_playing;
let record_time;
let new_record;
let time_interval;



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
    game.textAling = 'end';

    win_level(player_position.x, gift_position.y, player_position.y, gift_position.x);
    
    lose_level(enemies_positions, player_position.x, player_position.y)
    
    const map_length = maps.length - 1;

    if(time_start ==  undefined) {
        time_start = Date.now()  
        time_interval = setInterval(show_time, 100)
    } 

    if(level > map_length){
        win_all_game()
    }

    const map = maps[level];

    const map_rows = map.trim().split('\n');
    
    const map_rows_col_element = map_rows.map(row => row.trim().split(''));
    
    show_lives()

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

function win_level (player_position_x, gift_position_y, player_position_y, gift_position_x){
    if (Math.trunc(player_position_y) == Math.trunc(gift_position_y)) {
        if( Math.trunc(player_position_x) == Math.trunc(gift_position_x) ) {
            level ++
            console.log('w')
        }
    } else if( Math.trunc(player_position_x) == Math.trunc(gift_position_x) ) {
        if (Math.trunc(player_position_y) == Math.trunc(gift_position_y)) {
            level ++
            console.log('w')
        }
    }
}
function win_all_game() {
    prompt('you win all the game')
        level = 0
        player_position.x = undefined;
        player_position.y = undefined;
        clearInterval(time_interval);
        if( record_time == undefined){
            record_time = time_start;
            new_record = record_time;
            span_record.innerHTML = new_record;
        } else if( new_record < time_start){
            new_record = time_start
            span_record.innerHTML = new_record;
        }
        time_start = undefined;
}

function lose_level(enemy_position, player_position_x, player_position_y){    
    const enemies_collision = enemy_position.find(enemy => {
    const enemy_x = enemy.x.toFixed(3) == player_position_x.toFixed(3)
    const enemy_y = enemy.y.toFixed(3) == player_position_y.toFixed(3)
    return  enemy_x && enemy_y
    })
    if(enemies_collision) {
        console.log('l')
        player_position.x = undefined;
        player_position.y = undefined;
        life --;
        if(life < 1){
            level = 0
            life = 3
            time_start = undefined;
        }
    console.log(life)
    };
}

function show_lives(){
    const hearts =Array(life).fill(emojis['HEART'])

    span_lives.innerHTML = hearts;
}
function show_time(){
    return span_time.innerHTML = Date.now() - time_start;
}

function player_move() {
    game.fillText(emojis['PLAYER'], player_position.x , player_position.y - 11)    
}




