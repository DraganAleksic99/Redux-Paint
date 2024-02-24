import { useCanvas } from '../CanvasContext'
import { saveAs } from 'file-saver'
import { getCanvasImage } from '../utils/canvasUtils'

export default function FilePanel() {
  const canvasRef = useCanvas()
  const exportToFile = async () => {
    const file = await getCanvasImage(canvasRef.current)
    if (!file) return
    saveAs(file, 'drawing.png')
  }
  return (
    <div>
      <div className="title-bar-text" style={{ marginBottom: '8px'}}>Export file</div>
      <div className='file-section'>
        <div className='file-container'>
          <button onClick={exportToFile}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
