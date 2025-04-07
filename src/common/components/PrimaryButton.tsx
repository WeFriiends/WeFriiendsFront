import { Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

type NextStepButtonProps = {
  onClickHandler: () => void
  disabled?: boolean
  label: string
  className?: string
}

const PrimaryButton: React.FC<NextStepButtonProps> = ({
  onClickHandler,
  disabled,
  label,
  className,
}) => {
  const { classes } = useStyles()
  return (
    <Button
      onClick={onClickHandler}
      className={`${classes.button} ${
        disabled ? classes.disabledButton : classes.activeButton
      } ${className}`}
      disabled={disabled}
      disableRipple
    >
      {label}
    </Button>
  )
}

export default PrimaryButton

const useStyles = makeStyles()((theme) => {
  return {
    button: {
      display: 'block',
      margin: '50px 0 30px',
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.light,
      border: '2px solid ' + theme.palette.primary.light,
      borderRadius: 10,
      maxWidth: 350,
      width: '100%',
      height: 60,
      lineHeight: '52px',
      padding: 0,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '600',
      textTransform: 'none',
    },
    disabledButton: {
      color: 'grey',
      backgroundColor: 'white',
      borderColor: 'grey',
    },
    activeButton: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.light,
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
      },
    },
  }
})
