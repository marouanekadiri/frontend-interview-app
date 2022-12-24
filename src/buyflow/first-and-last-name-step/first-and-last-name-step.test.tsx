import { fireEvent, render, screen } from '@testing-library/react'
import FirstAndLastNameStep from './first-and-last-name-step'

const onSubmit = jest.fn()

describe('FirstAndLastNameStep', () => {
  beforeEach(() => {
    onSubmit.mockReset()
  })

  it('should render email step', () => {
    render(<FirstAndLastNameStep onSubmit={onSubmit} />)
    expect(screen.getByLabelText('First name:')).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'First name:' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'Last name:' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should submit', () => {
    render(<FirstAndLastNameStep onSubmit={onSubmit} />)
    fireEvent.change(screen.getByRole('textbox', { name: 'First name:' }), {
      target: { value: 'marouane' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Last name:' }), {
      target: { value: 'kadiri' },
    })
    fireEvent.submit(screen.getByRole('button'))
    expect(onSubmit).toBeCalledWith({
      firstName: 'marouane',
      lastName: 'kadiri',
    })
  })

  it('should not submit when first name is not provided', () => {
    render(<FirstAndLastNameStep onSubmit={onSubmit} />)
    fireEvent.change(screen.getByRole('textbox', { name: 'First name:' }), {
      target: { value: '' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Last name:' }), {
      target: { value: 'kadiri' },
    })
    fireEvent.submit(screen.getByRole('button'))
    expect(onSubmit).not.toBeCalled()
  })

  it('should not submit when last name is not provided', () => {
    render(<FirstAndLastNameStep onSubmit={onSubmit} />)
    fireEvent.change(screen.getByRole('textbox', { name: 'First name:' }), {
      target: { value: 'marouane' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Last name:' }), {
      target: { value: '' },
    })
    fireEvent.submit(screen.getByRole('button'))
    expect(onSubmit).not.toBeCalled()
  })

  it('should display error message when first and last name are not provided', () => {
    render(<FirstAndLastNameStep onSubmit={onSubmit} />)
    fireEvent.change(screen.getByRole('textbox', { name: 'First name:' }), {
      target: { value: '' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Last name:' }), {
      target: { value: '' },
    })
    fireEvent.submit(screen.getByRole('button'))
    expect(screen.getByText('Please enter your first name')).toBeInTheDocument()
    expect(screen.getByText('Please enter your last name')).toBeInTheDocument()
  })
})
