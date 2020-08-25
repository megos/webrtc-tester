import React from 'react'
import { Typography, Card, CardContent } from '@material-ui/core'
import { AudioSelect } from './AudioSelect'
import { AudioStream } from './AudioStream'

export const Audio: React.FC<{ deviceId: string; onChangeDeviceId: (value: string) => void; stream: MediaStream | null }> = ({
  deviceId,
  onChangeDeviceId,
  stream,
}) => {

  return (
    <>
      <Typography>Step.2 マイク</Typography>
      <Card>
        <CardContent>
          <AudioSelect value={deviceId} onChange={onChangeDeviceId} />
          <AudioStream stream={stream} /> 
        </CardContent>
      </Card>
    </>
  )
}
