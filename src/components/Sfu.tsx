import React, { useRef, useEffect, useState } from 'react'
import 'webrtc-adapter'
import Peer, { SfuRoom } from 'skyway-js'
import { Typography, Card, CardContent, Button } from '@material-ui/core'
import { AudioStream } from './AudioStream'

interface PeerError extends Error {
  type:
    | 'room-error'
    | 'authentication'
    | 'permission'
    | 'list-error'
    | 'disconnected'
    | 'socket-error'
    | 'invalid-key'
    | 'server-error'
    | 'unavailable-id'
}

const onError = (e: PeerError) => {
  console.error(e)
}

export const Sfu: React.FC<{ stream: MediaStream | null }> = ({ stream }) => {
  const peerRef = useRef<Peer | null>(null)
  const peer2Ref = useRef<Peer | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)

  const handleClick = () => {
    if (!stream) {
      console.error('マイクが有効になっていません')
      return
    }

    peerRef.current = new Peer({
      key: import.meta.env.SNOWPACK_PUBLIC_SKYWAY_KEY ?? 'PLEASE SET SKYWAY_KEY',
      debug: 3,
    })
    peerRef.current.on('error', onError)
    peerRef.current.once('open', (peerId) => {
      const room = peerRef.current?.joinRoom(peerId, {
        mode: 'sfu',
        stream,
      }) as SfuRoom
      room.on('stream', (stream) => {
        setRemoteStream(stream)
      })
      room.on('peerLeave', () => {
        setRemoteStream(null)
      })
      room.on('open', () => {
        peer2Ref.current = peerRef.current = new Peer(peerId + '_echo', {
          key: import.meta.env.SNOWPACK_PUBLIC_SKYWAY_KEY ?? 'PLEASE SET SKYWAY_KEY',
          debug: 3,
        })
        peer2Ref.current.on('error', onError)
        peer2Ref.current.once('open', () => {
          peerRef.current?.joinRoom(peerId, {
            mode: 'sfu',
            stream,
          }) as SfuRoom
        })
      })
    })
  }

  const destroy = () => {
    peerRef.current?.destroy()
    peer2Ref.current?.destroy()
  }

  useEffect(() => {
    return destroy
  }, [])

  return (
    <>
      <Typography>Step.4 SFU Room</Typography>
      <Card>
        <CardContent>
          <Button onClick={handleClick} disabled={!stream}>
            接続
          </Button>
          <Button onClick={destroy}>
            切断
          </Button>
          {remoteStream && <AudioStream stream={remoteStream} autoPlay />}
        </CardContent>
      </Card>
    </>
  )
}
