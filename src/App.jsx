"use client"
import { useState, useEffect } from "react"
import DayComponent from "./components/DayComponent"
import NightComponent from "./components/NightComponent"

export default function App() {
  const [isDay, setIsDay] = useState(true)

  useEffect(() => {
    const hour = new Date().getHours()
    // Consideramos de 6 a 18 como día
    setIsDay(hour >= 6 && hour < 18)
  }, [])

  return (
    <>
      {isDay ? <DayComponent /> : <NightComponent />}
    </>
  )
}
