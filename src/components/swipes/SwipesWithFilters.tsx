import { Box, Link } from '@mui/material'
import Swipes from './Swipes'
import NoMoreMatchesDialog from 'pages/NoMoreMatchesDialog'
import { makeStyles } from 'tss-react/mui'
import { useRef } from 'react'
import theme from '../../styles/createTheme'

const SwipesWithFilters = () => {
  const { classes } = useStyles()

  const FiltersDialogRef = useRef<{
    handleOpenNoMoreMatchesDialog: () => void
  }>(null)

  const handleOpenFiltersDialog = () => {
    FiltersDialogRef.current?.handleOpenNoMoreMatchesDialog()
  }

  return (
    <>
      <Link className={classes.filters} onClick={handleOpenFiltersDialog}>
        filters
      </Link>
      <Box sx={{ position: 'sticky', top: 0 }}>
        <Swipes />
        <NoMoreMatchesDialog ref={FiltersDialogRef} title="Filters" />
      </Box>
    </>
  )
}

export default SwipesWithFilters

const useStyles = makeStyles()({
  filters: {
    paddingTop: 60,
    fontSize: 24,
    lineHeight: 1.5,
    color: '#262626',
    textAlign: 'right',
    display: 'block',
    paddingRight: 20,
    textDecorationColor: '#262626',
    paddingBottom: 35,
    [theme.breakpoints.up('lg')]: {
      paddingTop: 0,
    },
  },
})
