import React from 'react'
import NavigationBar from './NavigationBar'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
      <>
          <NavigationBar />
          <main>
              <Outlet/>
          </main>
      </>
  )
}

export default Layout
