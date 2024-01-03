let { UNDERGROUND_START, UNDERGROUND_INTERCONNECT_RATE, UNDERGROUND_CHANNEL_SIZE_CHANGE_RATE, UNDERGROUND_CHANNEL_ISLAND_RATE, INK_EROSION_STRENGTH, INK_EROSION_DROPOFF, INK_EROSION_MINIMUM_STRENGTH } = require('../setup/gamemodeconfigs/theFrontier');
const offset = [0, 1, 0, -1, 0];
const stamps = [
    ['000',
     '000'],
    ['0000',
     '0000'],
    ['00000',
     '00100'],
    ['000000',
     '001000',
     '000100'],
    ['0000000',
     '0010000',
     '0001000',
     '0000100',
     '0011000',
     '0001100'],
    ['00000000',
     '00100000',
     '00010000',
     '00001000',
     '00000100',
     '00110000',
     '00011000',
     '00001100'],
    ['000000000',
     '000000000'],
    ['0000000000',
     '0000000000'],
];

function generateFrontierMaze(width, height) {
    // Base layout
    let maze = JSON.parse(JSON.stringify(Array(height).fill(Array(width + 1).fill(1))));
    maze.push(Array(width + 1).fill(0))
    global.frontierMazeWalls = [];

    // Corn maze
    for (let x = 1; x < width; x += 2) {
        for (let y = 1; y < height; y += 2) {
            maze[y][x] = -1;
            for (let i = 0; i < 4; i++) {
                let xOffset = offset[i],
                    yOffset = offset[i + 1],
                    nextX = x + xOffset,
                    nextY = y + yOffset;
                if (ran.random(100) <= UNDERGROUND_INTERCONNECT_RATE) maze[nextY][nextX] = -1;
            }
        }
    }

    // Large channel
    const squigglePeriod = 0.05 + ran.random(0.2),
        squiggleShift = ran.random(10),
        squiggleAmplitude1 = 1 + ran.random(height / 4),
        squiggleAmplitude2 = 1 + ran.random(height / 8);
    
    let yFunction = (x) => {
        let mainFlow = squiggleAmplitude1 * Math.sin(squigglePeriod * x + squiggleShift),
            secondaryFlow = squiggleAmplitude2 * Math.sin(2.5 * squigglePeriod * x + squiggleShift);
        return Math.floor(mainFlow + secondaryFlow + height / 2);
    }
    
    let startY = yFunction(0);
    let channelWidth = 5;
    for (let i = 0; i < width; i++) {
        // Set the channel's Y
        channelY = yFunction(i);

        // Modify the width
        let shouldChangeSize = ran.random(100);
        // 25% chance to increment size by 2 instead of 1 if we should increment at all
        if (shouldChangeSize <= (UNDERGROUND_CHANNEL_SIZE_CHANGE_RATE / 4)) {
            if (ran.random(100) <= 50) channelWidth += 2;
            else channelWidth -= 2;
        } else if (shouldChangeSize <= UNDERGROUND_CHANNEL_SIZE_CHANGE_RATE) {
            if (ran.random(100) <= 50) channelWidth += 1;
            else channelWidth -= 1;
        }
        // Expand at the ends
        let endEffect = Math.floor(Math.abs(i - width / 2) - width * 0.4 + 1);
        channelWidth += Math.max(0, endEffect);
        channelWidth = util.clamp(channelWidth, 3, 10);

        // Pick a stamp
        let stampChoices = stamps[channelWidth - 3];
        let stamp;
        if (ran.random(100) < UNDERGROUND_CHANNEL_ISLAND_RATE)
            stamp = stampChoices[ran.irandom(stampChoices.length - 2) + 1];
        else
            stamp = stampChoices[0];
        let stampLength = stamp.length;

        // Apply the stamp
        stampY = channelY - Math.floor(stampLength / 2);
        for (let j = 0; j < stampLength; j++) {
            if (0 <= (stampY + j) && (stampY + j) < height && stamp[j] == '0') maze[stampY + j][i] = -1;
        }

        // Remove end effect
        channelWidth -= Math.max(0, endEffect)
    }

    // Erode
    let erosionChance = INK_EROSION_STRENGTH;
    for (let i = width - 1; i >= 0; i--) {
        for (let j = 0; j < height; j++) {
            if (ran.random(100) <= erosionChance) maze[j][i] = -1;
        }
        erosionChance /= INK_EROSION_DROPOFF;
        if (erosionChance < INK_EROSION_MINIMUM_STRENGTH) break;
    }

    // Fill holes via BFS
    let bfsX = [0],
        bfsY = [startY];
    while (bfsX.length > 0) {
        let currentX = bfsX.shift(),
            currentY = bfsY.shift();
        for (let i = 0; i < 4; i++) {
            let nextX = currentX + offset[i],
                nextY = currentY + offset[i + 1];
            if (0 <= nextX && nextX < (width + 2) && 0 <= nextY && nextY < (height + 2) && maze[nextY][nextX] == -1) {
                bfsX.push(nextX);
                bfsY.push(nextY);
                maze[nextY][nextX] = 0;
            }
        }
    }

    // Spawn the maze
    for (let x = 0; x < width - 1; x++) {
        for (let y = 0; y < height - 1; y++) {
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
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let spawnWall = true;
            let d = {};
            let scale = room.height / height;
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
                    x: d.x + scale + UNDERGROUND_START * c.TILE_WIDTH,
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
    let towerTop = new Entity({
        x: c.TILE_WIDTH * 9,
        y: c.TILE_HEIGHT * 9,
    });
    towerTop.define(Class.towerMedium);
    towerTop.protect();
    towerTop.life();
};

module.exports = { generateFrontierMaze };