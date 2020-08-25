import React, { useState } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Browser } from './components/Browser'
import { Audio } from './components/Audio'
import { Sound } from './components/Sound'
import { getStream } from './util'
import { Sfu } from './components/Sfu'

interface AppProps {}

function App({}: AppProps) {
  const [deviceId, setDeviceId] = useState('')
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [startRoom, setStartRoom] = useState(false)

  const handleDeviceId = async (value: string) => {
    setDeviceId(value)
    setStream(await getStream({ audio: { deviceId: value } }))
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">診断ツール</Typography>
        </Toolbar>
      </AppBar>
      <Browser />
      <Sound />
      <Audio
        deviceId={deviceId}
        onChangeDeviceId={handleDeviceId}
        stream={stream}
        showStream={!startRoom}
      />
      <Sfu stream={stream} onJoinRoom={setStartRoom} />
    </div>
  )
}

export default App
