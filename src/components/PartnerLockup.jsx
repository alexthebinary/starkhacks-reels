export default function PartnerLockup({ theme = 'dark' }) {
  const label = theme === 'dark' ? 'text-white/55' : 'text-black/55'
  const divider = theme === 'dark' ? 'bg-white/20' : 'bg-black/20'
  const futurology =
    theme === 'dark' ? '/futurology-logo-inverted.png' : '/futurology-logo.png'
  const unitreeFilter = theme === 'dark' ? 'invert(1) brightness(1.2)' : 'none'

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <span
        className={`font-grotesk uppercase ${label}`}
        style={{ fontSize: '8px', letterSpacing: '0.28em' }}
      >
        In partnership with
      </span>
      <div className="flex items-center gap-3">
        <img
          src="/purdue-logo.svg"
          alt="Purdue"
          className="h-7 w-7 rounded-[4px]"
        />
        <div className={`w-px h-5 ${divider}`} />
        <img
          src="/unitree-logo.svg"
          alt="Unitree"
          className="h-4 w-auto"
          style={{ filter: unitreeFilter }}
        />
        <div className={`w-px h-5 ${divider}`} />
        <img
          src={futurology}
          alt="Futurology"
          className="h-6 w-auto"
          style={{
            filter:
              theme === 'dark'
                ? 'drop-shadow(0 0 8px rgba(251,191,36,0.55))'
                : 'none',
          }}
        />
      </div>
    </div>
  )
}
