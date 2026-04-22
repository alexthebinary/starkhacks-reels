import { Cpu, Camera, Wifi, Battery, Compass, HardDrive } from 'lucide-react'
import PartnerLockup from './PartnerLockup'

const SPECS = [
  { icon: Cpu, label: 'Compute', val: 'NVIDIA Orin NX 16GB', sub: 'JetPack 6.2.1 · CUDA 12.6 · TRT 10.3' },
  { icon: HardDrive, label: 'Storage', val: '233 GB NVMe', sub: '15 GB RAM + 7.6 GB zram' },
  { icon: Camera, label: 'Vision', val: 'RealSense D435i', sub: 'RGB + depth · head-mounted' },
  { icon: Compass, label: 'IMU', val: 'Pelvis + torso', sub: '100 Hz DDS · quat/gyro/accel' },
  { icon: Wifi, label: 'Network', val: 'WiFi 6 · RTL8852BU', sub: 'RSSI fingerprinting · 28 APs' },
  { icon: Battery, label: 'Actuation', val: '29 DOF · waist unlocked', sub: 'Hip/knee/ankle torque feedback' },
]

export default function CardSpecHardware() {
  return (
    <div className="relative w-[270px] h-[480px] bg-black rounded-[18px] overflow-hidden scanlines grain">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 80% 15%, rgba(251,191,36,0.22) 0%, transparent 55%), linear-gradient(180deg, #0a0a0a 0%, #111 100%)',
        }}
      />
      <div className="shine-sweep delay-1" />

      <img
        src="./unitree-g1-hero.jpg"
        alt=""
        className="absolute top-0 right-0 w-[70%] h-[50%] object-cover opacity-40 pointer-events-none"
        style={{
          maskImage:
            'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%), linear-gradient(270deg, rgba(0,0,0,0.9) 0%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
          mixBlendMode: 'screen',
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
              Spec sheet · 01/05
            </span>
          </div>
          <h2
            className="font-grotesk text-white uppercase tracking-tight"
            style={{ fontSize: '38px', lineHeight: 0.88, letterSpacing: '-1.2px' }}
          >
            Hardware
            <br />
            <span className="text-amber-400">stack.</span>
          </h2>
          <p
            className="font-inter text-white/60 mt-1"
            style={{ fontSize: '9px', letterSpacing: '0.08em' }}
          >
            Unitree G1 EDU+ · 29 DOF humanoid
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {SPECS.map(({ icon: Icon, label, val, sub }) => (
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
                  style={{ fontSize: '8px', letterSpacing: '0.02em' }}
                >
                  {sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        <PartnerLockup theme="dark" />
      </div>
    </div>
  )
}
