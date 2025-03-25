import { industries } from '@/data/industries'
import React from 'react'
import OnboardingForm from './_components/onboarding-form'

const OnboardingPage = () => {
      // yedi koi manxe onboarding page ma xw vane teslai dashboard page ma pathaune
  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  )
}

export default OnboardingPage