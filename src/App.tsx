import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { currentStrokeSelector } from './modules/currentStroke/selectors';
import { beginStroke, updateStroke } from './modules/currentStroke/slice';
import { endStroke } from './modules/sharedAction';
import { drawStroke } from './canvasUtils';
import './index.css';
import { ColorPanel } from './ColorPanel';
import { EditPanel } from './EditPanel';
import { clearCanvas } from './canvasUtils';
import { useCanvas } from './CanvasContext';
import { FilePanel } from './shared/FilePanel';

import { strokesSelector } from './modules/strokes/selectors';
import { historyIndexSelector } from './modules/historyIndex/selectors';

function App() {
  const canvasRef = useCanvas();
  const currentStroke = useSelector(currentStrokeSelector);
  const isDrawing = !!currentStroke.points.length;

  const strokes = useSelector(strokesSelector);
  const historyIndex = useSelector(historyIndexSelector);

  const getCanvasWithConstext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext('2d')}
  }

  const dispatch = useDispatch();

  const startDrawing = ({
    nativeEvent
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke({x: offsetX, y: offsetY}));
  }

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke({stroke: currentStroke, historyIndex: historyIndex }));
    }
  }

  const draw = ({
    nativeEvent
  }: React.MouseEvent<HTMLCanvasElement>) => {
    if(!isDrawing) {
      return
    }

    const { offsetX, offsetY } = nativeEvent;
    dispatch(updateStroke({x: offsetX, y: offsetY}));
  }

  useEffect(() => {
    const { context } = getCanvasWithConstext();
    if (!context) {
      return
    }
    requestAnimationFrame(() => {
      drawStroke(context, currentStroke.points, currentStroke.color)
    })
  });

  let canvasWidth = Number(document.documentElement.clientWidth);
  let canvasHeight = Number(document.documentElement.clientHeight);

  useEffect(() => {
    const { canvas, context } = getCanvasWithConstext();
    if (!context || !canvas) return;
    requestAnimationFrame(() => {
      clearCanvas(canvas);
      strokes.slice(0, strokes.length - historyIndex).forEach(stroke => {
        drawStroke(context, stroke.points, stroke.color)
      });
    })
  })
  
  return (
    <>
      <FilePanel />
      <EditPanel />
      <ColorPanel />
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}
            onMouseDown={startDrawing}
            onMouseUp={endDrawing}
            onMouseOut={endDrawing}
            onMouseMove={draw} /> 
      </>
  )
}

export default App;