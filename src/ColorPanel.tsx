import React from 'react'
import { useDispatch } from 'react-redux'
import { setStrokeColor } from './modules/currentStroke/slice'

const COLORS = [
  '#000000',
  '#808080',
  '#c0c0c0',
  '#ffffff',
  '#800000',
  '#ff0000',
  '#ff4040',
  '#ff7373',
  '#003366',
  '#0000ff',
  '#008080',
  '#00ffff',
  '#b0e0e6',
  '#065535',
  '#008000',
  '#00ff00',
  '#66cdaa',
  '#ffff00',
  '#ffa500',
  '#daa520',
  '#ccff00',
  '#ffff66',
  '#794044'
]

export const ColorPanel = () => {
  const dispatch = useDispatch()
  const onColorChange = (color: string) => {
    dispatch(setStrokeColor(color))
  }

  return (
    <div className="window colors-panel">
      <div className="title-bar">
        <div className="title-bar-text">Colors</div>
      </div>
      <div
        className="window-body colors"
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        {COLORS.map((color: string) => (
          <div style={{ margin: '2px' }} key={color}>
            <input
              type="color"
              name="color"
              defaultValue={color}
              onClick={() => {
                onColorChange(color)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
