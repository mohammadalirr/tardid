import React from 'react'
import { ActivityAreas, Hero, SubCompanies, Products, Statistics } from '~/components/Client/Home'
import ParticlesContainer from "~/components/FireParticle";
import Glass from "~/components/Glass";

export function HomePage() {

  return (
    <div>
      <ParticlesContainer />
      <Glass />
      {/* <Hero />
      <ActivityAreas />
      <SubCompanies />
      <Products />
      <Statistics /> */}
    </div>
  )
}

export default HomePage
