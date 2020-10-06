import React, { Component } from "react";
import "./Game.css";
import Board from "../components/Board";
import ScoreBar from "../components/ScoreBar";
import Status from "../components/Status";

const initialState = {
    squares: Array(9).fill(null),
    currentPlayer: "X",
    winner: null,
    xScore: 0,
    oScore: 0,
    draw: false
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
        const draw = this.calculateDraw(squares, winner);
        const nextPlayer = this.nextPlayer(player);

        this.setState({ 
            squares: squares,  
            currentPlayer: nextPlayer,
            winner,
            draw
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
                this.increaseScore(squares[a]);
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
        const xScore = this.state.xScore;
        const oScore = this.state.oScore;
        
        this.setState(Object.assign({},{ ...initialState }, {xScore, oScore})); 
    }

    calculateDraw(squares, winner) {
        if (winner) {
            return false;
        }

        for (const square of squares) {
            if (!square) {
                return false;
            }
        }

        return true;
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

                <Status 
                    winner={this.state.winner}
                    currentPlayer={this.state.currentPlayer}
                    draw={this.state.draw} />
                
                <button className="restart" onClick={() => this.newGame()}>
                    <i className="material-icons-round">refresh</i>
                </button>
            </div>
        );
    }
}