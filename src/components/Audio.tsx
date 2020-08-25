import React from 'react'
import { Typography, Card, CardContent } from '@material-ui/core'
import { AudioSelect } from './AudioSelect'
import { AudioStream } from './AudioStream'
import { Section } from './Section'

export const Audio: React.FC<{
  deviceId: string
  onChangeDeviceId: (value: string) => void
  stream: MediaStream | null
}> = ({ deviceId, onChangeDeviceId, stream }) => {
  return (
    <Section title="Step.3 マイク">
      <AudioSelect value={deviceId} onChange={onChangeDeviceId} />
      <Typography color="textSecondary">
        再生ボタンを押して、自分の声が聞こえるか確認してください
      </Typography>
      <AudioStream stream={stream} />
    </Section>
  )
}
