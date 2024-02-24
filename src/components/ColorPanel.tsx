import { useDispatch, useSelector } from 'react-redux'
import { setStrokeColor } from '../modules/currentStroke/slice'
import { currentStrokeSelector } from '../modules/currentStroke/selectors'

const colors = [
  '#000',
  '#e03131',
  '#2f9e44',
  '#1971c2',
  '#f08c00',
]

export default function ColorPanel() {
  const dispatch = useDispatch()
  const currentStroke = useSelector(currentStrokeSelector)

  const onColorChange = (color: string) => {
    dispatch(setStrokeColor(color))
  }

  return (
    <div>
      <div className="title-bar-text">Stroke</div>
      <div className='colors-section'>
        <div className='colors-container'>
          {colors.map((color: string) => (
            <div
              className='color'
              style={{ backgroundColor: color}}
              key={color}
              onClick={() => onColorChange(color)}
            ></div>
          ))}
        </div>
        <input
          style={{ cursor: 'pointer'}}
          type="color"
          name="color"
          value={currentStroke.color}
          onChange={(e) => onColorChange(String(e.target.value))}
        />
      </div>
    </div>
  )
}
