import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic, MessageCircle, AlertTriangle, PhoneCall, Bell,
  Filter, FileText, Bluetooth, Battery, Vibrate, Zap,
  Shield, Cpu, Radio, BarChart2, Activity, Check, Phone,
  Volume2, VolumeX, RotateCcw, Power, Touchpad
} from 'lucide-react'

// ─── Web Audio API Sound Synthesizer ──────────────────────────────────────────
class SoundFX {
  private ctx: AudioContext | null = null

  private getCtx() {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) this.ctx = new AudioCtx()
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
    return this.ctx
  }

  // 1. Soft AI chime & activation beep
  playAI() {
    const ctx = this.getCtx()
    if (!ctx) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(520, now)
    osc.frequency.exponentialRampToValueAtTime(1040, now + 0.25)
    gain.gain.setValueAtTime(0.12, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.4)
  }

  // 2. Emergency Siren for SOS
  playSOS() {
    const ctx = this.getCtx()
    if (!ctx) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(650, now)
    osc.frequency.linearRampToValueAtTime(950, now + 0.15)
    osc.frequency.linearRampToValueAtTime(650, now + 0.3)
    gain.gain.setValueAtTime(0.18, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.45)
  }

  // 3. Haptic Motor Vibration Buzz
  playHaptic() {
    const ctx = this.getCtx()
    if (!ctx) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.setValueAtTime(140, now)
    gain.gain.setValueAtTime(0.1, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.12)
  }

  // 4. Fake Call Phone Ring tone
  playRing() {
    const ctx = this.getCtx()
    if (!ctx) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(440, now)
    osc.frequency.setValueAtTime(554.37, now + 0.1)
    gain.gain.setValueAtTime(0.15, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.35)
  }

  // 5. Clean UI Touch Click
  playClick() {
    const ctx = this.getCtx()
    if (!ctx) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, now)
    gain.gain.setValueAtTime(0.06, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.06)
  }
}

const sfx = new SoundFX()

// ─── Feature Specification Types ──────────────────────────────────────────────
export interface DemoFeature {
  id: string
  name: string
  category: 'ai' | 'safety' | 'productivity' | 'device'
  gestureReq: 'single' | 'double' | 'hold' | 'sensor'
  gestureName: string
  icon: React.ElementType
  tagline: string
  description: string
  flow: string[]
  screenType: string
  accentColor: string
}

