import {
    StandingLeft, StandingRight, SittingLeft, SittingRight,
    RunningLeft, RunningRight, JumpingLeft, JumpingRight, FallingLeft, FallingRight,
} from './state.js';

export default class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [new StandingLeft(this), new StandingRight(this), new SittingLeft(this),
        new SittingRight(this), new RunningLeft(this), new RunningRight(this),
        new JumpingLeft(this), new JumpingRight(this), new FallingLeft(this), new FallingRight(this)]; // The order of the instances here should match 'states' array from state.js
        this.currentState = this.states[1];
        this.image = document.getElementById('dogImage');
        this.spriteWidth = 200;
        this.spriteHeight = 181.83;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = (this.gameWidth * 0.5) - (this.width * 0.5);
        this.y = (this.gameHeight - this.height);
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 6
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = 5;
        this.maxJumpSpeed = 20;
        this.weight = 0.5;
        this.fps = 30;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
    }

    update(input) {
        this.currentState.handleInput(input);
        this.x += this.speedX;

        // horizontal movement
        this.x += this.speedX;
        if (this.x <= 0) {
            this.x = 0
        } else if (this.x > (this.gameWidth - this.width)) {
            this.x = (this.gameWidth - this.width);
        }

        // vertical movement
        this.y += this.speedY;
        if (!this.onGround()) {
            this.speedY += this.weight;
        } else {
            this.speedY = 0;
        }

        if (this.y > (this.gameHeight - this.height)) {
            this.y = (this.gameHeight - this.height);
        };
    };

    draw(context, deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            };
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        context.drawImage(this.image, (this.frameX * this.spriteWidth), (this.frameY * this.spriteHeight), this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height);
    };

    setState(state) {
        // console.log(state);
        this.currentState = this.states[state];
        this.currentState.enter();
    };

    onGround() {
        return this.y >= (this.gameHeight - this.height); // returns true if the player is on the ground
    }
}