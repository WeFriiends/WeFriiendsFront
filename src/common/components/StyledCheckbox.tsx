import { Checkbox } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'

type Props = {
  checked: boolean
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputProps?: {
    'aria-labelledby'?: string
    [key: string]: any
  }
}

export const StyledCheckbox = ({
  checked,
  handleChange,
  inputProps,
}: Props) => {
  const { classes } = useStyles()

  return (
    <Checkbox
      className={classes.checkbox}
      checked={checked}
      onChange={handleChange}
      inputProps={inputProps}
      icon={
        <span
          style={{
            width: 20,
            height: 20,
            backgroundColor: theme.palette.common.white,
            border: '1px solid #ccc',
            borderRadius: 4,
          }}
        />
      }
      checkedIcon={
        <span
          style={{
            width: 20,
            height: 20,
            backgroundColor: theme.palette.common.white,
            border: '1px solid #ccc',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CheckIcon sx={{ color: 'green', fontSize: 18 }} />
        </span>
      }
    />
  )
}

const useStyles = makeStyles()({
  checkbox: {
    padding: 0,
    margin: 0,
    marginRight: 10,
  },
})
