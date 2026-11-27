import { makeStyles } from 'tss-react/mui'
import theme from '../../styles/createTheme'
import type { IconProps } from 'common/types/iconTypes'

const IconNewTab = ({ color }: IconProps) => {
  const { classes } = useStyles()
  color ??= theme.customPalette.colorInputGrey

  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes.iconNewTab}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        className={classes.iconTransition}
        d="M11.5 0.5H16C16.2761 0.5 16.5 0.723858 16.5 1V5.5C16.5 5.77614 16.2761 6 16 6C15.7239 6 15.5 5.77614 15.5 5.5V2.20711L9.35355 8.35355C9.15829 8.54882 8.84171 8.54882 8.64645 8.35355C8.45118 8.15829 8.45118 7.84171 8.64645 7.64645L14.7929 1.5H11.5C11.2239 1.5 11 1.27614 11 1C11 0.723858 11.2239 0.5 11.5 0.5ZM0.5 4C0.5 3.72386 0.723858 3.5 1 3.5H10.5C10.7761 3.5 11 3.72386 11 4C11 4.27614 10.7761 4.5 10.5 4.5H1.5V15.5H12.5V6.5C12.5 6.22386 12.7239 6 13 6C13.2761 6 13.5 6.22386 13.5 6.5V16C13.5 16.2761 13.2761 16.5 13 16.5H1C0.723858 16.5 0.5 16.2761 0.5 16V4Z"
        fill={color}
      />
    </svg>
  )
}
export default IconNewTab
const useStyles = makeStyles()(() => {
  return {
    iconNewTab: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    iconTransition: {
      transition: 'color .3s, stroke .3s, fill .3s',
    },
  }
})