const FEATURES: DemoFeature[] = [
  // 1. AI Experience
  {
    id: 'single-touch-ai',
    name: 'Single Touch AI',
    category: 'ai',
    gestureReq: 'single',
    gestureName: '1-Click Sentuhan',
    icon: Zap,
    tagline: 'A single touch is all it takes. No screen. No distraction. Just intelligence.',
    description:
      'Pengguna menyentuh gelang satu kali tanpa membuka smartphone. Sensor touch aktif via interrupt sehingga ESP32 tidak melakukan polling terus-menerus — menghemat baterai secara drastis.',
    flow: ['Capacitive Touch', 'ESP32 Interrupt', 'BLE Request', 'Phone Opens Session', 'Microphone Active', 'Speech-to-Text', 'AI LLM Response', 'TTS to Earphone'],
    screenType: 'ai-wave',
    accentColor: '#DEDBC8',
  },
  {
    id: 'double-tap-rec',
    name: 'Double Tap Recording',
    category: 'ai',
    gestureReq: 'double',
    gestureName: '2-Click (Double Tap)',
    icon: Mic,
    tagline: 'Every idea deserves to be remembered.',
    description:
      'Double tap mencatat percakapan atau ide penting secara praktis. ESP32 hanya menjadi remote trigger tanpa menyimpan audio — seluruh perekaman dilakukan langsung oleh smartphone.',
    flow: ['Double Tap', 'Start Recording', 'Audio Buffer on Phone', 'Speech to Text', 'AI Summary', 'Meeting Points & Todo Saved'],
    screenType: 'recording',
    accentColor: '#ef4444',
  },
  {
    id: 'ai-conversation',
    name: 'AI Conversation',
    category: 'ai',
    gestureReq: 'hold',
    gestureName: 'Tekan Tahan 1.5s (Hold)',
    icon: MessageCircle,
    tagline: 'Talk naturally. Listen naturally.',
    description:
      'Bicara secara natural dengan AI. Tekan tahan gelang untuk membuka sesi percakapan dua arah — AI dapat menjawab jadwal, cuaca, reminder, catatan, hingga FAQ secara real-time.',
    flow: ['Voice Input', 'Speech Recognition', 'LLM Context', 'Reasoning Output', 'TTS Audio', 'Earphone Feedback'],
    screenType: 'ai-chat',
    accentColor: '#60a5fa',
  },

  // 2. Safety Experience
  {
    id: 'sos-emergency',
    name: 'SOS Emergency',
    category: 'safety',
    gestureReq: 'hold',
    gestureName: 'Tekan Tahan 1.5s (Hold SOS)',
    icon: AlertTriangle,
    tagline: 'Help should never be more than one touch away.',
    description:
      'Tekan tahan gelang untuk memicu sinyal darurat dengan konfirmasi getaran dan countdown 5 detik. Jika tidak dibatalkan, sistem mengirimkan lokasi GPS, status baterai, dan ID perangkat ke kontak darurat.',
    flow: ['Long Press', 'Vibration Confirmation', 'Countdown 5s', 'No Cancellation', 'Send SOS Signal', 'GPS + Battery Info', 'Emergency Server Notified'],
    screenType: 'sos',
    accentColor: '#ef4444',
  },
  {
    id: 'fall-detection',
    name: 'Fall Detection',
    category: 'safety',
    gestureReq: 'sensor',
    gestureName: 'Simulasi Impact (IMU Sensor)',
    icon: Activity,
    tagline: 'Your safety, even when you cannot react.',
    description:
      'BMI160 membaca Acceleration + Gyroscope. Jika terdeteksi sudden impact dan perubahan orientasi tanpa gerakan lanjutan, sistem akan secara otomatis memulai countdown SOS.',
    flow: ['BMI160 IMU Sensor', 'Sudden Impact Detection', 'Orientation Change', 'No Movement Window', 'Potential Fall Alert', 'Countdown to Auto SOS'],
    screenType: 'fall',
    accentColor: '#fb923c',
  },
  {
    id: 'fake-call',
    name: 'Fake Call',
    category: 'safety',
    gestureReq: 'single',
    gestureName: '1-Click Sentuhan Rahasia',
    icon: PhoneCall,
    tagline: 'Leave uncomfortable situations naturally.',
    description:
      'Satu sentuhan rahasia memicu panggilan masuk palsu yang tampak sangat realistis di smartphone. Ponsel berdering seolah ada telepon penting untuk membantu pengguna keluar dari situasi canggung.',
    flow: ['Tap Gesture', 'BLE Signal', 'Fake Incoming Call Ring', 'Accept Call', 'AI Voice Audio Simulation'],
    screenType: 'fakecall',
    accentColor: '#4ade80',
  },

  // 3. Productivity
  {
    id: 'smart-reminder',
    name: 'Smart Reminder',
    category: 'productivity',
    gestureReq: 'single',
    gestureName: '1-Click / Sync Event',
    icon: Bell,
    tagline: 'Stay focused on your day.',
    description:
      'Pengingat kalender dikirim otomatis via BLE dari smartphone ke gelang. Gelang memberikan getaran khusus dan menampilkan ringkasan pengingat di layar OLED.',
    flow: ['Calendar Event', 'Phone Reminder', 'BLE Dispatch', 'SafeBand Vibration', 'OLED Text Display', 'Done'],
    screenType: 'reminder',
    accentColor: '#DEDBC8',
  },
  {
    id: 'notif-filter',
    name: 'Notification Filter',
    category: 'productivity',
    gestureReq: 'single',
    gestureName: '1-Click / Priority Filter',
    icon: Filter,
    tagline: 'Only high priorities break through.',
    description:
      'AI di smartphone menyaring semua notifikasi yang masuk. Hanya notifikasi berprioritas tinggi yang akan membuat gelang bergetar, sehingga fokus pengguna tidak terganggu spam.',
    flow: ['Incoming Notification', 'Priority AI Evaluator', 'High Priority Check', 'Yes: Band Vibrate', 'No: Silently Ignore'],
    screenType: 'notification',
    accentColor: '#60a5fa',
  },
  {
    id: 'quick-notes',
    name: 'Quick Notes',
    category: 'productivity',
    gestureReq: 'double',
    gestureName: '2-Click (Voice Note)',
    icon: FileText,
    tagline: 'Capture ideas at the speed of thought.',
    description:
      'Double tap untuk langsung merekam ide singkat. Suara dikonversi menjadi teks dan dirangkum secara otomatis oleh AI sebelum disimpan di cloud.',
    flow: ['Double Tap', 'Voice Input', 'Speech to Text', 'AI Summary', 'Cloud Sync', 'Timeline Saved'],
    screenType: 'notes',
    accentColor: '#DEDBC8',
  },

  // 4. Device Experience
  {
    id: 'bluetooth-le',
    name: 'Bluetooth LE 5.0',
    category: 'device',
    gestureReq: 'single',
    gestureName: '1-Click Toggle Connection',
    icon: Bluetooth,
    tagline: 'Fast. Stable. Efficient.',
    description:
      'Seluruh komputasi AI dijalankan di smartphone. Gelang berkomunikasi via BLE ultra-rendah daya, menjaga bobot gelang tetap sangat ringan dan responsif.',
    flow: ['SafeBand Sensors', 'BLE 5.0 Packet', 'Companion App', 'AI Engine', 'Low Latency Response'],
    screenType: 'bluetooth',
    accentColor: '#60a5fa',
  },
  {
    id: 'battery-opt',
    name: 'Battery Optimization',
    category: 'device',
    gestureReq: 'single',
    gestureName: '1-Click Sleep Cycle',
    icon: Battery,
    tagline: 'Intelligence only when needed.',
    description:
      'ESP32 aktif hanya beberapa ratus milidetik saat interaksi terjadi, kemudian langsung kembali ke mode deep sleep. Mengoptimalkan daya hingga seharian penuh.',
    flow: ['Deep Sleep State', 'Touch Interrupt', 'Wake Up (ms)', 'BLE Transmission', 'Return to Sleep'],
    screenType: 'battery',
    accentColor: '#4ade80',
  },
  {
    id: 'haptic-feedback',
    name: 'Haptic Feedback',
    category: 'device',
    gestureReq: 'single',
    gestureName: '1-Click Test Motor',
    icon: Vibrate,
    tagline: 'Distinct vibration patterns for every event.',
    description:
      'Setiap event memiliki ritme getaran yang berbeda (SOS: getaran panjang beruntun, Reminder: 2 getaran pendek, Notifikasi: 1 getaran halus).',
    flow: ['AI Event Trigger', 'BLE Command', 'ESP32 Motor Driver', 'Pattern Haptic Output'],
    screenType: 'haptic',
    accentColor: '#DEDBC8',
  },
]

