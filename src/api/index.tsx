import axios from 'axios'

import { ResponseData, ResponseDailyData, ResponseCountryData } from './types'

const URL = 'https://covid19.mathdro.id/api'
const URL_DAILY = `${URL}/daily`
const URL_COUNTRIES = `${URL}/countries`

export const fetchData = async (country?: string): Promise<ResponseData> => {
  let changeableUrl = URL as string
  if (country) {
    changeableUrl = `${URL}/countries/${country}`
  }

  try {
    const { data } = await axios.get<ResponseData>(changeableUrl)

    return data
  } catch (error) {
    return {} as ResponseData
  }
}

export const fetchDailyData = async (): Promise<ResponseDailyData[]> => {
  try {
    const { data } = await axios.get<ResponseDailyData[]>(URL_DAILY)
    return data
  } catch (error) {
    return []
  }
}

export const fetchCountries = async (): Promise<ResponseCountryData> => {
  try {
    const { data } = await axios.get<ResponseCountryData>(URL_COUNTRIES)
    return data
  } catch (error) {
    return {} as ResponseCountryData
  }
}
