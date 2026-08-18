import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Segment {
  text: string
  className?: string
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[]
  containerClassName?: string
  delayOffset?: number
}

export default function WordsPullUpMultiStyle({
  segments,
  containerClassName = '',
  delayOffset = 0,
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  // Flatten segments into per-word entries preserving className
  const words: { word: string; className: string; isLastOfSegment: boolean }[] = []
  segments.forEach((seg, segIdx) => {
    const segWords = seg.text.trim().split(/\s+/)
    segWords.forEach((w, wIdx) => {
      words.push({
        word: w,
        className: seg.className ?? '',
        isLastOfSegment: wIdx === segWords.length - 1 && segIdx < segments.length - 1,
      })
    })
  })

  return (
    <span
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${containerClassName}`}
    >
      {words.map((entry, i) => (
        <span
          key={i}
          className="overflow-hidden inline-block"
          style={{ marginRight: '0.3em', marginBottom: '0.05em' }}
        >
          <motion.span
            className={`inline-block ${entry.className}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.7,
              delay: delayOffset + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {entry.word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
