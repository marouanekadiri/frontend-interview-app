import { render, screen, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Buyflow from './buyflow'
import { ProductIds } from './product-ids'
import { DESIGNER_INS_CALLBACK_ROUTE, DEVINS_CALLBACK_ROUTE } from '../routes'

const FIRST_NAME = 'marouane'
const LAST_NAME = 'kadiri'
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
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      DEVINS_CALLBACK_ROUTE
    )
    expect(screen.getByText(new RegExp(VALID_EMAIL))).toBeInTheDocument()
    expect(
      screen.getByText(new RegExp(VALID_AGE.toString()))
    ).toBeInTheDocument()
  })

  it('should render designer ins buy flow', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Buyflow productId={ProductIds.designerIns} />
      </Router>
    )
    expect(screen.getByText('Buying Designer Insurance')).toBeInTheDocument()
    expect(screen.getByLabelText('Email:')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should navigate successful through the designer insurance buy flow until summary', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Buyflow productId={ProductIds.designerIns} />
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
    // first and last name step
    fireEvent.change(screen.getByRole('textbox', { name: 'First name:' }), {
      target: {
        value: FIRST_NAME,
      },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Last name:' }), {
      target: {
        value: LAST_NAME,
      },
    })
    fireEvent.submit(screen.getByRole('button'))
    // verify summary
    expect(screen.getByRole('link')).toHaveTextContent('Purchase')
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      DESIGNER_INS_CALLBACK_ROUTE
    )
    expect(screen.getByText(`First name: ${FIRST_NAME}`)).toBeInTheDocument()
    expect(screen.getByText(`Last name: ${LAST_NAME}`)).toBeInTheDocument()
    expect(screen.getByText(`Email: ${VALID_EMAIL}`)).toBeInTheDocument()
    expect(screen.getByText(`Age: ${VALID_AGE}`)).toBeInTheDocument()
  })
})
