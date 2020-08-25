import React, { useState, useEffect } from 'react'
import { Button, Select, MenuItem, SelectProps, Typography } from '@material-ui/core'

type AudioSelectProps = Omit<SelectProps, 'onChange'> & {
  onChange: (value: string) => void
}

export const AudioSelect: React.FC<AudioSelectProps> = ({
  onChange,
  disabled,
  ...props
}) => {
  const [options, setOption] = useState<{ label: string; value: string; }[]>([])

  const getDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const audioDevices = devices
        .filter((d) => d.kind === 'audioinput')
        .map((d) => ({ value: d.deviceId, label: d.label }))
      if (audioDevices.length > 0) {
        if (audioDevices.every((o) => o.label === '')) {
          // Get permission
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          })
          stream.getTracks().forEach((track) => track.stop())
          getDevices().catch(() => {})
        } else {
          setOption(audioDevices)
          // Set default microphone
          onChange(audioDevices[0].value)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getDevices().catch(() => {})
  }, [])

  const unavailable = options.every((o) => o.value === '')

  return (
    <>
      <Typography color="textSecondary">マイクが見つかりませんと表示される場合はマイクが繋がっているか、ブラウザでマイクの許可ができているか確認してください</Typography>
      <Select
        label={unavailable ? 'マイクが見つかりません' : 'マイクを選択する'}
        onChange={(e) => onChange(e.target.value as string)}
        disabled={unavailable || disabled}
        fullWidth
        {...props}
      >
        {options
          .filter((o) => o.label !== '' || o.value !== '')
          .map((o) => (
            <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
          ))}
      </Select>
      <Button onClick={getDevices} color="primary">
        再読み込みする
      </Button>
    </>
  )
}
