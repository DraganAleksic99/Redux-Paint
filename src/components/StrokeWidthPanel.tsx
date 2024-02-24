import { useState } from "react"
import { useDispatch } from "react-redux"
import { setStrokeWidth } from "../modules/currentStroke/slice"

const strokeWidths = [1, 3, 5, 10, 15]

export default function StrokeWidthPanel() {
    const dispatch = useDispatch()
    const [active, setActive] = useState(2)

    const onWidthChange = (i: number) => {
      dispatch(setStrokeWidth(i))
    }
    
    return (
    <div>
      <div className="title-bar-text" style={{ marginBottom: '8px'}}>Stroke width</div>
      <div className='stroke-width-section'>
        <div className='stroke-width-container'>
          {strokeWidths.map((width: number, i: number) => (
            <div
              style={{ backgroundColor: `${active === i ? '#e0dfff' : ''}`}}
              className='stroke-width'
              key={i}
              onClick={() => {
                onWidthChange(width)
                setActive(i)
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
    )
}