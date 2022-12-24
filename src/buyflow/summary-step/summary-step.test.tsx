import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import SummaryStep from './summary-step'

const FIRST_NAME = 'marouane'
const LAST_NAME = 'kadiri'
const EMAIL = 'marouanekadiri@gmail.com'
const AGE = 27

describe('SummaryStep', () => {
  it('should render Summary step', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <SummaryStep
          collectedData={{
            email: EMAIL,
            age: AGE,
            firstName: FIRST_NAME,
            lastName: LAST_NAME,
          }}
          callbackRoute="/"
        />
      </Router>
    )
    expect(screen.getByText(`First name: ${FIRST_NAME}`)).toBeInTheDocument()
    expect(screen.getByText(`Last name: ${LAST_NAME}`)).toBeInTheDocument()
    expect(screen.getByText(`Email: ${EMAIL}`)).toBeInTheDocument()
    expect(screen.getByText(`Age: ${AGE}`)).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveTextContent('Purchase')
  })
})
