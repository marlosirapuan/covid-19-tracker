import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'

import { countries } from '../../api'

import styles from './CountryPicker.module.css'

interface CountryData {
  name: string
}

interface Props {
  // with (value: React.ChangeEvent<HTMLSelectElement>) does not work : ((
  handleCountryChange: (e: any) => void
}

const CountryPicker = ({ handleCountryChange }: Props): JSX.Element => {
  const [fetchedCountries, setFetchedCountries] = useState<CountryData[]>([{ name: '' }])

  useEffect(() => {
    const fetchAPI = async () => setFetchedCountries((await countries()) as CountryData[])
    fetchAPI()
  }, [setFetchedCountries])

  if (!fetchedCountries.length) {
    return <div>Loading...</div>
  }

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCountryChange(e.target.value)}
      >
        <option value="">Global</option>
        {fetchedCountries.map((country, i) => (
          <option key={i} value={country.name}>
            {country.name}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker
