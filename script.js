import Player from './player.js'; // You'd need { Player } for non-default exports
import InputHandler from './input.js';
import { drawStatusText } from './utils.js';

window.addEventListener('load', function () {
    const loadingText = document.getElementById('loading');
    loadingText.style.display = 'none';
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);

    // let prevKey;
    let lastTime = 0;
    function animate(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // if (input.lastKey !== prevKey) console.log(input.lastKey);
        // prevKey = input.lastKey
        drawStatusText(ctx, input, player);
        player.update(input.lastKey);
        player.draw(ctx, deltaTime);
        requestAnimationFrame(animate);
    };

    animate(0);

});