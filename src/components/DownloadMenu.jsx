import { useState, useRef, useEffect } from 'react'
import { Download, X, Check, Play } from 'lucide-react'
import { toPng } from 'html-to-image'

const FORMATS = [
  { id: 'ig-story', name: 'IG Story / Reel', w: 1080, h: 1920, tag: '9:16' },
  { id: 'ig-feed', name: 'IG Feed', w: 1080, h: 1350, tag: '4:5' },
  { id: 'square', name: 'Square Post', w: 1080, h: 1080, tag: '1:1' },
  { id: 'fb-ad', name: 'Facebook / Meta Ad', w: 1200, h: 628, tag: '~2:1' },
  { id: 'twitter', name: 'Twitter / X', w: 1200, h: 675, tag: '16:9' },
]

export default function DownloadMenu({ cardRef, cardId, bg = '#0a0a0a', videoFile }) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(null)
  const [done, setDone] = useState(null)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const capture = async (fmt) => {
    const node = cardRef.current
    if (!node || busy) return
    setBusy(fmt.id)
    setDone(null)

    try {
      const dataUrl = await toPng(node, {
        pixelRatio: 4,
        cacheBust: true,
        style: { transform: 'none' },
        filter: (n) => !(n instanceof HTMLElement && n.dataset?.noCapture),
      })

      const img = new Image()
      img.src = dataUrl
      await new Promise((res, rej) => {
        img.onload = res
        img.onerror = rej
      })

      const canvas = document.createElement('canvas')
      canvas.width = fmt.w
      canvas.height = fmt.h
      const ctx = canvas.getContext('2d')

      // Fill background
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, fmt.w, fmt.h)

      // Fit card (contain) — maintain 9:16 aspect
      const cardRatio = 9 / 16
      const targetRatio = fmt.w / fmt.h
      let dw, dh
      if (cardRatio < targetRatio) {
        dh = fmt.h
        dw = fmt.h * cardRatio
      } else {
        dw = fmt.w
        dh = fmt.w / cardRatio
      }
      const dx = (fmt.w - dw) / 2
      const dy = (fmt.h - dh) / 2

      ctx.drawImage(img, dx, dy, dw, dh)

      const link = document.createElement('a')
      link.download = `${cardId}-${fmt.id}-${fmt.w}x${fmt.h}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()

      setDone(fmt.id)
      setTimeout(() => setDone(null), 2000)
    } catch (err) {
      console.error('Capture failed:', err)
    } finally {
      setBusy(null)
    }
  }

  const downloadVideo = async () => {
    if (!videoFile || busy) return
    setBusy('video')
    setDone(null)
    try {
      const res = await fetch(videoFile)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = `${cardId}-animated-1080x1920.mp4`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
      setDone('video')
      setTimeout(() => setDone(null), 2000)
    } catch (err) {
      console.error('Video download failed:', err)
    } finally {
      setBusy(null)
    }
  }

  const downloadAll = async () => {
    if (videoFile) await downloadVideo()
    for (const fmt of FORMATS) {
      await capture(fmt)
      await new Promise((r) => setTimeout(r, 300))
    }
  }

  return (
    <div
      ref={menuRef}
      className="absolute z-50"
      style={{ top: 10, right: 10 }}
      data-no-capture=""
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center gap-1.5 transition-all"
        style={{
          height: 36,
          padding: open ? '0 10px' : '0 12px',
          borderRadius: 20,
          background: open ? 'rgba(245,158,11,0.95)' : 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.2)',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }}
        aria-label="Download card"
      >
        {open ? (
          <X style={{ width: 15, height: 15, color: '#000' }} />
        ) : (
          <>
            <Download style={{ width: 14, height: 14, color: '#fff' }} />
            <span style={{ color: '#fff', fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.03em' }}>Save</span>
          </>
        )}
      </button>

      {open && (
        <div
          className="absolute"
          style={{
            top: 34,
            right: 0,
            width: 210,
            background: 'rgba(10,10,10,0.94)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '8px 12px 6px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
                fontSize: 8,
                letterSpacing: '0.18em',
                fontWeight: 600,
              }}
            >
              Export format
            </span>
            <button
              onClick={downloadAll}
              disabled={busy !== null}
              style={{
                color: '#F59E0B',
                fontFamily: 'Inter, sans-serif',
                fontSize: 9,
                fontWeight: 600,
                background: 'none',
                border: 'none',
                cursor: busy ? 'wait' : 'pointer',
                opacity: busy ? 0.4 : 1,
                letterSpacing: '0.05em',
              }}
            >
              ALL
            </button>
          </div>

          {/* Video download — featured at top */}
          {videoFile && (
            <button
              onClick={downloadVideo}
              disabled={busy !== null}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(245,158,11,0.08)',
                border: 'none',
                borderBottom: '1px solid rgba(245,158,11,0.15)',
                cursor: busy ? 'wait' : 'pointer',
                opacity: busy && busy !== 'video' ? 0.35 : 1,
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(245,158,11,0.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(245,158,11,0.08)')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: 11.25,
                    height: 20,
                    border: '1.5px solid #F59E0B',
                    borderRadius: 2,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Play style={{ width: 8, height: 8, color: '#F59E0B', fill: '#F59E0B' }} />
                </div>
                <div>
                  <div
                    style={{
                      color: '#F59E0B',
                      fontSize: 11,
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    MP4 Video
                  </div>
                  <div
                    style={{
                      color: 'rgba(245,158,11,0.5)',
                      fontSize: 9,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    1080 x 1920 &middot; 5s animated
                  </div>
                </div>
              </div>

              <div style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {busy === 'video' ? (
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      border: '1.5px solid #F59E0B',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 0.6s linear infinite',
                    }}
                  />
                ) : done === 'video' ? (
                  <Check style={{ width: 12, height: 12, color: '#22c55e' }} />
                ) : (
                  <Download style={{ width: 11, height: 11, color: '#F59E0B' }} />
                )}
              </div>
            </button>
          )}

          {/* Image format list */}
          {FORMATS.map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => capture(fmt)}
              disabled={busy !== null}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '7px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                cursor: busy ? 'wait' : 'pointer',
                opacity: busy && busy !== fmt.id ? 0.35 : 1,
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Aspect ratio thumbnail */}
                <div
                  style={{
                    width: fmt.w > fmt.h ? 20 : 20 * (fmt.w / fmt.h),
                    height: fmt.h > fmt.w ? 20 : 20 * (fmt.h / fmt.w),
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      color: '#fff',
                      fontSize: 11,
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      lineHeight: 1.2,
                    }}
                  >
                    {fmt.name}
                  </div>
                  <div
                    style={{
                      color: 'rgba(255,255,255,0.3)',
                      fontSize: 9,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {fmt.w} x {fmt.h} &middot; {fmt.tag}
                  </div>
                </div>
              </div>

              <div style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {busy === fmt.id ? (
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      border: '1.5px solid #F59E0B',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 0.6s linear infinite',
                    }}
                  />
                ) : done === fmt.id ? (
                  <Check style={{ width: 12, height: 12, color: '#22c55e' }} />
                ) : (
                  <Download style={{ width: 11, height: 11, color: 'rgba(255,255,255,0.2)' }} />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
