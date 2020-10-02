import React, { Component } from "react";
import "./Game.css";
import Board from "../components/Board";
import ScoreBar from "../components/ScoreBar";

const initialState = {
    squares: Array(9).fill(null),
    currentPlayer: "X",
    winner: null,
    xScore: 0,
    oScore: 0,
    status: "X Turn"
};

export default class Game extends Component {
    constructor(props) {
        super(props);

        this.state = { ...initialState };
    }

    nextPlayer(player) {
        if(player === "X") {
            return "O";
        } else return "X"; 
    }

    handleClick(i) {
        const squares = [...this.state.squares];
        const player = this.state.currentPlayer;
        
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        
        squares[i] = player;
        
        const winner = this.calculateWinner(squares);
        const nextPlayer = this.nextPlayer(player);
        const status = this.generateStatus(winner, nextPlayer);

        this.setState({ 
            squares: squares,  
            currentPlayer: nextPlayer,
            winner,
            status
        });
    }

    increaseScore(winner) {
        let xScore = this.state.xScore;
        let oScore = this.state.oScore;

        if (this.isX(winner)) {
            xScore++;
        } else {
            oScore++;
        }

        this.setState({ xScore, oScore });
    }
    
    generateStatus(winner, currentPlayer) {
        if (winner) {
            this.increaseScore(winner);
            return `Winner: ${winner}!`;
        } else {
            return `${currentPlayer} Turn`;
        }
    }
    
    calculateWinner(squares) {
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
        return (
            <div className="game">
                <ScoreBar 
                    xScore={this.state.xScore} 
                    oScore={this.state.oScore} />

                <Board 
                    squares={this.state.squares}
                    onClick={i => this.handleClick(i)} />

                <div className="info">
                    <h1>{this.state.status}</h1>
                </div>

                <button className="restart" onClick={() => this.newGame()}>
                    <i className="material-icons-round">refresh</i>
                </button>
            </div>
        );
    }
}