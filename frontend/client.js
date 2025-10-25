import * as minesweeper from "../backend/minesweeper.js";

const board = minesweeper.BuildBoard(3);
minesweeper.addMines(board, 1);
minesweeper.setAdjacentMines(board);
minesweeper.PrintBoard(board);