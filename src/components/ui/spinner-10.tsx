"use client"

import { memo, useEffect, useId, useMemo, useState } from "react"
import { AnimatePresence, motion, type HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

type TextMorphProps = {
  words: string[]
  interval?: number
  className?: string
}

export function TextMorph({ words, interval = 2000, className }: TextMorphProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!words.length) return
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % words.length), interval)
    return () => window.clearInterval(timer)
  }, [words, interval])

  const chars = useMemo(() => Array.from(words[index] ?? ""), [index, words])
  if (!words.length) return null

  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={index}
        className={cn("liquid-wave-text", className)}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.4 }}
      >
        {chars.map((char, characterIndex) => (
          <motion.span
            key={`${characterIndex}-${char}`}
            initial={{ opacity: 0, y: 5, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -5, filter: "blur(5px)" }}
            transition={{ delay: characterIndex * 0.03, duration: 0.3 }}
          >
            {char === " " ? "\u00a0" : char}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  )
}

interface LiquidWaveSpinnerProps extends HTMLMotionProps<"div"> {
  size?: "sm" | "md" | "lg"
  hideText?: boolean
  words?: string[]
}

const sizeConfig = {
  sm: { dimension: 80, fontSize: "liquid-wave-label-sm" },
  md: { dimension: 120, fontSize: "liquid-wave-label-md" },
  lg: { dimension: 180, fontSize: "liquid-wave-label-lg" },
} as const

const defaultWords = ["The Billion Group", "Building ambitious ideas", "Preparing your experience"]

const WAVE_PATH =
  "M 0 36.5 C 67.43 36.5, 99.09 15.5, 160.53 15.5 C 221.98 15.5, 250.54 36.5, 300 36.5 " +
  "C 348.56 36.5, 397.30 7, 457.63 7 C 517.96 7, 539.66 36.5, 600 36.5 " +
  "C 667.43 36.5, 699.09 15.5, 760.53 15.5 C 821.98 15.5, 850.54 36.5, 900 36.5 " +
  "C 948.56 36.5, 997.30 7, 1057.63 7 C 1117.96 7, 1139.66 36.5, 1200 36.5 L 1200 800 L 0 800 Z"

const LiquidWaveSpinner = memo(function LiquidWaveSpinner({
  size = "md",
  hideText = false,
  words = defaultWords,
  className,
  ...props
}: LiquidWaveSpinnerProps) {
  const config = sizeConfig[size]
  const clipId = useId().replace(/:/g, "")

  return (
    <motion.div className={cn("liquid-wave-spinner", className)} {...props}>
      {!hideText && <TextMorph words={words} interval={2000} className={config.fontSize} />}
      <svg viewBox="0 0 500 500" width={config.dimension} height={config.dimension} aria-hidden="true">
        <defs>
          <clipPath id={clipId}>
            <circle cx="249.5" cy="249.5" r="107.5" />
          </clipPath>
        </defs>
        <circle cx="249.5" cy="249.5" r="107.5" className="liquid-wave-circle" />
        <g clipPath={`url(#${clipId})`}>
          <motion.g initial={{ y: 330.6 }} animate={{ y: 170.1 }} transition={{ duration: 5.9, ease: "easeOut" }}>
            <motion.g initial={{ x: -600 }} animate={{ x: 0 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <path d={WAVE_PATH} className="liquid-wave-fill liquid-wave-fill-back" />
            </motion.g>
          </motion.g>
          <motion.g initial={{ y: 330.6 }} animate={{ y: 180.1 }} transition={{ duration: 5.9, ease: "easeOut" }}>
            <motion.g initial={{ x: 0 }} animate={{ x: -600 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              <path d={WAVE_PATH} className="liquid-wave-fill" />
            </motion.g>
          </motion.g>
        </g>
      </svg>
    </motion.div>
  )
})

export default LiquidWaveSpinner