const CATEGORIES = [
  { id: 'ai', label: '1. AI Experience', icon: Radio },
  { id: 'safety', label: '2. Safety Experience', icon: Shield },
  { id: 'productivity', label: '3. Productivity', icon: BarChart2 },
  { id: 'device', label: '4. Device Experience', icon: Cpu },
] as const

// ─── OLED Screen Animations ───────────────────────────────────────────────────

function OLEDClock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  const h = time.getHours().toString().padStart(2, '0')
  const m = time.getMinutes().toString().padStart(2, '0')
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <p className="text-gray-500 text-[7px] uppercase tracking-widest mb-1">Standby Mode</p>
      <p className="text-[#E1E0CC] text-3xl font-bold tracking-tight leading-none">{h}:{m}</p>
      <p className="text-gray-500 text-[8px] mt-1 tracking-widest uppercase">
        {time.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
      </p>
      <div className="mt-2 inline-flex items-center gap-1 bg-[#181818] border border-[#2a2a2a] px-2 py-0.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-primary text-[7px]">Siap Interaksi</span>
      </div>
    </div>
  )
}

function AIWaveView() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
        <p className="text-primary text-[9px] tracking-widest uppercase font-semibold">AI Listening</p>
      </div>
      <div className="flex items-end gap-[3px] h-10 my-1">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full bg-primary"
            animate={{ height: ['4px', `${10 + Math.abs(Math.sin(i * 0.8)) * 24}px`, '4px'] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.05, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <p className="text-gray-400 text-[8px]">Single Touch Active</p>
    </div>
  )
}

function AIChatView() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 px-1 text-center">
      <MessageCircle size={20} className="text-blue-400 animate-pulse" />
      <p className="text-blue-400 text-[9px] font-bold">AI Session Active</p>
      <p className="text-gray-300 text-[8px] leading-tight">"Cuaca hari ini cerah, 28°C dengan angin sepoi."</p>
      <p className="text-gray-500 text-[7px] mt-1">Audio → Earphone</p>
    </div>
  )
}

