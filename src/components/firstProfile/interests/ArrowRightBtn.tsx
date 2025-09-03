import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { makeStyles } from 'tss-react/mui'
import theme from 'styles/createTheme'

type ArrowRightBtnProps = {
  onToggle?: (isOpen: boolean) => void
  isOpen: boolean | undefined
}

export const ArrowRightBtn: React.FC<ArrowRightBtnProps> = ({
  onToggle,
  isOpen,
}) => {
  const { classes } = useStyles()
  const toggle = () => {
    if (onToggle) {
      onToggle(!isOpen)
    }
  }

  return (
    <ArrowForwardIosIcon
      onClick={toggle}
      className={!isOpen ? classes.arrowRightSvg : classes.arrowDownSvg}
    />
  )
}

const useStyles = makeStyles()(() => {
  return {
    arrowRightSvg: {
      width: '14px',
      height: '14px',
      color: theme.palette.text.primary,
      cursor: 'pointer',
    },
    arrowDownSvg: {
      width: '14px',
      height: '14px',
      color: theme.palette.text.primary,
      cursor: 'pointer',
      transform: 'rotate(90deg)',
      transition: 'all .3s ease',
    },
  }
})
