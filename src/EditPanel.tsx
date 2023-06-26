import React from "react";
import { useDispatch } from "react-redux";
import { undo, redo } from "./modules/historyIndex/slice";
import { useSelector } from "react-redux";
import { strokesLengthSelector } from "./modules/strokes/selectors";

export const EditPanel = () => {
    const dispatch = useDispatch();
    const historyIndex = useSelector(strokesLengthSelector);
    return (
        <div className="window edit">
            <div className="title-bar">
                <div className="title-bar-text">Edit</div>
            </div>
            <div className="window-body">
                <div className="field-row">
                    <button className="button redo" onClick={() => { dispatch(undo(historyIndex))}} >
                        Undo
                    </button>
                    <button className="button undo" onClick={() => { dispatch(redo())}} >
                        Redo
                    </button>
                </div>
            </div>
        </div>
    )
}