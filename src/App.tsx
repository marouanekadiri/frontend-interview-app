import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Buyflow, { ProductIds } from './buyflow/Buyflow'
import Home from './home'
import { DESIGNER_INS_ROUTE, DEV_INS_ROUTE } from './routes'

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Switch>
          <Route path={DEV_INS_ROUTE}>
            <Buyflow productId={ProductIds.devIns} />
          </Route>
          <Route path={DESIGNER_INS_ROUTE}>
            <Buyflow productId={ProductIds.devIns} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
