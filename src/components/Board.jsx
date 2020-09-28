import React from "react";
import "./Board.css";
import Square from "./Square";

export default props => {
    function renderSquare(i, classes) {
        return (
            <Square
                value={props.squares[i]} 
                onClick={() => props.onClick(i)}
                classes={classes}
            />
        );
    }

    return (
        <div className="board">
            {renderSquare(0, "b-top b-left")}
            {renderSquare(1, "b-top")}
            {renderSquare(2, "b-top b-right")}
            {renderSquare(3, "b-left")}
            {renderSquare(4)}
            {renderSquare(5, "b-right")}
            {renderSquare(6, "b-left b-bottom")}
            {renderSquare(7, "b-bottom")}
            {renderSquare(8, "b-bottom b-right  ")}
        </div>
    );
}