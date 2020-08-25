import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            News
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default App
