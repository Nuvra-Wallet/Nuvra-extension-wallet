import React, { useState, useRef } from 'react'
import SlideButton from '../components/SlideButton'
import PinModal from '../components/PinModal'

const TOKENS = [
  { symbol: 'BTC',  name: 'Bitcoin Mainnet',  img: '/home/token_btc.png',  balance: '0.042 BTC',  fiat: '$2,698.51' },
  { symbol: 'ARCH', name: 'Arch Network',     img: '/home/token_arch.png', balance: '1250 ARCH',  fiat: '$1,550.00' },
  { symbol: 'ETH',  name: 'Ethereum Mainnet', img: '/home/token_eth.png',  balance: '0.5 ETH',    fiat: '$1,725.06' },
  { symbol: 'USDC', name: 'Arch Network',     img: '/home/token_usdc.png', balance: '250 USDC',   fiat: '$250.00'   },
  { symbol: 'USDT', name: 'Arch Network',     img: '/home/token_usdt.png', balance: '100 USDT',   fiat: '$100.00'   },
]

const RATES = { BTC: 51814.766129, ARCH: 1480, ETH: 3142.5, USDC: 1, USDT: 1 }

// ── Token icon ────────────────────────────────────────────────────────────────
function TokIcon({ t, size = 36 }) {
  if (t?.img) return (
    <img src={t.img} alt={t.symbol}
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'contain', flexShrink: 0, display:'block' }}/>
  )
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: 'rgba(39,117,202,0.28)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ fontSize: size * 0.42, color: '#2775ca', fontWeight: 700, lineHeight:1 }}>$</span>
    </div>
  )
}

// ── Token pill button ─────────────────────────────────────────────────────────
function TokenPill({ t, onClick }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 7,
      background: '#1e1e2c', border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 30, padding: '7px 12px 7px 7px',
      cursor: 'pointer', flexShrink: 0,
      transition: 'background 0.15s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = '#2a2a3a'}
      onMouseLeave={e => e.currentTarget.style.background = '#1e1e2c'}>
      <TokIcon t={t} size={26}/>
      <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: 'DM Sans,sans-serif' }}>{t.symbol}</span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 4L6 8L10 4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

