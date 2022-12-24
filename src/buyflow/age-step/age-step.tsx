import React, { useState } from 'react'

interface AgeStepProps {
  onSubmit: ({ age }: { age: number }) => void
}

const isAgeValid = (age: number) => age > 2

const AgeStep: React.FC<AgeStepProps> = ({ onSubmit }) => {
  const [isErrorsVisible, setIsErrorsVisible] = useState<boolean>(false)
  const [age, setAge] = useState<number>(0)

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        setIsErrorsVisible(true)
        isAgeValid(age) && onSubmit({ age })
      }}
    >
      <div>
        <label htmlFor="age">Age: </label>
        <input
          id="age"
          type="number"
          onChange={({ target: { value } }) => {
            setAge(Number(value))
          }}
          value={age}
        />
        {isErrorsVisible && !isAgeValid(age) && (
          <div className="error">Too young for such insurance maybe?</div>
        )}
      </div>
      <button type="submit">Next</button>
    </form>
  )
}

export default AgeStep
