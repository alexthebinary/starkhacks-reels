import { Trophy, ArrowRight } from 'lucide-react'
import PartnerLockup from './PartnerLockup'

export default function CardOne() {
  return (
    <div className="relative w-[270px] h-[480px] rounded-[18px]">
      <div className="conic-border rounded-[18px]">
        <div className="conic-border-inner rounded-[16px]" />
      </div>

      <div className="relative w-full h-full rounded-[18px] overflow-hidden flex flex-col grain">
        <div
          className="absolute inset-0 animate-ken-burns"
          style={{
            backgroundImage: 'url(/unitree-g1-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.96) 82%)',
          }}
        />
        <div className="shine-sweep" />

        <div className="relative z-10 flex flex-col h-full justify-between p-5">
          {/* TOP: urgency + date */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <div className="inline-flex items-center gap-1.5 bg-red-600/95 backdrop-blur-md rounded-full px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white urgent-dot" />
                <span
                  className="font-grotesk text-white uppercase"
                  style={{ fontSize: '9px', letterSpacing: '0.2em' }}
                >
                  3 Days Left
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md rounded-full px-2.5 py-1 border border-amber-400/40">
                <img src="/starkhacks-logo.svg" alt="" className="w-3 h-3" />
                <span
                  className="font-grotesk text-amber-400 uppercase"
                  style={{ fontSize: '9px', letterSpacing: '0.2em' }}
                >
                  Apr 17–19
                </span>
              </div>
            </div>
          </div>

          {/* CENTER: big title */}
          <div>
            <h2
              className="font-grotesk text-white uppercase tracking-tight"
              style={{ fontSize: '68px', lineHeight: 0.82, letterSpacing: '-2.5px' }}
            >
              Stark
              <br />
              <span
                className="gradient-shimmer bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #FDE68A 0%, #F59E0B 40%, #FDE68A 70%, #F59E0B 100%)',
                }}
              >
                Hacks
              </span>
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="font-grotesk text-white/70 uppercase"
                style={{ fontSize: '14px', letterSpacing: '0.35em' }}
              >
                2026
              </span>
              <div className="flex-1 h-px bg-amber-400/30" />
              <span
                className="font-mono text-amber-400"
                style={{ fontSize: '9px', letterSpacing: '0.1em' }}
              >
                Purdue Armory
              </span>
            </div>
          </div>

          {/* BOTTOM: prize + CTA + lockup */}
          <div className="flex flex-col gap-3">
            <p
              className="font-mono text-white/85 leading-relaxed"
              style={{ fontSize: '11px' }}
            >
              36 hours. One Unitree humanoid. Win{' '}
              <span className="text-amber-400 font-bold glow-pulse">
                $100,000
              </span>{' '}
              + a G1 EDU+.
            </p>
            <button
              className="w-full flex items-center justify-center gap-2 rounded-full py-2.5 cta-pulse box-glow-pulse"
              style={{
                background:
                  'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)',
              }}
            >
              <Trophy className="w-4 h-4 text-black" />
              <span
                className="font-grotesk text-black uppercase"
                style={{ fontSize: '13px', letterSpacing: '0.1em' }}
              >
                Register Now
              </span>
              <ArrowRight className="w-4 h-4 text-black arrow-bounce" />
            </button>
            <PartnerLockup theme="dark" />
          </div>
        </div>
      </div>
    </div>
  )
}
