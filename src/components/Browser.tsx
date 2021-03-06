import React from 'react'
import browser from 'browser-detect'
import { Typography } from '@material-ui/core'
import { Section } from './Section'

export const Browser: React.FC = () => {
  const result = browser()
  return (
    <Section title="Step.1 ブラウザ">
      <Typography color="textSecondary">ブラウザ名：{result.name}</Typography>
      <Typography color="textSecondary">
        バージョン：{result.version}
      </Typography>
    </Section>
  )
}
