const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLOR_MAPPING = [
    'red',
    'orange',
    'green',
    'purple',
    'blue',
    'cyan',
    'yellow',
    'white'
];

const BRICK_LAYOUT = [
    [
        [
          [1, 7, 7],
          [1, 1, 1],
          [7, 7, 7],
        ],
        [
          [7, 1, 1],
          [7, 1, 7],
          [7, 1, 7],
        ],
        [
          [7, 7, 7],
          [1, 1, 1],
          [7, 7, 1],
        ],
        [
          [7, 1, 7],
          [7, 1, 7],
          [1, 1, 7],
        ],
      ],
      [
        [
          [7, 1, 7],
          [7, 1, 7],
          [7, 1, 1],
        ],
        [
          [7, 7, 7],
          [1, 1, 1],
          [1, 7, 7],
        ],
        [
          [1, 1, 7],
          [7, 1, 7],
          [7, 1, 7],
        ],
        [
          [7, 7, 1],
          [1, 1, 1],
          [7, 7, 7],
        ],
      ],
      [
        [
          [1, 7, 7],
          [1, 1, 7],
          [7, 1, 7],
        ],
        [
          [7, 1, 1],
          [1, 1, 7],
          [7, 7, 7],
        ],
        [
          [7, 1, 7],
          [7, 1, 1],
          [7, 7, 1],
        ],
        [
          [7, 7, 7],
          [7, 1, 1],
          [1, 1, 7],
        ],
      ],
      [
        [
          [7, 1, 7],
          [1, 1, 7],
          [1, 7, 7],
        ],
        [
          [1, 1, 7],
          [7, 1, 1],
          [7, 7, 7],
        ],
        [
          [7, 7, 1],
          [7, 1, 1],
          [7, 1, 7],
        ],
        [
          [7, 7, 7],
          [1, 1, 7],
          [7, 1, 1],
        ],
      ],
      [
        [
          [7, 7, 7, 7],
          [1, 1, 1, 1],
          [7, 7, 7, 7],
          [7, 7, 7, 7],
        ],
        [
          [7, 7, 1, 7],
          [7, 7, 1, 7],
          [7, 7, 1, 7],
          [7, 7, 1, 7],
        ],
        [
          [7, 7, 7, 7],
          [7, 7, 7, 7],
          [1, 1, 1, 1],
          [7, 7, 7, 7],
        ],
        [
          [7, 1, 7, 7],
          [7, 1, 7, 7],
          [7, 1, 7, 7],
          [7, 1, 7, 7],
        ],
      ],
      [
        [
          [7, 7, 7, 7],
          [7, 1, 1, 7],
          [7, 1, 1, 7],
          [7, 7, 7, 7],
        ],
        [
          [7, 7, 7, 7],
          [7, 1, 1, 7],
          [7, 1, 1, 7],
          [7, 7, 7, 7],
        ],
        [
          [7, 7, 7, 7],
          [7, 1, 1, 7],
          [7, 1, 1, 7],
          [7, 7, 7, 7],
        ],
        [
          [7, 7, 7, 7],
          [7, 1, 1, 7],
          [7, 1, 1, 7],
          [7, 7, 7, 7],
        ],
      ],
      [
        [
          [7, 1, 7],
          [1, 1, 1],
          [7, 7, 7],
        ],
        [
          [7, 1, 7],
          [7, 1, 1],
          [7, 1, 7],
        ],
        [
          [7, 7, 7],
          [1, 1, 1],
          [7, 1, 7],
        ],
        [
          [7, 1, 7],
          [1, 1, 7],
          [7, 1, 7],
        ],
    ],
];

const KEY_CODES = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown'
};

const WHITE_COLOR_ID = 7;

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d')

ctx.canvas.width = COLS*BLOCK_SIZE;
ctx.canvas.height = ROWS*BLOCK_SIZE;

class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.generateWhiteBoard()
    }

    generateWhiteBoard() {
        return Array.from({ length: ROWS}, () => Array(COLS).fill(WHITE_COLOR_ID));
    }

    drawCell(xAxis, yAxis, colorId) {
        this.ctx.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
        this.ctx.fillRect(
            xAxis*BLOCK_SIZE,
            yAxis*BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
        );
        this.ctx.fillStyle = 'black';
        this.ctx.strokeRect(
            xAxis*BLOCK_SIZE,
            yAxis*BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
        )
    }

    drawBoard() {
        for (let row = 0; row < this.grid.length; row++) {
          for (let col = 0; col < this.grid[0].length; col++) {
            this.drawCell(col, row, this.grid[row][col]);
          }
        }
      }
}

class Brick {
    constructor(id) {
        this.id = id;
        this.layout = BRICK_LAYOUT[id]
        this.activeIndex = 0;
        this.colPos = 5;
        this.rowPos = 6;
    }

    draw() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, this.id);
                }
            }
        }
    }

    clear() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, WHITE_COLOR_ID);
                }
            }
        }
    }

    moveLeft() {
        if (!this.checkCollision(
            this.rowPos,
            this.colPos - 1,
            this.layout[this.activeIndex]
        )) {
            this.clear();
            this.colPos--;
            this.draw();
        }
    }

    moveRight() {
        if (!this.checkCollision(
            this.rowPos,
            this.colPos + 1,
            this.layout[this.activeIndex]
        )) {
            this.clear();
            this.colPos++;
            this.draw();
        }
    }

    moveDown() {
        if (!this.checkCollision(
            this.rowPos + 1,
            this.colPos,
            this.layout[this.activeIndex]
        )) {
            this.clear();
            this.rowPos++;
            this.draw();
        }
    }

    Rotate() {
        if (!this.checkCollision(
            this.rowPos,
            this.colPos,
            this.layout[(this.activeIndex + 1) % 4]
        )) {
            this.clear();
            this.activeIndex = (this.activeIndex + 1) % 4;
            this.draw();
        }
    }

    checkCollision(nextRow, nextCol, nextLayout) {
        for (let row = 0; row < nextLayout.length; row++) {
            for (let col = 0; col < nextLayout[0].length; col++) {
                if (nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >=0) {
                    if (
                        col + nextCol < 0 ||
                        col + nextCol >= COLS ||
                        col + nextRow >= ROWS ||
                        board.grid[row + nextRow][col + nextCol] !== WHITE_COLOR_ID
                    )
                    return true
                }
            }
        }
    }
}

const board = new Board(ctx);
board.drawBoard();
const brick = new Brick(0);
brick.draw();
brick.moveLeft();
brick.moveRight();
brick.moveDown();
brick.Rotate();

document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case KEY_CODES.LEFT:
            brick.moveLeft();
            break;
        case KEY_CODES.RIGHT:
            brick.moveRight();
            break;
        case KEY_CODES.DOWN:
            brick.moveDown();
            break;
        case KEY_CODES.UP:
            brick.Rotate();
            break;
    }
})

console.table(board.grid);