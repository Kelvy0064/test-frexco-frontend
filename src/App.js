import React from 'react'
import { Route, HashRouter } from 'react-router-dom'
import { Curriculum } from './pages/Curriculum'

function App () {
  return (
    <HashRouter>
      <div className="content">
        <Route exact path="/" component={ Curriculum } />
      </div>
    </HashRouter>
  )
}

export default App
