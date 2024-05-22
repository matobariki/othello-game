const BOARD_SIZE = 8;
let board = [];
let currentPlayer = 'black';

const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1], 
    [-1, -1], [-1, 1], [1, -1], [1, 1]
];

const gameBoard = document.getElementById('gameBoard');

function initBoard() {
    board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));

    // 初期の駒の配置
    board[3][3] = 'white';
    board[4][4] = 'white';
    board[3][4] = 'black';
    board[4][3] = 'black';

    renderBoard();
}

function renderBoard() {
    gameBoard.innerHTML = '';

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (board[row][col]) {
                const piece = document.createElement('div');
                piece.classList.add(board[row][col]);
                cell.appendChild(piece);
            } else {
                cell.classList.add('empty');
                cell.addEventListener('click', () => handleMove(row, col));
            }
            gameBoard.appendChild(cell);
        }
    }
}

function handleMove(row, col) {
    if (board[row][col]) return;

    if (isValidMove(row, col, currentPlayer)) {
        board[row][col] = currentPlayer;
        flipPieces(row, col, currentPlayer);
        currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
        renderBoard();
    }
}

function isValidMove(row, col, player) {
    if (board[row][col]) return false;

    for (const [dx, dy] of directions) {
        let x = row + dx;
        let y = col + dy;
        let hasOpponentPiece = false;

        while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
            if (board[x][y] === null) break;
            if (board[x][y] === player) {
                if (hasOpponentPiece) return true;
                break;
            } else {
                hasOpponentPiece = true;
            }
            x += dx;
            y += dy;
        }
    }
    return false;
}

function flipPieces(row, col, player) {
    for (const [dx, dy] of directions) {
        let x = row + dx;
        let y = col + dy;
        let piecesToFlip = [];

        while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
            if (board[x][y] === null) break;
            if (board[x][y] === player) {
                for (const [fx, fy] of piecesToFlip) {
                    board[fx][fy] = player;
                }
                break;
            } else {
                piecesToFlip.push([x, y]);
            }
            x += dx;
            y += dy;
        }
    }
}

initBoard();