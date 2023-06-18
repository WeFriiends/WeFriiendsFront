import { styled } from '@mui/material/styles'
import { Grid, Typography, Box } from '@mui/material'
import Logo from '../../logo/logo'
import Buttonactive from '../../buttonActive/buttonActive'
import MaleImage from '../media/Male.png'
import FemaleImage from '../media/Female.png'
import BackImage from '../media/back.png'

const GenderForm = () => {
  return (
    <StyledRoot>
      {/* <img className="imgHeader" src="../img/account-header.svg" alt="" /> */}
      <Logo />
      <img src={BackImage} alt="back" className="imgBack" />

      <Typography variant="h4" className="title">
        More about you
      </Typography>

      <Typography variant="body1" className="name">
        What´s your gender?
      </Typography>

      <Grid className="imgGender">
        <img src={FemaleImage} alt="Female" />
        <img src={MaleImage} alt="Male" />
      </Grid>
      <form>
        <Grid className="buttonGender">
          <button className="button1">Female</button>
          <button className="button1">Male</button>
        </Grid>

        <Buttonactive
          className="button"
          variant="contained"
          color="primary"
          type="submit"
          name="Next"
        ></Buttonactive>
      </form>
      <Typography variant="h2" className="dot">
        .....
      </Typography>

      <img className="imgFooter" src="../img/account-footer.svg" alt="" />
    </StyledRoot>
  )
}
const StyledRoot = styled(Box)(() => ({
  sectionName: {
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
  },
  '& .imgBack': {
    marginTop: '5vh',
    marginLeft: '50%',
    height: '30px',
    width: '30px',
  },
  '& .title': {
    margin: '5vh auto',
    height: '4rem',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '32px',
    lineHeight: '40px',
    textAlign: 'center',
    color: '#f46b5d',
  },
  '& .name': {
    marginTop: '5vh',
    marginLeft: '93vh',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    color: '#444444',
  },
  '& .imgGender': {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 150px)',
    height: '100px',
    marginTop: '5vh',
    marginLeft: '88vh',
  },
  '& .buttonGender': {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 150px)',
    margin: 50,
    marginLeft: '85vh',
  },
  '& .button1': {
    border: 'none',
    backgroundColor: 'transparent',
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: '18px',
    color: '#444444',
  },
  '& .button': {
    color: '#f46b5d',
    background: 'white',
    border: '2px solid #f46b5d',
    '&:hover': {
      color: '#f46b5d',
      background: 'white',
      border: '2px solid #f46b5d',
    },
  },
  '& .dot': {
    marginLeft: '97vh',
    color: '#f46b5d',
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: '100px',
  },
}))

export default GenderForm
