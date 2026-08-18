import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'

const FEATURE_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4'

const ICON_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85'
const ICON_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85'
const ICON_3 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85'

interface FeatureCard {
  type: 'video' | 'content'
  title?: string
  number?: string
  icon?: string
  items?: string[]
}

const cards: FeatureCard[] = [
  { type: 'video' },
  {
    type: 'content',
    number: '01',
    title: 'Project Storyboard.',
    icon: ICON_1,
    items: [
      'Visual narrative planning',
      'Scene-by-scene breakdown',
      'Collaborative mood boarding',
      'Export to production',
    ],
  },
  {
    type: 'content',
    number: '02',
    title: 'Smart Critiques.',
    icon: ICON_2,
    items: ['AI-powered visual analysis', 'Contextual creative notes', 'Tool integrations'],
  },
  {
    type: 'content',
    number: '03',
    title: 'Immersion Capsule.',
    icon: ICON_3,
    items: [
      'Notification silencing',
      'Ambient soundscapes',
      'Schedule sync and blocking',
    ],
  },
]

const cardEase = [0.22, 1, 0.36, 1] as const

function ContentCard({
  card,
  delay,
}: {
  card: FeatureCard
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className="bg-[#212121] rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full min-h-[280px] lg:min-h-0"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.6, delay, ease: cardEase }}
    >
      <div className="flex flex-col gap-4">
        {/* Icon */}
        {card.icon && (
          <img
            src={card.icon}
            alt=""
            aria-hidden="true"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
          />
        )}

        {/* Number + Title */}
        <div>
          <span className="text-gray-500 text-[10px] sm:text-xs block mb-1">
            {card.number}
          </span>
          <h3 className="text-primary text-base sm:text-lg font-medium leading-tight">
            {card.title}
          </h3>
        </div>

        {/* Checklist */}
        <ul className="flex flex-col gap-2">
          {card.items?.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check
                size={14}
                className="text-primary mt-0.5 flex-shrink-0"
                strokeWidth={2.5}
              />
              <span className="text-gray-400 text-xs sm:text-sm leading-tight">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Learn more */}
      <a
        href="#"
        className="group inline-flex items-center gap-1.5 mt-6 text-primary text-xs sm:text-sm hover:opacity-70 transition-opacity duration-200 w-fit"
        aria-label={`Learn more about ${card.title}`}
      >
        <span>Learn more</span>
        <ArrowRight
          size={14}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
          style={{ transform: 'rotate(-45deg)' }}
        />
      </a>
    </motion.div>
  )
}

function VideoCard({ delay }: { delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden h-full min-h-[280px] lg:min-h-0"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.6, delay, ease: cardEase }}
    >
      <video
        src={FEATURE_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
      <p
        className="absolute bottom-5 left-5 text-sm sm:text-base font-medium"
        style={{ color: '#E1E0CC' }}
      >
        Your creative canvas.
      </p>
    </motion.div>
  )
}

const headingSegments = [
  {
    text: 'Studio-grade workflows for visionary creators.',
    className: 'text-primary',
  },
]

const subheadingSegments = [
  {
    text: 'Built for pure vision. Powered by art.',
    className: 'text-gray-500',
  },
]

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative min-h-screen bg-black py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden"
      aria-label="Features"
    >
      {/* Noise background */}
      <div className="bg-noise opacity-[0.15]" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16 max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight mb-2">
            <WordsPullUpMultiStyle segments={headingSegments} />
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal">
            <WordsPullUpMultiStyle segments={subheadingSegments} delayOffset={0.3} />
          </p>
        </div>

        {/* 4-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          {cards.map((card, i) =>
            card.type === 'video' ? (
              <VideoCard key={i} delay={i * 0.15} />
            ) : (
              <ContentCard key={i} card={card} delay={i * 0.15} />
            )
          )}
        </div>
      </div>
    </section>
  )
}
