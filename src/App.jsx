import { useEffect, useRef, useState } from 'react'
import CardOne from './components/CardOne'
import CardTwo from './components/CardTwo'
import CardThree from './components/CardThree'
import CardFour from './components/CardFour'
import CardFive from './components/CardFive'
import CardSix from './components/CardSix'
import CardSpecHardware from './components/CardSpecHardware'
import CardSpecSoftware from './components/CardSpecSoftware'
import CardSpecGestures from './components/CardSpecGestures'
import CardSpecDances from './components/CardSpecDances'
import CardSpecController from './components/CardSpecController'
import { ChevronUp, ChevronDown } from 'lucide-react'
import DownloadMenu from './components/DownloadMenu'

const REELS = [
  { id: 'intro', Comp: CardOne, label: 'Intro', bg: '#0B0B0B', video: './videos/card-one.mp4' },
  { id: 'tagline', Comp: CardTwo, label: 'Build it', bg: '#0B0B0B', video: './videos/card-two.mp4' },
  { id: 'event', Comp: CardThree, label: 'Event', bg: '#ffffff', video: './videos/card-three.mp4' },
  { id: 'urgency', Comp: CardFour, label: 'Start building', bg: '#0B0B0B', video: './videos/card-four.mp4' },
  { id: 'vision', Comp: CardFive, label: 'Vision', bg: '#ffffff', video: './videos/card-five.mp4' },
  { id: 'prize', Comp: CardSix, label: 'Prize', bg: '#1a1a0a', video: './videos/card-six.mp4' },
  { id: 'spec-hw', Comp: CardSpecHardware, label: 'Hardware', bg: '#0B0B0B', video: './videos/card-spec-hardware.mp4' },
  { id: 'spec-sw', Comp: CardSpecSoftware, label: 'Software', bg: '#0B0B0B', video: './videos/card-spec-software.mp4' },
  { id: 'spec-ges', Comp: CardSpecGestures, label: 'Gestures', bg: '#ffffff', video: './videos/card-spec-gestures.mp4' },
  { id: 'spec-dance', Comp: CardSpecDances, label: 'Dances', bg: '#0B0B0B', video: './videos/card-spec-dances.mp4' },
  { id: 'spec-r3', Comp: CardSpecController, label: 'R3 Controller', bg: '#0B0B0B', video: './videos/card-spec-controller.mp4' },
]

export default function App() {
  const feedRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = feedRef.current
    if (!el) return
    const sections = el.querySelectorAll('[data-reel]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.6) {
            const idx = Number(e.target.getAttribute('data-reel'))
            setActive(idx)
          }
        })
      },
      { root: el, threshold: [0.6, 0.9] }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  const scrollTo = (idx) => {
    const el = feedRef.current?.querySelector(`[data-reel="${idx}"]`)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const go = (dir) => {
    const next = Math.max(0, Math.min(REELS.length - 1, active + dir))
    scrollTo(next)
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        go(-1)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  return (
    <div
      className="fixed inset-0"
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.35) 100%), url(./bg.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        ref={feedRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {REELS.map(({ id, Comp, bg, video }, i) => (
          <section
            key={id}
            data-reel={i}
            className="w-full h-screen snap-start snap-always flex items-center justify-center relative"
          >
            <ReelFrame cardId={id} bg={bg} videoFile={video}><Comp /></ReelFrame>
          </section>
        ))}
      </div>

      {/* Progress rail */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 pointer-events-auto">
        {REELS.map((r, i) => (
          <button
            key={r.id}
            onClick={() => scrollTo(i)}
            aria-label={`Go to ${r.label}`}
            className="group flex items-center gap-2"
          >
            <span
              className="hidden md:inline font-grotesk uppercase text-black/70 group-hover:text-amber-600 transition"
              style={{
                fontSize: '8px',
                letterSpacing: '0.2em',
                opacity: active === i ? 1 : 0,
              }}
            >
              {r.label}
            </span>
            <span
              className="block rounded-full transition-all"
              style={{
                width: active === i ? 8 : 4,
                height: active === i ? 24 : 4,
                background: active === i ? '#F59E0B' : 'rgba(0,0,0,0.3)',
                boxShadow:
                  active === i ? '0 0 12px rgba(251,191,36,0.6)' : 'none',
              }}
            />
          </button>
        ))}
      </div>

      {/* Counter + hint top-left */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-3 pointer-events-none">
        <span
          className="font-grotesk text-black/80 uppercase bg-white/70 backdrop-blur-md rounded-full px-3 py-1 shadow-sm"
          style={{ fontSize: '10px', letterSpacing: '0.25em' }}
        >
          {String(active + 1).padStart(2, '0')} / {String(REELS.length).padStart(2, '0')}
        </span>
      </div>

      {/* Swipe hint */}
      {active === 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 animate-bounce pointer-events-none">
          <span
            className="font-grotesk text-black/70 uppercase bg-white/60 backdrop-blur-sm rounded-full px-3 py-1"
            style={{ fontSize: '9px', letterSpacing: '0.25em' }}
          >
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 text-black/70" />
        </div>
      )}

      {/* Arrows (desktop) */}
      <button
        onClick={() => go(-1)}
        disabled={active === 0}
        aria-label="Previous reel"
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex w-10 h-10 rounded-full bg-white/70 backdrop-blur-md items-center justify-center text-black/70 hover:text-amber-600 shadow-sm disabled:opacity-20 transition"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
      <button
        onClick={() => go(1)}
        disabled={active === REELS.length - 1}
        aria-label="Next reel"
        className="fixed left-4 top-1/2 translate-y-8 z-50 hidden md:flex w-10 h-10 rounded-full bg-white/70 backdrop-blur-md items-center justify-center text-black/70 hover:text-amber-600 shadow-sm disabled:opacity-20 transition"
      >
        <ChevronDown className="w-5 h-5" />
      </button>
    </div>
  )
}

function ReelFrame({ children, cardId, bg, videoFile }) {
  const innerRef = useRef(null)

  return (
    <div
      className="relative"
      style={{
        width: 'min(calc(100vh * 9 / 16 - 48px), calc(100vw - 32px))',
        aspectRatio: '9 / 16',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 270,
          height: 480,
          transformOrigin: 'center',
          transform: 'scale(var(--reel-scale, 1))',
        }}
        ref={(el) => {
          innerRef.current = el
          if (!el) return
          const parent = el.parentElement
          if (!parent) return
          const update = () => {
            const h = parent.clientHeight
            el.style.setProperty('--reel-scale', String(h / 480))
          }
          update()
          const ro = new ResizeObserver(update)
          ro.observe(parent)
        }}
      >
        {children}
      </div>
      <div className="absolute inset-0 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <DownloadMenu cardRef={innerRef} cardId={cardId} bg={bg} videoFile={videoFile} />
        </div>
      </div>
    </div>
  )
}
