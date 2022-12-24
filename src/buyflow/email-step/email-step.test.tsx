import { fireEvent, render, screen } from '@testing-library/react'
import EmailStep from './email-step'

const onSubmit = jest.fn()

describe('EmailStep', () => {
  beforeEach(() => {
    onSubmit.mockReset()
  })

  it('should render email step', () => {
    render(<EmailStep onSubmit={onSubmit} />)
    expect(screen.getByLabelText('Email:')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should submit', () => {
    render(<EmailStep onSubmit={onSubmit} />)
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'marouanekadiri@gmail.com' },
    })
    fireEvent.submit(screen.getByRole('button'))
    expect(onSubmit).toBeCalledWith({
      email: 'marouanekadiri@gmail.com',
    })
  })

  it('should not submit when email is invalid', () => {
    render(<EmailStep onSubmit={onSubmit} />)
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'invalid_email' },
    })
    fireEvent.submit(screen.getByRole('button'))
    expect(onSubmit).not.toBeCalled()
  })

  it('should display error message when email is invalid', () => {
    render(<EmailStep onSubmit={onSubmit} />)
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'invalid_email' },
    })
    fireEvent.submit(screen.getByRole('button'))
    expect(
      screen.getByText('Please enter a valid email address')
    ).toBeInTheDocument()
  })
})
