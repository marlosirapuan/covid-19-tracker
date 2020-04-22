import React, { useState, useEffect, useCallback } from 'react'
import styles from './App.module.css'
import { fetchData } from './api'

import { Cards, CountryPicker, Chart } from './components'

import image from './images/image.png'

interface CardData {
  confirmed?: number
  recovered?: number
  deaths?: number
  lastUpdate?: Date
  country?: string
}

const App: React.FC = () => {
  const [data, setData] = useState<CardData>({})

  useEffect(() => {
    const fetchAPI = async () => setData((await fetchData()) as CardData)
    fetchAPI()
  }, [])

  const onHandleCountryChange = useCallback(async (country: string) => {
    const fetchedData = (await fetchData(country)) as CardData
    setData({ ...fetchedData, country: country })
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
