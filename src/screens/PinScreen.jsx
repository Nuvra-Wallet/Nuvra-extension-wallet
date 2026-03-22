import React, { useState, useRef, useEffect } from 'react'

const KEYPAD_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', '←'],
]

export default function PinScreen({ onDone }) {
  const [pin,   setPin]   = useState('')
  const [state, setState] = useState('idle')   // idle | error | success
  const [phase, setPhase] = useState('set')    // set  | confirm
  const [first, setFirst] = useState('')
  const wrapRef = useRef(null)
  const MAX = 4

  /* ── handle key press ── */
  const press = (k) => {
    if (state === 'success') return
    if (k === '←') {
      setPin(p => p.slice(0, -1))
      if (state === 'error') setState('idle')
      return
    }
    if (k === '.') return   // dot does nothing
    if (pin.length >= MAX) return
    const next = pin + k
    setPin(next)
    if (next.length === MAX) setTimeout(() => evaluate(next), 160)
  }

  /* ── evaluate completed PIN ── */
  const evaluate = (entered) => {
    if (phase === 'set') {
      setFirst(entered)
      setPin('')
      setPhase('confirm')
      setState('idle')
    } else {
      if (entered === first) {
        setState('success')
        setTimeout(onDone, 900)
      } else {
        setState('error')
        if (wrapRef.current) {
          wrapRef.current.style.animation = 'pin_shake 0.45s ease'
          setTimeout(() => { if (wrapRef.current) wrapRef.current.style.animation = '' }, 460)
        }
        setTimeout(() => { setPin(''); setState('idle') }, 900)
      }
    }
  }

  /* ── dot color ── */
  const dotColor = (i) => {
    if (i < pin.length) {
      if (state === 'error')   return '#ff5500'
      if (state === 'success') return '#1fd090'
      return '#ff7a2f'
    }
    return 'rgba(255,255,255,0.25)'
  }

  return (
    <>
      <style>{`
        @keyframes pin_shake {
          0%,100% { transform: translateX(0); }
          15%      { transform: translateX(-7px); }
          30%      { transform: translateX(7px); }
          45%      { transform: translateX(-5px); }
          60%      { transform: translateX(5px); }
          75%      { transform: translateX(-3px); }
          90%      { transform: translateX(3px); }
        }
      `}</style>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#0d0d14',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* ── TOP: NV logo (left) + Back pill (right) ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 20px 0',
          flexShrink: 0,
        }}>
          {/* NV logo — transparent bg */}
          <img
            src="/logo_nv_orange.png"
            alt="NV"
            style={{ width: 40, height: 26, objectFit: 'contain', flexShrink: 0 }}
          />

          {/* Back pill */}
          <div
            onClick={() => { setPin(''); setState('idle'); setPhase('set'); setFirst('') }}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20,
              padding: '5px 16px',
              fontSize: 13,
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'DM Sans, sans-serif',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          >
            Back
          </div>
        </div>

        {/* ── LOCK ILLUSTRATION ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 44,
          paddingBottom: 0,
          flexShrink: 0,
        }}>
          <img
            src="/pin/lock.png"
            alt="Lock"
            style={{
              width: 110,
              height: 'auto',
              objectFit: 'contain',
              filter: state === 'success'
                ? 'hue-rotate(90deg) saturate(1.3) drop-shadow(0 10px 24px rgba(31,208,144,0.4))'
                : state === 'error'
                ? 'saturate(0.5) drop-shadow(0 10px 24px rgba(255,85,0,0.35))'
                : 'drop-shadow(0 10px 24px rgba(255,122,47,0.35))',
              transition: 'filter 0.4s ease',
            }}
          />
        </div>

        {/* ── "Enter Pin code" label ── */}
        <div style={{
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 600,
          color: '#fff',
          fontFamily: 'DM Sans, sans-serif',
          marginTop: 24,
          marginBottom: 18,
          flexShrink: 0,
        }}>
          {phase === 'set' ? 'Enter Pin code' : 'Confirm Pin code'}
        </div>

        {/* ── 4 DOTS ── */}
        <div
          ref={wrapRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16,
            marginBottom: 28,
            flexShrink: 0,
          }}
        >
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: dotColor(i),
                transition: 'background 0.15s ease, transform 0.15s ease',
                transform: i < pin.length ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* ── NUMERIC KEYPAD ── */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '0 20px 24px',
          justifyContent: 'center',
        }}>
          {KEYPAD_ROWS.map((row, ri) => (
            <div
              key={ri}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                flex: 1,
              }}
            >
              {row.map((k, ci) => (
                <div
                  key={ci}
                  onClick={() => press(k)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: k === '.' ? 'default' : 'pointer',
                    userSelect: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    borderRadius: 10,
                    transition: 'background 0.1s',
                    minHeight: 64,
                  }}
                  onMouseEnter={e => {
                    if (k !== '.') e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  }}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  onMouseDown={e => {
                    if (k !== '.') e.currentTarget.style.background = 'rgba(255,122,47,0.12)'
                  }}
                  onMouseUp={e => e.currentTarget.style.background = 'transparent'}
                >
                  {k === '←' ? (
                    /* Back arrow */
                    <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
                      <path
                        d="M9 1H24C24.6 1 25 1.4 25 2V18C25 18.6 24.6 19 24 19H9L1 10L9 1Z"
                        stroke="rgba(255,255,255,0.55)"
                        strokeWidth="1.6"
                        fill="none"
                      />
                      <path
                        d="M12 7L18 13M18 7L12 13"
                        stroke="rgba(255,255,255,0.55)"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : k === '.' ? (
                    /* dot — decorative, no action */
                    <span style={{
                      fontSize: 28,
                      fontWeight: 300,
                      color: 'rgba(255,255,255,0.25)',
                      fontFamily: 'DM Sans, sans-serif',
                      lineHeight: 1,
                    }}>·</span>
                  ) : (
                    /* Number */
                    <span style={{
                      fontSize: 30,
                      fontWeight: 300,
                      color: 'rgba(255,255,255,0.85)',
                      fontFamily: 'DM Sans, sans-serif',
                      lineHeight: 1,
                    }}>
                      {k}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </>
  )
}
