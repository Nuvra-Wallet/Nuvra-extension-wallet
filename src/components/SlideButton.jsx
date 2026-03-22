import React, { useState, useRef, useEffect } from 'react'

/**
 * SlideButton — three visual states matching the design:
 *  idle     → thumb left,  "Slide to swap" label, dark track
 *  dragging → thumb moves, label fades, track fills orange
 *  release  → thumb right, "Release" label (snap-back zone)
 *  confirm  → full orange track, checkmark, fires onConfirm
 */
export default function SlideButton({ label = 'Slide to swap', onConfirm }) {
  const [pos,      setPos]      = useState(0)
  const [phase,    setPhase]    = useState('idle') // idle | dragging | release | confirmed
  const dragging = useRef(false)
  const startX   = useRef(0)

  const TRACK_W = 300
  const THUMB_W = 56
  const MAX     = TRACK_W - THUMB_W - 6
  const RELEASE_ZONE = MAX * 0.82  // past here → show "Release"

  const pct = pos / MAX

  // ── pointer handlers (mouse + touch) ─────────────────────────
  const onStart = (cx) => {
    if (phase === 'confirmed') return
    dragging.current = true
    startX.current = cx - pos
    setPhase('dragging')
  }

  const onMove = (cx) => {
    if (!dragging.current) return
    const next = Math.max(0, Math.min(MAX, cx - startX.current))
    setPos(next)
    setPhase(next >= RELEASE_ZONE ? 'release' : 'dragging')
  }

  const onEnd = () => {
    if (!dragging.current) return
    dragging.current = false
    if (pos >= RELEASE_ZONE) {
      // Confirmed!
      setPhase('confirmed')
      setPos(MAX)
      setTimeout(() => onConfirm(), 480)
    } else {
      // Snap back
      setPos(0)
      setPhase('idle')
    }
  }

  // Global mouse/touch up so release works even if cursor leaves track
  useEffect(() => {
    const up = () => onEnd()
    window.addEventListener('mouseup', up)
    window.addEventListener('touchend', up)
    return () => { window.removeEventListener('mouseup', up); window.removeEventListener('touchend', up) }
  }, [pos])

  // ── derived visuals ───────────────────────────────────────────
  const trackBg = phase === 'confirmed'
    ? 'linear-gradient(90deg, #ff7a2f, #e05500)'
    : `linear-gradient(90deg, rgba(255,122,47,${Math.min(0.35, pct * 0.45)}) 0%, rgba(30,20,10,0.6) ${Math.max(50, pct * 100 + 10)}%)`

  const thumbGlow = (phase === 'release' || phase === 'confirmed')
    ? '0 0 24px 6px rgba(255,122,47,0.7), 0 4px 16px rgba(255,122,47,0.5)'
    : '0 0 16px 4px rgba(255,122,47,0.45), 0 4px 12px rgba(255,122,47,0.3)'

  const trackLabel = phase === 'confirmed' ? 'Confirm' : phase === 'release' ? 'Release' : label
  const labelOpacity = phase === 'confirmed' ? 1 : Math.max(0, 1 - pct * 1.4)

  return (
    <div
      style={{
        width: TRACK_W,
        height: 60,
        borderRadius: 30,
        background: phase === 'confirmed'
          ? 'linear-gradient(90deg, #ff7a2f, #e05500)'
          : 'rgba(255,255,255,0.06)',
        border: phase === 'confirmed'
          ? 'none'
          : '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'visible',
        userSelect: 'none',
        cursor: 'default',
        transition: 'background 0.3s',
      }}
      onMouseMove={e => onMove(e.clientX)}
      onMouseLeave={() => { /* handled by global up */ }}
      onTouchMove={e => onMove(e.touches[0].clientX)}
    >
      {/* Track fill (shows behind thumb) */}
      {phase !== 'confirmed' && (
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${Math.min(100, pct * 100 + 12)}%`,
          background: 'rgba(255,122,47,0.18)',
          borderRadius: 30,
          pointerEvents: 'none',
          transition: dragging.current ? 'none' : 'width 0.25s',
        }}/>
      )}

      {/* Label */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingLeft: phase === 'confirmed' ? 0 : 20,
        fontSize: 15, fontWeight: 600, fontFamily: 'DM Sans,sans-serif',
        color: phase === 'confirmed' ? '#fff' : `rgba(255,255,255,${labelOpacity * 0.6})`,
        pointerEvents: 'none',
        transition: 'color 0.2s',
        letterSpacing: 0.2,
      }}>
        {trackLabel}
      </div>

      {/* Thumb */}
      <div
        style={{
          position: 'absolute',
          left: phase === 'confirmed' ? MAX + 3 : 3 + pos,
          top: 3,
          width: THUMB_W,
          height: THUMB_W,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff9040, #e05000)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: thumbGlow,
          cursor: phase === 'confirmed' ? 'default' : 'grab',
          zIndex: 2,
          transition: dragging.current ? 'none' : 'left 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s',
        }}
        onMouseDown={e => { e.preventDefault(); onStart(e.clientX) }}
        onTouchStart={e => onStart(e.touches[0].clientX)}
      >
        {phase === 'confirmed' ? (
          // Checkmark
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12L10 17L19 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          // Double chevron >>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M5 7L9 11L5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 7L15 11L11 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </div>
  )
}
