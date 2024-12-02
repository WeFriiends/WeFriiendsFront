import React, { useState } from 'react'
import { useSuggestedLocations } from 'hooks/useSuggestedLocations'
import {
  Autocomplete,
  TextField,
  InputAdornment,
  CircularProgress,
  Icon,
} from '@mui/material'

const BOUNCE_DURATION = 500
const SUGGESTIONS_LIMIT = 5

const LocationInputAutocomplete = ({
  onLocationChange,
}: {
  onLocationChange: (location: any) => void
}) => {
  const [inputLocation, setInputLocation] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Local loading state

  const suggestedLocations = useSuggestedLocations(
    inputLocation,
    BOUNCE_DURATION,
    SUGGESTIONS_LIMIT
  )

  // Monitor input changes and manage loading state manually
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputLocation(value)

    // Trigger loading state while fetching suggestions
    if (value.length > 0) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false) // Simulating loading completion
      }, BOUNCE_DURATION)
    } else {
      setIsLoading(false)
    }
  }

  // Handle selected value from Autocomplete
  const handleSelectLocation = (event: any, value: any) => {
    // Send the selected location to the parent component
    if (value) {
      onLocationChange(value) // Passing the selected location to parent
    }
  }

  return (
    <Autocomplete
      freeSolo
      filterOptions={(x) => x}
      options={suggestedLocations}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option
        } else {
          return option.displayName
        }
      }}
      onChange={handleSelectLocation} // Set the handler for value selection
      renderInput={(params) => (
        <TextField
          sx={{
            "input[type='search']::-webkit-search-cancel-button": {
              display: 'none',
            },
          }}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...params}
          variant="standard"
          InputProps={{
            ...params.InputProps,
            type: 'search',
            startAdornment: (
              <InputAdornment position="start">
                <Icon>
                  <img src="/img/icon-search.svg" alt="Close" />
                </Icon>
                <span
                  style={{
                    display:
                      isFocused || inputLocation.length ? 'none' : 'inline',
                  }}
                >
                  &nbsp;Search city
                </span>
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}

export default LocationInputAutocomplete
