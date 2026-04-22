import { Brain, Eye, MessageSquare, Map, Mic, Zap } from 'lucide-react'
import PartnerLockup from './PartnerLockup'

const STACK = [
  { icon: Brain, label: 'LLM', val: 'Gemma 4 e2b (q4_K_M)', sub: 'Ollama · 100% GPU · Flash Attn · 4.4 tok/s' },
  { icon: Zap, label: 'Tool use', val: 'Native Gemma 4 calls', sub: '~9s warm · typed JSON schema' },
  { icon: Eye, label: 'Vision', val: 'NanoTrack + ORB', sub: 'OpenCV 4.13 · 30 fps tracking' },
  { icon: Map, label: 'Nav', val: 'Multi-waypoint autonomy', sub: 'Visual + WiFi + IMU localization' },
  { icon: Mic, label: 'Voice', val: 'faster-whisper + Chatterbox', sub: 'Arnold voice clone · ZMQ stream' },
  { icon: MessageSquare, label: 'SDK', val: 'unitree_sdk2py 1.0.1', sub: 'CycloneDDS 0.10.2 · ROS2 Humble' },
]

export default function CardSpecSoftware() {
  return (
    <div className="relative w-[270px] h-[480px] bg-black rounded-[18px] overflow-hidden scanlines grain">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 85%, rgba(99,102,241,0.18) 0%, transparent 55%), radial-gradient(circle at 80% 20%, rgba(251,191,36,0.18) 0%, transparent 55%), #0a0a0a',
        }}
      />
      <div className="shine-sweep delay-2" />

      {/* Code-style grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(251,191,36,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.04) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between p-5">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 urgent-dot" />
            <span
              className="font-grotesk text-amber-400 uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.28em' }}
            >
              Spec sheet · 02/05
            </span>
          </div>
          <h2
            className="font-grotesk text-white uppercase tracking-tight"
            style={{ fontSize: '38px', lineHeight: 0.88, letterSpacing: '-1.2px' }}
          >
            Software
            <br />
            <span className="text-amber-400">+ AI brain.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {STACK.map(({ icon: Icon, label, val, sub }) => (
            <div
              key={label}
              className="flex items-start gap-2.5 liquid-glass rounded-lg p-2"
            >
              <div className="w-7 h-7 rounded-md bg-amber-400/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className="font-grotesk text-white/50 uppercase"
                  style={{ fontSize: '7px', letterSpacing: '0.22em' }}
                >
                  {label}
                </div>
                <div
                  className="font-inter font-semibold text-white truncate"
                  style={{ fontSize: '10px', lineHeight: 1.15 }}
                >
                  {val}
                </div>
                <div
                  className="font-mono text-white/45 truncate"
                  style={{ fontSize: '8px' }}
                >
                  {sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5 flex-wrap">
            {['VLM scene loop', '360° scan', 'Door push', 'Room map', 'ORB SLAM', 'WBC policy'].map((c) => (
              <span
                key={c}
                className="liquid-glass rounded-full px-2 py-0.5 font-poppins text-white/85 border border-amber-400/25"
                style={{ fontSize: '7px' }}
              >
                {c}
              </span>
            ))}
          </div>
          <PartnerLockup theme="dark" />
        </div>
      </div>
    </div>
  )
}
