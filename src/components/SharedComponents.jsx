import React, { useState } from 'react'
import { TOKENS } from '../data/constants'

// StatusBar is a no-op in the web wallet
export function StatusBar() { return null }

// ── Back Button ──────────────────────────────────────────────────────────────
export function BackBtn({ onClick }) {
  return (
    <div className="back-btn" onClick={onClick}
      style={{ width:36,height:36,borderRadius:10,background:'rgba(255,255,255,0.06)',
        border:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',
        justifyContent:'center',cursor:'pointer',transition:'background 0.2s',flexShrink:0 }}
      onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.1)'}
      onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M11 13L7 9L11 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

// ── Token Selector Modal ─────────────────────────────────────────────────────
export function TokenModal({ selected, onSelect, onClose, exclude }) {
  const [q, setQ] = useState('')
  const list = TOKENS
    .filter(t => t.symbol !== exclude?.symbol)
    .filter(t => t.symbol.toLowerCase().includes(q.toLowerCase()) || t.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div style={{ position:'absolute',inset:0,background:'rgba(0,0,0,0.75)',zIndex:60,
      display:'flex',alignItems:'flex-end',backdropFilter:'blur(6px)' }}
      onClick={onClose}>
      <div style={{ width:'100%',background:'#13131f',borderRadius:'28px 28px 0 0',
        border:'1px solid rgba(255,255,255,0.08)',borderBottom:'none',
        padding:'8px 0 40px',animation:'slideUp 0.35s cubic-bezier(0.4,0,0.2,1)' }}
        onClick={e=>e.stopPropagation()}>
        <div style={{ width:40,height:4,background:'rgba(255,255,255,0.15)',
          borderRadius:2,margin:'10px auto 18px' }}/>
        <div style={{ fontFamily:'Syne,sans-serif',fontSize:17,fontWeight:700,
          color:'#fff',textAlign:'center',marginBottom:14 }}>Select Token</div>
        <div style={{ margin:'0 20px 12px',background:'rgba(255,255,255,0.05)',
          border:'1px solid rgba(255,255,255,0.08)',borderRadius:12,
          padding:'10px 14px',display:'flex',alignItems:'center',gap:8 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="#55557a" strokeWidth="1.4"/>
            <path d="M11 11L14 14" stroke="#55557a" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <input placeholder="Search…" value={q} onChange={e=>setQ(e.target.value)}
            style={{ flex:1,background:'transparent',border:'none',outline:'none',
              color:'#fff',fontFamily:'DM Sans,sans-serif',fontSize:14 }} autoFocus/>
        </div>
        <div style={{ maxHeight:300,overflowY:'auto',padding:'0 20px',scrollbarWidth:'none' }}>
          {list.map((t,i)=>(
            <div key={i}
              style={{ display:'flex',alignItems:'center',gap:14,padding:'13px 12px',
                margin:'0 -12px',borderRadius:14,cursor:'pointer',
                background:selected?.symbol===t.symbol?'rgba(255,122,47,0.08)':'transparent',
                transition:'background 0.15s' }}
              onMouseEnter={e=>{ if(selected?.symbol!==t.symbol) e.currentTarget.style.background='rgba(255,255,255,0.04)' }}
              onMouseLeave={e=>{ e.currentTarget.style.background=selected?.symbol===t.symbol?'rgba(255,122,47,0.08)':'transparent' }}
              onClick={()=>{ onSelect(t); onClose() }}>
              <div style={{ width:42,height:42,borderRadius:14,background:t.bg,color:t.color,
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:18,fontWeight:700,flexShrink:0 }}>{t.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15,fontWeight:600,color:'#fff' }}>{t.symbol}</div>
                <div style={{ fontSize:12,color:'rgba(255,255,255,0.35)' }}>{t.name}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:14,fontWeight:600,color:'#fff' }}>{t.balance}</div>
                <div style={{ fontSize:12,color:'rgba(255,255,255,0.35)' }}>{t.fiat}</div>
              </div>
              {selected?.symbol===t.symbol&&(
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 9L8 13L14 6" stroke="#ff7a2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Blob background ──────────────────────────────────────────────────────────
export function BlobBg({ blobs = [] }) {
  return (
    <div style={{ position:'absolute',inset:0,overflow:'hidden',zIndex:0,pointerEvents:'none' }}>
      {blobs.map((b,i)=>(
        <div key={i} style={{ position:'absolute',borderRadius:'50%',filter:'blur(80px)',
          width:b.size,height:b.size,background:b.color,opacity:b.opacity,
          top:b.top,left:b.left,right:b.right,bottom:b.bottom,animation:b.animation }}/>
      ))}
    </div>
  )
}

// ── NuvraLogo ────────────────────────────────────────────────────────────────
export function NuvraLogo({ size='md' }) {
  const s = size==='lg'?36:32
  return (
    <div style={{ display:'flex',alignItems:'center',gap:8 }}>
      <img src="/onboarding/logo.png" alt="NUVRA" style={{ width:s,height:s,objectFit:'contain' }}/>
    </div>
  )
}

export function VerifiedBadge({ size=16 }) {
  return (
    <div style={{ width:size,height:size,borderRadius:'50%',background:'#0984e3',
      display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
      <svg width={size*0.6} height={size*0.6} viewBox="0 0 10 10" fill="none">
        <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}
