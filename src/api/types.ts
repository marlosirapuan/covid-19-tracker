// https://covid19.mathdro.id/api
// https://covid19.mathdro.id/api/countries/<country>
export type ResponseData = {
  confirmed: {
    value: number
  }
  recovered: {
    value: number
  }
  deaths: {
    value: number
  }
  lastUpdate?: Date
  country?: string
}

// https://covid19.mathdro.id/api/daily
export type ResponseDailyData = {
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

// https://covid19.mathdro.id/api/countries
type Country = {
  name: string
}
export type ResponseCountryData = {
  countries: Country[]
}
