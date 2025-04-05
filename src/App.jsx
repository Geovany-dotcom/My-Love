"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./App.css"
import miAmorImg from "./assets/mi-amor.jpeg"


export default function Home() {
  const [step, setStep] = useState(0)
  const [showHeart, setShowHeart] = useState(false)
  const [finalMessage, setFinalMessage] = useState(false)
  const [heartComplete, setHeartComplete] = useState(false)
  const [heartPathLength, setHeartPathLength] = useState(0)

  const motivationalPhrases = [
    "La noche ha caído, pero tu luz interior nunca se apaga",
    "Como la luna, tú también brillas en la oscuridad",
    "Las estrellas en el cielo me recuerdan lo especial que eres",
    "La noche es hermosa, pero no tanto como tu sonrisa",
    "Incluso en la noche más oscura, siempre hay estrellas que guían",
    "La luna es testigo de lo mucho que creo en ti",
  ]

  const heartWords = [
    "amor",
    "fuerza",
    "valentía",
    "belleza",
    "pasión",
    "alegría",
    "esperanza",
    "luz",
    "sueños",
    "futuro",
    "juntos",
    "siempre",
    "corazón",
    "sonrisa",
    "mirada",
    "ternura",
    "cariño",
    "vida",
    "felicidad",
    "destino",
    "eternidad",
    "magia",
    "encanto",
    "dulzura",
    "adoración",
    "anhelo",
    "devoción",
    "ilusión",
    "romance",
    "suspiro",
  ]

  useEffect(() => {
    if (step < motivationalPhrases.length) {
      const timer = setTimeout(() => {
        setStep(step + 1)
      }, 3000)
      return () => clearTimeout(timer)
    } else if (step === motivationalPhrases.length) {
      const timer = setTimeout(() => {
        setShowHeart(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [step])

  useEffect(() => {
    if (showHeart) {
      const timer = setTimeout(
        () => {
          setHeartComplete(true)
        },
        heartWords.length * 100 + 1000,
      )
      return () => clearTimeout(timer)
    }
  }, [showHeart])

  useEffect(() => {
    if (heartComplete) {
      const timer = setTimeout(() => {
        setFinalMessage(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [heartComplete])

  function getHeartPosition(index, total) {
    // Heart shape parametric equations
    const t = (index / total) * 2 * Math.PI
    const scale = 150 // Tamaño del corazón

    // Fórmula de la forma del corazón
    const x = scale * 16 * Math.pow(Math.sin(t), 3)
    const y = scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))

    // Invertimos y para que coincida con el sistema de coordenadas de la pantalla
    return { x, y: -y }
  }

  return (
    <div className="motivational-container">
      {/* Estrellas brillantes en el fondo */}
      <div className="stars">
        {[...Array(70)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${1 + Math.random() * 3}s`,
              transform: `rotate(${Math.random() * 360}deg) scale(${0.7 + Math.random() * 1.3})`,
            }}
          ></div>
        ))}
      </div>

      {/* Estrellas fugaces */}
      <div className="shooting-stars">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="shooting-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Partículas flotantes (decoración) */}
      <div className="floating-particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Mensajes motivacionales (aparecen uno tras otro) */}
      <AnimatePresence mode="wait">
        {step < motivationalPhrases.length && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="motivational-text"
          >
            <h1>{motivationalPhrases[step]}</h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sección del corazón (con las palabras y la imagen) */}
      {showHeart && (
        <div className="heart-section">
          {/* Corazón animado que se dibuja gradualmente */}
          <motion.div className="heart-drawing-container">
            <svg width="600" height="600" viewBox="-300 -300 600 600" className="heart-svg">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff3366" />
                  <stop offset="50%" stopColor="#ff0a54" />
                  <stop offset="100%" stopColor="#ff3366" />
                </linearGradient>
              </defs>
              <motion.path
                d="M0 -100 C-25 -150 -75 -160 -120 -120 C-170 -80 -170 0 0 100 C170 0 170 -80 120 -120 C75 -160 25 -150 0 -100 Z"
                fill="none"
                stroke="url(#heartGradient)"
                strokeWidth="6"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{
                  pathLength: 1,
                  opacity: 1,
                  fill: ["rgba(255, 51, 102, 0)", "rgba(255, 51, 102, 0.5)"],
                }}
                transition={{
                  pathLength: { duration: 4, ease: "easeInOut" },
                  opacity: { duration: 1 },
                  fill: { delay: 3, duration: 3 },
                }}
              />
            </svg>
          </motion.div>

          {/* Corazón grande que aparece al final */}
          {heartComplete && (
            <motion.div
              className="big-heart"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            ></motion.div>
          )}

          <div className="heart-container">
            {heartWords.map((word, index) => (
              <motion.div
                key={index}
                className="heart-word"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: getHeartPosition(index, heartWords.length).x,
                  y: getHeartPosition(index, heartWords.length).y,
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 1.5,
                  ease: "easeOut",
                }}
              >
                {word}
              </motion.div>
            ))}

            {/* Contenedor de la imagen en el centro del corazón */}
            <motion.div
              className="image-container"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: heartWords.length * 0.1 + 0.5, duration: 1 }}
            >
              <div className="glow-effect"></div>
              <div className="sparkles">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="sparkle"
                    style={{
                      transform: `rotate(${i * 30}deg)`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  ></div>
                ))}
              </div>
              <img src={miAmorImg || "/placeholder.svg"} alt="Mi amor" className="girlfriend-image" />
            </motion.div>
          </div>

          {/* Mensaje final con corazones flotantes */}
          {finalMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="final-message"
            >
              <h2>Te amo con todo mi corazón</h2>
              <motion.div
                className="floating-hearts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="floating-heart"
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0.5 + Math.random() * 0.5,
                    }}
                    animate={{
                      y: -100 - Math.random() * 200,
                      x: -50 + Math.random() * 100,
                      opacity: [1, 0.8, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 4,
                      delay: Math.random() * 2,
                      ease: "easeOut",
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: Math.random() * 2,
                    }}
                  >
                    ❤️
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
