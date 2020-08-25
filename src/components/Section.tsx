import React from 'react'
import {
  Typography,
  Card,
  CardContent,
  makeStyles,
  Theme,
} from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(3),
  },
}))

export const Section: React.FC<{ title: string }> = ({ title, children }) => {
  const classes = useStyles()
  return (
    <>
      <Typography variant="h6" className={classes.root}>
        {title}
      </Typography>
      <Card className={classes.root}>
        <CardContent>{children}</CardContent>
      </Card>
    </>
  )
}
