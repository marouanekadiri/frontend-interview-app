import React, { useState } from 'react'

interface EmailStepProps {
  onSubmit: ({ email }: { email: string }) => void
}

const isEmailValid = (email: string) =>
  // eslint-disable-next-line no-useless-escape
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

const EmailStep: React.FC<EmailStepProps> = ({ onSubmit }) => {
  const [isErrorsVisible, setIsErrorsVisible] = useState<boolean>(false)
  const [email, setEmail] = useState('')

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        setIsErrorsVisible(true)
        isEmailValid(email) && onSubmit({ email })
      }}
      noValidate
    >
      <div>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          onChange={({ target: { value } }) => {
            setEmail(value)
          }}
          value={email}
        />
        {isErrorsVisible && !isEmailValid(email) && (
          <div className="error">Please enter a valid email address</div>
        )}
      </div>
      <button type="submit">Next</button>
    </form>
  )
}

export default EmailStep
