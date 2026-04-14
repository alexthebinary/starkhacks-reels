import PartnerLockup from './PartnerLockup'

export default function CardFive() {
  return (
    <div className="relative w-[270px] h-[480px] bg-white rounded-[18px] overflow-hidden">
      <img
        src="/unitree-product-2.png"
        alt="Unitree G1 in motion"
        className="absolute pointer-events-none animate-float"
        style={{
          top: '40px',
          right: '-40px',
          width: '260px',
          opacity: 0.95,
          zIndex: 0,
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.25))',
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, white 0%, rgba(255,255,255,0.5) 25%, transparent 45%, rgba(255,255,255,0.85) 75%, white 100%)',
        }}
      />

      <div className="shine-sweep delay-1" />

      <div className="relative z-10 flex flex-col h-full justify-between p-5">
        <div>
          <img
            src="/futurology-logo.png"
            alt="Futurology"
            className="h-6 w-auto mb-1.5"
          />
          <span
            className="font-grotesk uppercase text-black/50"
            style={{ fontSize: '9px', letterSpacing: '0.28em' }}
          >
            In future we trust
          </span>
        </div>

        <div>
          <h2
            className="font-instrument text-black tracking-tight animate-fade-rise"
            style={{ fontSize: '42px', lineHeight: 0.95, letterSpacing: '-1px' }}
          >
            Beyond
            <br />
            <em style={{ color: '#8E6F2E' }}>the demo,</em>
            <br />
            we build
            <br />
            <em
              className="bg-clip-text text-transparent gradient-shimmer"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #8E6F2E 0%, #F59E0B 50%, #CEB888 100%)',
              }}
            >
              the future.
            </em>
          </h2>
          <p
            className="font-inter leading-relaxed mt-3"
            style={{ color: '#6F6F6F', fontSize: '11px', maxWidth: '220px' }}
          >
            1,000+ engineers, researchers, and students setting the world
            record for the largest hardware hackathon — live at Purdue.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span
            className="font-grotesk uppercase text-black self-start"
            style={{ fontSize: '12px', letterSpacing: '0.26em' }}
          >
            futurology.tech
          </span>
          <PartnerLockup theme="light" />
        </div>
      </div>
    </div>
  )
}
