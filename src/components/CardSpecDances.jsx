import { Music } from 'lucide-react'
import PartnerLockup from './PartnerLockup'

// Unitree Dancing SDK (official, sold separately)
const SDK = [
  'Tai Chi',
  'Love You',
  'Robot Dance',
  'Victory Dance',
  'APT',
  'Qinghai Shake',
  'Bunny Dance',
  'Ace of Spades',
]

// Unitree native Training Mode presets on this unit (confirmed live)
const NATIVE = [
  { name: 'Waist Drum Dance', sec: 9.5 },
  { name: 'Spin Discs', sec: 6.9 },
  { name: 'Throw Money', sec: 8.1 },
]

// NVIDIA GEAR-SONIC WBC validated clips
const NVIDIA = [
  'Party dance',
  'Macarena',
  '360 walk-spin',
  'Standing kick',
  'Forward lunge',
  'Deep squat',
  'Tired lunge',
  'One-leg jump',
]

export default function CardSpecDances() {
  return (
    <div className="relative w-[270px] h-[480px] bg-black rounded-[18px] overflow-hidden scanlines grain">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 30% 25%, rgba(236,72,153,0.16) 0%, transparent 55%), radial-gradient(circle at 75% 80%, rgba(251,191,36,0.24) 0%, transparent 55%), #0a0a0a',
        }}
      />
      <div className="shine-sweep delay-1" />

      {[[18,14,3],[72,22,2],[30,72,3],[82,65,2],[55,42,2]].map(([l,t,s], i) => (
        <div
          key={i}
          className="absolute twinkle bg-amber-300 rounded-full z-[2]"
          style={{
            left: `${l}%`,
            top: `${t}%`,
            width: s,
            height: s,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col h-full justify-between p-5">
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 urgent-dot" />
            <span
              className="font-grotesk text-amber-400 uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.28em' }}
            >
              Spec sheet · 04/05
            </span>
          </div>
          <h2
            className="font-grotesk text-white uppercase tracking-tight"
            style={{ fontSize: '34px', lineHeight: 0.88, letterSpacing: '-1.2px' }}
          >
            Dance
            <br />
            <span
              className="bg-clip-text text-transparent gradient-shimmer glow-pulse"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #FDE68A 0%, #F59E0B 50%, #FDE68A 100%)',
                display: 'inline-block',
              }}
            >
              library · 19
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          <Section
            label="Unitree Dancing SDK · 8"
            items={SDK}
            emphasis="amber"
          />
          <Section
            label="Unitree Training Mode · 3"
            items={NATIVE.map((d) => `${d.name} · ${d.sec}s`)}
            emphasis="amber"
          />
          <Section
            label="NVIDIA GEAR-SONIC · 8"
            items={NVIDIA}
            emphasis="subtle"
          />
        </div>

        <PartnerLockup theme="dark" />
      </div>
    </div>
  )
}

function Section({ label, items, emphasis = 'amber' }) {
  const amber = emphasis === 'amber'
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1">
        <Music
          className="w-2.5 h-2.5"
          style={{ color: amber ? '#fbbf24' : 'rgba(255,255,255,0.5)' }}
        />
        <span
          className="font-grotesk uppercase"
          style={{
            fontSize: '7.5px',
            letterSpacing: '0.22em',
            color: amber ? '#fbbf24' : 'rgba(255,255,255,0.55)',
          }}
        >
          {label}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {items.map((n) => (
          <span
            key={n}
            className="liquid-glass rounded-md px-1.5 py-0.5 font-mono text-white/85 border"
            style={{
              fontSize: '7.5px',
              letterSpacing: '0.01em',
              borderColor: amber ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.12)',
            }}
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  )
}
