import React from 'react'
import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { currentStrokeSelector } from './modules/currentStroke/selectors'
import { beginStroke, updateStroke } from './modules/currentStroke/slice'
import { endStroke } from './modules/sharedAction'
import { drawStroke } from './utils/canvasUtils'
import Menu from './components/Menu'
import { useCanvas } from './CanvasContext'
import { historyIndexSelector } from './modules/historyIndex/selectors'

function App() {
  const canvasRef = useCanvas()
  const currentStroke = useSelector(currentStrokeSelector)
  const isDrawing = !!currentStroke.points.length

  const historyIndex = useSelector(historyIndexSelector)
  const dispatch = useDispatch()

  let canvasWidth = Number(document.documentElement.clientWidth)
  let canvasHeight = Number(document.documentElement.clientHeight)

  const getCanvasWithConstext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext('2d') }
  }

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent
    dispatch(beginStroke({ x: offsetX, y: offsetY }))
  }

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke({ stroke: currentStroke, historyIndex: historyIndex }))
    }
  }

  const { context } = getCanvasWithConstext()

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return
    }

    const { offsetX, offsetY } = nativeEvent
    dispatch(updateStroke({ x: offsetX, y: offsetY }))

    if (!context) {
      return
    }

    requestAnimationFrame(() => {
      drawStroke(context, currentStroke.points, currentStroke.color, currentStroke.width)
    })
  }

  return (
    <div style={{ position: 'relative', cursor: 'crosshair'}}>
      <Menu />
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
      />
    </div>
  )
}

export default App
