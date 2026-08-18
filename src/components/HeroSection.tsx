import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Navbar from './Navbar'
import WordsPullUp from './WordsPullUp'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4'

const ease = [0.16, 1, 0.3, 1] as const

export default function HeroSection() {
  return (
    <section
      className="h-screen w-full p-3 sm:p-4 md:p-6 bg-black"
      aria-label="Hero"
    >
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background Video */}
        <video
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />

        {/* Noise + Cinematic Gradient overlays */}
        <div className="noise-overlay opacity-[0.55] mix-blend-overlay pointer-events-none z-10" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 z-10 pointer-events-none" aria-hidden="true" />

        {/* Navbar */}
        <Navbar />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 sm:px-10 md:px-14 pb-8 sm:pb-12 md:pb-14">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10">
            {/* Title & Tagline */}
            <div className="flex flex-col gap-2">
              <motion.p
                className="text-primary/70 text-xs sm:text-sm tracking-[0.3em] uppercase font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease }}
              >
                AI & IoT Smart Wearable
              </motion.p>

              <h1
                className="font-bold leading-[0.9] tracking-[-0.05em] select-none"
                style={{
                  fontSize: 'clamp(42px, 8.5vw, 110px)',
                  color: '#E1E0CC',
                }}
              >
                <WordsPullUp text="SafeBand" showAsterisk={false} delayOffset={0} />
              </h1>
            </div>

            {/* Description & CTA */}
            <div className="flex flex-col gap-4 max-w-md">
              <motion.p
                className="text-primary/80 text-sm sm:text-base leading-relaxed"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease }}
              >
                Gelang pintar pintar berbasis AI yang bekerja secara instan tanpa layar — melalui sentuhan intuitif, getaran haptik, dan respons suara cerdas.
              </motion.p>

              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease }}
              >
                <a
                  href="#demo"
                  id="hero-cta"
                  className="group inline-flex items-center gap-3 hover:gap-4 transition-all duration-300 bg-primary/95 hover:bg-primary rounded-full pl-6 pr-1.5 py-1.5 w-fit shadow-xl"
                >
                  <span className="font-semibold text-sm sm:text-base text-black">
                    Coba Virtual Demo
                  </span>
                  <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                    <ArrowRight size={16} color="#E1E0CC" />
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
