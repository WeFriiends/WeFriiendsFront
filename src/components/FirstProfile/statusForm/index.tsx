import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import {
  Grid,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from '@mui/material'
import Logo from '../../logo/logo'
import BackImage from '../media/back.svg'
import MapImage from '../media/Maps_512.svg'

export default function LocationAccessForm() {
  const [fullAnything, setFullAnything] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

  const toggleStatusSelection = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(
        selectedStatuses.filter((selected) => selected !== status)
      )
    } else {
      setSelectedStatuses([...selectedStatuses, status])
    }
  }

  const handleNextButtonClick = () => {
    console.log('Selected statuses:', selectedStatuses, fullAnything)
    setOpenDialog(true)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission and data sending logic here
  }

  const handleAllowLocation = () => {
    setOpenDialog(false)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const statusOptions = [
    'Looking for new friends',
    'I`m a new mom',
    'Let`s take the dogs for a walk',
    'I`m learning a new language. Let`s talk!',
    'Let`s be friends, I`m new in town',
    'How do you do it? Share your experience',
    'My plans are to move abroad',
    'I look for emotional support',
  ]

  return (
    <StyledRoot>
      <Logo />
      <Link to="/firstProfile/gender" style={{ textDecoration: 'none' }}>
        <img src={BackImage} alt="back" className="imgBack" />
      </Link>

      <Typography className="title" variant="h4">
        What are you looking for?
      </Typography>

      <Typography variant="body1" className="name">
        This will be your status. You can always change it.
      </Typography>

      <form onSubmit={handleSubmit} className="statusForm">
        <Grid
          container
          spacing={1}
          rowGap={2}
          justifyContent="center"
          alignItems="center"
          height="40vh"
          className="buttonStatus"
        >
          {statusOptions.map((status, index) => (
            <Button
              key={index}
              variant="outlined"
              color={
                selectedStatuses.includes(status) ? 'secondary' : 'primary'
              }
              className="button1"
              onClick={() => toggleStatusSelection(status)}
              style={{
                background: selectedStatuses.includes(status)
                  ? '#FFF1EC'
                  : '#f2f2f2',
              }}
            >
              {status}
            </Button>
          ))}
        </Grid>

        <TextField
          variant="outlined"
          fullWidth
          label="Is there anything you'd like to add?"
          value={fullAnything}
          onChange={(event) => setFullAnything(event.target.value)}
          className="input"
        />

        <Grid item xs={12} className="nextButton">
          <Button
            name="Next"
            variant="contained"
            color="primary"
            className="button"
            type="button"
            onClick={handleNextButtonClick}
          >
            Next
          </Button>
        </Grid>
      </form>
      <Typography variant="h2" className="dot">
        ...<span className="span">.</span>.
      </Typography>

      <img className="imgFooter" src="../img/account-footer.svg" alt="" />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          Allow WeFriends to access this device`s location?
        </DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          <img
            src={MapImage}
            alt="Map"
            style={{ width: '100%', maxWidth: '100px' }}
          />
        </DialogContent>
        <DialogActions
          style={{ flexDirection: 'column', alignItems: 'center' }}
        >
          <Link to="/firstProfile/country">
            <Button onClick={handleCloseDialog} color="primary">
              Don´t allow
            </Button>
          </Link>
          <Link to="/firstProfile/country">
            <Button onClick={handleAllowLocation} color="primary">
              While using the app
            </Button>
          </Link>
          <Link to="/firstProfile/country">
            <Button color="primary">Only this time</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </StyledRoot>
  )
}

const StyledRoot = styled(Box)(({ theme }) => ({
  sectionName: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  '& .statusForm': {
    '@media(max-width: 786px)': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  '& .nextButton': {
    '@media(max-width: 786px)': {
      display: 'flex',
      margin: '1rem auto',
      width: '100%',
    },
  },
  '& .imgBack': {
    margin: '5vh auto',
    height: '7vh',
    width: '50px',
    display: 'block',
  },
  '& .title': {
    margin: '5vh auto',
    height: '5vh',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '32px',
    lineHeight: '40px',
    textAlign: 'center',
    color: '#f46b5d',
  },
  '& .name': {
    margin: '5vh auto',
    height: '5vh',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    color: '#444444',
    textAlign: 'center',
  },
  '& .buttonStatus': {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 320px)',
    columnGap: '8px',
    justifyContent: 'center',
    '@media(max-width: 786px)': {
      display: 'flex',
      flexDirection: 'row',
      flexFlow: 'row wrap',
      height: 'auto',
      margin: 'auto auto 30px',
    },
  },
  '& .button1': {
    border: 'none',
    borderRadius: '30px',
    height: '4rem',
    fontSize: '12px',
    color: '#444444',
    pading: '0 5px',
    background: '#f2f2f2',
    textAlign: 'center',
    '@media(max-width: 786px)': {
      textTransform: 'none',
      height: 'auto',
      width: 'auto',
      maxWidth: '150px',
    },
    '&:hover': {
      background: '#FFF1EC',
      border: 'none',
    },
  },
  '& .input': {
    width: '90%',
    color: '#F1562A',
    margin: '5vh 10vh',
    borderRadius: '10px',
    height: '4rem',
    textAlign: 'center',
    '@media(max-width: 786px)': {
      height: 'auto',
      margin: 'auto',
      width: '90%',
    },
  },
  '& .button': {
    width: '90%',
    margin: 'auto',
    height: '4rem',
    background: '#ffffff',
    borderRadius: '10px',
    border: '2px solid #f46b5d',
    color: '#fb8f67',
    fontSize: '18px',
    fontWeight: '600',
    '&:hover': {
      color: '#ffffff',
      background: '#fb8f67',
      border: 'none',
    },
  },
  '& .dot': {
    textAlign: 'center',
    color: '#f46b5d',
    fontFamily: 'Inter',
    fontWeight: 500,
    fontSize: '100px',
  },
  '& .span': {
    color: '#1D878C',
  },
}))
