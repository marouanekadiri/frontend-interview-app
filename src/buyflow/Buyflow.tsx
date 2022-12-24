import React, { useState } from 'react'
import AgeStep from './age-step'
import EmailStep from './email-step'
import { ProductIds } from './product-ids'
import SummaryStep from './summary-step'

interface BuyflowProps {
  productId: ProductIds
}

const PRODUCT_IDS_TO_NAMES = {
  [ProductIds.devIns]: 'Developer Insurance',
}

const Buyflow: React.FC<BuyflowProps> = (props) => {
  const [currentStep, setStep] = useState('email')
  const [collectedData, updateData] = useState({
    email: '',
    age: 0,
  })
  const getStepCallback =
    (nextStep: string) => (newData: Record<string, string | number>) => {
      updateData({ ...collectedData, ...newData })
      setStep(nextStep)
    }
  return (
    <>
      <h4>Buying {PRODUCT_IDS_TO_NAMES[props.productId]}</h4>
      {(currentStep === 'email' && (
        <EmailStep onSubmit={getStepCallback('age')} />
      )) ||
        (currentStep === 'age' && (
          <AgeStep onSubmit={getStepCallback('summary')} />
        )) ||
        (currentStep === 'summary' && (
          <SummaryStep collectedData={collectedData} />
        ))}
    </>
  )
}

export default Buyflow
