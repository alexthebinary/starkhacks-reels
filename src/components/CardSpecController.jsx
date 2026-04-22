import { Gamepad2, Hand, Zap } from 'lucide-react'
import PartnerLockup from './PartnerLockup'

const POSTURE = [
  { label: 'Debug Mode', btn: 'L2 + R2' },
  { label: 'Zero Torque', btn: 'L2 + Y' },
  { label: 'Damping', btn: 'L2 + B' },
  { label: 'Lock Stand', btn: 'L2 + ↑' },
  { label: 'Seated', btn: 'L2 + ←' },
  { label: 'Lying/Standing', btn: 'L2 + X' },
  { label: 'Squat', btn: 'L2 + A' },
]

const GESTURES = [
  { label: 'Wave hand', btn: 'SELECT + Y' },
  { label: 'Handshake', btn: 'SELECT + A' },
  { label: 'Turn + wave', btn: 'SELECT + X' },
]

const MOVE = [
  { label: 'Slow run', btn: 'R2 + ↓' },
  { label: 'Fast run', btn: 'R2 + ↑' },
  { label: 'Low speed', btn: '2× L2' },
  { label: 'High speed', btn: '2× L1' },
  { label: 'Stand', btn: 'START' },
  { label: 'Keep step', btn: '2× START' },
]

export default function CardSpecController() {
  return (
    <div className="relative w-[270px] h-[480px] bg-black rounded-[18px] overflow-hidden scanlines grain">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 25% 85%, rgba(59,130,246,0.14) 0%, transparent 55%), radial-gradient(circle at 80% 15%, rgba(251,191,36,0.2) 0%, transparent 55%), #0a0a0a',
        }}
      />
      <div className="shine-sweep delay-2" />

      <div className="relative z-10 flex flex-col h-full justify-between p-5">
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 urgent-dot" />
            <span
              className="font-grotesk text-amber-400 uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.28em' }}
            >
              Spec sheet · 05/05
            </span>
          </div>
          <h2
            className="font-grotesk text-white uppercase tracking-tight"
            style={{ fontSize: '34px', lineHeight: 0.88, letterSpacing: '-1.2px' }}
          >
            R3
            <br />
            <span
              className="bg-clip-text text-transparent gradient-shimmer"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #FDE68A 0%, #F59E0B 50%, #FDE68A 100%)',
                display: 'inline-block',
              }}
            >
              Controller.
            </span>
          </h2>
          <p
            className="font-inter text-white/55 mt-1"
            style={{ fontSize: '9px', letterSpacing: '0.06em' }}
          >
            G1 Remote · Manual V1.3 · June 2025
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <Group icon={Gamepad2} title="Posture · L2 combos" rows={POSTURE} />
          <Group icon={Hand} title="Gestures · SELECT combos" rows={GESTURES} />
          <Group icon={Zap} title="Motion · R2 + speed" rows={MOVE} />
        </div>

        <PartnerLockup theme="dark" />
      </div>
    </div>
  )
}

function Group({ icon: Icon, title, rows }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-2.5 h-2.5 text-amber-400" />
        <span
          className="font-grotesk text-amber-400 uppercase"
          style={{ fontSize: '7.5px', letterSpacing: '0.22em' }}
        >
          {title}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {rows.map(({ label, btn }) => (
          <div
            key={label}
            className="liquid-glass rounded-md px-1.5 py-0.5 flex items-center justify-between gap-1.5 border border-amber-400/25"
          >
            <span
              className="font-mono text-white/85 truncate"
              style={{ fontSize: '7.5px' }}
            >
              {label}
            </span>
            <span
              className="font-mono text-amber-400/90 flex-shrink-0"
              style={{ fontSize: '7px', letterSpacing: '0.02em' }}
            >
              {btn}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
