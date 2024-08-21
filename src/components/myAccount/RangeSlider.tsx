import * as React from 'react'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'

type RangeSliderProps = {
  value: Array<number> | number
  onChange: (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => void
  disableSwap?: boolean
  getAriaValueText?: ((value: number, index: number) => string) | undefined
  ariaLabel?: string
  min?: number
  max?: number
  valueLabelFormat?:
    | string
    | ((value: number, index: number) => string)
    | undefined
}

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: theme.customPalette.colorInputGrey,
  opacity: 1,
  height: 1.5,
  margin: 0,
  padding: '0 0 40px',
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: theme.palette.primary.light,
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'none',
    },
    '&:before': {
      boxShadow: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: '500',
    top: 45,
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&::before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: theme.palette.common.black,
    },
  },
  '& .MuiSlider-track': {
    height: 1.5,
  },
  '& .MuiSlider-rail': {
    backgroundColor: theme.customPalette.colorInputGrey,
    opacity: 1,
  },
}))

const RangeSlider: React.FC<RangeSliderProps> = ({
  value,
  onChange,
  disableSwap,
  getAriaValueText,
  ariaLabel,
  min,
  max,
  valueLabelFormat,
}) => {
  return (
    <CustomSlider
      aria-label={ariaLabel}
      defaultValue={60}
      value={value}
      valueLabelDisplay="on"
      onChange={onChange}
      disableSwap={disableSwap}
      getAriaValueText={getAriaValueText}
      min={min}
      max={max}
      valueLabelFormat={valueLabelFormat}
    />
  )
}

export default RangeSlider
