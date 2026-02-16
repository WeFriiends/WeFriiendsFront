import { ImageList, ImageListItem } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { UserMiniCard } from '../../common/components/UserMiniCard'
import { UserMiniProfile } from 'common/types/userTypes'

interface UserMiniCardsProps {
  users: UserMiniProfile[]
  onCardClick: (userId: string) => void
}

export function UserMiniCards({ users, onCardClick }: UserMiniCardsProps) {
  const { classes } = useStyles()
  return (
    <ImageList cols={6} gap={0} className={classes.list}>
      {users.map((user) => (
        <ImageListItem key={user.id} className={classes.item}>
          <button
            onClick={() => onCardClick(user.id)}
            className={classes.button}
          >
            <UserMiniCard user={user} />
          </button>
        </ImageListItem>
      ))}
    </ImageList>
  )
}

const useStyles = makeStyles()((theme) => ({
  button: { cursor: 'pointer', background: 'none', border: 'none', padding: 0 },
  item: { containerType: 'inline-size' },
  list: {
    marginInline: 'auto',
    overflow: 'unset',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr)) !important',
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(4, 1fr) !important',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(5, 1fr) !important',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(6, 1fr) !important',
    },
    '@container (width < 600px)': {
      // gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr)) !important',
      gridTemplateColumns: 'repeat(3, 1fr) !important',
    },
    '@container (width < 320px)': {
      // gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr)) !important',
      gridTemplateColumns: 'repeat(2, 1fr) !important',
    },
    gap: '48px 16px !important',
  },
}))
