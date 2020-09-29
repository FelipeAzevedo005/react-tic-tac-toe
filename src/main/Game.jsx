import React, { Component } from "react";
import "./Game.css";
import Board from "../components/Board";
import ScoreBar from "../components/ScoreBar";

const initialState = {
    squares: Array(9).fill(null),
    currentPlayer: "X",
    winner: null
}

var winner = null;
var xScore = 0;
var oScore = 0;

export default class Game extends Component {
    constructor(props) {
        super(props);

        this.state = { ...initialState }
    }

    nextPlayer(player) {
        if(player === "X") {
            return "O";
        } else return "X"; 
    }

    handleClick(i) {
        const squares = [...this.state.squares];
        const player = this.state.currentPlayer;
        
        if (this.chooseWinner(squares) || squares[i]) {
            return;
        }
        
        squares[i] = player;
        
        this.setState({ 
            squares: squares,  
            currentPlayer: this.nextPlayer(player),
        });
    }
    
    chooseWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    
        for (const line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }

    isX(player) {
        if (player === "X") {
            return true;
        } else return false;
    }

    newGame() {
        this.setState({ ...initialState }); 
    }

    render() {
        let status;
        winner = this.chooseWinner(this.state.squares);
        
        if (winner) {
            if (this.isX(winner)) {
                xScore++
            } else {
                oScore++;
            }

            status = `Vencedor: ${winner}!`;
        } else {
            status = `Vez de ${this.state.currentPlayer}`
        }
        
        return (
            <div className="game">
                <ScoreBar xScore={xScore} oScore={oScore}/>

                <Board 
                    squares={this.state.squares}
                    onClick={i => this.handleClick(i)} />

                <div className="info">
                    <h1>{status}</h1>
                </div>

                <button className="restart" onClick={() => this.newGame()}>
                    <i className="material-icons-round">refresh</i>
                </button>
            </div>
        );
    }
}