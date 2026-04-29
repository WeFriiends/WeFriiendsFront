import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'

export function IconCamera({ color = theme.palette.text.primary }: IconProps) {
  const { classes } = useStyles()

  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes.icon}
    >
      <path
        d="M9 5L7 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H17L15 5H9Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={classes.iconTransition}
      />
      <circle
        cx="12"
        cy="13.5"
        r="3.5"
        stroke={color}
        strokeWidth="2"
        className={classes.iconTransition}
      />
    </svg>
  )
}

const useStyles = makeStyles()(() => {
  return {
    icon: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    iconTransition: {
      transition: 'color .3s, stroke .3s, fill .3s',
    },
  }
})