function RecordingView() {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [])
  const fmt = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <div className="relative">
        <motion.div
          className="w-8 h-8 rounded-full bg-red-500/20"
          animate={{ scale: [1, 1.6, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
        </div>
      </div>
      <p className="text-red-400 text-sm font-mono font-bold">{fmt}</p>
      <p className="text-gray-500 text-[8px] tracking-widest uppercase">Double Tap Rec</p>
    </div>
  )
}

function SOSView({ soundOn }: { soundOn: boolean }) {
  const [count, setCount] = useState(5)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (sent) return
    const timer = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          setSent(true)
          if (soundOn) sfx.playSOS()
          return 0
        }
        if (soundOn) sfx.playSOS()
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [sent, soundOn])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
      {sent ? (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="space-y-1">
          <div className="w-10 h-10 mx-auto rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">
            <Check size={20} className="text-red-400" />
          </div>
          <p className="text-red-400 text-[10px] font-bold">SOS TRANSMITTED</p>
          <p className="text-gray-400 text-[7px]">GPS + Bat Sent to Contact</p>
        </motion.div>
      ) : (
        <>
          <motion.div
            className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <span className="text-red-400 text-2xl font-bold">{count}</span>
          </motion.div>
          <p className="text-red-400 text-[9px] font-bold uppercase">Long Press SOS</p>
          <p className="text-gray-500 text-[7px]">Hold / Tap Cancel</p>
        </>
      )}
    </div>
  )
}

function FallView() {
  const [stage, setStage] = useState(1)
  useEffect(() => {
    const t1 = setTimeout(() => setStage(2), 1500)
    const t2 = setTimeout(() => setStage(3), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
      {stage === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
          <Activity size={24} className="text-orange-400 mx-auto animate-bounce" />
          <p className="text-orange-400 text-[9px] font-bold">Impact Detected</p>
          <p className="text-gray-400 text-[7px]">BMI160 Sensor Trigger</p>
        </motion.div>
      )}
      {stage === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
          <AlertTriangle size={24} className="text-yellow-400 mx-auto animate-pulse" />
          <p className="text-yellow-400 text-[9px] font-bold">No Movement</p>
          <p className="text-gray-400 text-[7px]">Potential Fall Alert</p>
        </motion.div>
      )}
      {stage === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
          <div className="text-red-500 font-bold text-lg">AUTO SOS</div>
          <p className="text-red-400 text-[8px]">Sending Location...</p>
        </motion.div>
      )}
    </div>
  )
}

function FakeCallView({ soundOn }: { soundOn: boolean }) {
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    if (!accepted && soundOn) {
      const interval = setInterval(() => sfx.playRing(), 1200)
      return () => clearInterval(interval)
    }
  }, [accepted, soundOn])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
      {!accepted ? (
        <>
          <PhoneCall size={22} className="text-green-400 animate-bounce" />
          <p className="text-green-400 text-[9px] font-bold">Panggilan Masuk...</p>
          <p className="text-gray-300 text-[8px]">Bos / Panggilan Penting</p>
          <button
            onClick={() => { setAccepted(true); if (soundOn) sfx.playClick() }}
            className="mt-1 bg-green-500 hover:bg-green-400 text-black font-bold text-[8px] px-2.5 py-0.5 rounded-full"
          >
            Angkat
          </button>
        </>
      ) : (
        <div className="space-y-1">
          <Phone size={20} className="text-green-400 mx-auto" />
          <p className="text-green-400 text-[9px] font-bold">AI Voice Connected</p>
          <p className="text-gray-400 text-[7px]">Simulasi panggilan aktif</p>
        </div>
      )}
    </div>
  )
}

function ReminderView() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-1.5 text-center px-1">
      <Bell size={20} className="text-primary animate-bounce" />
      <p className="text-primary text-[9px] font-bold">Meeting Summary</p>
      <p className="text-gray-300 text-[8px]">14:00 - Project Review</p>
      <p className="text-gray-500 text-[7px] mt-1">Getaran Haptik Aktif</p>
    </div>
  )
}

function NotifView() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-1.5 text-center px-1">
      <Filter size={18} className="text-blue-400" />
      <p className="text-blue-400 text-[9px] font-bold">Priority AI Filter</p>
      <p className="text-green-400 text-[8px]">✓ Pesan Penting Diteruskan</p>
      <p className="text-gray-500 text-[7px]">Spam diabaikan otomatis</p>
    </div>
  )
}

function NotesView() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-1.5 text-center px-1">
      <FileText size={18} className="text-primary" />
      <p className="text-primary text-[9px] font-bold">Quick Voice Note</p>
      <p className="text-gray-300 text-[8px]">"Catat poin rapat hari ini..."</p>
      <p className="text-gray-500 text-[7px]">Speech → Text Cloud</p>
    </div>
  )
}

