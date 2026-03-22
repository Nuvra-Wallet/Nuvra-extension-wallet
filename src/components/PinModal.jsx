import React, { useState, useRef } from 'react'

const ROWS = [['1','2','3'],['4','5','6'],['7','8','9'],['.','0','←']]
const SAVED_PIN = '1234' // In production this would come from secure storage

/**
 * PinModal — overlay that asks the user to enter their PIN.
 * onSuccess() is called when the correct PIN is entered.
 * onCancel() is called when the user dismisses.
 */
export default function PinModal({ onSuccess, onCancel, title = 'Enter Pin code' }) {
  const [pin,   setPin]   = useState('')
  const [state, setState] = useState('idle') // idle | error | success
  const wrapRef = useRef(null)
  const MAX = 4

  const press = (k) => {
    if (state === 'success') return
    if (k === '←') { setPin(p => p.slice(0,-1)); if (state==='error') setState('idle'); return }
    if (k === '.') return
    if (pin.length >= MAX) return
    const next = pin + k
    setPin(next)
    if (next.length === MAX) setTimeout(() => evaluate(next), 160)
  }

  const evaluate = (entered) => {
    if (entered === SAVED_PIN) {
      setState('success')
      setTimeout(onSuccess, 700)
    } else {
      setState('error')
      if (wrapRef.current) {
        wrapRef.current.style.animation = 'pin_shake 0.45s ease'
        setTimeout(() => { if(wrapRef.current) wrapRef.current.style.animation = '' }, 460)
      }
      setTimeout(() => { setPin(''); setState('idle') }, 900)
    }
  }

  const dotColor = (i) => {
    if (i < pin.length) {
      if (state === 'error')   return '#ff5500'
      if (state === 'success') return '#1fd090'
      return '#ff7a2f'
    }
    return 'rgba(255,255,255,0.2)'
  }

  return (
    <>
      <style>{`
        @keyframes pin_shake {
          0%,100%{transform:translateX(0)}
          15%{transform:translateX(-7px)} 30%{transform:translateX(7px)}
          45%{transform:translateX(-5px)} 60%{transform:translateX(5px)}
          75%{transform:translateX(-3px)} 90%{transform:translateX(3px)}
        }
        @keyframes pinSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      {/* Backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-end',
      }} onClick={onCancel}>

        {/* Sheet */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%',
            background: '#0d0d14',
            borderRadius: '22px 22px 0 0',
            border: '1px solid rgba(255,255,255,0.09)',
            borderBottom: 'none',
            paddingBottom: 8,
            animation: 'pinSlideUp 0.32s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* Handle */}
          <div style={{ width:36, height:4, background:'rgba(255,255,255,0.15)', borderRadius:2, margin:'10px auto 0' }}/>

          {/* Logo */}
          <div style={{ display:'flex', justifyContent:'center', paddingTop:14 }}>
            <img src="/logo_nv_orange.png" alt="NV" style={{ width:40, height:26, objectFit:'contain' }}/>
          </div>

          {/* Lock icon */}
          <div style={{ display:'flex', justifyContent:'center', paddingTop:12 }}>
            <img src="/pin/lock.png" alt="Lock" style={{
              width: 72, height: 'auto', objectFit: 'contain',
              filter: state === 'success'
                ? 'hue-rotate(90deg) saturate(1.3) drop-shadow(0 8px 20px rgba(31,208,144,0.4))'
                : state === 'error'
                ? 'saturate(0.4) drop-shadow(0 8px 20px rgba(255,85,0,0.35))'
                : 'drop-shadow(0 8px 20px rgba(255,122,47,0.35))',
              transition: 'filter 0.35s ease',
            }}/>
          </div>

          {/* Title */}
          <div style={{
            textAlign: 'center', fontSize: 16, fontWeight: 600,
            color: '#fff', fontFamily: 'DM Sans,sans-serif',
            marginTop: 16, marginBottom: 4,
          }}>{title}</div>

          {/* Subtitle — wrong pin */}
          <div style={{
            textAlign: 'center', fontSize: 12,
            color: state === 'error' ? '#ff5500' : 'transparent',
            fontFamily: 'DM Sans,sans-serif', marginBottom: 14,
            transition: 'color 0.2s',
          }}>Wrong PIN, try again</div>

          {/* Dots */}
          <div ref={wrapRef} style={{ display:'flex', justifyContent:'center', gap:14, marginBottom:18 }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{
                width: 11, height: 11, borderRadius: '50%',
                background: dotColor(i),
                transition: 'background 0.15s, transform 0.15s',
                transform: i < pin.length ? 'scale(1.15)' : 'scale(1)',
              }}/>
            ))}
          </div>

          {/* Keypad */}
          <div style={{ padding:'0 16px 4px' }}>
            {ROWS.map((row, ri) => (
              <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)' }}>
                {row.map((k, ci) => (
                  <div key={ci} onClick={() => press(k)} style={{
                    display:'flex', alignItems:'center', justifyContent:'center',
                    height: 52, borderRadius: 10, cursor: k==='.' ? 'default' : 'pointer',
                    userSelect:'none', transition:'background 0.1s',
                  }}
                    onMouseEnter={e => { if(k!=='.') e.currentTarget.style.background='rgba(255,255,255,0.06)' }}
                    onMouseLeave={e => e.currentTarget.style.background='transparent'}
                    onMouseDown={e => { if(k!=='.') e.currentTarget.style.background='rgba(255,122,47,0.12)' }}
                    onMouseUp={e => e.currentTarget.style.background='transparent'}
                  >
                    {k === '←' ? (
                      <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                        <path d="M8 1H22C22.6 1 23 1.4 23 2V16C23 16.6 22.6 17 22 17H8L1 9L8 1Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
                        <path d="M11 6L17 12M17 6L11 12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    ) : k === '.' ? (
                      <span style={{ fontSize:24, color:'rgba(255,255,255,0.2)', lineHeight:1 }}>·</span>
                    ) : (
                      <span style={{ fontSize:28, fontWeight:300, color:'rgba(255,255,255,0.85)', fontFamily:'DM Sans,sans-serif', lineHeight:1 }}>{k}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Cancel */}
          <div onClick={onCancel} style={{
            textAlign:'center', fontSize:13, color:'rgba(255,255,255,0.35)',
            fontFamily:'DM Sans,sans-serif', padding:'8px 0 12px', cursor:'pointer',
            transition:'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color='rgba(255,255,255,0.65)'}
            onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.35)'}
          >Cancel</div>
        </div>
      </div>
    </>
  )
}
