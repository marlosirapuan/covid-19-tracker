import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css'

import { fetchDailyData } from '../../api'

interface ChartProps {
  data: {
    confirmed?: number,
    recovered?: number,
    deaths?: number,
    lastUpdate?: Date,
    country?: string
  }
}

interface ChartData {
  confirmed: {
    total: number
  },
  deaths: {
    total: number
  },
  reportDate: string,
  country?: string
}

const Chart = ({ data: { confirmed, recovered, deaths, country } }: ChartProps) => {
  const [dailyData, setDailyData] = useState<ChartData[]>([
    {
      confirmed: {
        total: 0
      },
      deaths: {
        total: 0
      },
      reportDate: ''
    }
  ])

  useEffect(() => {
    const fetchAPI = async () => setDailyData(await fetchDailyData() as ChartData[])
    fetchAPI()
  }, [])

  if (!dailyData || !dailyData.length) {
    return (<div>Loading...</div>)
  }

  const labelsDates: string[] = dailyData.map((d: ChartData) => d.reportDate) || []
  const labelsConfirmed: number[] = dailyData.map((d: ChartData) => d.confirmed.total) || []
  const labelsDeaths: number[] = dailyData.map((d: ChartData) => d.deaths.total) || []

  const lineChart = (
    dailyData.length
      ? (
        <Line
          data={{
            labels: labelsDates,
            datasets: [
              {
                data: labelsConfirmed,
                label: 'Infected',
                borderColor: 'rgba(0, 0, 255, .5)',
                fill: true
              },
              {
                data: labelsDeaths,
                label: 'Deaths',
                borderColor: 'rgba(255, 0, 0, .5)',
                fill: true
              }
            ]
          }}>
        </Line>
      ) : null
  )

  const barChart = (
    confirmed
      ? (
        <Bar
          data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [{
              label: 'People',
              backgroundColor: [
                'rgba(0, 0, 255, .5)',
                'rgba(0, 255, 0, .5)',
                'rgba(255, 0, 0, .5)'
              ],
              data: [confirmed, recovered, deaths]
            }]
          }}
          options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` }
          }}
        />
      ) : null
  )

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
}

export default Chart
