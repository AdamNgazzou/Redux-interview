import type { NextPage } from "next"
import React from "react"
import { Counter } from "~/components"

const Home: NextPage = () => {
  return (
    <>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Counter />
        </div>
    </>
  )
}

export default Home
