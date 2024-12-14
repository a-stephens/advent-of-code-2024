class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const Direction = {
    NORTH: 0,
    EAST: 1,
    SOUTH: 2,
    WEST: 3
};

function checkCollision(coord1, coord2) {
    if (coord1.x === coord2.x && coord1.y === coord2.y) {
        return true;
    }
    return false;
}

class Pose extends Coordinate {
    constructor(x, y, dir) {
        super(x, y);
        this.dir = dir;
    }
}

class Guard extends Coordinate {
    constructor(x, y) {
        super(x, y);
        this.dir = Direction.NORTH;
        this.obs = [];
    }

    set direction(val) {
        this.dir = val;
    }

    get direction() {
        return this.dir;
    }

    set obstacles(val) {
        this.obs = Array.from(val);
    }

    get obstacles() {
        return Array.from(this.obs);
    }

    get pose() {
        return new Pose(this.x, this.y, this.dir);
    }

    turn() {
        this.dir++;
        if (this.dir > Direction.WEST) {
            this.dir = Direction.NORTH;
        }
    }

    canWalk() {
        switch (this.dir) {
            case Direction.NORTH:
                let tempNorthCoord = new Coordinate(this.x, this.y - 1);
                for (const o of this.obs) {
                    if (checkCollision(tempNorthCoord, o)) {
                        return false;
                    }
                }
                return true;
            case Direction.EAST:
                let tempEastCoord = new Coordinate(this.x + 1, this.y);
                for (const o of this.obs) {
                    if (checkCollision(tempEastCoord, o)) {
                        return false;
                    }
                }
                return true;
            case Direction.SOUTH:
                let tempSouthCoord = new Coordinate(this.x, this.y + 1);
                for (const o of this.obs) {
                    if (checkCollision(tempSouthCoord, o)) {
                        return false;
                    }
                }
                return true;
            case Direction.WEST:
                let tempWestCoord = new Coordinate(this.x - 1, this.y);
                for (const o of this.obs) {
                    if (checkCollision(tempWestCoord, o)) {
                        return false;
                    }
                }
                return true;
        }
    }

    walk() {
        switch (this.dir) {
            case Direction.NORTH:
                let tempNorthCoord = new Coordinate(this.x, this.y - 1);
                for (const o of this.obs) {
                    if (checkCollision(tempNorthCoord, o)) {
                        return false;
                    }
                }
                this.y--;
                return true;
            case Direction.EAST:
                let tempEastCoord = new Coordinate(this.x + 1, this.y);
                for (const o of this.obs) {
                    if (checkCollision(tempEastCoord, o)) {
                        return false;
                    }
                }
                this.x++;
                return true;
            case Direction.SOUTH:
                let tempSouthCoord = new Coordinate(this.x, this.y + 1);
                for (const o of this.obs) {
                    if (checkCollision(tempSouthCoord, o)) {
                        return false;
                    }
                }
                this.y++;
                return true;
            case Direction.WEST:
                let tempWestCoord = new Coordinate(this.x - 1, this.y);
                for (const o of this.obs) {
                    if (checkCollision(tempWestCoord, o)) {
                        return false;
                    }
                }
                this.x--;
                return true;
        }
    }
}

function readInput(filepath) {
    var fs = require("fs");
    let data = fs.readFileSync(filepath).toString().split('\n').filter(n => n);
    let results = [];
    for (const d of data) {
        results.push(d.split(""));
    }
    return results;
}

function getObstacles(grid) {
    const obstacle = '#';
    let ret = [];
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === obstacle) {
                ret.push(new Coordinate(c, r));
            }
        }
    }
    return ret;
}

function getGuardLocation(grid) {
    const guard = '^';
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === guard) {
                return new Guard(c, r);
            }
        }
    }
    return null;
}

function main(input) {
    let grid = readInput(input);
    let guard = getGuardLocation(grid);

    guard.obstacles = getObstacles(grid);
    let withinBounds = guard.x >= 0 && guard.x < grid[0].length
                       && guard.y >= 0 && guard.y < grid.length;

    let path = [];
    path.push(guard.pose);
    while (withinBounds) {
        let walked = guard.walk();
        if (!walked) {
            guard.turn();
        }

        withinBounds = guard.x >= 0 && guard.x < grid[0].length
                       && guard.y >= 0 && guard.y < grid.length;
        if (walked && withinBounds) {
            let found = false;
            for (const item of path) {
                if (
                    item.x === guard.x && item.y === guard.y
                ) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                path.push(guard.pose);
            }
        }
    }
    console.log(path.length);
}

main('example_input.txt');
main('input.txt');
