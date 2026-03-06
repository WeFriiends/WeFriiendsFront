import { useRef } from 'react'
import { Link } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import Swipes from './Swipes'
import NoMoreMatchesDialog from 'pages/NoMoreMatchesDialog'

export function SwipesWithFilters() {
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
      <Swipes />
      <NoMoreMatchesDialog ref={FiltersDialogRef} title="Filters" />
    </>
  )
}

const useStyles = makeStyles()((theme) => ({
  filters: {
    fontSize: 24,
    lineHeight: 1.5,
    color: '#262626',
    textAlign: 'right',
    display: 'block',
    textDecorationColor: '#262626',
    paddingBottom: 31,
    paddingTop: 30,
    cursor: 'default',
    transition: 'color 0.3s ease',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 60,
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: 0,
    },
    '&:hover': {
      cursor: 'pointer',
      color: '#F1562A',
    },
  },
}))
