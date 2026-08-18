import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'
import ScrollRevealText from './ScrollRevealText'
import { Cpu, Bluetooth, Smartphone, Cloud, Headphones } from 'lucide-react'

const headingSegments = [
  { text: 'No screen.', className: 'font-normal' },
  { text: 'No distraction.', className: 'font-serif italic' },
  { text: 'Just intelligence.', className: 'font-normal' },
]

const bodyText =
  'SafeBand AI adalah gelang pintar berbasis Artificial Intelligence dan Internet of Things yang menghadirkan pengalaman interaksi tanpa layar melalui sentuhan, getaran, dan suara. Dengan memanfaatkan smartphone sebagai pusat komputasi AI, SafeBand AI mampu menjalankan asisten virtual, pencatatan suara, pengingat pintar, serta fitur keselamatan seperti Emergency SOS dan Fall Detection secara hemat daya, ringan, dan responsif.'

const stats = [
  { value: '1 Touch', label: 'Capsensor Interrupt' },
  { value: 'BLE 5.0', label: 'Ultra-low power' },
  { value: '24h+', label: 'Battery Optimization' },
]

const architectureSteps = [
  { icon: Cpu, title: 'SafeBand Hardware', desc: 'Capacitive Touch / IMU Sensor + ESP32-C3 Controller' },
  { icon: Bluetooth, title: 'BLE 5.0 Wireless', desc: 'Sinyal Interrupt berdaya rendah diteruskan ke Ponsel' },
  { icon: Smartphone, title: 'Companion App', desc: 'Speech-to-Text & Local Device APIs processing' },
  { icon: Cloud, title: 'Cloud AI / LLM', desc: 'Context Reasoning & Intelligent Decision Engine' },
  { icon: Headphones, title: 'Output Response', desc: 'TTS ke Earphone + Haptic Motor Feedback' },
]

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8"
      aria-label="About & How It Works"
    >
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Main Product Intro Card */}
        <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl md:rounded-3xl px-6 sm:px-10 md:px-16 py-10 sm:py-16 md:py-20 text-center shadow-2xl">
          <p className="text-primary text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-5 sm:mb-8">
            Smart Wearable Innovation
          </p>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] mb-8 sm:mb-12"
            style={{ color: '#E1E0CC' }}
          >
            <WordsPullUpMultiStyle segments={headingSegments} containerClassName="gap-y-1" />
          </h2>

          <div className="w-12 h-[1px] bg-primary/20 mx-auto mb-8 sm:mb-12" />

          <ScrollRevealText
            text={bodyText}
            className="text-[#DEDBC8]/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          />

          <div className="mt-10 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-primary text-xl sm:text-2xl md:text-3xl font-bold">
                  {stat.value}
                </p>
                <p className="text-gray-500 text-[10px] sm:text-xs mt-1 leading-tight font-mono">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works & Technical Architecture Flow Section */}
        <div id="how-it-works" className="bg-[#080808] border border-[#181818] rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase font-mono">
              SYSTEM ARCHITECTURE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-primary mt-2">
              Bagaimana SafeBand AI Bekerja?
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">
              Pemrosesan AI terpusat di smartphone — gelang hanya bertindak sebagai sensor cerdas yang super hemat daya.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {architectureSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={index}
                  className="bg-[#111] border border-[#222] p-5 rounded-2xl flex flex-col justify-between hover:border-primary/50 transition-colors"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                      <Icon size={20} />
                    </div>
                    <span className="text-[9px] font-mono text-gray-500 block mb-1">
                      STEP 0{index + 1}
                    </span>
                    <h4 className="text-sm font-bold text-primary mb-2">{step.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
