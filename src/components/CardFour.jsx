import PartnerLockup from './PartnerLockup'

export default function CardFour() {
  return (
    <div className="relative w-[270px] h-[480px] bg-black rounded-[18px] overflow-hidden scanlines grain">
      <img
        src="/unitree-alt-3.png"
        alt="Unitree robot"
        className="absolute pointer-events-none animate-float"
        style={{
          top: '30px',
          right: '-20px',
          width: '260px',
          zIndex: 0,
          filter: 'drop-shadow(0 20px 40px rgba(251,191,36,0.28))',
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(circle at 75% 25%, rgba(251,191,36,0.2), transparent 50%), linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 70%)',
        }}
      />

      <div className="shine-sweep delay-3" />

      <div className="relative z-10 flex flex-col h-full justify-between p-5">
        <div className="flex items-center justify-between">
          <img
            src="/futurology-logo-inverted.png"
            alt="Futurology"
            className="h-6 w-auto"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.6))',
            }}
          />
          <span
            className="font-grotesk text-amber-400 uppercase neon-flicker"
            style={{ fontSize: '9px', letterSpacing: '0.22em' }}
          >
            futurology.tech
          </span>
        </div>

        <div>
          <h2
            className="font-instrument text-white tracking-tight animate-fade-rise"
            style={{ fontSize: '46px', lineHeight: 0.9 }}
          >
            Stop
            <br />
            watching.
            <br />
            <em className="text-amber-400 glow-pulse">
              Start
              <br />
              building.
            </em>
          </h2>
          <p
            className="font-inter text-white/75 leading-relaxed mt-4"
            style={{ fontSize: '11px', maxWidth: '230px' }}
          >
            36 hours at Purdue Armory. One Unitree humanoid. Real hardware,
            real code — judged live on stage.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div
            className="inline-flex items-center gap-2 bg-red-600/90 rounded-full px-3 py-1.5 self-start"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white urgent-dot" />
            <span
              className="font-grotesk text-white uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.2em' }}
            >
              Apr 17–19 · 3 Days Left
            </span>
          </div>
          <PartnerLockup theme="dark" />
        </div>
      </div>
    </div>
  )
}
