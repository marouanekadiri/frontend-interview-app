import React, { useState } from 'react'

interface FirstAndLastNameStepProps {
  onSubmit: ({
    firstName,
    lastName,
  }: {
    firstName: string
    lastName: string
  }) => void
}

const isValidName = (name: string) => !!name

const FirstAndLastNameStep: React.FC<FirstAndLastNameStepProps> = ({
  onSubmit,
}) => {
  const [isErrorsVisible, setIsErrorsVisible] = useState<boolean>(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        setIsErrorsVisible(true)
        isValidName(firstName) &&
          isValidName(lastName) &&
          onSubmit({ firstName, lastName })
      }}
      noValidate
    >
      <div>
        <label htmlFor="firstName">First name: </label>
        <input
          id="firstName"
          type="text"
          onChange={({ target: { value } }) => {
            setFirstName(value)
          }}
          value={firstName}
        />
        {isErrorsVisible && !isValidName(firstName) && (
          <div className="error">Please enter your first name</div>
        )}
      </div>
      <div>
        <label htmlFor="lastName">Last name: </label>
        <input
          id="lastName"
          type="text"
          onChange={({ target: { value } }) => {
            setLastName(value)
          }}
          value={lastName}
        />
        {isErrorsVisible && !isValidName(firstName) && (
          <div className="error">Please enter your last name</div>
        )}
      </div>
      <button type="submit">Next</button>
    </form>
  )
}

export default FirstAndLastNameStep
