import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { currentStrokeSelector } from './modules/currentStroke/selectors'
import { beginStroke, updateStroke } from './modules/currentStroke/slice'
import { endStroke } from './modules/sharedAction'
import { drawStroke } from './canvasUtils'
import './index.css'
import { ColorPanel } from './ColorPanel'
import { EditPanel } from './EditPanel'
import { useCanvas } from './CanvasContext'
import { FilePanel } from './shared/FilePanel'
import { historyIndexSelector } from './modules/historyIndex/selectors'

function App() {
  const canvasRef = useCanvas()
  const currentStroke = useSelector(currentStrokeSelector)
  const isDrawing = !!currentStroke.points.length

  const historyIndex = useSelector(historyIndexSelector)
  const dispatch = useDispatch()

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
      drawStroke(context, currentStroke.points, currentStroke.color)
    })
  }

  let canvasWidth = Number(document.documentElement.clientWidth)
  let canvasHeight = Number(document.documentElement.clientHeight)

  return (
    <>
      <div style={{ display: 'flex', gap: '2px' }}>
        <EditPanel />
        <ColorPanel />
        <FilePanel />
      </div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
      />
    </>
  )
}

export default App
