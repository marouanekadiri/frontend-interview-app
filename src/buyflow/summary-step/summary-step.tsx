import React from 'react'
import { Link } from 'react-router-dom'

interface SummaryStepProps {
  collectedData: {
    email?: string
    age?: number
    firstName?: string
    lastName?: string
  }
  callbackRoute: string
}

const SummaryStep: React.FC<SummaryStepProps> = ({
  collectedData,
  callbackRoute,
}) => {
  return (
    <>
      {collectedData.email && <div>Email: {collectedData.email}</div>}
      {collectedData.age && <div>Age: {collectedData.age}</div>}
      {collectedData.firstName && (
        <div>First name: {collectedData.firstName}</div>
      )}
      {collectedData.lastName && <div>Last name: {collectedData.lastName}</div>}
      <div>
        <Link to={callbackRoute}>Purchase</Link>
      </div>
    </>
  )
}

export default SummaryStep
