import Player from "./player.js";
function playMusicLoop() {
    const music = new Audio("music.mp3");
    music.loop = true;
    music.play();
    // duration is 4 minutes, 6 seconds
}
function returnDirection(key) {
    if (key === "ArrowUp" || key === 'w')
        return 0 /* UP */;
    else if (key === "ArrowDown" || key === 's')
        return 1 /* DOWN */;
    else if (key === "ArrowLeft" || key === 'a')
        return 2 /* LEFT */;
    else if (key === "ArrowRight" || key === 'd')
        return 3 /* RIGHT */;
    return null;
}
const canvas = document.querySelector("canvas");
const canvasCtx = canvas.getContext("2d");
const player = new Player(0, 0, 20);
// keyboard listener
// keydown: press, keyup: release
var pressedKeys = Array(4).fill(false);
document.addEventListener("keyup", e => {
    const dir = returnDirection(e.key);
    if (dir != null)
        pressedKeys[dir] = false;
});
document.addEventListener("keydown", e => {
    const dir = returnDirection(e.key);
    if (dir != null)
        pressedKeys[dir] = true;
});
setInterval(() => {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    // update position
    pressedKeys.forEach((isDirPressed, index) => {
        if (isDirPressed)
            player.move(index);
    });
    player.draw(canvasCtx);
}, 20);
playMusicLoop();
