import React, { useState, useEffect, useCallback } from 'react'
import styles from './App.module.css'
import { fetchData } from './api'

import { ResponseData } from './api/types'
import { Cards, CountryPicker, Chart } from './components'

import image from './images/image.png'

const App: React.FC = () => {
  const [data, setData] = useState<ResponseData>({} as ResponseData)

  useEffect(() => {
    ;(async function fetchAPI(): Promise<void> {
      const response = (await fetchData()) as ResponseData
      setData(response)
    })()
  }, [])

  const onHandleCountryChange = useCallback(async (selectedCountry: string) => {
    const response = await fetchData(selectedCountry)
    setData({ ...response, country: selectedCountry })
  }, [])

  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="COVID-19 Tracker" />
      <Cards data={data} />
      <CountryPicker handleCountryChange={onHandleCountryChange} />
      <Chart data={data} />
    </div>
  )
}

export default App
