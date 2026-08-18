import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface WordsPullUpProps {
  text: string
  className?: string
  showAsterisk?: boolean
  delayOffset?: number
}

export default function WordsPullUp({
  text,
  className = '',
  showAsterisk = false,
  delayOffset = 0,
}: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  const words = text.split(' ')

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        return (
          <span
            key={i}
            className="overflow-hidden inline-block"
            style={{ marginRight: isLast ? 0 : '0.25em' }}
          >
            <motion.span
              className="inline-block relative"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: delayOffset + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {isLast && showAsterisk ? (
                <>
                  {word.slice(0, -1)}
                  <span className="relative">
                    {word.slice(-1)}
                    <sup
                      className="absolute"
                      style={{
                        top: '0.65em',
                        right: '-0.3em',
                        fontSize: '0.31em',
                        lineHeight: 1,
                      }}
                    >
                      *
                    </sup>
                  </span>
                </>
              ) : (
                word
              )}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
