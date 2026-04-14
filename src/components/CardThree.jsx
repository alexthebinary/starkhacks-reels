import { Calendar, MapPin, Users, Clock } from 'lucide-react'
import PartnerLockup from './PartnerLockup'

export default function CardThree() {
  return (
    <div className="relative w-[270px] h-[480px] bg-white rounded-[18px] overflow-hidden font-inter">
      <img
        src="/unitree-product-2.png"
        alt="Unitree G1 robot"
        className="absolute pointer-events-none animate-float"
        style={{
          top: '80px',
          right: '-40px',
          width: '240px',
          opacity: 0.95,
          zIndex: 1,
          filter: 'drop-shadow(0 18px 30px rgba(0,0,0,0.2))',
        }}
      />

      <div className="shine-sweep delay-2" />

      <div className="relative z-20 flex flex-col h-full p-5 justify-between">
        {/* Top brand bar */}
        <div
          className="flex items-center gap-2 animate-fade-in-up"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          <img src="/starkhacks-logo.svg" alt="" className="w-5 h-5" />
          <span
            className="font-grotesk uppercase text-black"
            style={{ fontSize: '12px', letterSpacing: '0.26em' }}
          >
            StarkHacks 2026
          </span>
        </div>

        {/* Big headline */}
        <div>
          <h2
            className="font-normal tracking-tight animate-fade-in-up"
            style={{
              fontSize: '36px',
              lineHeight: 1.0,
              letterSpacing: '-1.2px',
              animationDelay: '0.2s',
              opacity: 0,
            }}
          >
            1,000+
            <br />
            builders.
            <br />
            36 hours.
            <br />
            <span
              className="bg-clip-text text-transparent gradient-shimmer"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #000 0%, #8E6F2E 45%, #F59E0B 70%, #CEB888 100%)',
              }}
            >
              One world record.
            </span>
          </h2>
        </div>

        {/* Event facts */}
        <div
          className="flex flex-col gap-2 animate-fade-in-up bg-white/80 backdrop-blur-sm rounded-lg p-3"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          <div className="flex items-center gap-2 text-gray-800">
            <Calendar className="w-3.5 h-3.5" />
            <span style={{ fontSize: '11px', fontWeight: 500 }}>
              April 17–19, 2026
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <MapPin className="w-3.5 h-3.5" />
            <span style={{ fontSize: '11px', fontWeight: 500 }}>
              Purdue Armory · West Lafayette
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <Users className="w-3.5 h-3.5" />
            <span style={{ fontSize: '11px', fontWeight: 500 }}>
              1,000+ engineers & builders
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <Clock className="w-3.5 h-3.5" />
            <span style={{ fontSize: '11px', fontWeight: 500 }}>
              36 hour hardware sprint
            </span>
          </div>
        </div>

        <div
          className="flex flex-col gap-3 animate-fade-in-up"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          <span
            className="rounded-full px-3 py-1.5 font-semibold text-white flex items-center justify-center gap-1.5 box-glow-pulse w-full"
            style={{
              fontSize: '9px',
              background: '#0B0B0B',
              letterSpacing: '0.1em',
            }}
          >
            <span className="text-amber-400">★</span>
            $100K + UNITREE G1 EDU+ GRAND PRIZE
          </span>
          <PartnerLockup theme="light" />
        </div>
      </div>
    </div>
  )
}
