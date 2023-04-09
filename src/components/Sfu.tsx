import React, { useRef, useEffect, useState } from 'react'
import 'webrtc-adapter'
// @ts-ignore
import SkyWay from 'skyway-js/dist/skyway'
import type { SfuRoom } from 'skyway-js'
import type Peer from 'skyway-js'
import { Typography, Card, CardContent, Button } from '@mui/material'
import { AudioStream } from './AudioStream'
import { Section } from './Section'

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

export const Sfu: React.FC<{
  stream: MediaStream | null
  onJoinRoom: (value: boolean) => void
}> = ({ stream, onJoinRoom }) => {
  const peerRef = useRef<Peer | null>(null)
  const peer2Ref = useRef<Peer | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)

  const onError = (e: PeerError) => {
    console.error(e)
    onJoinRoom(false)
  }

  const handleClick = () => {
    if (!stream) {
      console.error('マイクが有効になっていません')
      return
    }

    onJoinRoom(true)
    peerRef.current = new SkyWay({
      key:
        import.meta.env.SNOWPACK_PUBLIC_SKYWAY_KEY ?? 'PLEASE SET SKYWAY_KEY',
      debug: 3,
    })
    peerRef.current?.on('error', onError)
    peerRef.current?.once('open', (peerId: string) => {
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
        peer2Ref.current = peerRef.current = new SkyWay(peerId + '_echo', {
          key:
            import.meta.env.SNOWPACK_PUBLIC_SKYWAY_KEY ??
            'PLEASE SET SKYWAY_KEY',
          debug: 3,
        })
        peer2Ref.current?.on('error', onError)
        peer2Ref.current?.once('open', () => {
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
    onJoinRoom(false)
  }

  useEffect(() => {
    return destroy
  }, [])

  return (
    <Section title="Step.4 SFU Room">
      <Button onClick={handleClick} disabled={!stream}>
        接続
      </Button>
      <Button onClick={destroy}>切断</Button>
      <Typography color="textSecondary">
        接続後、自分の声がやまびことして聞こえますか？聞こえる場合は繋がっています
      </Typography>
      {<AudioStream stream={remoteStream} autoPlay />}
    </Section>
  )
}
