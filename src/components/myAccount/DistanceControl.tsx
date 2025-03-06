import RangeSlider from './RangeSlider'
import * as React from 'react'

type DistanceControlProps = {
  children: React.ReactNode
  value: number
  onChange: (newValue: number) => void
}

const DistanceControl: React.FC<DistanceControlProps> = ({
  children,
  value,
  onChange,
}) => {
  function addUnitInKm(value: number) {
    return `${value} km`
  }

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    onChange(newValue as number) // Call the parent’s function to update the database
  }

  return (
    <>
      {children}
      <RangeSlider
        ariaLabel="Distance from location"
        getAriaValueText={addUnitInKm}
        valueLabelFormat={addUnitInKm}
        value={value}
        onChange={handleSliderChange}
        valueLabelDisplay="on"
      ></RangeSlider>
    </>
  )
}

export default DistanceControl
