import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Home from './home'
import { DESIGNER_INS_ROUTE, DEV_INS_ROUTE } from '../routes'

describe('HOME', () => {
  it('should render home page', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    expect(
      screen.getByText("Welcome to Getsafe's Insurance")
    ).toBeInTheDocument()

    expect(screen.getByText(/designer insurance/i)).toBeInTheDocument()
    expect(screen.getByText(/developer insurance/i)).toBeInTheDocument()
  })

  it('should route the user to designer insurance path', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Home />
      </Router>
    )
    expect(history.location.pathname).toBe('/')
    fireEvent.click(screen.getByText(/designer insurance/i))
    expect(history.location.pathname).toBe(DESIGNER_INS_ROUTE)
  })

  it('should route the user to developer insurance path', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Home />
      </Router>
    )
    expect(history.location.pathname).toBe('/')
    fireEvent.click(screen.getByText(/developer insurance/i))
    expect(history.location.pathname).toBe(DEV_INS_ROUTE)
  })
})
