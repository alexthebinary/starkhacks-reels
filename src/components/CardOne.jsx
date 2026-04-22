import { Trophy, ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import {
  motion,
  animate,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from 'framer-motion'
import PartnerLockup from './PartnerLockup'

export default function CardOne() {
  const wrapRef = useRef(null)

  // --- Mouse tilt (desktop) ---
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [8, -8]), {
    stiffness: 140,
    damping: 16,
  })
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [-6, 6]), {
    stiffness: 140,
    damping: 16,
  })
  const robotParallaxX = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 120,
    damping: 18,
  })
  const robotParallaxY = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 18,
  })

  const onMove = (e) => {
    const r = wrapRef.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  // --- Scroll-linked parallax ---
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end start'],
  })
  const robotScrollY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [40, 0, -40]
  )
  const robotScale = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    [0.92, 1.04, 1.04, 0.92]
  )
  const bgY = useTransform(scrollYProgress, [0, 1], [-10, 10])

  // --- Walk loop ---
  const walkX = useMotionValue(0) // drifts left/right across reel
  const stepY = useMotionValue(0) // small step bob
  const stepTilt = useMotionValue(0) // slight sway
  const facing = useMotionValue(1) // 1 = facing right (default), -1 = mirrored

  useEffect(() => {
    // Slow L/R walk across reel
    const c1 = animate(walkX, [-40, 40, -40], {
      duration: 9,
      repeat: Infinity,
      ease: 'easeInOut',
    })
    // Step bob — quick up/down like footfalls
    const c2 = animate(stepY, [0, -5, 0, -5, 0], {
      duration: 1.2,
      repeat: Infinity,
      ease: 'easeInOut',
    })
    // Micro sway
    const c3 = animate(stepTilt, [-1.2, 1.2, -1.2], {
      duration: 1.2,
      repeat: Infinity,
      ease: 'easeInOut',
    })
    // Flip when walking direction changes (at the extremes of walkX)
    const c4 = animate(facing, [1, 1, -1, -1, 1], {
      duration: 9,
      repeat: Infinity,
      ease: 'linear',
      times: [0, 0.48, 0.52, 0.98, 1],
    })
    return () => {
      c1.stop()
      c2.stop()
      c3.stop()
      c4.stop()
    }
  }, [])

  // Combine all X motions
  const robotX = useTransform(
    [walkX, robotParallaxX],
    ([a, b]) => a + b
  )
  const robotY = useTransform(
    [robotScrollY, robotParallaxY, stepY],
    ([a, b, c]) => a + b + c
  )
  // Shadow tracks X only (stays on floor plane)
  const shadowX = useTransform(walkX, (v) => v)
  const shadowScale = useTransform(stepY, (v) => 1 - v * 0.015) // grows as robot lifts

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative"
      style={{
        width: 270,
        height: 480,
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* CONIC BORDER */}
      <motion.div
        className="absolute inset-0 rounded-[18px]"
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      >
        <div className="conic-border rounded-[18px]">
          <div className="conic-border-inner rounded-[16px]" />
        </div>
      </motion.div>

      {/* TILTED CARD */}
      <motion.div
        className="absolute inset-0 rounded-[18px]"
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card frame — clipped */}
        <div className="absolute inset-0 rounded-[18px] overflow-hidden grain">
          <motion.div
            className="absolute inset-0"
            style={{
              y: bgY,
              background:
                'radial-gradient(circle at 50% 35%, #3a3a3a 0%, #141414 60%, #000 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.7) 90%, rgba(0,0,0,0.95) 100%)',
            }}
          />
          <div className="shine-sweep" />
        </div>

        {/* GROUND SHADOW — tracks walk X */}
        <motion.div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            bottom: '10%',
            width: '58%',
            height: 22,
            marginLeft: '-29%',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.22) 45%, transparent 72%)',
            filter: 'blur(6px)',
            x: shadowX,
            scale: shadowScale,
            transform: 'translateZ(4px)',
          }}
        />

        {/* ROBOT — centered, walking, breaks out at bottom */}
        <motion.img
          src="./unitree-product-2.png"
          alt="Unitree G1 walking"
          draggable={false}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '-8%',
            width: '92%',
            marginLeft: '-46%',
            pointerEvents: 'none',
            filter:
              'drop-shadow(0 18px 28px rgba(0,0,0,0.55)) drop-shadow(0 0 18px rgba(251,191,36,0.18))',
            translateZ: 80,
            x: robotX,
            y: robotY,
            scale: robotScale,
            rotate: stepTilt,
            scaleX: facing,
            transformOrigin: 'bottom center',
          }}
        />

        {/* FOREGROUND CONTENT */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-5 rounded-[18px] overflow-hidden"
          style={{ pointerEvents: 'none' }}
        >
          <div
            className="flex items-center gap-1.5 flex-wrap"
            style={{ pointerEvents: 'auto' }}
          >
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
              <img src="./starkhacks-logo.svg" alt="" className="w-3 h-3" />
              <span
                className="font-grotesk text-amber-400 uppercase"
                style={{ fontSize: '9px', letterSpacing: '0.2em' }}
              >
                Apr 17–19
              </span>
            </div>
          </div>

          <div style={{ marginTop: '-28px' }}>
            <h2
              className="font-grotesk text-white uppercase tracking-tight"
              style={{
                fontSize: '64px',
                lineHeight: 0.82,
                letterSpacing: '-2.5px',
                textShadow: '0 4px 24px rgba(0,0,0,0.65)',
              }}
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
                className="font-grotesk text-white/80 uppercase"
                style={{ fontSize: '14px', letterSpacing: '0.35em' }}
              >
                2026
              </span>
              <div className="flex-1 h-px bg-amber-400/40" />
              <span
                className="font-mono text-amber-400"
                style={{ fontSize: '9px', letterSpacing: '0.1em' }}
              >
                Purdue Armory
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3" style={{ pointerEvents: 'auto' }}>
            <p
              className="font-mono text-white/90 leading-relaxed"
              style={{
                fontSize: '11px',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
              }}
            >
              36 hours. Build on a Unitree G1 EDU+. Compete for{' '}
              <span className="text-amber-400 font-bold glow-pulse">
                $100,000
              </span>{' '}
              in total prizes.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 rounded-full py-2.5 cta-pulse box-glow-pulse"
              style={{
                background:
                  'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)',
                transformStyle: 'preserve-3d',
                translateZ: 40,
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
            </motion.button>
            <PartnerLockup theme="dark" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
