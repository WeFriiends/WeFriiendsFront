import React from 'react'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'

const IconII: React.FC<IconProps> = ({ color }) => {
  const { classes } = useStyles()
  color ??= theme.palette.primary.main

  return (
    <svg
      preserveAspectRatio="meet"
      // width={16}
      // height={33}
      viewBox="0 0 24 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes.iconII}
    >
      <path
        d="M7.16473 12.3862V44.2644C7.16473 44.8319 6.70948 45.2859 6.15191 45.2859H2.59679C2.0341 45.2859 1.58395 44.8267 1.58395 44.2644V12.3862C1.58395 11.8187 2.03922 11.3647 2.59679 11.3647H6.15191C6.70948 11.3647 7.16473 11.8239 7.16473 12.3862Z"
        fill={color}
        className={classes.iconTransition}
      />
      <path
        d="M18.9813 16.4104L23.8664 48.5414C23.9278 48.9283 23.6618 49.2895 23.2782 49.3514L19.1501 49.9911C18.7665 50.053 18.4084 49.7847 18.347 49.3978L13.4619 17.2668C13.4006 16.8799 13.6666 16.5188 14.0502 16.4569L18.1782 15.8171C18.5619 15.7552 18.9251 16.0183 18.9813 16.4104Z"
        fill={
          color === theme.palette.primary.main
            ? theme.palette.primary.dark
            : color
        }
        className={classes.iconTransition}
      />
      <path
        d="M2.05498 6.92873C1.21607 6.30447 0.71477 5.4687 0.551081 4.40592C0.387392 3.34314 0.617588 2.38871 1.23142 1.54261C1.74295 0.840973 2.3977 0.376653 3.20591 0.144493C4.46427 -0.216645 5.86075 0.108379 6.8173 1.01638C7.43625 1.60452 7.81478 2.35259 7.9529 3.2606C8.09101 4.1686 7.95289 4.99922 7.53344 5.74729C6.89403 6.89777 5.66125 7.63552 4.35173 7.66648C3.51794 7.69227 2.75065 7.44464 2.05498 6.92873Z"
        fill={color}
        className={classes.iconTransition}
      />
      <path
        d="M11.8356 11.6182C11.099 10.8753 10.7307 9.96732 10.7307 8.89423C10.7307 7.82113 11.099 6.91313 11.8356 6.17022C12.4443 5.55628 13.1655 5.19514 13.9942 5.09196C15.2935 4.92687 16.6235 5.46342 17.4317 6.50556C17.9534 7.1814 18.2194 7.98106 18.2194 8.89939C18.2194 9.81771 17.9586 10.6174 17.4317 11.2932C16.6286 12.3302 15.2935 12.8719 13.9993 12.7068C13.1655 12.5933 12.4443 12.2373 11.8356 11.6182Z"
        fill={
          color === theme.palette.primary.main
            ? theme.palette.primary.dark
            : color
        }
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
      transition: 'color .3s, stroke .3s, fill .3s',
    },
  }
})
