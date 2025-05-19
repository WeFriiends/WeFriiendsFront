import { Box, Link } from '@mui/material'
import Swipes from './Swipes'
import NoMoreMatchesDialog from 'pages/NoMoreMatchesDialog'
import { makeStyles } from 'tss-react/mui'
import { useRef } from 'react'

const SwipesWithFilters = () => {
  const { classes } = useStyles()

  const FiltersDialogRef = useRef<{
    handleOpenNoMoreMatchesDialog: () => void
  }>(null)

  const handleOpenFiltersDialog = () => {
    FiltersDialogRef.current?.handleOpenNoMoreMatchesDialog()
  }

  return (
    <Box>
      <Link className={classes.filters} onClick={handleOpenFiltersDialog}>
        filters
      </Link>
      <Swipes />
      <NoMoreMatchesDialog ref={FiltersDialogRef} title="Filters" />
    </Box>
  )
}

export default SwipesWithFilters

const useStyles = makeStyles()({
  filters: {
    fontSize: 24,
    lineHeight: 1.5,
    color: '#262626',
    textAlign: 'right',
    display: 'block',
    paddingRight: 20,
    textDecorationColor: '#262626',
    // marginTop: -71,
    paddingBottom: 35,
  },
})
