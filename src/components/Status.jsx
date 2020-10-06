import React from "react";
import "./Status.css";

export default props => {
    return (
        <div className="status">
            {generateStatus(props.winner, props.currentPlayer, props.draw)}
        </div>
    );
}

function generateStatus(winner, currentPlayer, draw) {
    if (winner) {
        return (
            <h1>
                Winner: <strong className={`${winner}-color`}>{winner}</strong>!
            </h1>
        );
    } else if (draw) {
        return (
            <h1>
                Draw!
            </h1>
        );
    } else {
        return (
            <h1>
                <strong className={`${currentPlayer}-color`}>{currentPlayer}</strong> Turn
            </h1>
        );
    }
}