// ── Token selector modal ──────────────────────────────────────────────────────
function TokenModal({ onSelect, onClose, exclude }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 90,
      display: 'flex', alignItems: 'flex-end', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div style={{ width: '100%', background: '#13131f', borderRadius: '24px 24px 0 0',
        border: '1px solid rgba(255,255,255,0.1)', borderBottom: 'none',
        paddingBottom: 44, animation: 'slideUp 0.3s cubic-bezier(0.4,0,0.2,1)' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px 16px' }}>
          <div style={{ fontFamily: 'Syne,sans-serif', fontSize: 18, fontWeight: 700, color: '#fff' }}>Select Token</div>
          <div onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2L12 12M12 2L2 12" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Token list */}
        {TOKENS.filter(t => t.symbol !== exclude?.symbol).map((t, i, arr) => (
          <div key={i} onClick={() => { onSelect(t); onClose() }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px',
              cursor: 'pointer', transition: 'background 0.15s',
              borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <TokIcon t={t} size={46}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', fontFamily: 'DM Sans,sans-serif', marginBottom: 2 }}>{t.symbol}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', fontFamily: 'DM Sans,sans-serif' }}>{t.name}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', fontFamily: 'DM Sans,sans-serif', marginBottom: 2 }}>{t.balance}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', fontFamily: 'DM Sans,sans-serif' }}>{t.fiat}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


// ── Swap confirm modal ────────────────────────────────────────────────────────
function SwapModal({ from, to, fromAmt, toAmt, onClose, onConfirm }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 90,
      display: 'flex', alignItems: 'flex-end', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div style={{ width: '100%', background: '#13131f', borderRadius: '24px 24px 0 0',
        border: '1px solid rgba(255,255,255,0.1)', borderBottom: 'none',
        paddingBottom: 40, animation: 'slideUp 0.3s cubic-bezier(0.4,0,0.2,1)' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px 20px' }}>
          <div style={{ fontFamily: 'Syne,sans-serif', fontSize: 18, fontWeight: 700, color: '#fff' }}>Swap Token</div>
          <div onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2L12 12M12 2L2 12" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Overlapping token icons */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 16, position: 'relative', height: 72 }}>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-68px)', zIndex: 2 }}>
            <TokIcon t={from} size={64}/>
          </div>
          {/* Arrow overlap badge */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-12px)', zIndex: 3,
            width: 24, height: 24, borderRadius: '50%', background: '#1e1e2c',
            border: '2px solid #13131f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6H10M7 3L10 6L7 9" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(4px)', zIndex: 2 }}>
            <TokIcon t={to} size={64}/>
          </div>
        </div>

        {/* Pair name */}
        <div style={{ textAlign: 'center', fontFamily: 'Syne,sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6 }}>
          {from.symbol}&nbsp; to &nbsp;{to.symbol}
        </div>
        <div style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.35)', fontFamily: 'DM Sans,sans-serif', marginBottom: 24 }}>
          1 {from.symbol} ~ {(RATES[from.symbol] / RATES[to.symbol]).toFixed(3)} {to.symbol}
        </div>

        {/* Detail rows */}
        <div style={{ margin: '0 20px 28px', background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16 }}>
          {[
            { label: `Swap ${from.symbol}`, icon: <TokIcon t={from} size={22}/>, value: `= ${fromAmt}` },
            { label: `Get ${to.symbol}`,    icon: <TokIcon t={to}   size={22}/>, value: `= ${toAmt}` },
            { label: 'Est. Fee',             icon: <div style={{ width:22, height:22, borderRadius:'50%', background:'rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center' }}><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/></svg></div>, value: '$1.20' },
          ].map(({ label, icon, value }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {icon}
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', fontFamily: 'DM Sans,sans-serif' }}>{label}</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#fff', fontFamily: 'DM Sans,sans-serif' }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Slide button */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 4 }}>
          <SlideButton label="Slide to swap" onConfirm={onConfirm}/>
        </div>
      </div>
    </div>
  )
}

// ── Success screen ────────────────────────────────────────────────────────────
function SwapSuccess({ from, to, fromAmt, toAmt, onDone }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0d0d14',
      alignItems: 'center', justifyContent: 'center', padding: '40px 28px',
      position: 'relative', overflow: 'hidden' }}>

      {/* Logo top-left */}
      <div style={{ position: 'absolute', top: 20, left: 20 }}>
        <img src="/logo_nv_orange.png" alt="NV" style={{ width: 40, height: 26, objectFit: 'contain' }}/>
      </div>

      {/* Orange floor glow */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 260,
        background: 'radial-gradient(ellipse at 50% 110%, rgba(255,122,47,0.35) 0%, transparent 65%)',
        pointerEvents: 'none' }}/>

      <div style={{ fontFamily: 'Syne,sans-serif', fontSize: 22, fontWeight: 800, color: '#fff',
        marginBottom: 40, textAlign: 'center' }}>
        Successful Swap Token
      </div>

      {/* Overlapping token icons */}
      <div style={{ position: 'relative', width: 148, height: 80, marginBottom: 24 }}>
        <div style={{ position: 'absolute', left: 0, top: 0 }}>
          <TokIcon t={from} size={80}/>
        </div>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 3,
          width: 28, height: 28, borderRadius: '50%', background: '#1e1e2c',
          border: '2px solid #0d0d14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7H12M8 3L12 7L8 11" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, zIndex: 2 }}>
          <TokIcon t={to} size={80}/>
        </div>
      </div>

      <div style={{ fontFamily: 'Syne,sans-serif', fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 10 }}>
        {from.symbol}&nbsp; to &nbsp;{to.symbol}
      </div>
      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans,sans-serif', marginBottom: 56 }}>
        {fromAmt} {from.symbol} ~ {toAmt} {to.symbol}
      </div>

      <button onClick={onDone} style={{
        width: '100%', maxWidth: 320, height: 56, borderRadius: 30,
        background: 'linear-gradient(135deg, #ff7a2f, #e05500)',
        border: 'none', color: '#fff',
        fontFamily: 'DM Sans,sans-serif', fontSize: 16, fontWeight: 700,
        cursor: 'pointer',
        boxShadow: '0 0 40px rgba(255,122,47,0.5), 0 8px 24px rgba(255,122,47,0.35)',
        position: 'relative', zIndex: 1,
      }}>
        Done
      </button>
    </div>
  )
}

