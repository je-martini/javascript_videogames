const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', set_canvas_sizes);
window.addEventListener('resize', set_canvas_sizes);

let canvas_sizes;
let elements_sizes;

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

    for (let i = 0; i < 10; i++) {    
        game.fillText(emojis['X'], -3 + (i * elements_sizes), elements_sizes); 
    }
}