function BluetoothView() {
  const [connected, setConnected] = useState(true)
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
      <Bluetooth size={24} className={connected ? 'text-blue-400' : 'text-gray-600'} />
      <p className={connected ? 'text-blue-400 text-[9px] font-bold' : 'text-gray-500 text-[9px]'}>
        {connected ? 'BLE 5.0 Connected' : 'Disconnected'}
      </p>
      <button
        onClick={() => setConnected(!connected)}
        className="text-[7px] border border-gray-700 px-2 py-0.5 rounded text-gray-300 hover:border-primary"
      >
        {connected ? 'Putuskan' : 'Hubungkan'}
      </button>
    </div>
  )
}

function BatteryView() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-1.5 text-center">
      <Battery size={24} className="text-green-400" />
      <p className="text-green-400 text-[10px] font-bold">ESP32 Deep Sleep</p>
      <p className="text-gray-300 text-[8px]">Aktif hanya beberapa ms</p>
      <p className="text-gray-500 text-[7px]">Baterai Tahan 24h+</p>
    </div>
  )
}

function HapticView({ soundOn }: { soundOn: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
      <motion.div
        animate={{ x: [-2, 2, -2, 2, 0] }}
        transition={{ duration: 0.4, repeat: Infinity }}
      >
        <Vibrate size={24} className="text-primary" />
      </motion.div>
      <p className="text-primary text-[9px] font-bold">Pola Getaran Haptik</p>
      <button
        onClick={() => { if (soundOn) sfx.playHaptic() }}
        className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 text-[8px] px-2 py-0.5 rounded"
      >
        Tes Getar Motor
      </button>
    </div>
  )
}

// ─── Render OLED Content ──────────────────────────────────────────────────────
function OLEDContent({ activeFeatureId, soundOn }: { activeFeatureId: string | null; soundOn: boolean }) {
  if (!activeFeatureId) return <OLEDClock />

  const feature = FEATURES.find((f) => f.id === activeFeatureId)
  if (!feature) return <OLEDClock />

  switch (feature.screenType) {
    case 'ai-wave':
      return <AIWaveView />
    case 'ai-chat':
      return <AIChatView />
    case 'recording':
      return <RecordingView />
    case 'sos':
      return <SOSView soundOn={soundOn} />
    case 'fall':
      return <FallView />
    case 'fakecall':
      return <FakeCallView soundOn={soundOn} />
    case 'reminder':
      return <ReminderView />
    case 'notification':
      return <NotifView />
    case 'notes':
      return <NotesView />
    case 'bluetooth':
      return <BluetoothView />
    case 'battery':
      return <BatteryView />
    case 'haptic':
      return <HapticView soundOn={soundOn} />
    default:
      return <OLEDClock />
  }
}

