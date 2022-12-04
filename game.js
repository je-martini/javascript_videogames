const canvas = document.querySelector('#game');
const span_lives = document.querySelector('#lives');
const span_time =  document.querySelector('#time');
const span_record = document.querySelector('#record')
const p_result = document.querySelector('#result')
const game = canvas.getContext('2d');
const player_position = {
    x: undefined,
    y: undefined
};
const gift_position = {
    x: undefined,
    y: undefined
};



let canvas_sizes;
let elements_sizes;
let emoji;
let position_x;
let position_y;
let enemies_positions = [];
let level = 0;
let life = 3;
let time_start;
let new_record;
let time_interval;




window.addEventListener('load', set_canvas_sizes);
window.addEventListener('resize', set_canvas_sizes);
document.addEventListener('keydown', key_move);



function set_canvas_sizes(){
    if (window.innerHeight > window.innerWidth){
        canvas_sizes = window.innerWidth * 0.8
    } else {
        canvas_sizes = window.innerHeight * 0.8
    }
    
    canvas.setAttribute('width', canvas_sizes);
    canvas.setAttribute('height', canvas_sizes);
    
    elements_sizes = canvas_sizes / 10; 

    player_position.x = undefined;
    player_position.y = undefined;

    start_game();
}

function start_game() {
    
    lose_level(enemies_positions, player_position.x, player_position.y)
    
    win_level(player_position.x, gift_position.y, player_position.y, gift_position.x, maps.length - 1);
    
    span_record.innerHTML = localStorage.getItem('record_time')

    time_playing()
        
    show_lives()
    
    display_game()
    
    player_move();

}

function display_game(){
    enemies_positions = [];

    game.font = elements_sizes + 'px Verdana';          
    game.textAling = "end";

    const map = maps[level];

    const map_rows = map.trim().split('\n');
    
    const map_rows_col_element = map_rows.map(row => row.trim().split(''));

    game.clearRect(0, 0, canvas_sizes, canvas_sizes)
    
    display_grid(map_rows_col_element);
    
}

function display_grid(map_row){
    map_row.forEach((row, row_index) => {
        display_cols(row, row_index)
    });
}

function display_cols(map_col, index){
    map_col.forEach((col, col_index) => {
        emoji = emojis[col];
        position_x = elements_sizes * (col_index)
        position_y = elements_sizes * (index + 1)

        if (col == 'O') {
            if(!player_position.x && !player_position.y ){
                player_position.x = position_x; 
                player_position.y = position_y;
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
    });
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

function win_level (player_position_x, gift_position_y, player_position_y, gift_position_x, map_length){
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
    if(level > map_length){
        win_all_game_and_show_record()
    }
}

function win_all_game_and_show_record() {
    prompt('you win all the game')
        level = 0
        player_position.x = undefined;
        player_position.y = undefined;
        show_record_time()
}

function lose_level(enemy_position, player_position_x, player_position_y){    
    const enemies_collision = enemy_position.find(enemy => {
    const enemy_x = Math.trunc(enemy.x/*.toFixed(3)*/) == Math.trunc(player_position_x/*.toFixed(3)*/)
    const enemy_y = Math.trunc(enemy.y/*.toFixed(3)*/) == Math.trunc(player_position_y/*.toFixed(3)*/)
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

function show_record_time() {
    clearInterval(time_interval);

    let show_record = Number(span_time.innerHTML);
        
        if(!localStorage.record_time){
            console.log('1')
            localStorage.setItem('record_time', show_record);
            span_record.innerHTML = localStorage.getItem('record_time')
            
        } else {
            let record_time = localStorage.getItem('record_time');
            if(show_record < Number(record_time)){
                localStorage.setItem('record_time', show_record);
                span_record.innerHTML = localStorage.getItem('record_time')
            }
        }
        
    time_start = undefined;
}

function show_lives(){
    const hearts =Array(life).fill(emojis['HEART'])

    span_lives.innerHTML = hearts;
}

function time_playing(){
    if(time_start ==  undefined) {
        time_start = Date.now() 
        time_interval = setInterval(show_time, 100)
    } 
}

function show_time(){
    return span_time.innerHTML = Date.now() - time_start;
}

function player_move() {
    game.fillText(emojis['PLAYER'], player_position.x , player_position.y - 11)    
}




