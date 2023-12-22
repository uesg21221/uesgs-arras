let { UNDERGROUND_START, UNDERGROUND_INTERCONNECT_RATE_X, UNDERGROUND_INTERCONNECT_RATE_Y, UNDERGROUND_STREAK_RATE, UNDERGROUND_STREAK_SHIFT_RATE, INK_EROSION_STRENGTH, INK_EROSION_DROPOFF, INK_EROSION_MINIMUM_STRENGTH } = require('../setup/gamemodeconfigs/theFrontier');
const offset = [0, 1, 0, -1, 0];

function generateFrontierMaze(width, height) {
    // Base layout
    let maze = JSON.parse(JSON.stringify(Array(height + 2).fill([2, ...Array(width).fill(1), 2])));
    maze[0] = Array(width + 2).fill(2);
    maze[height + 1] = Array(width + 2).fill(2);
    global.frontierMazeWalls = [];

    // Interconnecting
    for (let i = 2; i < height; i += 2) {
        for (let j = 2; j < width; j += 2) {
            maze[i][j] = 2;

            if ((i % 4) == (j % 4)) {
                for (let k = 0; k < 4; k++) {
                    let threshold = k % 2 ? UNDERGROUND_INTERCONNECT_RATE_X : UNDERGROUND_INTERCONNECT_RATE_Y;
                    if (ran.random(100) <= threshold) {
                        let xOffset = offset[k],
                            yOffset = offset[k + 1];
                        maze[i + yOffset][j + xOffset] = 2;
                    }
                }
            }
        }
    }

    // Horizontal streaks
    for (let i = 2; i < height; i += 2) {
        if (ran.random(100) <= UNDERGROUND_STREAK_RATE) {
            let y = i,
                lastY = y;
            maze[y][width] = 2;
            for (let x = 0; x < width; x += 2) {
                maze[y][x] = 2;
                maze[y][x + 1] = 2;
                if (ran.random(100) <= UNDERGROUND_STREAK_SHIFT_RATE) {
                    if (ran.random() <= 0.5)
                        y = Math.min(height - 1, y + 2);
                    else
                        y = Math.max(0, y - 2);

                    // Bridging the shift
                    for (let j = Math.min(lastY, y); j < Math.max(lastY, y) + 1; j++)
                        maze[j][x + 2] = 2;
                    lastY = y;
                }
            }
        }
    }

    // Erode
    let erosionChance = INK_EROSION_STRENGTH;
    for (let i = width; i > 0; i--) {
        for (let j = 1; j <= height; j++) {
            if (ran.random(100) <= erosionChance) maze[j][i] = 2;
        }
        erosionChance /= INK_EROSION_DROPOFF;
        if (erosionChance < INK_EROSION_MINIMUM_STRENGTH) break;
    }

    // Fill holes via BFS
    let bfsX = [0],
        bfsY = [0];
    while (bfsX.length > 0) {
        let currentX = bfsX.shift(),
            currentY = bfsY.shift();
        for (let i = 0; i < 4; i++) {
            let nextX = currentX + offset[i],
                nextY = currentY + offset[i + 1];
            if (0 <= nextX && nextX < (width + 2) && 0 <= nextY && nextY < (height + 2) && maze[nextY][nextX] == 2) {
                bfsX.push(nextX);
                bfsY.push(nextY);
                maze[nextY][nextX] = 0;
            }
        }
    }

    // Spawn the maze
    for (let x = 1; x <= width; x++) {
        for (let y = 1; y <= height; y++) {
            if (maze[y][x] && maze[y + 1][x] && maze[y + 2][x] && maze[y][x + 1] && maze[y][x + 2] && maze[y + 1][x + 2] && maze[y + 2][x + 1] && maze[y + 1][x + 1] && maze[y + 2][x + 2]) {
                maze[y][x] = 3;
                maze[y + 1][x] = false;
                maze[y][x + 1] = false;
                maze[y + 2][x] = false;
                maze[y][x + 2] = false;
                maze[y + 2][x + 1] = false;
                maze[y + 1][x + 2] = false;
                maze[y + 1][x + 1] = false;
                maze[y + 2][x + 2] = false;
            } else if (maze[y][x] && maze[y + 1][x] && maze[y][x + 1] && maze[y + 1][x + 1]) {
                maze[y][x] = 2;
                maze[y + 1][x] = false;
                maze[y][x + 1] = false;
                maze[y + 1][x + 1] = false;
            }
        }
    }
    for (let x = 1; x <= width; x++) {
        for (let y = 1; y <= height; y++) {
            let spawnWall = true;
            let d = {};
            let scale = room.height / (height + 2);
            let loc = {x, y}
            if (maze[y][x] === 3) d = {
                x: (x * scale) + (scale * 1.5),
                y: (y * scale) + (scale * 1.5),
                s: scale * 3,
                sS: 5
            };
            else if (maze[y][x] === 2) d = {
                x: (x * scale) + scale,
                y: (y * scale) + scale,
                s: scale * 2,
                sS: 2.5
            };
            else if (maze[y][x]) d = {
                x: (x * scale) + (scale * 0.5),
                y: (y * scale) + (scale * 0.5),
                s: scale,
                sS: 1
            };
            else spawnWall = false;
            if (spawnWall /*&& room.getAt(loc).data.allowMazeWallSpawn*/) {
                let o = new Entity({
                    x: d.x + UNDERGROUND_START * c.TILE_WIDTH,
                    y: d.y
                });
                o.define(Class.wall);
                o.SIZE = d.s * 0.5;
                o.team = TEAM_ENEMIES;
                o.protect();
                o.life();
                frontierMazeWalls.push(o);
            }
        }
    }
};

module.exports = { generateFrontierMaze };