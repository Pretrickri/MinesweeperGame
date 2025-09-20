import { Tile } from "./Tiles.js";


export function BuildBoard(size){
    const board = [];
    for(let i=0; i<size; i++){
        const row = [];
        for(let j=0; j<size; j++){
            const tile = new Tile(i,j);
            row.push(tile);
        }
        board.push(row);
    }
    return board;
}

export function PrintBoard(board){
    for(let i=0; i<board.length; i++){
        let print_board = "|| ";
        for(let j=0; j<board.length; j++){
            print_board += "(" +
                board[i][j].x + "," +
                board[i][j].y + ") = " +
                board[i][j].isMine() + " || ";
        }
        console.log(print_board);
    }
}

export function addMines(board, numberOfMines){
    for(let i=0; i<numberOfMines;i++){
        const randX = Math.floor(Math.random() * board.length);
        const randY = Math.floor(Math.random() * board.length);

        if(!(board[randX][randY].isMine())){
            board[randX][randY].setMine();
        }
    }
}