import React from "react";
import "./Square.css"

export default props => {
    return (
        <button className={`square ${props.classes} ${props.value}-color`} onClick={props.onClick}>
           {props.value} 
        </button>
    );
}