import { Hand } from 'lucide-react'
import PartnerLockup from './PartnerLockup'

const GESTURES = [
  'Release arm',
  'Two-hand kiss',
  'Left kiss',
  'Right kiss',
  'Hands up',
  'Clap',
  'High five',
  'Hug',
  'Heart',
  'Right heart',
  'Reject',
  'Right hand up',
  'X-ray',
  'Face wave',
  'High wave',
  'Shake hand',
  'Turn-back wave',
  'Box one-hand win',
  'Box two-hand win',
  'Box three-hand win',
  'Right hand on heart',
  'Both hands up R',
  'Forward push',
  'Training recordings',
]

export default function CardSpecGestures() {
  return (
    <div className="relative w-[270px] h-[480px] bg-white rounded-[18px] overflow-hidden font-inter">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 80% 80%, rgba(251,191,36,0.18) 0%, transparent 55%), linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
        }}
      />
      <div className="shine-sweep delay-3" />

      <div className="relative z-10 flex flex-col h-full justify-between p-5">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 urgent-dot" />
            <span
              className="font-grotesk text-black/80 uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.28em' }}
            >
              Spec sheet · 03/05
            </span>
          </div>
          <h2
            className="font-grotesk text-black uppercase tracking-tight"
            style={{ fontSize: '38px', lineHeight: 0.88, letterSpacing: '-1.2px' }}
          >
            24 arm
            <br />
            <span
              className="bg-clip-text text-transparent gradient-shimmer"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #000 0%, #8E6F2E 45%, #F59E0B 80%)',
              }}
            >
              gestures.
            </span>
          </h2>
          <p
            className="font-inter text-black/50 mt-1"
            style={{ fontSize: '9px', letterSpacing: '0.08em' }}
          >
            Firmware 1.5.1 · live via G1ArmActionClient
          </p>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {GESTURES.map((g, i) => (
            <div
              key={g}
              className="flex items-center gap-1.5 bg-black/[0.035] rounded-md px-1.5 py-1 border border-black/5"
            >
              <Hand className="w-2.5 h-2.5 text-amber-600 flex-shrink-0" />
              <span
                className="font-mono text-black/75 truncate"
                style={{ fontSize: '8px', letterSpacing: '0.01em' }}
              >
                <span className="text-black/30 mr-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {g}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <span
            className="rounded-full px-3 py-1 font-semibold text-white self-start"
            style={{
              fontSize: '8px',
              background: '#0B0B0B',
              letterSpacing: '0.1em',
            }}
          >
            + 19 Training Mode recordings
          </span>
          <PartnerLockup theme="light" />
        </div>
      </div>
    </div>
  )
}
