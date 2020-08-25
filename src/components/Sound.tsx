import React, { useState } from 'react'
import { Typography, Card, CardContent } from '@material-ui/core'

export const Sound: React.FC = () => {
  return (
    <>
      <Typography>Step.3 スピーカー</Typography>
      <Card>
        <CardContent>
          {/* https://soundeffect-lab.info/sound/anime/ */}
          <audio src="/assets/eye-shine1.mp3" controls />
        </CardContent>
      </Card>
    </>
  )
}
