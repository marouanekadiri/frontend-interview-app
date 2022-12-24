import React, { useState } from 'react'
import { DESIGNER_INS_CALLBACK_ROUTE, DEVINS_CALLBACK_ROUTE } from '../routes'
import AgeStep from './age-step'
import EmailStep from './email-step'
import FirstAndLastNameStep from './first-and-last-name-step'
import { ProductIds } from './product-ids'
import SummaryStep from './summary-step'

const PRODUCT_IDS_TO_NAMES = {
  [ProductIds.devIns]: 'Developer Insurance',
  [ProductIds.designerIns]: 'Designer Insurance',
}

const PRODUCT_IDS_TO_STEPS = {
  [ProductIds.devIns]: [EmailStep, AgeStep],
  [ProductIds.designerIns]: [EmailStep, AgeStep, FirstAndLastNameStep],
}

const PRODUCT_IDS_TO_CALLBACK_ROUTE = {
  [ProductIds.devIns]: DEVINS_CALLBACK_ROUTE,
  [ProductIds.designerIns]: DESIGNER_INS_CALLBACK_ROUTE,
}

interface BuyflowProps {
  productId: ProductIds
}

const Buyflow: React.FC<BuyflowProps> = ({ productId }) => {
  const [currentStep, setStep] = useState(0)
  const [collectedData, updateData] = useState({
    email: '',
    age: 0,
    firstName: '',
    lastName: '',
  })
  const getStepCallback =
    (nextStep: number) => (newData: Record<string, string | number>) => {
      updateData({ ...collectedData, ...newData })
      setStep(nextStep)
    }
  const productSteps = PRODUCT_IDS_TO_STEPS[productId]
  const CurrentStepComponent = productSteps[currentStep]
  const shouldDisplaySummary = currentStep === productSteps.length

  return (
    <>
      <h4>Buying {PRODUCT_IDS_TO_NAMES[productId]}</h4>
      {shouldDisplaySummary ? (
        <SummaryStep collectedData={collectedData} />
      ) : (
        <CurrentStepComponent onSubmit={getStepCallback(currentStep + 1)} />
      )}
    </>
  )
}

export default Buyflow
