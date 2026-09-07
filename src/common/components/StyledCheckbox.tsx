import { Checkbox } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { makeStyles } from 'tss-react/mui'

type Props = {
  checked: boolean
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const StyledCheckbox = ({ checked, handleChange }: Props) => {
  const { classes } = useStyles()

  return (
    <Checkbox
      className={classes.checkbox}
      checked={checked}
      onChange={handleChange}
      icon={
        <span
          style={{
            width: 20,
            height: 20,
            backgroundColor: '#fff',
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
            backgroundColor: '#fff',
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
