import React from 'react'
import { Typography } from '@material-ui/core'
import { Section } from './Section'

export const Sound: React.FC = () => {
  return (
    <Section title="Step.2 スピーカー">
      <Typography color="textSecondary">
        再生ボタンを押して効果音が聞こえますか？聞こえない場合はスピーカーが繋がっているか、音量が0になっていないか確認してください
      </Typography>
      {/* https://soundeffect-lab.info/sound/anime/ */}
      <audio src="/assets/eye-shine1.mp3" controls />
    </Section>
  )
}
