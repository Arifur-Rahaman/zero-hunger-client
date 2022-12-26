import React from 'react'
import Foods from '../components/Foods'
import Map from '../components/Map'
import MainLayout from '../layouts/MainLayout'

function AvailableFoodScreen() {
  return (
    <MainLayout>
        <Map/>
        <Foods/>
    </MainLayout>
  )
}

export default AvailableFoodScreen