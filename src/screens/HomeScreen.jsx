import React, { useState } from 'react'

// ── Token icons ──────────────────────────────────────────────────────────────
const TOKEN_IMG = {
  BTC:  '/home/token_btc.png',
  ARCH: '/home/token_arch.png',
  ETH:  '/home/token_eth.png',
  USDC: '/home/token_usdc.png',
  USDT: '/home/token_usdt.png',
}

// ── QR Code (SVG generated) ──────────────────────────────────────────────────
function QRCode({ size = 160 }) {
  const cell = 6, cols = Math.floor(size / cell)
  const cells = []
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      const v = (i * 17 + j * 13 + 294) % 100
      if (v < 45 || ((i < 4 || i > cols - 5) && (j < 4 || j > cols - 5) && v < 90)) {
        cells.push(<rect key={`${i}-${j}`} x={j*cell} y={i*cell} width={cell-1} height={cell-1} rx="1" fill="#fff"/>)
      }
    }
  }
  const corner = (x, y) => (
    <g key={`c${x}${y}`}>
      <rect x={x} y={y} width={cell*7} height={cell*7} rx="4" fill="#fff"/>
      <rect x={x+cell} y={y+cell} width={cell*5} height={cell*5} rx="3" fill="#1a1a24"/>
      <rect x={x+cell*2} y={y+cell*2} width={cell*3} height={cell*3} rx="2" fill="#fff"/>
    </g>
  )
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="#1a1a24" rx="14"/>
      {cells}
      {corner(0,0)}{corner(size-cell*7,0)}{corner(0,size-cell*7)}
      {/* ARCH icon center */}
      <rect x={size/2-16} y={size/2-16} width={32} height={32} rx={8} fill="#ff7a2f"/>
      <image href="/home/token_arch.png" x={size/2-14} y={size/2-14} width={28} height={28}/>
    </svg>
  )
}

// ── Receive / QR Modal ───────────────────────────────────────────────────────
function ReceiveModal({ onClose }) {
  const [copied, setCopied] = useState(false)

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#0d0d14',
      zIndex: 60,
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideUp 0.32s cubic-bezier(0.4,0,0.2,1)',
    }}>

      {/* X close — top right */}
      <div onClick={onClose} style={{
        position: 'absolute', top: 16, right: 16, zIndex: 2,
        width: 34, height: 34, borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'background 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.18)'}
        onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.1)'}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 2L12 12M12 2L2 12" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Scrollable content */}
      <div style={{ flex:1, overflowY:'auto', scrollbarWidth:'none', display:'flex', flexDirection:'column', alignItems:'center', padding:'52px 24px 24px' }}>

        {/* Title */}
        <div style={{
          fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700,
          color: '#fff', textAlign: 'center', marginBottom: 24,
        }}>Top-up Wallet</div>

        {/* QR Code — dark rounded card */}
        <div style={{
          background: '#111118',
          borderRadius: 22,
          padding: 16,
          marginBottom: 16,
          boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <QRCode size={170}/>
        </div>

        {/* Scan code pill */}
        <div style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20, padding: '5px 22px',
          fontSize: 12, color: 'rgba(255,255,255,0.55)',
          fontFamily: 'DM Sans, sans-serif',
          marginBottom: 28,
        }}>
          Scan code
        </div>

        {/* Your Wallet Address */}
        <div style={{
          fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700,
          color: '#fff', textAlign: 'center', marginBottom: 6,
        }}>Your Wallet Address</div>

        <div style={{
          fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'center',
          lineHeight: 1.6, marginBottom: 18, fontFamily: 'DM Sans, sans-serif',
        }}>
          Use Arch Network to receive tokens to your wallet
        </div>

        {/* Address row */}
        <div style={{
          width: '100%',
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12, padding: '10px 14px', marginBottom: 12,
        }}>
          <img src="/home/token_arch.png" alt="" style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0 }}/>
          <span style={{
            flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.65)',
            fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>archxxxxxxxxcccccb2a3</span>
          <img src="/icon_wallet.png" alt="wallet" style={{ width:18, height:18, objectFit:'contain', opacity:0.55, flexShrink:0, cursor:'pointer' }}/>
        </div>

        {/* Share + Copy address */}
        <div style={{ width:'100%', display: 'flex', gap: 10, marginBottom: 24 }}>
          {/* Share button */}
          <button style={{
            width: 46, height: 46, borderRadius: 12,
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.07)'}
          >
            <img src="/icon_share.png" alt="Share" style={{ width:18, height:18, objectFit:'contain' }}/>
          </button>

          {/* Copy address button — icon + label side by side */}
          <button
            onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }}
            style={{
              flex: 1, height: 46, borderRadius: 12,
              background: copied ? 'rgba(31,208,144,0.12)' : 'rgba(255,255,255,0.07)',
              border: `1px solid ${copied ? 'rgba(31,208,144,0.3)' : 'rgba(255,255,255,0.1)'}`,
              color: copied ? '#1fd090' : 'rgba(255,255,255,0.75)',
              fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <img src="/icon_copy.png" alt="Copy"
              style={{ width:16, height:16, objectFit:'contain',
                filter: copied ? 'invert(70%) sepia(60%) saturate(400%) hue-rotate(110deg)' : 'invert(1) opacity(0.75)' }}/>
            {copied ? 'Copied!' : 'Copy address'}
          </button>
        </div>

        {/* Powered by */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'DM Sans, sans-serif',
        }}>
          Powered by
          <img src="/logo_powered_by.png" alt="NV" style={{ width: 18, height: 18, objectFit: 'contain', opacity: 0.7 }}/>
        </div>

      </div>
    </div>
  )
}

