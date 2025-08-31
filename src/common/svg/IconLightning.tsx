import React from 'react'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'

const IconLightning: React.FC<IconProps> = ({ color }) => {
  const { classes } = useStyles()
  color ??= theme.palette.primary.main

  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 27 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes.iconLightning}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.3197 0.0914554C15.8974 0.323557 16.2566 0.949624 16.1927 1.61308L14.9979 14.0308H25.65C26.1525 14.0308 26.6134 14.3329 26.8462 14.815C27.0791 15.297 27.0455 15.8792 26.7588 16.326L13.2589 37.372C12.9074 37.9199 12.2579 38.1406 11.6803 37.9085C11.1026 37.6764 10.7434 37.0504 10.8073 36.3869L12.0021 23.9692H1.35C0.847528 23.9692 0.386631 23.6671 0.15375 23.185C-0.0791311 22.703 -0.0454556 22.1208 0.241154 21.674L13.7412 0.628005C14.0926 0.0801149 14.7421 -0.140646 15.3197 0.0914554ZM3.9311 21.0461H13.5C13.8824 21.0461 14.2468 21.2217 14.5028 21.5292C14.7588 21.8367 14.8824 22.2473 14.8427 22.6591L14.0369 31.0345L23.0689 16.9539H13.5C13.1176 16.9539 12.7532 16.7783 12.4972 16.4708C12.2412 16.1633 12.1176 15.7527 12.1573 15.3409L12.9631 6.96553L3.9311 21.0461Z"
        fill={color}
        className={classes.iconTransition}
      />
    </svg>
  )
}
export default IconLightning
const useStyles = makeStyles()(() => {
  return {
    iconLightning: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    iconTransition: {
      transition: 'color .3s, stroke .3s, fill .3s',
    },
  }
})
