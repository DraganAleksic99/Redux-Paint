import { useDispatch } from 'react-redux'
import { undo, redo } from '../modules/historyIndex/slice'
import { useSelector } from 'react-redux'
import { strokesSelector, strokesLengthSelector } from '../modules/strokes/selectors'
import { historyIndexSelector } from '../modules/historyIndex/selectors'
import { drawStroke } from '../utils/canvasUtils'
import { clearCanvas } from '../utils/canvasUtils'
import { useCanvas } from '../CanvasContext'

export default function EditPanel() {
  const dispatch = useDispatch()
  const historyIndex = useSelector(historyIndexSelector)
  const strokes = useSelector(strokesSelector)
  const strokesLength = useSelector(strokesLengthSelector)
  const canvasRef = useCanvas()

  const getCanvasWithConstext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext('2d') }
  }

  const { canvas, context } = getCanvasWithConstext()

  return (
    <div>
      <div style={{ marginBottom: '8px'}}>Edit</div>
      <div className="buttons-container">
        <button
          disabled={historyIndex === strokesLength}
          className="button undo"
          onClick={() => {
            dispatch(undo(strokesLength))

            if (!context || !canvas) return
            if (!canvasRef.current) return

            clearCanvas(canvasRef.current)
            strokes.slice(0, strokes.length - (historyIndex + 1)).forEach(stroke => {
              drawStroke(context, stroke.points, stroke.color, stroke.width)
            })
          }}
        >
          Undo
        </button>
        <button
          disabled={historyIndex === 0}
          className="button redo"
          onClick={() => {
            dispatch(redo())
            if (!context || !canvas) return
            if (!canvasRef.current) return
            clearCanvas(canvasRef.current)
            strokes.slice(0, strokes.length - (historyIndex - 1)).forEach(stroke => {
              drawStroke(context, stroke.points, stroke.color, stroke.width)
            })
          }}
        >
          Redo
        </button>
      </div>
    </div>
  )
}
