import { Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

type PreviousStepButtonProps = {
  stepBackHandler: () => void
}

const ArrowBackButton = (props: PreviousStepButtonProps) => {
  const { stepBackHandler } = props
  const { classes } = useStyles()

  return (
    <Button
      className={classes.prevPageButton}
      startIcon={
        <img
          alt="previous page"
          src={'/img/navigationIcons/arrow-back.svg'}
          style={{ margin: 0 }}
        />
      }
      onClick={stepBackHandler}
    />
  )
}

export default ArrowBackButton

const useStyles = makeStyles()(() => {
  return {
    prevPageButton: {
      margin: '80px auto 35px',
      width: 45,
      minWidth: 45,
      height: 45,
      paddingLeft: 18,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      background: '#FEDED2',
      flexShrink: 0,
      '&:hover': {
        backgroundColor: 'salmon',
      },
    },
  }
})
