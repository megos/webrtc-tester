import React, { useRef, useEffect, AudioHTMLAttributes } from 'react'

export const AudioStream: React.FC<
  AudioHTMLAttributes<HTMLAudioElement> & {
    stream?: MediaStream | null
    disableDestroy?: boolean
  }
> = ({ stream, disableDestroy, ...props }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const destory = () => {
    if (disableDestroy) return
    ;(audioRef.current?.srcObject as MediaStream | null)
      ?.getTracks()
      .forEach((track) => track.stop())
    if (audioRef.current) audioRef.current.srcObject = null
  }

  useEffect(() => {
    if (audioRef.current) {
      if (stream) {
        if (audioRef.current.srcObject !== stream)
          audioRef.current.srcObject = stream
      } else {
        destory()
      }
    }
  }, [stream])

  useEffect(() => destory, [])

  return <audio ref={audioRef} {...props} controls />
}
