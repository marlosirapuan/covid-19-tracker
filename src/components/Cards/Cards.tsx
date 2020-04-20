import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import CountUp from 'react-countup'
import cx from 'classnames'

import styles from './Cards.module.css'

interface CardsProps {
  data: {
    confirmed?: number,
    recovered?: number,
    deaths?: number,
    lastUpdate?: Date,
    country?: string
  }
}

const formatDate = (date?: Date): string => {
  if (!date) { return '' }

  return new Date(date).toDateString()
}

interface CardItemProps {
  title: string,
  type: string,
  value: number,
  date?: Date
}

const styled = (type: string): Array<string> => {
  switch (type) {
    case 'infected':
      return [styles.card, styles.infected]
    case 'deaths':
      return [styles.card, styles.deaths]
    default:
      return [styles.card, styles.recovered]
  }
}

const CardFor = ({ title, type, value, date }: CardItemProps): JSX.Element => {
  const formatedDate = formatDate(date || new Date())

  return (
    <Grid item component={Card} xs={12} md={3} className={cx(styled(type))}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>{title}</Typography>
        <Typography variant="h5">
          <CountUp start={0} end={value} duration={2.5} separator=',' ></CountUp>
        </Typography>
        <Typography color="textSecondary">{formatedDate}</Typography>
        <Typography variant="body2">Number of active cases of COVID-19</Typography>
      </CardContent>
    </Grid>
  )
}

const Cards = ({
  data: { confirmed = 0, recovered = 0, deaths = 0, lastUpdate, country }
}: CardsProps) => {
  if (!confirmed) {
    return (<div>Loading...</div>)
  }

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <CardFor title="Infected" type="infected" value={confirmed} date={lastUpdate} />
        <CardFor title="Recovered" type="recovered" value={recovered} date={lastUpdate} />
        <CardFor title="Deaths" type="deaths" value={deaths} date={lastUpdate} />
      </Grid>
    </div>
  )
}

export default Cards
