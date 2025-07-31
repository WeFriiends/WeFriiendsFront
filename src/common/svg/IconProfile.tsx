import React from 'react'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'

const IconProfile: React.FC<IconProps> = ({ color }) => {
  const { classes } = useStyles()
  color ??= theme.palette.primary.main

  return (
    <svg
      preserveAspectRatio="meet"
      viewBox="0 0 24 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes.iconProfile}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5 11C13.9853 11 16 8.98528 16 6.5C16 4.01472 13.9853 2 11.5 2C9.01472 2 7 4.01472 7 6.5C7 8.98528 9.01472 11 11.5 11ZM11.5 13C15.0899 13 18 10.0899 18 6.5C18 2.91015 15.0899 0 11.5 0C7.91015 0 5 2.91015 5 6.5C5 10.0899 7.91015 13 11.5 13Z"
        fill={color}
        className={classes.iconTransition}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 18H18C20.2091 18 22 19.7909 22 22V25C22 25.5523 22.4477 26 23 26V26C23.5523 26 24 25.5523 24 25V22C24 18.6863 21.3137 16 18 16H6C2.68629 16 0 18.6863 0 22V25C0 25.5523 0.447715 26 1 26V26C1.55228 26 2 25.5523 2 25V22C2 19.7909 3.79086 18 6 18Z"
        fill={color}
        className={classes.iconTransition}
      />
    </svg>
  )
}
export default IconProfile
const useStyles = makeStyles()(() => {
  return {
    iconProfile: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    iconTransition: {
      transition: 'color .3s, stroke .3s, fill .3s',
    },
  }
})
