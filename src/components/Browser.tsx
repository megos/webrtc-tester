import React from 'react'
import browser from 'browser-detect'
import { Typography, Card, CardContent } from '@material-ui/core'

export const Browser: React.FC = () => {
  const result = browser()
  return (
    <>
      <Typography>Step.1 ブラウザ</Typography>
      <Card>
        <CardContent>
          <Typography color="textSecondary">ブラウザ名：{result.name}</Typography>
          <Typography color="textSecondary">バージョン：{result.version}</Typography>
        </CardContent>
      </Card>
    </>
  )
}
