import React from "react";
import "./Status.css";

export default props => {
    return (
        <div className="status">
            {generateStatus(props.winner, props.currentPlayer)}
        </div>
    );
}

function generateStatus(winner, currentPlayer) {
    if (winner) {
        return (
            <h1>
                Winner: <strong className={`${winner}-color`}>{winner}</strong>!
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