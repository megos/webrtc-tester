import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Browser } from './components/Browser'

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            診断ツール
          </Typography>
        </Toolbar>
      </AppBar>
      <Browser />
    </div>
  )
}

export default App
