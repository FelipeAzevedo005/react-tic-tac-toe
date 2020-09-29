import React from "react";
import "./ScoreBar.css";

export default props => {
    return (
        <div className="scores">
            <span className="x-score">
                <strong>X</strong> : {props.xScore}
            </span>
            <span className="o-score">
                <strong>O</strong> : {props.oScore}
            </span>
        </div>
    );
};