import { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

export interface ProfilePanelHeaderProps {
  icon: ReactNode
  label: string
  onClick: () => void
  className?: string
}

export function ProfilePanelHeader({
  icon,
  label,
  onClick,
  className,
}: ProfilePanelHeaderProps) {
  const { classes, cx } = useStyles()

  return (
    <Box className={cx(classes.headerWrapper, className)} onClick={onClick}>
      {icon}
      <Typography variant="body2" className={classes.headerText}>
        {label}
      </Typography>
    </Box>
  )
}

const useStyles = makeStyles()((theme) => ({
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '3px 9px',
    marginBottom: 12,
    cursor: 'pointer',
    color: theme.palette.text.primary,
    backgroundColor: theme.customPalette.authBtnBg,
    borderRadius: 4,
    transition: 'color 0.3s',
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '& .MuiIconButton-root': {
      color: 'inherit',
    },
  },
  headerText: {
    paddingLeft: theme.spacing(1),
    fontWeight: 500,
  },
}))
