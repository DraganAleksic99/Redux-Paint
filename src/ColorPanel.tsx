import React from "react";
import { useDispatch } from "react-redux";
import { setStrokeColor } from "./modules/currentStroke/slice";

const COLORS = [
    "#000000", "#808080", "#c0c0c0", "#ffffff", "#ff0000", "#ff7373", "#ff4040", "#800000", "#003366", "#0000ff",
    "#008080", "#00ffff", "#b0e0e6", "#00ff00", "#065535", "#008000", "#66cdaa", "#ffff00", "#ffa500", "#daa520",
    "#ccff00", "#ffff66", "#794044", "#00ff7f", "#ff1493","420420"
];

export const ColorPanel = () => {
    const dispatch = useDispatch();
    const onColorChange = (color: string) => {
        dispatch(setStrokeColor(color))
    }

    return (
        <div className="window colors-panel">
            <div className="title-bar">
                <div className="title-bar-text">Colors</div>
            </div>
            <div className="window-body colors">
                { COLORS.map((color: string) =>
                <div 
                    key={color}
                    onClick={() => {onColorChange(color)}}
                    className="color"
                    style={{backgroundColor: color}} ></div> 
                )}
            </div>
        </div>
    )
}