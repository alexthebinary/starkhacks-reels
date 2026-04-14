import { Trophy } from 'lucide-react'
import PartnerLockup from './PartnerLockup'

export default function CardSix() {
  return (
    <div className="relative w-[270px] h-[480px] bg-black rounded-[18px] overflow-hidden scanlines grain">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 70% 25%, rgba(251,191,36,0.32) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(206,184,136,0.2) 0%, transparent 55%), #0a0a0a',
        }}
      />

      {/* rotating amber halo */}
      <div
        aria-hidden
        className="absolute rotate-slow z-[1] pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          width: '600px',
          height: '600px',
          translate: '-50% -50%',
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(251,191,36,0.22) 60deg, transparent 120deg, transparent 240deg, rgba(251,191,36,0.15) 300deg, transparent 360deg)',
          filter: 'blur(20px)',
        }}
      />

      {/* twinkles */}
      <div
        className="absolute twinkle bg-amber-300 rounded-full z-[2]"
        style={{ top: '18%', left: '14%', width: 3, height: 3 }}
      />
      <div
        className="absolute twinkle bg-amber-200 rounded-full z-[2]"
        style={{ top: '42%', left: '86%', width: 4, height: 4, animationDelay: '0.7s' }}
      />
      <div
        className="absolute twinkle bg-white rounded-full z-[2]"
        style={{ top: '15%', left: '80%', width: 2, height: 2, animationDelay: '1.3s' }}
      />
      <div
        className="absolute twinkle bg-amber-400 rounded-full z-[2]"
        style={{ top: '70%', left: '18%', width: 3, height: 3, animationDelay: '0.3s' }}
      />
      <div
        className="absolute twinkle bg-amber-300 rounded-full z-[2]"
        style={{ top: '58%', left: '48%', width: 2, height: 2, animationDelay: '1.8s' }}
      />

      <div className="shine-sweep delay-2" />

      <div className="relative z-10 flex flex-col h-full justify-between p-5">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400 glow-pulse" />
          <span
            className="font-grotesk text-white uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.28em' }}
          >
            Grand Prize
          </span>
        </div>

        <div>
          <h2
            className="font-poppins font-medium text-white tracking-tight"
            style={{ fontSize: '54px', lineHeight: 0.9, letterSpacing: '-0.04em' }}
          >
            <span
              className="bg-clip-text text-transparent gradient-shimmer glow-pulse"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #FDE68A 0%, #F59E0B 50%, #FDE68A 100%)',
                display: 'inline-block',
              }}
            >
              $100K
            </span>
          </h2>
          <p
            className="font-source-serif italic text-amber-300 mt-1"
            style={{ fontSize: '22px', lineHeight: 1.1 }}
          >
            + one Unitree
            <br />
            G1 EDU+.
          </p>
          <p
            className="font-poppins text-white/70 leading-relaxed mt-4"
            style={{ fontSize: '11px', maxWidth: '240px' }}
          >
            Awarded live at StarkHacks 2026 — Purdue Armory, April 17–19.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span
              className="font-grotesk uppercase text-white"
              style={{ fontSize: '12px', letterSpacing: '0.24em' }}
            >
              Presented by
            </span>
            <img
              src="/futurology-logo-inverted.png"
              alt="Futurology"
              className="h-6 w-auto"
              style={{
                filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.7))',
              }}
            />
          </div>
          <PartnerLockup theme="dark" />
        </div>
      </div>
    </div>
  )
}
