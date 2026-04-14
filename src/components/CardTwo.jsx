import PartnerLockup from './PartnerLockup'

export default function CardTwo() {
  return (
    <div className="relative w-[270px] h-[480px] bg-black rounded-[18px] overflow-hidden scanlines grain">
      <div
        className="absolute inset-0 z-0 animate-ken-burns-slow"
        style={{
          backgroundImage: 'url(/starkhacks-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.95) 100%)',
        }}
      />

      <div className="shine-sweep delay-1" />

      <div
        className="absolute pointer-events-none select-none z-[2]"
        style={{
          top: '30%',
          left: '-20px',
          right: '-20px',
          fontFamily: 'Anton, sans-serif',
          fontSize: '130px',
          lineHeight: 0.85,
          letterSpacing: '-5px',
          color: 'transparent',
          WebkitTextStroke: '1.2px rgba(251,191,36,0.28)',
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
        }}
      >
        Futurology
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between p-5">
        <div>
          <div className="liquid-glass rounded-lg px-3 py-1.5 inline-flex items-center gap-2 mb-4 animate-fade-rise box-glow-pulse">
            <span
              className="bg-amber-400 text-black rounded-md font-bold px-1.5 py-0.5"
              style={{ fontSize: '7px' }}
            >
              Grand Prize
            </span>
            <span
              className="font-semibold text-white font-inter"
              style={{ fontSize: '8px' }}
            >
              $100,000 + Unitree G1 EDU+
            </span>
          </div>
          <h2
            className="font-inter font-medium text-white animate-fade-rise-delay"
            style={{ fontSize: '36px', lineHeight: 1.0, letterSpacing: '-1.6px' }}
          >
            Don't just
            <br />
            watch
            <br />
            <span
              className="font-instrument italic font-normal bg-clip-text text-transparent gradient-shimmer"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #FDE68A 0%, #F59E0B 45%, #FDE68A 90%)',
              }}
            >
              innovation
            </span>
            <br />
            happen.
            <br />
            <span className="neon-flicker text-amber-400">Build it.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          <p
            className="font-inter leading-relaxed opacity-90 animate-fade-rise-delay-2"
            style={{ color: '#d4d8e8', fontSize: '10px', maxWidth: '230px' }}
          >
            Futurology backs the builders setting the world record at
            StarkHacks — April 17–19 at Purdue Armory.
          </p>
          <PartnerLockup theme="dark" />
        </div>
      </div>
    </div>
  )
}
