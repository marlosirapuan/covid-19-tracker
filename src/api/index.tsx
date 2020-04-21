import axios from 'axios'

const URL = 'https://covid19.mathdro.id/api'
const URL_DAILY = `${URL}/daily`
const URL_COUNTRIES = `${URL}/countries`

interface ResponseData {
  confirmed: number
  recovered: number
  deaths: number
  lastUpdate: Date
}

export const fetchData = async (country: string = '') => {
  let changeableUrl = URL as string
  if (country) {
    changeableUrl = `${URL}/countries/${country}`
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate }
    } = await axios.get(changeableUrl)
    const response: ResponseData = {
      confirmed: confirmed.value,
      recovered: recovered.value,
      deaths: deaths.value,
      lastUpdate
    }

    return response
  } catch (error) {
    console.log(error)
  }
}

interface ResponseDailyData {
  confirmed: {
    total: number
  }
  recovered: {
    total: number
  }
  deaths: {
    total: number
  }
  reportDate: string
}

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(URL_DAILY)
    const response: ResponseDailyData[] = []

    data.map(({ confirmed, recovered, deaths, reportDate }: ResponseDailyData) => {
      return response.push({ confirmed, recovered, deaths, reportDate })
    })

    return response
  } catch (error) {
    console.log(error)
  }
}

interface ResponseCountryData {
  name: string
}

export const countries = async () => {
  try {
    const {
      data: { countries }
    } = await axios.get(URL_COUNTRIES)
    const response: ResponseCountryData[] = []

    countries.map(({ name }: ResponseCountryData) => {
      return response.push({ name })
    })

    return response
  } catch (error) {
    console.log(error)
  }
}
