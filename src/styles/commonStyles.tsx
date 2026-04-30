import { makeStyles } from 'tss-react/mui'

export const commonStyles = makeStyles()((theme) => {
  const boxShadow = '0 0 7px 1px rgba(179, 179, 179, 0.14)'

  return {
    typography: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
    },
    inputField: {
      backgroundColor: '#FFF1EC',
      borderRadius: 10,
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          border: 'none',
        },
      },
    },
    shadowBox: {
      borderRadius: 10,
      boxShadow: boxShadow,
      padding: '30px 20px',
      background: '#fff',
    },
    title: {
      fontSize: 32,
      fontWeight: 600,
      lineHeight: '40px',
      paddingTop: 80,
      color: theme.palette.primary.main,
      textAlign: 'center',
    },
    subTitle: {
      fontSize: 26,
      lineHeight: '40px',
      color: theme.palette.text.primary,
      textAlign: 'center',
    },
    titleSecondary: {
      fontSize: 24,
      fontWeight: 500,
      lineHeight: '40px',
      paddingTop: 80,
      paddingBottom: 14,
      color: theme.palette.primary.main,
      textAlign: 'center',
    },
    subTitleSecondary: {
      paddingBottom: 15,
      fontSize: 14,
      textAlign: 'center',
    },
    textLow: {
      textTransform: 'lowercase',
    },
    textCapitalizee: {
      textTransform: 'capitalize',
    },
    dialogOption: {
      display: 'block',
      backgroundColor: '#fff',
      marginBottom: 8,
      color: '#000',
      boxShadow: boxShadow,
      height: 50,
      lineHeight: '50px',
      borderRadius: 10,
      fontSize: 14,
      padding: '0 14px',
      textAlign: 'left',
      textTransform: 'none',
      transition: '0.3s backgroundColor, 0.3s color',
      '&:hover, &:active': {
        backgroundColor: theme.palette.primary.light,
        color: '#fff',
      },
    },
    dialogBtn: {
      marginBottom: 8,
      boxShadow: boxShadow,
      height: 38,
      lineHeight: '36px',
      borderRadius: 10,
      fontSize: 12,
      fontWeight: 500,
      textTransform: 'none',
      width: '40%',
    },
    buttonGroup: {
      display: 'flex',
      gap: 15,
      justifyContent: 'center',
      width: '90%',
      margin: '70px auto',
    },
    link: {
      color: theme.palette.secondary.main,
      fontSize: 22,
      textDecoration: 'none',
      display: 'block',
      textAlign: 'center',
    },
    linkBtn: {
      display: 'block',
      textTransform: 'lowercase',
      backgroundColor: '#FFF1EC',
      color: theme.palette.text.primary,
      paddingTop: 18,
      paddingBottom: 18,
      borderRadius: 10,
      fontSize: 18,
      textDecoration: 'none',
      textAlign: 'center',
    },
    submitButton: {
      textTransform: 'lowercase',
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
      height: 56,
      fontSize: 18,
      fontWeight: 600,
      borderRadius: 10,
      marginTop: 45,
      boxShadow: 'none',
      ':disabled': {
        backgroundColor: theme.palette.common.white,
        border: '2px solid #FB8F67',
        color: theme.palette.primary.light,
      },
      '&: hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    centeredContainer: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    centeredFullPage: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100dvh',
      padding: '20px',
    },
  }
})
