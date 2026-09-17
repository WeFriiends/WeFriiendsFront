import { Checkbox } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'
import type { CheckboxProps } from '@mui/material'

export const StyledCheckbox = ({
  className,
  checked,
  onChange,
  inputProps,
  ...props
}: CheckboxProps) => {
  const { classes, cx } = useStyles()

  return (
    <Checkbox
      className={cx(classes.checkbox, className)}
      checked={checked}
      onChange={onChange}
      inputProps={inputProps}
      {...props}
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