// ─── MAIN DEMO SECTION COMPONENT ───────────────────────────────────────────────
export default function DemoSection() {
  const [activeCategory, setActiveCategory] = useState<'ai' | 'safety' | 'productivity' | 'device'>('ai')
  const [selectedFeature, setSelectedFeature] = useState<DemoFeature>(FEATURES[0])
  const [activeBandFeatureId, setActiveBandFeatureId] = useState<string | null>(null)
  const [soundOn, setSoundOn] = useState<boolean>(true)

  // Hold Gesture Progress State
  const [holdProgress, setHoldProgress] = useState<number>(0)
  const [isHolding, setIsHolding] = useState<boolean>(false)
  const holdIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Double Click Detection State for 2-Click Button & Band
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clickCountRef = useRef<number>(0)
  const [dblClickHint, setDblClickHint] = useState<boolean>(false)

  // Filter features based on category
  const filteredFeatures = FEATURES.filter((f) => f.category === activeCategory)

  // Direct Chained Hardware Gesture Handler:
  const handleHardwareGesture = useCallback(
    (gestureType: 'single' | 'double' | 'hold' | 'sensor') => {
      let targetFeature = FEATURES.find(
        (f) => f.category === activeCategory && f.gestureReq === gestureType
      )
      if (!targetFeature) {
        targetFeature = FEATURES.find((f) => f.gestureReq === gestureType)
      }

      if (targetFeature) {
        setSelectedFeature(targetFeature)
        setActiveCategory(targetFeature.category)
        setActiveBandFeatureId(targetFeature.id)

        if (soundOn) {
          if (targetFeature.id.includes('sos')) sfx.playSOS()
          else if (targetFeature.id.includes('ai') || targetFeature.id.includes('touch')) sfx.playAI()
          else if (targetFeature.id.includes('haptic')) sfx.playHaptic()
          else if (targetFeature.id.includes('fake')) sfx.playRing()
          else sfx.playClick()
        }
      }
    },
    [activeCategory, soundOn]
  )

  // Handle Touch directly on Band Screen (Single click vs Double click)
  const handleBandTouch = () => {
    clickCountRef.current += 1
    if (clickCountRef.current === 1) {
      setDblClickHint(true)
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0
        setDblClickHint(false)
        // 1-Click -> Single Touch Voice AI
        handleHardwareGesture('single')
      }, 350)
    } else if (clickCountRef.current === 2) {
      // 2-Click (Double Tap) -> Double Tap Recording!
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current)
      clickCountRef.current = 0
      setDblClickHint(false)
      handleHardwareGesture('double')
    }
  }

  // Handle Dedicated 2-Click Button (STRICTLY requires 2 rapid clicks within 350ms!)
  const handle2ClickButton = () => {
    clickCountRef.current += 1
    if (clickCountRef.current === 1) {
      setDblClickHint(true)
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0
        setDblClickHint(false)
        // Only 1 click occurred — DO NOT ACTIVATE 2-Click feature!
      }, 350)
    } else if (clickCountRef.current === 2) {
      // 2 Clicks occurred! Activate 2-Click feature!
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current)
      clickCountRef.current = 0
      setDblClickHint(false)
      handleHardwareGesture('double')
    }
  }

  // Handle Hold Start (Long Press 1.5s)
  const handleHoldStart = () => {
    setIsHolding(true)
    let p = 0
    holdIntervalRef.current = setInterval(() => {
      p += 10
      setHoldProgress(p)
      if (p >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current)
        setIsHolding(false)
        setHoldProgress(0)
        // Hold 1.5s Complete -> Triggers Hold / SOS feature!
        handleHardwareGesture('hold')
      }
    }, 100)
  }

  const handleHoldCancel = () => {
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current)
    setIsHolding(false)
    setHoldProgress(0)
  }

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current)
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current)
    }
  }, [])

  return (
    <section
      id="demo"
      className="relative bg-black py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden"
      aria-label="Virtual Prototype Demo"
    >
      {/* Background Noise & Subtle Radial Glow */}
      <div className="bg-noise opacity-[0.12]" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(222,219,200,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#121212] border border-[#222] px-3.5 py-1 rounded-full text-xs text-primary mb-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>Integrated Hardware Demo</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: '#E1E0CC' }}
          >
            Virtual Prototype Demo
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Coba interaksi nyata: <span className="text-primary font-bold">1-Click</span> untuk Single Touch AI, <span className="text-primary font-bold">Klik 2x Cepat</span> untuk Rekam Suara, dan <span className="text-primary font-bold">Tekan Tahan 1.5s</span> untuk SOS Emergency!
          </p>

          {/* Sound Toggle Button */}
          <div className="mt-5 flex justify-center">
            <button
              onClick={() => setSoundOn(!soundOn)}
              className="flex items-center gap-2 bg-[#181818] hover:bg-[#222] border border-[#333] px-4 py-1.5 rounded-full text-xs text-primary transition-all shadow-md"
            >
              {soundOn ? <Volume2 size={14} className="text-green-400" /> : <VolumeX size={14} className="text-gray-500" />}
              <span>Audio FX: {soundOn ? 'ON (Web Audio API)' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                  const first = FEATURES.find((f) => f.category === cat.id)
                  if (first) {
                    setSelectedFeature(first)
                    setActiveBandFeatureId(null)
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? 'bg-primary text-black border-primary shadow-lg scale-105'
                    : 'bg-[#111] text-gray-400 border-[#222] hover:border-gray-600 hover:text-gray-200'
                }`}
              >
                <Icon size={14} />
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Larger Smartband OLED Display & Real Chained Hardware Controls */}
          <div className="lg:col-span-5 flex flex-col items-center sticky top-12">
            <div className="bg-[#0b0b0b] border border-[#1e1e1e] rounded-3xl p-6 sm:p-8 w-full max-w-sm flex flex-col items-center shadow-2xl relative">
              
              <div className="flex items-center justify-between w-full mb-4">
                <span className="text-[10px] text-gray-500 tracking-widest uppercase font-mono">
                  HARDWARE SENSOR & GESTURES
                </span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full border ${activeBandFeatureId ? 'bg-green-500/20 text-green-400 border-green-500/40' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40'}`}>
                  {activeBandFeatureId ? `● ${selectedFeature.name.toUpperCase()}` : '○ STANDBY MODE'}
                </span>
              </div>

              {/* Band Outer Body (Interactive Smartwatch Case) */}
              <div className="relative flex flex-col items-center">
                {/* Top Strap */}
                <div
                  className="w-16 h-14 rounded-t-2xl"
                  style={{
                    background: 'linear-gradient(180deg, #222 0%, #111 100%)',
                    boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.8), inset -2px 0 4px rgba(0,0,0,0.8)',
                  }}
                />

                {/* Main Rectangular Smartwatch Case with Rounded Corners */}
                <motion.div
                  className="relative flex items-center justify-center p-3 cursor-pointer select-none"
                  onClick={handleBandTouch}
                  animate={{
                    scale: activeBandFeatureId ? 1.02 : 1,
                    boxShadow: activeBandFeatureId
                      ? `0 0 30px ${selectedFeature.accentColor}50`
                      : '0 10px 40px rgba(0,0,0,0.9)',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '145px',
                    height: '185px',
                    borderRadius: '38px',
                    background: 'linear-gradient(145deg, #2a2a2a 0%, #121212 70%, #1e1e1e 100%)',
                    border: `2px solid ${activeBandFeatureId ? selectedFeature.accentColor : '#333'}`,
                  }}
                >
                  {/* Physical Capacitive Sensor Touch Button on Side */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleBandTouch()
                    }}
                    title="Sentuh Sensor Gelang"
                    className="absolute -right-3 top-12 w-3 h-10 rounded-r-md bg-[#333] hover:bg-primary transition-colors cursor-pointer"
                  />

                  {/* OLED Screen */}
                  <div
                    className="w-full h-full rounded-[28px] bg-black border border-[#1f1f1f] overflow-hidden flex items-center justify-center p-2 relative shadow-inner"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeBandFeatureId || 'idle'}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full"
                      >
                        <OLEDContent activeFeatureId={activeBandFeatureId} soundOn={soundOn} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Bottom Strap */}
                <div
                  className="w-16 h-14 rounded-b-2xl"
                  style={{
                    background: 'linear-gradient(0deg, #222 0%, #111 100%)',
                    boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.8), inset -2px 0 4px rgba(0,0,0,0.8)',
                  }}
                />
              </div>

              {/* Physical Chained Gesture Buttons Panel */}
              <div className="mt-6 w-full space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                    UJI INTERAKSI GESTURE
                  </p>
                  {dblClickHint && (
                    <span className="text-[9px] text-yellow-400 animate-pulse font-mono">
                      1x... Klik lagi!
                    </span>
                  )}
                </div>

                {/* Direct Chained Hardware Gesture Triggers */}
                <div className="grid grid-cols-3 gap-2">
                  
                  {/* 1. Single Click -> Single Touch AI */}
                  <button
                    onClick={() => handleHardwareGesture('single')}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all text-center ${
                      selectedFeature.gestureReq === 'single' && activeBandFeatureId
                        ? 'bg-primary text-black border-primary shadow-lg font-bold'
                        : 'bg-[#141414] hover:bg-[#222] border-[#2a2a2a] hover:border-primary text-gray-200'
                    }`}
                  >
                    <Touchpad size={16} className="mb-1" />
                    <span className="text-[10px] font-bold">1-Click</span>
                    <span className="text-[7px] opacity-75">Voice AI</span>
                  </button>

                  {/* 2. Dedicated 2-Click Button (Strictly requires 2 fast clicks!) */}
                  <button
                    onClick={handle2ClickButton}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all text-center ${
                      selectedFeature.gestureReq === 'double' && activeBandFeatureId
                        ? 'bg-primary text-black border-primary shadow-lg font-bold'
                        : 'bg-[#141414] hover:bg-[#222] border-[#2a2a2a] hover:border-primary text-gray-200'
                    }`}
                  >
                    <div className="flex gap-0.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-current" />
                      <span className="w-2 h-2 rounded-full bg-current" />
                    </div>
                    <span className="text-[10px] font-bold">2-Click</span>
                    <span className="text-[7px] opacity-75">Klik 2x Cepat</span>
                  </button>

                  {/* 3. Hold 1.5s -> SOS Emergency */}
                  <button
                    onMouseDown={handleHoldStart}
                    onMouseUp={handleHoldCancel}
                    onMouseLeave={handleHoldCancel}
                    onTouchStart={handleHoldStart}
                    onTouchEnd={handleHoldCancel}
                    className={`relative overflow-hidden flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all text-center select-none ${
                      isHolding ? 'border-red-500 scale-95' : ''
                    } ${
                      selectedFeature.gestureReq === 'hold' && activeBandFeatureId
                        ? 'bg-red-500 text-white border-red-500 shadow-lg font-bold'
                        : 'bg-[#141414] hover:bg-[#222] border-[#2a2a2a] hover:border-red-500 text-gray-200'
                    }`}
                  >
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-red-400/40 h-full"
                      style={{ width: `${holdProgress}%` }}
                    />
                    <Power size={16} className="mb-1 z-10" />
                    <span className="text-[10px] font-bold z-10">Hold 1.5s</span>
                    <span className="text-[7px] opacity-75 z-10">SOS / Chat</span>
                  </button>

                </div>

                {/* IMU Sensor Fall Detection Button */}
                <button
                  onClick={() => handleHardwareGesture('sensor')}
                  className={`w-full py-2 px-3 rounded-xl border text-xs flex items-center justify-center gap-2 transition-all ${
                    selectedFeature.gestureReq === 'sensor' && activeBandFeatureId
                      ? 'bg-orange-500 text-black border-orange-500 font-bold'
                      : 'bg-[#141414] hover:bg-[#222] text-gray-300 border-[#2a2a2a] hover:border-orange-500'
                  }`}
                >
                  <Activity size={14} />
                  <span>Simulasi Benturan (IMU Fall Detection)</span>
                </button>

                {/* Reset / Standby Button */}
                {activeBandFeatureId && (
                  <button
                    onClick={() => setActiveBandFeatureId(null)}
                    className="w-full py-1.5 px-3 bg-[#181818] hover:bg-[#222] text-gray-400 hover:text-white border border-[#2a2a2a] rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all mt-2"
                  >
                    <RotateCcw size={12} />
                    <span>Kembalikan ke Standby (Clock)</span>
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* RIGHT: Feature Cards & Detailed Explanations (Cols 6-12) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredFeatures.map((feat) => {
                const Icon = feat.icon
                const isSelected = selectedFeature.id === feat.id
                return (
                  <button
                    key={feat.id}
                    onClick={() => {
                      setSelectedFeature(feat)
                      // Automatically trigger feature on band upon card selection for smooth UX
                      setActiveBandFeatureId(feat.id)
                      if (soundOn) sfx.playAI()
                    }}
                    className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#151515] border-primary shadow-xl scale-[1.02]'
                        : 'bg-[#0d0d0d] border-[#1f1f1f] hover:border-gray-700 hover:bg-[#111]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: isSelected ? feat.accentColor : '#181818',
                          color: isSelected ? '#000' : '#DEDBC8',
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <span className="text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-[#181818] text-gray-300 border border-[#2a2a2a]">
                        {feat.gestureName}
                      </span>
                    </div>

                    <div>
                      <h4
                        className="font-bold text-sm mb-1"
                        style={{ color: isSelected ? '#E1E0CC' : '#a1a1aa' }}
                      >
                        {feat.name}
                      </h4>
                      <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                        {feat.tagline}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Selected Feature Detailed Explanation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFeature.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0e0e0e] border border-[#222] rounded-3xl p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-black font-bold"
                    style={{ backgroundColor: selectedFeature.accentColor }}
                  >
                    {(() => {
                      const Icon = selectedFeature.icon
                      return <Icon size={20} />
                    })()}
                  </div>
                  <div>
                    <h3 className="text-primary text-lg font-bold">{selectedFeature.name}</h3>
                    <p className="text-gray-400 text-xs italic">"{selectedFeature.tagline}"</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {selectedFeature.description}
                </p>

                {/* Technical Execution Flow */}
                <div>
                  <h5 className="text-[10px] uppercase font-mono tracking-widest text-primary mb-3">
                    ALGORITMA & FLOW PROSES TEKNIS
                  </h5>
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedFeature.flow.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="bg-[#181818] border border-[#2a2a2a] text-gray-300 text-xs px-3 py-1 rounded-lg">
                          {step}
                        </span>
                        {idx < selectedFeature.flow.length - 1 && (
                          <span className="text-gray-600 text-xs font-bold">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  )
}
