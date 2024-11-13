// InterestItem.tsx
import React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { ChipContainerMulti } from './Interests'
import { ArrowRightBtn } from './ArrowRightBtn'
import { InterestData } from './interestsData'
import { makeStyles } from 'tss-react/mui'
import theme from 'styles/createTheme'

type InterestItemProps = {
  data: InterestData
  index: number
  onToggle: (isOpen: boolean) => void
  onSelectedItems: (selectedItems: string[]) => void
}

const InterestsItem: React.FC<InterestItemProps> = ({
  data,
  index,
  onToggle,
  onSelectedItems,
}) => {
  const { classes } = useStyles()

  return (
    <Box key={index} className={classes.item}>
      <Typography className={classes.itemTitle}>{data.title}</Typography>
      <IconButton className={classes.arrowRightBtn}>
        <ArrowRightBtn isOpen={data.isOpen} onToggle={onToggle} />
      </IconButton>
      {data.isOpen && (
        <ChipContainerMulti
          onSelectedItems={onSelectedItems}
          data={data}
          multiple={data.multiple}
          selectedItems={data.selectedItems || []}
        />
      )}
    </Box>
  )
}

export default InterestsItem

const useStyles = makeStyles()(() => ({
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
}))
