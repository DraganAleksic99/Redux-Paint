import EditPanel from "./EditPanel"
import ColorPanel from "./ColorPanel"
import FilePanel from "./FilePanel"
import StrokeWidthPanel from "./StrokeWidthPanel"

export default function Menu() {
    return (
        <div className="menu-container">
            <EditPanel />
            <ColorPanel />
            <StrokeWidthPanel />
            <FilePanel />
        </div>
    )
}