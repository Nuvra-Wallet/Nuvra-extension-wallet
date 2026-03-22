import React, { useState, useRef } from 'react'
import SlideButton from '../components/SlideButton'
import PinModal from '../components/PinModal'

const TOKENS = [
  { symbol:'ARCH', name:'Arch Network',     img:'/home/token_arch.png', balance:'1250 ARCH' },
  { symbol:'BTC',  name:'Bitcoin Mainnet',  img:'/home/token_btc.png',  balance:'0.042 BTC' },
  { symbol:'ETH',  name:'Ethereum Mainnet', img:'/home/token_eth.png',  balance:'0.5 ETH'   },
  { symbol:'USDC', name:'Arch Network',     img:'/home/token_usdc.png', balance:'250 USDC'  },
  { symbol:'USDT', name:'Arch Network',     img:'/home/token_usdt.png', balance:'100 USDT'  },
]

function TokIcon({ t, size=32 }) {
  if (t?.img) return <img src={t.img} alt={t.symbol} style={{ width:size, height:size, borderRadius:'50%', objectFit:'contain' }}/>
  return <div style={{ width:size, height:size, borderRadius:'50%', background:'rgba(255,122,47,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}><span style={{ fontSize:14, color:'#ff7a2f' }}>?</span></div>
}

function ConfirmModal({ token, amount, addr, onClose, onConfirm }) {
  return (
    <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.82)', zIndex:80, display:'flex', alignItems:'flex-end', backdropFilter:'blur(8px)' }} onClick={onClose}>
      <div style={{ width:'100%', background:'#13131f', borderRadius:'24px 24px 0 0', border:'1px solid rgba(255,255,255,0.1)', borderBottom:'none', padding:'0 0 40px', animation:'slideUp 0.3s cubic-bezier(0.4,0,0.2,1)' }} onClick={e => e.stopPropagation()}>
        <div style={{ width:40, height:4, background:'rgba(255,255,255,0.15)', borderRadius:2, margin:'12px auto 0' }}/>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 20px 16px' }}>
          <div style={{ fontFamily:'Syne,sans-serif', fontSize:18, fontWeight:700, color:'#fff' }}>Send Token</div>
          <div onClick={onClose} style={{ width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2L12 12M12 2L2 12" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </div>
        </div>

        {/* Token icon */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:10 }}>
          <div style={{ width:72, height:72, borderRadius:24, background:'rgba(255,122,47,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <TokIcon t={token} size={56}/>
          </div>
        </div>
        <div style={{ textAlign:'center', fontFamily:'Syne,sans-serif', fontSize:20, fontWeight:700, color:'#fff', marginBottom:4 }}>{token.symbol}</div>
        <div style={{ textAlign:'center', fontSize:13, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif', marginBottom:14 }}>{amount} {token.symbol} ~ 120 USDC</div>

        {/* Address */}
        <div style={{ margin:'0 20px 18px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, padding:'10px 14px', display:'flex', alignItems:'center', gap:8 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/><rect x="10" y="10" width="2" height="2" fill="rgba(255,255,255,0.4)"/><path d="M13 9V13H9" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round"/></svg>
          <span style={{ flex:1, fontSize:12, color:'rgba(255,255,255,0.5)', fontFamily:'monospace', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{addr || 'arch1p0m7a3v5p9h3z8x8i2c4j5h6g7f8e0'}</span>
        </div>

        {/* Details */}
        <div style={{ margin:'0 20px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, marginBottom:22 }}>
          {[
            [`Send ${token.symbol}`, <TokIcon t={token} size={18}/>, `= ${amount}`],
            ['Est. Fee', null, '$1.20'],
          ].map(([label, icon, val], i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', borderBottom: i===0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                {icon || <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/></svg>}
                <span style={{ fontSize:14, color:'rgba(255,255,255,0.55)', fontFamily:'DM Sans,sans-serif' }}>{label}</span>
              </div>
              <span style={{ fontSize:14, fontWeight:600, color:'#fff', fontFamily:'DM Sans,sans-serif' }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'center', paddingBottom:4 }}>
          <SlideButton label="Slide to send" onConfirm={onConfirm}/>
        </div>
      </div>
    </div>
  )
}

// Processing ring
function Processing() {
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', background:'#0d0d14', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'relative', width:130, height:130 }}>
        <svg width="130" height="130" style={{ position:'absolute', top:0, left:0 }}>
          <circle cx="65" cy="65" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7"/>
        </svg>
        <svg width="130" height="130" style={{ position:'absolute', top:0, left:0, transform:'rotate(-90deg)', transformOrigin:'65px 65px', animation:'rotate 1.4s linear infinite' }}>
          <defs><linearGradient id="arcG" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#ff7a2f"/><stop offset="100%" stopColor="#ffb347"/></linearGradient></defs>
          <circle cx="65" cy="65" r="52" fill="none" stroke="url(#arcG)" strokeWidth="7" strokeLinecap="round" strokeDasharray="326" strokeDashoffset="80"/>
        </svg>
      </div>
    </div>
  )
}

// Success screen
function SendSuccess({ token, amount, addr, onDone }) {
  const displayAddr = addr
    ? addr.length > 26 ? addr.slice(0, 14) + '...' + addr.slice(-8) : addr
    : 'arch1p0xxxxxxxxxx0bd8a0'

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', background:'#0d0d14', position:'relative', overflow:'hidden' }}>

      {/* Logo top-left */}
      <div style={{ position:'absolute', top:20, left:20, zIndex:2 }}>
        <img src="/logo_nv_orange.png" alt="NV" style={{ width:36, height:24, objectFit:'contain' }}/>
      </div>

      {/* Orange floor glow */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:240,
        background:'radial-gradient(ellipse at 50% 100%, rgba(255,122,47,0.32), transparent 68%)',
        pointerEvents:'none', zIndex:0 }}/>

      {/* Content — centered */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center',
        justifyContent:'center', padding:'60px 28px 20px', position:'relative', zIndex:1 }}>

        {/* Title */}
        <div style={{ fontFamily:'Syne,sans-serif', fontSize:20, fontWeight:800,
          color:'#fff', marginBottom:28, textAlign:'center', letterSpacing:0.2 }}>
          Transaction Successful
        </div>

        {/* Token icon */}
        <div style={{ width:80, height:80, borderRadius:'50%',
          background:'rgba(255,122,47,0.12)', border:'1px solid rgba(255,122,47,0.25)',
          display:'flex', alignItems:'center', justifyContent:'center',
          marginBottom:16, boxShadow:'0 8px 32px rgba(255,122,47,0.25)' }}>
          <TokIcon t={token} size={56}/>
        </div>

        {/* Token symbol */}
        <div style={{ fontFamily:'Syne,sans-serif', fontSize:24, fontWeight:800,
          color:'#fff', marginBottom:6 }}>
          {token.symbol}
        </div>

        {/* Amount line */}
        <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)',
          fontFamily:'DM Sans,sans-serif', marginBottom:4 }}>
          {amount} {token.symbol} ~ 120 USDC
        </div>

        {/* "to" label */}
        <div style={{ fontSize:12, color:'rgba(255,255,255,0.3)',
          fontFamily:'DM Sans,sans-serif', marginBottom:10, letterSpacing:0.5 }}>
          to
        </div>

        {/* Recipient address pill */}
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:44,
          background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
          borderRadius:10, padding:'9px 14px' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1.5" y="1.5" width="4" height="4" rx="0.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1"/>
            <rect x="8.5" y="1.5" width="4" height="4" rx="0.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1"/>
            <rect x="1.5" y="8.5" width="4" height="4" rx="0.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1"/>
            <rect x="9.5" y="9.5" width="1.5" height="1.5" fill="rgba(255,255,255,0.35)"/>
            <path d="M11.5 8.5V11.5H8.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize:12, color:'rgba(255,255,255,0.45)',
            fontFamily:'monospace', letterSpacing:0.3 }}>{displayAddr}</span>
        </div>

        {/* Done button */}
        <button onClick={onDone} style={{
          width:'100%', maxWidth:320, height:54, borderRadius:30,
          background:'linear-gradient(135deg,#ff7a2f,#e05500)',
          border:'none', color:'#fff',
          fontFamily:'DM Sans,sans-serif', fontSize:16, fontWeight:700,
          cursor:'pointer', marginBottom:28,
          boxShadow:'0 8px 32px rgba(255,122,47,0.45)',
          position:'relative', zIndex:1,
        }}>Done</button>

        {/* View Transaction + Share */}
        <div style={{ display:'flex', gap:44 }}>
          {[
            { label:'View Transaction', icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4"/>
                <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4"/>
                <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4"/>
                <rect x="12.5" y="12.5" width="2.5" height="2.5" fill="rgba(255,255,255,0.6)"/>
                <path d="M17 11.5V17H12" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            )},
            { label:'Share', icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="15" cy="4" r="2.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4"/>
                <circle cx="15" cy="16" r="2.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4"/>
                <circle cx="5" cy="10" r="2.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4"/>
                <path d="M7.2 9L12.8 5.5M7.2 11L12.8 14.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            )},
          ].map(({ label, icon }) => (
            <div key={label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, cursor:'pointer' }}>
              <div style={{ width:44, height:44, borderRadius:14,
                background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.09)',
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                {icon}
              </div>
              <span style={{ fontSize:11, color:'rgba(255,255,255,0.4)',
                fontFamily:'DM Sans,sans-serif', textAlign:'center', lineHeight:1.3 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SendScreen({ onBack }) {
  const [token,   setToken]   = useState(TOKENS[0])
  const [amount,  setAmount]  = useState('')
  const [addr,    setAddr]    = useState('')
  const [showTok, setShowTok] = useState(false)
  const [phase,   setPhase]   = useState('form') // form | confirm | pin | processing | success
  const [showPin, setShowPin] = useState(false)

  const valid = addr.trim().length > 4 && parseFloat(amount) > 0

  if (phase === 'processing') {
    setTimeout(() => setPhase('success'), 1800)
    return <Processing/>
  }
  if (phase === 'success') return <SendSuccess token={token} amount={amount} addr={addr} onDone={() => { setPhase('form'); setAmount(''); setAddr('') }}/>

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', background:'#0d0d14', position:'relative' }}>

      {/* TOP NAV */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px 0', flexShrink:0 }}>
        <img src="/logo_nv_orange.png" alt="NV" style={{ width:40, height:26, objectFit:'contain' }}/>
        <div style={{ fontFamily:'Syne,sans-serif', fontSize:17, fontWeight:700, color:'#fff' }}>Send Tokens</div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity:0.6 }}>
            <path d="M17 5C17 2.8 13.9 1 10 1C6.1 1 3 2.8 3 5C3 9 1 11 1 11H19C19 11 17 9 17 5Z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" fill="none"/>
            <path d="M11.7 15C11.4 15.6 10.8 16 10 16C9.2 16 8.6 15.6 8.3 15" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <img src="/home/avatar.png" alt="" style={{ width:32, height:32, borderRadius:'50%', objectFit:'cover', border:'2px solid rgba(255,122,47,0.4)' }}/>
        </div>
      </div>

      {/* Back pill — row below nav */}
      <div style={{ padding:'8px 16px 0', flexShrink:0 }}>
        <div onClick={onBack} style={{
          display:'inline-flex', alignItems:'center', gap:5,
          padding:'4px 12px', background:'rgba(255,255,255,0.07)',
          border:'1px solid rgba(255,255,255,0.1)', borderRadius:20,
          cursor:'pointer', fontSize:12, color:'rgba(255,255,255,0.6)',
          fontFamily:'DM Sans,sans-serif', transition:'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.12)'}
          onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.07)'}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 10L4 6L8 2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', scrollbarWidth:'none', padding:'20px 20px 0' }}>

        {/* ADDRESS input */}
        <div style={{ display:'flex', alignItems:'center', gap:12, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, padding:'14px 16px', marginBottom:18 }}>
          <input value={addr} onChange={e => setAddr(e.target.value)} placeholder="Paste address or scan QR"
            style={{ flex:1, background:'transparent', border:'none', outline:'none', color:'#fff', fontFamily:'DM Sans,sans-serif', fontSize:14 }}/>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity:0.5, cursor:'pointer', flexShrink:0 }}>
            <rect x="2" y="2" width="6" height="6" rx="1" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4"/>
            <rect x="12" y="2" width="6" height="6" rx="1" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4"/>
            <rect x="2" y="12" width="6" height="6" rx="1" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4"/>
            <rect x="13" y="13" width="2" height="2" fill="rgba(255,255,255,0.6)"/>
            <path d="M16.5 12V16.5H12" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>

        {/* AMOUNT + TOKEN */}
        <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, padding:'16px', marginBottom:24 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
            <span style={{ fontSize:12, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif' }}>Enter Amount</span>
            <span style={{ fontSize:12, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif' }}>Balance: {token.balance}</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <input value={amount} onChange={e => setAmount(e.target.value.replace(/[^0-9.]/g,''))} placeholder="0.00"
              style={{ flex:1, background:'transparent', border:'none', outline:'none', fontFamily:'Syne,sans-serif', fontSize:32, fontWeight:700, color:'#fff' }}/>
            <div onClick={() => setShowTok(true)} style={{ display:'flex', alignItems:'center', gap:7, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:24, padding:'7px 11px 7px 7px', cursor:'pointer', flexShrink:0 }}>
              <TokIcon t={token} size={24}/>
              <span style={{ fontSize:14, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' }}>{token.symbol}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* SEND BUTTON */}
      <div style={{ padding:'0 20px 20px', flexShrink:0 }}>
        <button onClick={() => setPhase('confirm')} disabled={!valid}
          style={{ width:'100%', height:54, borderRadius:16, background: valid ? 'linear-gradient(135deg,#ff7a2f,#e05500)' : 'rgba(120,50,10,0.5)', border:'none', color: valid ? '#fff' : 'rgba(255,255,255,0.35)', fontFamily:'DM Sans,sans-serif', fontSize:16, fontWeight:700, cursor: valid ? 'pointer' : 'default', transition:'all 0.2s', boxShadow: valid ? '0 4px 20px rgba(255,122,47,0.35)' : 'none' }}>
          Send
        </button>
      </div>

      {/* Token selector modal */}
      {showTok && (
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.82)', zIndex:80, display:'flex', alignItems:'flex-end', backdropFilter:'blur(8px)' }} onClick={() => setShowTok(false)}>
          <div style={{ width:'100%', background:'#13131f', borderRadius:'24px 24px 0 0', border:'1px solid rgba(255,255,255,0.1)', borderBottom:'none', padding:'0 0 44px', animation:'slideUp 0.3s cubic-bezier(0.4,0,0.2,1)' }} onClick={e => e.stopPropagation()}>
            <div style={{ width:40, height:4, background:'rgba(255,255,255,0.15)', borderRadius:2, margin:'12px auto 0' }}/>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 20px 14px' }}>
              <div style={{ fontFamily:'Syne,sans-serif', fontSize:18, fontWeight:700, color:'#fff' }}>Select Token</div>
              <div onClick={() => setShowTok(false)} style={{ width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2L12 12M12 2L2 12" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
            </div>
            {TOKENS.map((t, i) => (
              <div key={i} onClick={() => { setToken(t); setShowTok(false) }}
                style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 20px', cursor:'pointer', borderBottom:'1px solid rgba(255,255,255,0.05)' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                <TokIcon t={t} size={44}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:16, fontWeight:600, color:'#fff', fontFamily:'DM Sans,sans-serif' }}>{t.symbol}</div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif' }}>{t.name}</div>
                </div>
                <div style={{ fontSize:14, fontWeight:600, color:'#fff', fontFamily:'DM Sans,sans-serif' }}>{t.balance}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirm modal */}
      {phase === 'confirm' && (
        <ConfirmModal token={token} amount={amount} addr={addr}
          onClose={() => setPhase('form')}
          onConfirm={() => { setShowPin(true) }}/>
      )}

      {/* PIN modal — shown over confirm modal after slide */}
      {showPin && (
        <PinModal
          title="Confirm Transaction"
          onSuccess={() => { setShowPin(false); setPhase('processing') }}
          onCancel={() => { setShowPin(false) }}
        />
      )}
    </div>
  )
}
