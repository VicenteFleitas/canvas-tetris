export const colors = [ 
null, "#e74c3c", "#f1c40f", "#8e44ad", 
"#27ae60", "#3498db", "#e67e22", "#9b59b6" ];

export function drawMatrix(matrix, offset, ctx) {
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				ctx.fillStyle = colors[value];
				ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
			}
		})
	})
}

export function collide(arena, player) {
	const [m, o] = [ player.matrix, player.pos ];
	for (let y = 0; y < m.length; y++) {
		for (let x = 0; x < m[y].length; x++) {
			if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
				return true;
			}
		}
	}
	return false;
}

 
// [1,2,3]                 [1,4,7]
// [4,5,6] rows to cols => [2,5,8]
// [7,8,9]                 [3,6,9]
export function rotateArray(matrix, dir) {
	// rows to cols
	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < y; x++) {
			[ matrix[x][y], matrix[y][x] ] = [ matrix[y][x], matrix[x][y] ];
		}
	}
	// reverse
	if (dir > 0) {
		matrix.forEach(row => row.reverse());
	} else {
		matrix.reverse();
	}

}

export function addblockToArena(arena, player) {
	player.matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				arena[y + player.pos.y][x + player.pos.x] = value;
			}
		})
	})
}

export function createMatrix(w, h) {
	const matrix = [];
	while (h--) {
		matrix.push(new Array(w).fill(0));
	}
	return matrix;
}

export function clearArena(arena, player) {
	let rowCount = 1;
	outer: for (let y = arena.length - 1; y > 0; y--) {
		for (let x = 0; x < arena[y].length; x++) {
			if (arena[y][x] === 0) {
				continue outer;
			}
		}

		const row = arena.splice(y, 1)[0].fill(0);
		arena.unshift(row);
		y++;

		player.score += rowCount * 10;
		rowCount *= 2;
	}
}

export function createblock(type) {
	if (type === 'T') {
		return [
			[0, 0, 0],
			[1, 1, 1],
			[0, 1, 0]
		];
	} else if (type === 'O') {
		return [
			[2, 2],
			[2, 2]
		];
	} else if (type === 'L') {
		return [
			[0, 3, 0],
			[0, 3, 0],
			[0, 3, 3]
		];
	} else if (type === 'J') {
		return [
			[0, 4, 0],
			[0, 4, 0],
			[4, 4, 0]
		];
	} else if (type === 'I') {
		return [
			[0, 5, 0, 0],
			[0, 5, 0, 0],
			[0, 5, 0, 0],
			[0, 5, 0, 0]
		];
	} else if (type === 'S') {
		return [
			[0, 6, 6],
			[6, 6, 0],
			[0, 0, 0]
		];
	} else if (type === 'Z') {
		return [
			[7, 7, 0],
			[0, 7, 7],
			[0, 0, 0]
		];
	}
}