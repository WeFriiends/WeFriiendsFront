import React from 'react'
import { makeStyles } from 'tss-react/mui'
import theme from '../styles/createTheme'

type IconIIProps = {
  color?: string
}
const IconII: React.FC<IconIIProps> = ({ color }) => {
  const { classes } = useStyles()
  color ??= theme.palette.primary.main

  return (
    <svg
      preserveAspectRatio="none"
      viewBox="0 0 26 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes.iconII}
    >
      <path
        d="M7.85691 12.3867V44.265C7.85691 44.8325 7.38216 45.2865 6.80072 45.2865H3.09332C2.50654 45.2865 2.03711 44.8273 2.03711 44.265V12.3867C2.03711 11.8192 2.51187 11.3652 3.09332 11.3652H6.80072C7.38216 11.3652 7.85691 11.8244 7.85691 12.3867Z"
        fill={color}
        className={classes.iconTransition}
      />
      <path
        d="M20.179 16.4109L25.2734 48.5419C25.3374 48.9289 25.06 49.29 24.6599 49.3519L20.3551 49.9916C19.955 50.0536 19.5816 49.7853 19.5176 49.3983L14.4233 17.2673C14.3592 16.8804 14.6366 16.5193 15.0367 16.4573L19.3415 15.8176C19.7416 15.7557 20.1204 16.0188 20.179 16.4109Z"
        fill={color}
        className={classes.iconTransition}
      />
      <path
        d="M2.52786 6.92874C1.65302 6.30448 1.13025 5.46871 0.95955 4.40593C0.78885 3.34315 1.02891 2.38871 1.66903 1.54262C2.20247 0.840975 2.88526 0.376654 3.72809 0.144493C5.04035 -0.216645 6.49663 0.10838 7.49416 1.01639C8.13962 1.60453 8.53436 2.3526 8.67839 3.2606C8.82242 4.16861 8.67839 4.99923 8.24097 5.7473C7.57417 6.89778 6.28859 7.63554 4.92299 7.66649C4.05348 7.69229 3.25333 7.44465 2.52786 6.92874Z"
        fill={color}
        className={classes.iconTransition}
      />
      <path
        d="M12.7274 11.6183C11.9593 10.8753 11.5752 9.96733 11.5752 8.89423C11.5752 7.82114 11.9593 6.91313 12.7274 6.17022C13.3622 5.55628 14.1144 5.19514 14.9785 5.09196C16.3335 4.92687 17.7204 5.46342 18.5632 6.50556C19.1073 7.18141 19.3847 7.98107 19.3847 8.89939C19.3847 9.81772 19.1127 10.6174 18.5632 11.2932C17.7257 12.3302 16.3335 12.8719 14.9839 12.7068C14.1144 12.5933 13.3622 12.2373 12.7274 11.6183Z"
        fill={color}
        className={classes.iconTransition}
      />
    </svg>
  )
}
export default IconII
const useStyles = makeStyles()(() => {
  return {
    iconII: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    iconTransition: {
      transition: 'color 0.3s, stroke 0.3s',
    },
  }
})
