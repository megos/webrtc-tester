import React from 'react'
import browser from 'browser-detect'
import { Typography } from '@mui/material'
import { Section } from './Section'

export const Browser: React.FC = () => {
  const result = browser()
  return (
    <Section title="Step.1 ブラウザ">
      <Typography color="textSecondary">ブラウザ名：{result.name}</Typography>
      <Typography color="textSecondary" aria-label="browser version">
        バージョン：{result.version}
      </Typography>
    </Section>
  )
}
