import React from 'react'

import { makeStyles } from 'tss-react/mui'

interface UserPicProps {
  src: string
}

const UserPic: React.FC<UserPicProps> = ({ src }) => {
  const { classes } = useStyles()
  return <img src={src} alt="card" className={classes.foto} />
}

export default UserPic

const useStyles = makeStyles()(() => {
  return {
    foto: {
      width: '100%',
      height: '535px',
      objectFit: 'cover',
    },
  }
})
