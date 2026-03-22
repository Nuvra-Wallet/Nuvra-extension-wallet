import React, { useState, useRef } from 'react'
import SlideButton from '../components/SlideButton'
import PinModal from '../components/PinModal'

const TOKENS = [
  { symbol:'BTC',  name:'Bitcoin Mainnet',  img:'/home/token_btc.png',  balance:'0.042 BTC',  fiat:'$2,698.51' },
  { symbol:'ARCH', name:'Arch Network',     img:'/home/token_arch.png', balance:'1250 ARCH',  fiat:'$1,550.00' },
  { symbol:'ETH',  name:'Ethereum Mainnet', img:'/home/token_eth.png',  balance:'0.5 ETH',    fiat:'$1,725.06' },
  { symbol:'USDC', name:'Arch Network',     img:'/home/token_usdc.png', balance:'250 USDC',   fiat:'$250.00'   },
  { symbol:'USDT', name:'Arch Network',     img:'/home/token_usdt.png', balance:'100 USDT',   fiat:'$100.00'   },
]

function TokIcon({ t, size=32 }) {
  if (t?.img) return <img src={t.img} alt={t.symbol} style={{ width:size, height:size, borderRadius:'50%', objectFit:'contain', flexShrink:0 }}/>
  return <div style={{ width:size, height:size, borderRadius:'50%', background:'rgba(39,117,202,0.25)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><span style={{ fontSize:size*0.4, color:'#2775ca', fontWeight:700 }}>$</span></div>
}

// ── Token selector modal ──────────────────────────────────────────────────────
function TokenModal({ onSelect, onClose, exclude }) {
  return (
    <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.85)', zIndex:80, display:'flex', alignItems:'flex-end', backdropFilter:'blur(8px)' }} onClick={onClose}>
      <div style={{ width:'100%', background:'#13131f', borderRadius:'24px 24px 0 0', border:'1px solid rgba(255,255,255,0.1)', borderBottom:'none', paddingBottom:44, animation:'slideUp 0.3s cubic-bezier(0.4,0,0.2,1)' }} onClick={e => e.stopPropagation()}>
        <div style={{ width:40, height:4, background:'rgba(255,255,255,0.15)', borderRadius:2, margin:'12px auto 0' }}/>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 20px 14px' }}>
          <div style={{ fontFamily:'Syne,sans-serif', fontSize:18, fontWeight:700, color:'#fff' }}>Select Token</div>
          <div onClick={onClose} style={{ width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2L12 12M12 2L2 12" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </div>
        </div>
        {TOKENS.filter(t => t.symbol !== exclude?.symbol).map((t, i) => (
          <div key={i} onClick={() => { onSelect(t); onClose() }}
            style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 20px', cursor:'pointer', borderBottom:'1px solid rgba(255,255,255,0.05)' }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background='transparent'}>
            <TokIcon t={t} size={44}/>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:600, color:'#fff', fontFamily:'DM Sans,sans-serif' }}>{t.symbol}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif' }}>{t.name}</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:13, fontWeight:600, color:'#fff', fontFamily:'DM Sans,sans-serif' }}>{t.balance}</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif' }}>{t.fiat}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Bridge confirm modal ──────────────────────────────────────────────────────
function BridgeModal({ from, to, amount, onClose, onConfirm }) {
  return (
    <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.85)', zIndex:80, display:'flex', alignItems:'flex-end', backdropFilter:'blur(8px)' }} onClick={onClose}>
      <div style={{ width:'100%', background:'#13131f', borderRadius:'24px 24px 0 0', border:'1px solid rgba(255,255,255,0.1)', borderBottom:'none', paddingBottom:40, animation:'slideUp 0.3s cubic-bezier(0.4,0,0.2,1)' }} onClick={e => e.stopPropagation()}>
        <div style={{ width:40, height:4, background:'rgba(255,255,255,0.15)', borderRadius:2, margin:'12px auto 0' }}/>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 20px 18px' }}>
          <div style={{ fontFamily:'Syne,sans-serif', fontSize:18, fontWeight:700, color:'#fff' }}>Bridge Token</div>
          <div onClick={onClose} style={{ width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2L12 12M12 2L2 12" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </div>
        </div>

        {/* Token pair */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', marginBottom:16, position:'relative', height:72 }}>
          <div style={{ position:'absolute', left:'50%', transform:'translateX(-68px)', zIndex:2 }}><TokIcon t={from} size={64}/></div>
          <div style={{ position:'absolute', left:'50%', transform:'translateX(-12px)', zIndex:3, width:24, height:24, borderRadius:'50%', background:'#1e1e2c', border:'2px solid #13131f', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6H10M7 3L10 6L7 9" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div style={{ position:'absolute', left:'50%', transform:'translateX(4px)', zIndex:2 }}><TokIcon t={to} size={64}/></div>
        </div>

        <div style={{ textAlign:'center', fontFamily:'Syne,sans-serif', fontSize:20, fontWeight:800, color:'#fff', marginBottom:6 }}>
          {from.symbol}&nbsp; to &nbsp;{to.symbol}
        </div>
        <div style={{ textAlign:'center', fontSize:13, color:'rgba(255,255,255,0.35)', fontFamily:'DM Sans,sans-serif', marginBottom:22 }}>
          Bridge ${amount || '0.00'} worth of {from.symbol}
        </div>

        {/* Details */}
        <div style={{ margin:'0 20px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, marginBottom:24 }}>
          {[
            [`Bridge ${from.symbol}`, <TokIcon t={from} size={20}/>, `$${amount || '0'}`],
            [`Receive ${to.symbol}`,  <TokIcon t={to}   size={20}/>, `~${amount || '0'} ${to.symbol}`],
            ['Est. Fee', null, '$1.20'],
          ].map(([label, icon, val], i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 16px', borderBottom: i<2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                {icon || <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/></svg>}
                <span style={{ fontSize:14, color:'rgba(255,255,255,0.55)', fontFamily:'DM Sans,sans-serif' }}>{label}</span>
              </div>
              <span style={{ fontSize:14, fontWeight:600, color:'#fff', fontFamily:'DM Sans,sans-serif' }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'center' }}>
          <SlideButton label="Slide to bridge" onConfirm={onConfirm}/>
        </div>
      </div>
    </div>
  )
}

// ── Success screen ────────────────────────────────────────────────────────────
function BridgeSuccess({ from, to, amount, onDone }) {
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', background:'#0d0d14', alignItems:'center', justifyContent:'center', padding:'40px 28px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:20, left:20 }}>
        <img src="/logo_nv_orange.png" alt="NV" style={{ width:40, height:26, objectFit:'contain' }}/>
      </div>
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:260, background:'radial-gradient(ellipse at 50% 110%, rgba(255,122,47,0.35) 0%, transparent 65%)', pointerEvents:'none' }}/>

      <div style={{ fontFamily:'Syne,sans-serif', fontSize:20, fontWeight:800, color:'#fff', marginBottom:36, textAlign:'center' }}>
        Token Bridged Successfully
      </div>

      {/* Overlapping token icons */}
      <div style={{ position:'relative', width:148, height:80, marginBottom:22 }}>
        <div style={{ position:'absolute', left:0, top:0 }}><TokIcon t={from} size={80}/></div>
        <div style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', zIndex:3, width:28, height:28, borderRadius:'50%', background:'#1e1e2c', border:'2px solid #0d0d14', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7H12M8 3L12 7L8 11" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={{ position:'absolute', right:0, top:0, zIndex:2 }}><TokIcon t={to} size={80}/></div>
      </div>

      <div style={{ fontFamily:'Syne,sans-serif', fontSize:22, fontWeight:800, color:'#fff', marginBottom:8 }}>
        {from.symbol}&nbsp; to &nbsp;{to.symbol}
      </div>
      <div style={{ fontSize:13, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif', marginBottom:52 }}>
        ${amount || '0'} bridged successfully
      </div>

      <button onClick={onDone} style={{ width:'100%', maxWidth:300, height:54, borderRadius:30, background:'linear-gradient(135deg,#ff7a2f,#e05500)', border:'none', color:'#fff', fontFamily:'DM Sans,sans-serif', fontSize:16, fontWeight:700, cursor:'pointer', boxShadow:'0 0 40px rgba(255,122,47,0.5), 0 8px 24px rgba(255,122,47,0.35)', position:'relative', zIndex:1 }}>
        Done
      </button>
    </div>
  )
}

const KEYPAD = [['1','2','3'],['4','5','6'],['7','8','9'],['.','0','←']]

export default function BridgeScreen() {
  const [fromTok,   setFromTok]   = useState(TOKENS[0])
  const [toTok,     setToTok]     = useState(TOKENS[1])
  const [amount,    setAmount]    = useState('')
  const [showFrom,  setShowFrom]  = useState(false)
  const [showTo,    setShowTo]    = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showPin,   setShowPin]   = useState(false)
  const [success,   setSuccess]   = useState(false)

  const press = k => {
    if (k === '←') { setAmount(a => a.slice(0,-1)); return }
    if (k === '.' && amount.includes('.')) return
    if (amount === '0' && k !== '.') { setAmount(k); return }
    setAmount(a => a.length < 10 ? a + k : a)
  }

  const swap = () => { const tmp = fromTok; setFromTok(toTok); setToTok(tmp); setAmount('') }
  const canBridge = amount && parseFloat(amount) > 0

  if (success) return <BridgeSuccess from={fromTok} to={toTok} amount={amount} onDone={() => { setSuccess(false); setAmount('') }}/>

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', background:'#0d0d14', position:'relative' }}>

      {/* TOP NAV */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px 0', flexShrink:0 }}>
        <img src="/logo_nv_orange.png" alt="NV" style={{ width:40, height:26, objectFit:'contain' }}/>
        <div style={{ fontFamily:'Syne,sans-serif', fontSize:17, fontWeight:700, color:'#fff' }}>Bridge Assets</div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity:0.6 }}>
            <path d="M17 5C17 2.8 13.9 1 10 1C6.1 1 3 2.8 3 5C3 9 1 11 1 11H19C19 11 17 9 17 5Z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" fill="none"/>
            <path d="M11.7 15C11.4 15.6 10.8 16 10 16C9.2 16 8.6 15.6 8.3 15" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <img src="/home/avatar.png" alt="" style={{ width:32, height:32, borderRadius:'50%', objectFit:'cover', border:'2px solid rgba(255,122,47,0.4)' }}/>
        </div>
      </div>

      {/* TOKEN PAIR */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, padding:'16px 20px 0', flexShrink:0 }}>
        <div onClick={() => setShowFrom(true)} style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:24, padding:'8px 14px 8px 10px', cursor:'pointer' }}>
          <TokIcon t={fromTok} size={26}/>
          <span style={{ fontSize:14, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' }}>{fromTok.symbol}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
        <div onClick={swap} style={{ width:38, height:38, borderRadius:'50%', background:'linear-gradient(135deg,#ff7a2f,#e05500)', border:'3px solid #0d0d14', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 4px 14px rgba(255,122,47,0.45)', transition:'transform 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform='rotate(180deg)'}
          onMouseLeave={e => e.currentTarget.style.transform='rotate(0deg)'}>
          <img src="/icon_arrow_horizontal.png" alt="flip" style={{ width:16, height:16, objectFit:'contain' }}/>
        </div>
        <div onClick={() => setShowTo(true)} style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:24, padding:'8px 14px 8px 10px', cursor:'pointer' }}>
          <TokIcon t={toTok} size={26}/>
          <span style={{ fontSize:14, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' }}>{toTok.symbol}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
      </div>

      {/* AMOUNT */}
      <div style={{ textAlign:'center', padding:'22px 20px 4px', flexShrink:0 }}>
        <div style={{ fontFamily:'Syne,sans-serif', fontSize:42, fontWeight:800, letterSpacing:-2,
          color: amount ? '#fff' : 'rgba(255,255,255,0.25)' }}>
          {amount ? `$${amount}` : '$0.0'}
        </div>
      </div>

      {/* Balance row */}
      <div style={{ display:'flex', justifyContent:'space-between', padding:'0 24px 14px', flexShrink:0 }}>
        <span style={{ fontSize:12, color:'rgba(255,255,255,0.3)', fontFamily:'DM Sans,sans-serif' }}>Balance: {fromTok.balance}</span>
        <span style={{ fontSize:12, color:'rgba(255,255,255,0.3)', fontFamily:'DM Sans,sans-serif' }}>0.00 {fromTok.symbol}</span>
      </div>

      {/* From / To summary */}
      <div style={{ display:'flex', gap:10, padding:'0 16px 12px', flexShrink:0 }}>
        {[{ label:'From', tok:fromTok }, { label:'To', tok:toTok }].map(({ label, tok }) => (
          <div key={label} style={{ flex:1, display:'flex', alignItems:'center', gap:10, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:'10px 12px' }}>
            <TokIcon t={tok} size={28}/>
            <div>
              <div style={{ fontSize:10, color:'rgba(255,255,255,0.3)', fontFamily:'DM Sans,sans-serif', marginBottom:1 }}>{label}</div>
              <div style={{ fontSize:13, fontWeight:600, color:'#fff', fontFamily:'DM Sans,sans-serif' }}>{amount || '0.00'}</div>
            </div>
          </div>
        ))}
      </div>

      {/* KEYPAD */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'0 16px 8px', justifyContent:'flex-end' }}>
        {KEYPAD.map((row, ri) => (
          <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', flex:1 }}>
            {row.map((k, ci) => (
              <div key={ci} onClick={() => press(k)}
                style={{ display:'flex', alignItems:'center', justifyContent:'center', cursor: k==='.'?'default':'pointer', userSelect:'none', minHeight:48, borderRadius:10, transition:'background 0.1s' }}
                onMouseEnter={e => { if(k!=='.') e.currentTarget.style.background='rgba(255,255,255,0.06)' }}
                onMouseLeave={e => e.currentTarget.style.background='transparent'}
                onMouseDown={e => { if(k!=='.') e.currentTarget.style.background='rgba(255,122,47,0.1)' }}
                onMouseUp={e => e.currentTarget.style.background='transparent'}>
                {k === '←' ? (
                  <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                    <path d="M8 1H22C22.6 1 23 1.4 23 2V16C23 16.6 22.6 17 22 17H8L1 9L8 1Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
                    <path d="M11 6L17 12M17 6L11 12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ) : k === '.' ? (
                  <span style={{ fontSize:26, fontWeight:300, color:'rgba(255,255,255,0.25)', lineHeight:1 }}>·</span>
                ) : (
                  <span style={{ fontSize:28, fontWeight:300, color:'rgba(255,255,255,0.85)', fontFamily:'DM Sans,sans-serif', lineHeight:1 }}>{k}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* BRIDGE BUTTON */}
      <div style={{ padding:'0 16px 14px', flexShrink:0 }}>
        <button onClick={() => canBridge && setShowModal(true)}
          style={{ width:'100%', height:50, borderRadius:30,
            background: canBridge ? 'linear-gradient(135deg,#ff7a2f,#e05500)' : 'rgba(80,30,5,0.7)',
            border:'none', color: canBridge ? '#fff' : 'rgba(255,255,255,0.3)',
            fontFamily:'DM Sans,sans-serif', fontSize:15, fontWeight:700,
            cursor: canBridge ? 'pointer' : 'default', transition:'all 0.2s',
            boxShadow: canBridge ? '0 6px 24px rgba(255,122,47,0.4)' : 'none' }}>
          Bridge {fromTok.symbol} to {toTok.symbol}
        </button>
      </div>

      {showFrom && <TokenModal onSelect={setFromTok} onClose={() => setShowFrom(false)} exclude={toTok}/>}
      {showTo   && <TokenModal onSelect={setToTok}   onClose={() => setShowTo(false)}   exclude={fromTok}/>}
      {showModal && (
        <BridgeModal from={fromTok} to={toTok} amount={amount}
          onClose={() => setShowModal(false)}
          onConfirm={() => { setShowModal(false); setShowPin(true) }}/>
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
