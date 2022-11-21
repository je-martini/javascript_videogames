const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', start_game)

function start_game() {
    game.fillRect(0, 0, 100, 100);
    game.clearRect(0,0,50,50);
}


