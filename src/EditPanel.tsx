import { useDispatch } from 'react-redux'
import { undo, redo } from './modules/historyIndex/slice'
import { useSelector } from 'react-redux'
import { strokesSelector, strokesLengthSelector } from './modules/strokes/selectors'
import { historyIndexSelector } from './modules/historyIndex/selectors'
import { drawStroke } from './canvasUtils'
import { clearCanvas } from './canvasUtils'
import { useCanvas } from './CanvasContext'

export const EditPanel = () => {
  const dispatch = useDispatch()
  const historyIndex = useSelector(historyIndexSelector)
  const strokes = useSelector(strokesSelector)
  const strokesL = useSelector(strokesLengthSelector)
  const canvasRef = useCanvas()

  const getCanvasWithConstext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext('2d') }
  }

  const { canvas, context } = getCanvasWithConstext()

  return (
    <div className="window edit" style={{ marginLeft: 'auto', flexGrow: 1 }}>
      <div className="title-bar">
        <div className="title-bar-text">Edit</div>
      </div>
      <div className="window-body">
        <div className="field-row">
          <button
            disabled={historyIndex === strokesL}
            className="button undo"
            onClick={() => {
              dispatch(undo(strokesL))

              if (!context || !canvas) return
              if (!canvasRef.current) return

              clearCanvas(canvasRef.current)
              strokes.slice(0, strokes.length - (historyIndex + 1)).forEach(stroke => {
                drawStroke(context, stroke.points, stroke.color)
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
                drawStroke(context, stroke.points, stroke.color)
              })
            }}
          >
            Redo
          </button>
        </div>
      </div>
    </div>
  )
}
