import { fireEvent, render, screen } from '@testing-library/react'
import AgeStep from './age-step'

const onSubmit = jest.fn()

describe('AgeStep', () => {
  beforeEach(() => {
    onSubmit.mockReset()
  })

  it('should render age step', () => {
    render(<AgeStep onSubmit={onSubmit} />)
    expect(screen.getByLabelText('Age:')).toBeInTheDocument()
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should submit', () => {
    render(<AgeStep onSubmit={onSubmit} />)
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: 27 } })
    fireEvent.submit(screen.getByRole('button'))
    expect(onSubmit).toBeCalledWith({
      age: 27,
    })
  })

  it('should not submit when age is lower or equal the 2 yo 👶', () => {
    render(<AgeStep onSubmit={onSubmit} />)
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: 2 } })
    fireEvent.submit(screen.getByRole('button'))
    expect(onSubmit).not.toBeCalled()
  })

  it('should display error message when age is lower or equal the 2 yo 👶', () => {
    render(<AgeStep onSubmit={onSubmit} />)
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: 2 } })
    fireEvent.submit(screen.getByRole('button'))
    expect(
      screen.getByText('Too young for such insurance maybe?')
    ).toBeInTheDocument()
  })
})
