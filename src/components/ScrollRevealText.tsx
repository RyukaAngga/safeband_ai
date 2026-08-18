import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface AnimatedLetterProps {
  char: string
  scrollYProgress: MotionValue<number>
  index: number
  totalChars: number
}

function AnimatedLetter({ char, scrollYProgress, index, totalChars }: AnimatedLetterProps) {
  const charProgress = index / totalChars
  const opacity = useTransform(
    scrollYProgress,
    [charProgress - 0.1, charProgress + 0.05],
    [0.15, 1]
  )

  if (char === ' ') {
    return <span>&nbsp;</span>
  }

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char}
    </motion.span>
  )
}

interface ScrollRevealTextProps {
  text: string
  className?: string
}

export default function ScrollRevealText({ text, className = '' }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = text.split('')
  const totalChars = chars.length

  return (
    <p ref={ref} className={className}>
      {chars.map((char, i) => (
        <AnimatedLetter
          key={i}
          char={char}
          scrollYProgress={scrollYProgress}
          index={i}
          totalChars={totalChars}
        />
      ))}
    </p>
  )
}
