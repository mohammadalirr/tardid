import React from 'react'
import { ActivityAreas, Hero, SubCompanies, Products, Statistics } from '~/components/Client/Home'

export function HomePage() {

  return (
    <div>
      <Hero />
      <ActivityAreas />
      <SubCompanies />
      <Products />
      <Statistics />
    </div>
  )
}

export default HomePage
