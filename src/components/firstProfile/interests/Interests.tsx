import { useEffect, useState } from 'react'
import { Box, Typography, TextField, FormHelperText } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { interestsData as dataInterests, InterestData } from './interestsData'
import theme from 'styles/createTheme'
import InterestsItem from './InterestsItem'
import { LanguageItem } from './LanguageItem'
import { validateAboutMe } from '../utils/validateAboutMe'

const LOCAL_STORAGE_KEY = 'userPreferences'

interface InterestsProps {
  isAboutMeShown?: boolean
  hasAboutMeError?: boolean
  setHasAboutMeError?: (value: boolean) => void
}
const Interests = ({
  isAboutMeShown = false,
  hasAboutMeError = false,
  setHasAboutMeError,
}: InterestsProps) => {
  const { classes } = useStyles()

  const loadInitialData = () => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedData) {
      try {
        return JSON.parse(savedData)
      } catch (error) {
        console.error('Error parsing localStorage data:', error)
      }
    }
    return {}
  }

  const [preferences] = useState(() => loadInitialData())
  const [aboutMe, setAboutMe] = useState(preferences.aboutMe || '')
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    preferences.selectedLanguages || []
  )
  const [interestsData, setInterestsData] = useState<InterestData[]>(
    dataInterests.map((interest) => ({
      ...interest,
      selectedItems: preferences[interest.titleBase] || [],
    }))
  )

  useEffect(() => {
    const userPreferences = interestsData.reduce((acc, interest) => {
      if (interest.selectedItems && interest.selectedItems.length > 0) {
        acc[interest.titleBase] = interest.selectedItems
      }
      return acc
    }, {} as Record<string, any>)

    const dataToSave = {
      aboutMe,
      selectedLanguages,
      ...userPreferences,
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave))
  }, [aboutMe, selectedLanguages, interestsData])

  const handleAboutMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const aboutMeText = event.target.value
    setAboutMe(aboutMeText)
    if (aboutMeText.length <= 1000) {
      if (validateAboutMe(aboutMeText)) {
        setHasAboutMeError && setHasAboutMeError(false)
      } else {
        setHasAboutMeError && setHasAboutMeError(true)
      }
    }
  }

  return (
    <Box className={classes.mainBox}>
      {isAboutMeShown && (
        <AboutMeSection
          aboutMe={aboutMe}
          onChange={handleAboutMeChange}
          hasAboutMeError={hasAboutMeError}
        />
      )}
      <Box sx={{ marginBottom: isAboutMeShown ? '50px' : '0' }} />
      <Box className={classes.titleContainer}>
        <Typography className={classes.title}>Lifestyle</Typography>
      </Box>
      <Box className={classes.itemContainer}>
        {interestsData.map((data, index) => (
          <InterestsItem
            key={index + data.title}
            data={data}
            index={index}
            onToggle={(isOpen) => {
              setInterestsData((prev) => {
                const updatedInterests = [...prev]
                updatedInterests[index].isOpen = isOpen
                return updatedInterests
              })
            }}
            onSelectedItems={(selectedItems) => {
              setInterestsData((prev) => {
                const updatedInterests = [...prev]
                updatedInterests[index].selectedItems = selectedItems
                return updatedInterests
              })
            }}
          />
        ))}
        <LanguageItem
          onSetSelectedLanguages={setSelectedLanguages}
          selectedLanguages={selectedLanguages}
        />
      </Box>
      {!isAboutMeShown && (
        <AboutMeSection
          aboutMe={aboutMe}
          onChange={handleAboutMeChange}
          hasAboutMeError={hasAboutMeError}
        />
      )}
    </Box>
  )
}

export default Interests

const AboutMeSection = ({
  aboutMe,
  onChange,
  hasAboutMeError,
}: {
  aboutMe: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  hasAboutMeError: boolean
}) => {
  const { classes } = useStyles()

  return (
    <>
      <Box className={classes.titleContainer}>
        <Typography className={classes.title}>About me</Typography>
      </Box>
      <Box className={classes.aboutMeContainer}>
        <TextField
          id="aboutMe"
          type="text"
          placeholder=" Add smth interesting about you.
        Please note, you have 1000 symbols."
          value={aboutMe}
          onChange={onChange}
          multiline
          rows={6}
          InputProps={{
            classes: {
              root: classes.textareaRoot,
            },
            inputProps: {
              maxLength: 1000,
            },
          }}
          variant="outlined"
        />
        <Typography className={classes.counter}>
          {1000 - aboutMe.length}
        </Typography>
      </Box>
      {hasAboutMeError && (
        <FormHelperText className={classes.errorBox} component="div">
          <h4>Please remove unsupported symbols</h4>
          <p>You cannot use symbols &lt; &gt; &amp; &apos;</p>
        </FormHelperText>
      )}
    </>
  )
}

const useStyles = makeStyles()(() => ({
  mainBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '540px',
    width: '540px',
    justifyContent: 'center',
    '@media (max-width: 600px)': {
      maxWidth: '280px',
      width: '280px',
    },
  },

  titleContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: '100%',
    width: '100%',
    height: '42px',
    borderRadius: '20px',
    backgroundColor: '#FEDED2',
    marginBottom: '20px',
  },
  title: {
    position: 'absolute',
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: '18px',
    alignItems: 'center',
    top: '20%',
    color: theme.palette.text.primary,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    width: '100%',
    margin: '20px 0 40px',
  },
  aboutMeContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '100%',
    width: '100%',
    marginTop: '16px',
  },
  counter: {
    position: 'absolute',
    bottom: 8,
    right: 12,
    color: 'gray',
  },
  textareaRoot: {
    border: 'none',
    borderRadius: '20px',
    outline: 'none',
    backgroundColor: 'transparent',
  },
  errorBox: {
    width: '100%',
    padding: 20,
    boxShadow: '0px 0px 5px #D9D9D9',
    borderRadius: 10,
    color: '#F1562A',
    textAlign: 'left',
    h4: {
      fontSize: 14,
      lineHeight: '22px',
      fontWeight: 500,
      marginBottom: 10,
    },
    p: {
      fontSize: 12,
      lineHeight: '18px',
    },
  },
}))
