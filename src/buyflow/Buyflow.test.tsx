import { render, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Buyflow from './Buyflow'
import { ProductIds } from './product-ids'

const VALID_EMAIL = 'marouanekadiri@gmail.com'
const VALID_AGE = 27

describe('Buyflow', () => {
  it('should render dev ins buy flow', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Buyflow productId={ProductIds.devIns} />
      </Router>
    )
    expect(screen.getByText('Buying Developer Insurance')).toBeInTheDocument()
    expect(screen.getByLabelText('Email:')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should navigate successful through the dev insurance buy flow until summary', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Buyflow productId={ProductIds.devIns} />
      </Router>
    )
    // email step
    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: VALID_EMAIL,
      },
    })
    fireEvent.submit(screen.getByRole('button'))
    // age step
    fireEvent.change(screen.getByRole('spinbutton'), {
      target: { value: VALID_AGE },
    })
    fireEvent.submit(screen.getByRole('button'))

    // verify summary
    expect(screen.getByRole('link')).toHaveTextContent('Purchase')
    expect(screen.getByText(new RegExp(VALID_EMAIL))).toBeInTheDocument()
    expect(
      screen.getByText(new RegExp(VALID_AGE.toString()))
    ).toBeInTheDocument()
  })
})
