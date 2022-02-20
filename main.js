import { collide, createMatrix, createblock, colors,
drawMatrix, clearArena, addblockToArena, rotateArray } from "./utils.js";
// init canvas
let canvas = document.getElementById('canvas');
canvas.style.background = "#2c3e50";
canvas.setAttribute("width", 240);
canvas.setAttribute("height", 400);
let ctx = canvas.getContext('2d');
ctx.scale(20, 20);
// create variables
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
const arena = createMatrix(12, 20);
const block = {
	pos: { x: 0, y: 0 },
	matrix: null,
	score: 0
}

function blockLand() {
	block.pos.y++;
	if (collide(arena, block)) {
		block.pos.y--;
		addblockToArena(arena, block);
		resetblock();
		clearArena(arena, block);
		updateScore();
	}
	dropCounter = 0;
}

function moveblock(dir) {
	block.pos.x += dir;
	if (collide(arena, block)) {
		block.pos.x -= dir;
	}
}

function resetblock() {
	const blocks = 'ILJOTSZ';
	block.matrix = createblock(blocks[blocks.length * Math.random() | 0]);
	block.pos.y = 0;
	block.pos.x = (arena[0].length / 2 | 0) -
				   (block.matrix[0].length / 2 | 0);
	if (collide(arena, block)) {
		arena.forEach(row => row.fill(0));
		block.score = 0;
		updateScore();
	}
}

function blockRotate(dir) {
	const pos = block.pos.x;
	let offset = 1;
	rotateArray(block.matrix, dir);
	while (collide(arena, block)) {
		block.pos.x += offset;
		offset = -(offset + (offset > 0 ? 1 : -1));
		if (offset > block.matrix[0].length) {
			rotateArray(block.matrix, -dir);
			block.pos.x = pos;
			return;
		}
	}
}

function drawArenaBlock() {
	drawMatrix(arena, { x:0, y: 0 }, ctx)
	drawMatrix(block.matrix, block.pos, ctx);
}

function updateScore() {
	document.getElementById('score').innerHTML = `Score: ${block.score}`
}

function update(time = 0) {
	// move block by time
	const deltaTime = time - lastTime;
	lastTime = time;
	dropCounter += deltaTime;
	if (dropCounter > dropInterval) {
		blockLand();
	}
	// draw
	ctx.clearRect(0, 0, 240, 400);
	drawArenaBlock();
	requestAnimationFrame(update);
}

window.addEventListener("keydown", e => {
	if (e.key === "a") {
		moveblock(-1);
	};
	if (e.key === "d") {
		moveblock(1);
	}
	if (e.key === "s") blockLand();
	if (e.keyCode === 32) blockRotate(-1);

});

resetblock();
updateScore();
update();