// ── Main SwapScreen ───────────────────────────────────────────────────────────
export default function SwapScreen({ onBack }) {
  const [fromTok,   setFromTok]   = useState(TOKENS[0])
  const [toTok,     setToTok]     = useState(TOKENS[1])
  const [fromAmt,   setFromAmt]   = useState('')
  const [showFrom,  setShowFrom]  = useState(false)
  const [showTo,    setShowTo]    = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showPin,   setShowPin]   = useState(false)
  const [success,   setSuccess]   = useState(false)

  const fromRate = RATES[fromTok.symbol] || 1
  const toRate   = RATES[toTok.symbol]   || 1
  const toAmt    = fromAmt
    ? ((parseFloat(fromAmt) * fromRate) / toRate).toLocaleString(undefined, { maximumFractionDigits: 6 })
    : '0.0'
  const rateStr  = `1 ${fromTok.symbol} = ${(fromRate / toRate).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${toTok.symbol}`

  const flipTokens = () => {
    const tmp = fromTok; setFromTok(toTok); setToTok(tmp); setFromAmt('')
  }

  const canSwap = fromAmt && parseFloat(fromAmt) > 0

  if (success) return (
    <SwapSuccess
      from={fromTok} to={toTok}
      fromAmt={fromAmt || '1'} toAmt={toAmt}
      onDone={() => { setSuccess(false); setFromAmt('') }}
    />
  )

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0d0d14', position: 'relative' }}>

      {/* ── TOP NAV ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px 0', flexShrink: 0 }}>
        <img src="/logo_nv_orange.png" alt="NV" style={{ width: 40, height: 26, objectFit: 'contain' }}/>
        <div style={{ fontFamily: 'Syne,sans-serif', fontSize: 17, fontWeight: 700, color: '#fff' }}>Swap Tokens</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.6, cursor: 'pointer' }}>
            <path d="M17 5C17 2.8 13.9 1 10 1C6.1 1 3 2.8 3 5C3 9 1 11 1 11H19C19 11 17 9 17 5Z" stroke="rgba(255,255,255,0.8)" strokeWidth="1.4" fill="none"/>
            <path d="M11.7 15C11.4 15.6 10.8 16 10 16C9.2 16 8.6 15.6 8.3 15" stroke="rgba(255,255,255,0.8)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <img src="/home/avatar.png" alt="" style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,122,47,0.45)' }}/>
        </div>
      </div>

      {/* ── SCROLLABLE BODY ── */}
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '22px 16px 0' }}>

        {/* ── PAY CARD ── */}
        <div style={{ background: '#131320', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 18, padding: '16px 16px 18px', marginBottom: 2, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans,sans-serif', fontWeight: 500 }}>Pay</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'DM Sans,sans-serif' }}>Balance: {fromTok.balance}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <input
              value={fromAmt}
              onChange={e => setFromAmt(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="0.0"
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontFamily: 'Syne,sans-serif', fontSize: 32, fontWeight: 700,
                color: fromAmt ? '#fff' : 'rgba(255,255,255,0.25)',
                minWidth: 0 }}
            />
            <TokenPill t={fromTok} onClick={() => setShowFrom(true)}/>
          </div>
        </div>

        {/* ── SWAP DIRECTION BUTTON (overlapping) ── */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 5, margin: '-1px 0' }}>
          <div
            onClick={flipTokens}
            style={{ width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff7a2f, #e05500)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 4px 16px rgba(255,122,47,0.45)',
              border: '3px solid #0d0d14',
              transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'rotate(180deg)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg)'}>
            <img src="/icon_arrow_updown.png" alt="flip" style={{ width:18, height:18, objectFit:'contain' }}/>
          </div>
        </div>

        {/* ── RECEIVE CARD ── */}
        <div style={{ background: '#131320', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 18, padding: '16px 16px 18px', marginTop: 2, marginBottom: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans,sans-serif', fontWeight: 500 }}>Receive</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'DM Sans,sans-serif' }}>Est. Fee: $1.20</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1, fontFamily: 'Syne,sans-serif', fontSize: 32, fontWeight: 700,
              color: fromAmt ? '#fff' : 'rgba(255,255,255,0.25)', minWidth: 0 }}>
              {toAmt}
            </div>
            <TokenPill t={toTok} onClick={() => setShowTo(true)}/>
          </div>
        </div>

        {/* ── RATE & PRICE IMPACT ── */}
        <div style={{ marginBottom: 24 }}>
          {[
            ['Rate', rateStr],
            ['Price Impact', '< 0.01%'],
          ].map(([label, value], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 4px', borderBottom: i === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <circle cx="4" cy="4" r="3.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                    <path d="M4 2.5V4.5M4 5.5V5.8" stroke="rgba(255,255,255,0.3)" strokeWidth="0.9" strokeLinecap="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans,sans-serif' }}>{label}</span>
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontFamily: 'DM Sans,sans-serif', fontWeight: 500 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SWAP BUTTON ── */}
      <div style={{ padding: '0 16px 24px', flexShrink: 0 }}>
        <button
          onClick={() => canSwap && setShowModal(true)}
          style={{
            width: '100%', height: 54, borderRadius: 30,
            background: canSwap
              ? 'linear-gradient(135deg, #ff7a2f, #e05500)'
              : 'rgba(80,30,5,0.7)',
            border: 'none',
            color: canSwap ? '#fff' : 'rgba(255,255,255,0.3)',
            fontFamily: 'DM Sans,sans-serif', fontSize: 16, fontWeight: 700,
            cursor: canSwap ? 'pointer' : 'default',
            transition: 'all 0.2s',
            boxShadow: canSwap ? '0 6px 24px rgba(255,122,47,0.4)' : 'none',
          }}>
          Swap
        </button>
      </div>

      {/* ── MODALS ── */}
      {showFrom && <TokenModal onSelect={t => setFromTok(t)} onClose={() => setShowFrom(false)} exclude={toTok}/>}
      {showTo   && <TokenModal onSelect={t => setToTok(t)}   onClose={() => setShowTo(false)}   exclude={fromTok}/>}
      {showModal && (
        <SwapModal
          from={fromTok} to={toTok}
          fromAmt={fromAmt} toAmt={toAmt}
          onClose={() => setShowModal(false)}
          onConfirm={() => { setShowModal(false); setShowPin(true) }}
        />
      )}
      {showPin && (
        <PinModal
          title="Confirm Transaction"
          onSuccess={() => { setShowPin(false); setSuccess(true) }}
          onCancel={() => setShowPin(false)}
        />
      )}
    </div>
  )
}