// ── Main HomeScreen ──────────────────────────────────────────────────────────
export default function HomeScreen({ onNav }) {
  const [showReceive, setShowReceive] = useState(false)
  const [showBanner,  setShowBanner]  = useState(true)

  const assets = [
    { symbol:'BTC',  name:'BTC',  sub:'Bitcoin Mainnet',  balance:'0.042 BTC',  fiat:'$2,698.51' },
    { symbol:'ARCH', name:'ARCH', sub:'Arch Network',     balance:'1250 ARCH',  fiat:'$1,550.00' },
    { symbol:'ETH',  name:'ETH',  sub:'Ethereum Mainnet', balance:'0.5 ETH',    fiat:'$1,725.06' },
    { symbol:'USDC', name:'USDC', sub:'Arch Network',     balance:'250 USDC',   fiat:'$250.00'   },
    { symbol:'USDT', name:'USDT', sub:'Arch Network',     balance:'100 USDT',   fiat:'$100.00'   },
  ]

  const actions = [
    { label:'Send',    img:'/home/icon_action_send.png',    action: () => onNav('send') },
    { label:'Receive', img:'/home/icon_action_receive.png', action: () => setShowReceive(true) },
    { label:'Swap',    img:'/home/icon_action_swap.png',    action: () => onNav('swap') },
    { label:'Buy',     img:'/home/icon_action_buy.png',     action: null },
  ]

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column',
      background:'#0d0d14', overflow:'hidden', position:'relative' }}>

      {/* ── TOP BAR ── */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'12px 16px 0', flexShrink:0 }}>

        {/* NV logo */}
        <img src="/logo_nv_orange.png" alt="NV"
          style={{ width:40, height:26, objectFit:'contain' }}/>

        {/* Right icons */}
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          {/* QR grid */}
          <div onClick={() => setShowReceive(true)} style={{ cursor:'pointer', opacity:0.8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5"/>
              <rect x="15" y="15" width="2" height="2" fill="rgba(255,255,255,0.8)"/>
              <path d="M19 14V19H14" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {/* Bell */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ cursor:'pointer', opacity:0.8 }}>
            <path d="M17 7C17 4.2 14.3 2 11 2C7.7 2 5 4.2 5 7C5 11.5 3 13 3 13H19C19 13 17 11.5 17 7Z" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" fill="none"/>
            <path d="M12.7 17C12.4 17.6 11.8 18 11 18C10.2 18 9.6 17.6 9.3 17" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {/* Avatar */}
          <img src="/home/avatar.png" alt="Profile"
            style={{ width:36, height:36, borderRadius:'50%', objectFit:'cover',
              border:'2px solid rgba(255,122,47,0.5)', cursor:'pointer' }}/>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="scroll-body" style={{ padding:'0' }}>

        {/* ── BALANCE CARD ── */}
        <div style={{
          margin:'12px 16px 16px',
          background:'#131320',
          border:'1px solid rgba(255,255,255,0.08)',
          borderRadius:20,
          position:'relative',
          overflow:'hidden',
        }}>
          {/* Ring watermark — covers the whole card background */}
          <img src="/home/card_watermark_ring.png" alt=""
            style={{ position:'absolute', inset:0, width:'100%', height:'100%',
              objectFit:'cover', pointerEvents:'none', userSelect:'none', opacity:0.55 }}/>

          {/* NV logo watermark — centered, top half, subtle */}
          <img src="/home/card_watermark_nv.png" alt=""
            style={{ position:'absolute', top:'10%', left:'50%', transform:'translateX(-50%)',
              width:'85%', height:'auto',
              objectFit:'contain', pointerEvents:'none', userSelect:'none', opacity:0.12 }}/>

          {/* ── TOTAL BALANCE ── */}
          <div style={{ textAlign:'center', padding:'22px 20px 16px', position:'relative', zIndex:1 }}>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.45)',
              fontFamily:'DM Sans,sans-serif', marginBottom:5, letterSpacing:0.4 }}>
              Total Balance
            </div>
            <div style={{ fontFamily:'Syne,sans-serif', fontSize:38, fontWeight:800,
              color:'#fff', letterSpacing:-1.5, lineHeight:1 }}>
              $6,723.57
            </div>
          </div>

          {/* ── ACTION BUTTONS — dark solid background ── */}
          <div style={{ display:'flex', justifyContent:'space-around',
            padding:'0 12px 22px', position:'relative', zIndex:1 }}>
            {actions.map((a, i) => (
              <div key={i} onClick={a.action}
                style={{ display:'flex', flexDirection:'column',
                  alignItems:'center', gap:8, cursor: a.action ? 'pointer' : 'default' }}>
                <div style={{
                  width:50, height:50, borderRadius:'50%',
                  background:'#1e1e2c',
                  border:'1px solid rgba(255,255,255,0.1)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'background 0.15s',
                  boxShadow:'0 2px 8px rgba(0,0,0,0.4)',
                }}
                  onMouseEnter={e => { if(a.action) e.currentTarget.style.background='#282838' }}
                  onMouseLeave={e => e.currentTarget.style.background='#1e1e2c'}
                >
                  <img src={a.img} alt={a.label} style={{ width:22, height:22, objectFit:'contain' }}/>
                </div>
                <span style={{ fontSize:11, color:'rgba(255,255,255,0.5)',
                  fontFamily:'DM Sans,sans-serif', fontWeight:500 }}>
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── BANNER ── */}
        {showBanner && (
          <div style={{ margin:'0 16px 22px', position:'relative', cursor:'pointer' }}>
            <img
              src="/home/banner_ad.png"
              alt="Banner"
              style={{ width:'100%', borderRadius:16, display:'block', objectFit:'cover' }}
            />
            <div onClick={() => setShowBanner(false)}
              style={{ position:'absolute', top:10, right:10, width:24, height:24,
                borderRadius:'50%', background:'rgba(0,0,0,0.45)',
                display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        )}

        {/* ── YOUR ASSETS ── */}
        <div style={{ padding:'0 16px 8px' }}>
          <div style={{ fontFamily:'Syne,sans-serif', fontSize:18, fontWeight:800,
            color:'#fff', marginBottom:16 }}>
            Your Assets
          </div>

          {/* Asset rows */}
          <div style={{ display:'flex', flexDirection:'column' }}>
            {assets.map((a, i) => (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:14,
                padding:'14px 0',
                borderBottom: i < assets.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                cursor:'pointer',
              }}>
                {/* Token icon circle with orange bg */}
                <div style={{ width:44, height:44, borderRadius:'50%',
                  background: a.symbol === 'ETH' ? 'rgba(98,126,234,0.2)' : 'rgba(255,122,47,0.15)',
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {TOKEN_IMG[a.symbol] ? (
                    <img src={TOKEN_IMG[a.symbol]} alt={a.symbol}
                      style={{ width:44, height:44, borderRadius:'50%', objectFit:'contain' }}/>
                  ) : (
                    <span style={{ fontSize:20, color:'#ff7a2f', fontWeight:700 }}>{a.symbol[0]}</span>
                  )}
                </div>

                {/* Name + subtitle */}
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:700, color:'#fff',
                    fontFamily:'DM Sans,sans-serif', marginBottom:3 }}>
                    {a.name}
                  </div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)',
                    fontFamily:'DM Sans,sans-serif' }}>
                    {a.sub}
                  </div>
                </div>

                {/* Balance + fiat */}
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontSize:14, fontWeight:700, color:'#fff',
                    fontFamily:'DM Sans,sans-serif', marginBottom:3 }}>
                    {a.balance}
                  </div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)',
                    fontFamily:'DM Sans,sans-serif' }}>
                    {a.fiat}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height:24 }}/>
      </div>

      {/* ── Receive QR Modal ── */}
      {showReceive && <ReceiveModal onClose={() => setShowReceive(false)}/>}
    </div>
  )
}
