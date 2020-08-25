import React, { useState } from 'react'
import { Typography, Card, CardContent } from '@material-ui/core'
import { AudioSelect } from './AudioSelect'

export const Audio: React.FC = () => {
  const [deviceId, setDeviceId] = useState('')
  return (
    <>
      <Typography>Step.2 マイク</Typography>
      <Card>
        <CardContent>
          <AudioSelect value={deviceId} onChange={setDeviceId} />
        </CardContent>
      </Card>
    </>
  )
}
