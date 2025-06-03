import React from 'react'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'

interface UserPicProps {
  src: string
}

const UserPic: React.FC<UserPicProps> = ({ src }) => {
  const { classes } = useStyles()
  return <img src={src} alt="card" className={classes.foto} />
}

export default UserPic

const useStyles = makeStyles()({
  foto: {
    width: '100%',
    height: 'auto',
    aspectRatio: '3 / 4',
    objectFit: 'cover',
    display: 'block',
    maxHeight: 535,
    [theme.breakpoints.down('sm')]: {
      maxHeight: 420,
    },
  },
})
