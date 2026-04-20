import { Box, CircularProgress } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const Loader = () => {
  const { classes } = useStyles()

  return (
    <Box className={classes.container}>
      <CircularProgress className={classes.circularProgress} />
    </Box>
  )
}

export default Loader

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    minHeight: 200,
  },
  circularProgress: {
    color: theme.palette.primary.light,
    position: 'absolute',
    top: '50%',
  },
}))
