import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Link as MuiLink,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CloseIcon from '@mui/icons-material/Close'
import { makeStyles } from 'tss-react/mui'
import { interestsData as dataInterests } from './interestsData'
import theme from 'styles/createTheme'
import Logo from 'components/logo/Logo'
import LanguageSelector from './languageSelector'

type ArrowRightBtnProps = {
  onToggle: (isOpen: boolean) => void
  isOpen: boolean | undefined
}

type ChipContainerProps = {
  data: { title: string; item: string[] }
  multiple?: boolean | undefined
  onSelectedItems: (selectedItems: string[]) => void
  selectedItems: string[] | undefined
}

const Interests = () => {
  const { classes } = useStyles()
  const [aboutMe, setAboutMe] = useState('')
  const [, setIsOpenTabPointer] = useState('')
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isLanguagePopUpOpen, setIsLanguagePopUpOpen] = useState(false)

  const handleSelectedLanguages = (languages: string[]) => {
    setSelectedLanguages(languages)
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAboutMe(event.target.value)
  }

  const [interestsData, setInterestsData] = useState(dataInterests)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setAboutMe('')
  }

  return (
    <Box className={classes.mainBox}>
      <Logo />
      <Link to="/" className={classes.link}>
        <Box className={classes.arrowBtn}>
          <ArrowBackBtn />
        </Box>
      </Link>
      <Box className={classes.titleContainer}>
        <Typography className={classes.title}>Lifestyle</Typography>
      </Box>
      <Box className={classes.itemContainer}>
        {interestsData.map((data, index) => (
          <Box key={index} className={classes.item}>
            <Typography className={classes.itemTitle}>{data.title}</Typography>
            <IconButton className={classes.arrowRightBtn}>
              <ArrowRightBtn
                isOpen={data.isOpen}
                onToggle={(isOpen) => {
                  setIsOpenTabPointer(isOpen ? data.title : '')
                  setInterestsData((prev) => {
                    const newInterestsData = [...prev]
                    newInterestsData[index].isOpen = isOpen
                    return newInterestsData
                  })
                }}
              />
            </IconButton>
            {data.isOpen && (
              <ChipContainerMulti
                onSelectedItems={(selectedItems) => {
                  setInterestsData((prev) => {
                    const newInterestsData = prev
                    newInterestsData[index].selectedItems = selectedItems
                    return newInterestsData
                  })
                }}
                data={data}
                multiple={data.multiple}
                selectedItems={data.selectedItems || []}
              />
            )}
          </Box>
        ))}
        <Box className={classes.item}>
          <Typography className={classes.itemTitle}>Language</Typography>
          <IconButton className={classes.arrowRightBtn}>
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
            <Box
              className={classes.chipContainer}
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '40px',
                justifyContent: 'flex-start',
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  flexWrap: 'wrap',
                  marginRight: 'auto',
                }}
              >
                {selectedLanguages.map((language, index) => (
                  <ChipWithClose
                    onClose={() =>
                      setSelectedLanguages(
                        selectedLanguages.filter((l) => l !== language)
                      )
                    }
                    key={index}
                    label={language}
                  />
                ))}
                <MuiLink
                  className={classes.muiLink}
                  component="button"
                  variant="body2"
                  sx={{ marginLeft: 'auto' }} // Позволяет разместить линк справа
                  onClick={() => setIsLanguagePopUpOpen(true)} // Переносим обработчик клика сюда
                >
                  add more
                </MuiLink>
              </Box>
            </Box>
          )}
          <Dialog
            open={isLanguagePopUpOpen}
            onClose={() => setIsLanguageOpen(false)}
            sx={{
              '& .MuiDialog-paper': {
                width: '430px',
                height: '396px',
                borderRadius: '20px',
                padding: '26px 40px 36px',
                position: 'relative',
              },
            }}
          >
            <DialogActions>
              <Button
                onClick={() => setIsLanguagePopUpOpen(false)}
                sx={{
                  position: 'absolute',
                  top: '16px',
                  right: '1px',
                }}
              >
                <CloseIcon sx={{ color: theme.palette.text.primary }} />
              </Button>
            </DialogActions>
            <DialogTitle className={classes.dialogTitle}>
              Languages you speak
            </DialogTitle>
            <DialogContent>
              <LanguageSelector
                onSelectedLanguages={handleSelectedLanguages}
                selectedLanguages={selectedLanguages}
              />
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
      <Box className={classes.titleContainer}>
        <Typography className={classes.title}>About me</Typography>
      </Box>
      <Box>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            id="aboutMe"
            type="text"
            placeholder="Add about me..."
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
          <Button type="submit" className={classes.submitBtn}>
            Next
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default Interests

const ChipContainerMulti: React.FC<ChipContainerProps> = ({
  data,
  multiple,
  onSelectedItems,
  selectedItems,
}) => {
  const { classes } = useStyles()

  // Инициализация состояния с помощью useState напрямую
  const [_selectedItems, setSelectedItems] = useState<string[]>(
    selectedItems || []
  )

  const checkItems = (item: string) => {
    const newSelectedItems: string[] = []
    if (_selectedItems.includes(item)) {
      newSelectedItems.push(..._selectedItems.filter((i) => i !== item))
      //setSelectedItems(_selectedItems.filter((i) => i !== item))
    } else {
      //setSelectedItems((prev) => [...prev, item])
      const arr = multiple ? _selectedItems : []
      newSelectedItems.push(...arr, item)
    }
    setSelectedItems(newSelectedItems)
    onSelectedItems(newSelectedItems)
  }

  return (
    <Box className={classes.chipContainer}>
      {data.item.map((item, index) => (
        <Chip
          key={index}
          label={item}
          style={{
            backgroundColor: _selectedItems.includes(item)
              ? '#FECAB7'
              : '#EEEEEE',
          }}
          onClick={() => checkItems(item)}
        />
      ))}
    </Box>
  )
}

