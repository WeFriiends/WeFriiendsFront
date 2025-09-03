import { useEffect, useState } from 'react'
import { Box, Chip } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

type ChipContainerProps = {
  data: { title: string; item: string[]; titleBase?: string }
  multiple?: boolean | undefined
  onSelectedItems: (selectedItems: string[]) => void
  selectedItems: string[] | undefined
}

export const ChipContainerMulti: React.FC<ChipContainerProps> = ({
  data,
  multiple,
  onSelectedItems,
  selectedItems,
}) => {
  const { classes } = useStyles()

  const [_selectedItems, setSelectedItems] = useState<string[]>(
    selectedItems || []
  )

  useEffect(() => {
    setSelectedItems(selectedItems || [])
  }, [selectedItems])

  const isNoneSelected =
    data.titleBase === 'Pets' && _selectedItems.includes('None')

  const checkItems = (item: string) => {
    if (isNoneSelected && item !== 'None') {
      return
    }

    let newSelectedItems: string[] = []

    const isAlreadySelected = _selectedItems.includes(item)

    if (isAlreadySelected) {
      newSelectedItems = _selectedItems.filter((i) => i !== item)
    } else {
      const base = multiple ? _selectedItems : []
      newSelectedItems = [...base, item]
    }

    if (data.titleBase === 'Pets') {
      if (item === 'None' && !isAlreadySelected) {
        newSelectedItems = ['None']
      } else if (item !== 'None') {
        newSelectedItems = newSelectedItems.filter((i) => i !== 'None')
      }
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
  }
})
