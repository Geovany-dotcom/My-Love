"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "./daycomponent.module.css"
// IMPORTA TU IMAGEN DESDE LA CARPETA ASSETS
import miAmorImg from "../assets/mi-amor.jpeg"

function App() {
  const [step, setStep] = useState(0)
  const [showHeart, setShowHeart] = useState(false)
  const [finalMessage, setFinalMessage] = useState(false)
  const [heartComplete, setHeartComplete] = useState(false)

  const motivationalPhrases = [
    "Cada día es una nueva oportunidad para brillar",
    "Tu sonrisa ilumina el mundo entero",
    "Eres más fuerte de lo que imaginas",
    "Tu valentía me inspira constantemente",
    "Creo en ti, incluso cuando tú no lo haces",
    "Juntos podemos superar cualquier obstáculo",
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
    // Ecuaciones paramétricas para la forma del corazón
    const t = (index / total) * 2 * Math.PI
    const scale = 150 // Tamaño del corazón

    // Fórmula para la forma del corazón
    const x = scale * 16 * Math.pow(Math.sin(t), 3)
    const y = scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))

    // Invertir y para que coincida con el sistema de coordenadas de la pantalla
    return { x, y: -y }
  }

  return (
    <div className={styles["motivational-container"]}>
      {/* Estrellas brillantes en el fondo */}
      <div className={styles.stars}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${1 + Math.random() * 3}s`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }}
          ></div>
        ))}
      </div>

      {/* Partículas flotantes (decoración) */}
      <div className={styles["floating-particles"]}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={styles.particle}
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
            className={styles["motivational-text"]}
          >
            <h1>{motivationalPhrases[step]}</h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sección del corazón (con las palabras y la imagen) */}
      {showHeart && (
        <div className={styles["heart-section"]}>
          {/* Corazón grande que aparece al final */}
          {heartComplete && (
            <motion.div
              className={styles["big-heart"]}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            ></motion.div>
          )}

          <div className={styles["heart-container"]}>
            {heartWords.map((word, index) => (
              <motion.div
                key={index}
                className={styles["heart-word"]}
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
              className={styles["image-container"]}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: heartWords.length * 0.1 + 0.5, duration: 1 }}
            >
              <div className={styles["glow-effect"]}></div>
              <div className={styles.sparkles}>
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={styles.sparkle}
                    style={{
                      transform: `rotate(${i * 45}deg)`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  ></div>
                ))}
              </div>
              {/* AQUÍ USAMOS LA IMAGEN IMPORTADA */}
              <img src={miAmorImg || "/placeholder.svg"} alt="Mi amor" className={styles["girlfriend-image"]} />
            </motion.div>
          </div>

          {/* Mensaje final con corazones flotantes */}
          {finalMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className={styles["final-message"]}
            >
              <h2>Te amo con todo mi corazón</h2>
              <motion.div
                className={styles["floating-hearts"]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={styles["floating-heart"]}
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

export default App