const ChipWithClose = ({
  label,
  onClose,
}: {
  label: string
  onClose: () => void
}) => {
  const { classes } = useStyles()
  return (
    <Box sx={{ position: 'relative' }}>
      <Chip label={label} style={{ margin: '4px' }} />
      <CloseIcon className={classes.closeChipIcon} onClick={onClose} />
    </Box>
  )
}

const ArrowBackBtn = () => {
  const { classes } = useStyles()
  return <ArrowBackIcon className={classes.arrowSvg} />
}

const ArrowRightBtn: React.FC<ArrowRightBtnProps> = ({ onToggle, isOpen }) => {
  const { classes } = useStyles()
  //const [isArrowRight, setIsArrowRight] = useState<boolean>(true)
  const toggle = () => {
    //setIsArrowRight(!isArrowRight)
    onToggle(!isOpen)
  }

  return (
    <ArrowForwardIosIcon
      onClick={toggle}
      className={!isOpen ? classes.arrowRightSvg : classes.arrowDownSvg}
    />
  )
}

const useStyles = makeStyles()(() => {
  return {
    mainBox: {
      margin: '200px auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '540px',
      width: '540px',
      justifyContent: 'center',
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
    arrowRightSvg: {
      position: 'absolute',
      width: '14px',
      height: '14px',
      color: theme.palette.text.primary,
      cursor: 'pointer',
    },
    arrowDownSvg: {
      position: 'absolute',
      width: '14px',
      height: '14px',
      color: theme.palette.text.primary,
      cursor: 'pointer',
      transform: 'rotate(90deg)',
      transition: 'all .3s ease',
    },
    closeChipIcon: {
      position: 'absolute',
      width: '14px',
      height: '14px',
      backgroundColor: '#F46B5D',
      color: 'white',
      cursor: 'pointer',
      borderRadius: '50%',
      right: '2px',
      top: '-2px',
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
      maxWidth: '540px',
      width: '540px',
      height: '42px',
      borderRadius: '20px',
      backgroundColor: '#FEDED2',
      marginBottom: '20px',
    },
    itemContainer: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '540px',
      width: '540px',
      margin: '20px 0 40px',
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
    chipContainer: {
      margin: '10px 0 15px',
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
    },
    dialogTitle: {
      fontFamily: 'Inter',
      fontWeight: 600,
      fontSize: '18px',
      color: theme.palette.text.primary,
      maxWidth: '350px',
      height: '42px',
      margin: '20px 0 60px',
      backgroundColor: '#FEDED2',
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    form: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      maxWidth: '540px',
      marginTop: '16px',
    },
    textarea: {
      disableUnderLine: true,
      maxWidth: '540px',
      width: '540px',
      height: '163px',
      padding: '10px 18.5px',
      borderRadius: '20px',
      border: '1px solid #C5C5C5',
      fontFamily: 'Inter',
      fontSize: '14px',
      color: '#C5C5C5',
      fontWeight: 400,
      outline: 'none',
    },
    textareaRoot: {
      border: 'none',
      borderRadius: '20px',
      outline: 'none',
      backgroundColor: 'transparent',
    },
    textareaPlaceholder: {
      fontFamily: 'Inter',
      fontSize: '14px',
      color: theme.palette.text.primary,
      fontWeight: 400,
    },
    textFieldset: {
      borderColor: '#C5C5C5',
      borderRadius: '20px',
    },
    labelRoot: {
      fontFamily: 'Inter',
      fontSize: '14px',
      color: '#C5C5C5',
      fontWeight: 400,
      borderColor: '#C5C5C5',
    },
    labelFocused: {
      fontFamily: 'Inter',
      fontSize: '14px',
      color: 'C5C5C5',
      fontWeight: 400,
      borderColor: '#C5C5C5',
      border: '1px solid #C5C5C5',
      '&:focus': {
        color: '#C5C5C5',
        border: '1px solid #C5C5C5',
        borderColor: '#C5C5C5',
      },
    },
    submitBtn: {
      maxWidth: '540px',
      width: '540px',
      height: '60px',
      borderRadius: '10px',
      backgroundColor: '#FB8F67',
      color: '#FFFFFF',
      fontSize: '18px',
      fontWeight: 600,
      outline: 'none',
      border: 'none',
      fontFamily: 'Inter',
      textAlign: 'center',
      marginTop: '32px',
      '&:hover': {
        backgroundColor: '#FB8F67',
      },
    },
  }
})

/* <Box className={classes.itemContainer}>
          <Box className={classes.item}>
            <Typography className={classes.itemTitle}>Language</Typography>
            <IconButton className={classes.arrowRightBtn}>
              <ArrowRightBtn
                isOpen={isLanguageOpen}
                onToggle={() => setIsLanguageOpen(!isLanguageOpen)}
              />
            </IconButton>
            {isLanguageOpen && (
              <LanguageSelector
                onSelectedLanguages={handleSelectedLanguages}
                selectedLanguages={selectedLanguages}
              />
            )}
          </Box>
        </Box> 
        <IconButton
            className={classes.arrowRightBtn}
            onClick={() => setIsLanguageOpen(true)}
          >
            <ArrowForwardIosIcon className={classes.arrowRightSvg} />
          </IconButton>
          <LanguageSelector
                  onSelectedLanguages={handleSelectedLanguages}
                  selectedLanguages={selectedLanguages}
                />*/
