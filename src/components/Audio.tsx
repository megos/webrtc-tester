import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import { AudioSelect } from './AudioSelect'
import { AudioStream } from './AudioStream'
import { Section } from './Section'

export const Audio: React.FC<{
  deviceId: string
  onChangeDeviceId: (value: string) => void
  stream: MediaStream | null
  showStream: boolean
}> = ({ deviceId, onChangeDeviceId, stream, showStream }) => {
  return (
    <Section title="Step.3 マイク">
      <AudioSelect value={deviceId} onChange={onChangeDeviceId} />
      <Typography color="textSecondary">
        再生ボタンを押して、自分の声が聞こえるか確認してください
      </Typography>
      {showStream && <AudioStream stream={stream} disableDestroy />}
    </Section>
  )
}
