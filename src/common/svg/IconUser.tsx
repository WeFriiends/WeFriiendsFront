import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'

export function IconUser({ color = theme.palette.primary.main }: IconProps) {
  const { classes } = useStyles()

  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes.icon}
    >
      <circle
        cx="12"
        cy="7"
        r="5"
        stroke={color}
        strokeWidth="2"
        className={classes.iconTransition}
      />
      <path
        d="M4 21C4 17.134 7.134 14 11 14H13C16.866 14 20 17.134 20 21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
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
