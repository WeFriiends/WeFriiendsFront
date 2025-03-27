import { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
} from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from 'styles/createTheme'
import LanguageSelector from './languageSelector'
import { ArrowRightBtn } from './ArrowRightBtn'
import { ChipWithClose } from './ChipWithClose'

export const LanguageItem = ({
  selectedLanguages,
  onSetSelectedLanguages,
}: {
  selectedLanguages: string[]
  onSetSelectedLanguages: (languages: string[]) => void
}) => {
  const { classes } = useStyles()

  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [, setIsLanguagePopUpOpen] = useState(false)

  const handleSelectedLanguages = (languages: string[]) => {
    onSetSelectedLanguages(languages)
  }

  return (
    <Box className={classes.item}>
      <Typography className={classes.itemTitle}>Language</Typography>
      <IconButton
        className={classes.arrowRightBtn}
        disableFocusRipple={true}
        disableRipple={true}
      >
        <ArrowRightBtn
          isOpen={isLanguageOpen}
          onToggle={(isOpen) => {
            setIsLanguageOpen(isOpen)
            if (selectedLanguages.length === 0 && isOpen) {
              setIsLanguagePopUpOpen(true)
            }
          }}
        />
      </IconButton>
      {isLanguageOpen && (
        <>
          <LanguageSelector
            onSelectedLanguages={handleSelectedLanguages}
            selectedLanguages={selectedLanguages}
          />

          <Box className={classes.chipContainer}>
            {selectedLanguages.map((language, index) => (
              <ChipWithClose
                onClose={() => {
                  onSetSelectedLanguages(
                    selectedLanguages.filter((l) => l !== language)
                  )
                }}
                key={index}
                label={language}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}

const useStyles = makeStyles()(() => {
  return {
    chipContainer: {
      margin: '40px 0 15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
    arrowBtn: {
      position: 'relative',
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      backgroundColor: '#FEDED2',
      display: 'flex',
      justifyContent: 'center',
      margin: '50px 0',
    },
    arrowSvg: {
      position: 'absolute',
      width: '24px',
      height: '24px',
      color: theme.palette.text.primary,
      cursor: 'pointer',
      top: '25%',
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
    muiLink: {
      color: theme.palette.secondary.main,
      fontSize: '14px',
      fontWeight: 600,
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: theme.palette.secondary.main,
      textUnderlineOffset: '4px',
      alignItems: 'right',
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
    itemContainer: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '100%',
      width: '100%',
      margin: '20px 0 0',
    },
    item: {
      position: 'relative',
      fontFamily: 'Inter',
      fontWeight: 400,
      fontSize: '16px',
      alignItems: 'center',
      color: theme.palette.text.primary,
      borderBottom: '1px solid #EEEEEE',
      marginBottom: '30px',
    },
    itemTitle: {
      marginBottom: '20px',
    },
    arrowRightBtn: {
      position: 'absolute',
      right: '0',
      top: '0',
      width: '24px',
      height: '24px',
    },
  }
})
