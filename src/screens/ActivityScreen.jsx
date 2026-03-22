import React, { useState, useMemo } from 'react'

const TOKEN_IMG = {
  BTC:  '/home/token_btc.png',
  ARCH: '/home/token_arch.png',
  ETH:  '/home/token_eth.png',
  USDC: '/home/token_usdc.png',
  USDT: '/home/token_usdt.png',
}

const TYPE_NAV_ICON = {
  bridge:  '/nav_bridge.png',
  swap:    '/nav_swap.png',
  send:    '/home/icon_action_send.png',
  receive: '/home/icon_action_receive.png',
}

const TRANSACTIONS = [
  { id:1,  type:'bridge',  label:'Bridge BTC',      token:'BTC',               amount:'-12223 BTC',    date:'2026-01-28 09:07', status:'completed' },
  { id:2,  type:'swap',    label:'Swap BTC/ARCH',   token:'BTC',  token2:'ARCH', amount:'-1222 BTC/ARCH', date:'2026-01-28 09:07', status:'completed' },
  { id:3,  type:'send',    label:'Send ARCH',        token:'ARCH',              amount:'-100 ARCH',     date:'2026-01-28 09:07', status:'completed' },
  { id:4,  type:'receive', label:'Receive BTC',      token:'BTC',               amount:'+0.01 BTC',     date:'2026-01-28 09:07', status:'pending'   },
  { id:5,  type:'swap',    label:'Swap ETH',         token:'ETH',               amount:'-0.1 ETH',      date:'2026-01-28 09:07', status:'pending'   },
  { id:6,  type:'bridge',  label:'Bridge BTC',       token:'BTC',               amount:'-12223 BTC',    date:'2026-01-28 09:07', status:'failed'    },
]

const STATUS = {
  completed: { bg:'rgba(31,208,144,0.12)',  color:'#1fd090', label:'Completed' },
  pending:   { bg:'rgba(255,193,7,0.10)',   color:'#ffc107', label:'Pending'   },
  failed:    { bg:'rgba(232,64,0,0.12)',    color:'#e84000', label:'Failed'    },
}

const FILTERS = [
  { id:'All',     label:'All',     icon: null },
  { id:'Bridge',  label:'Bridge',  icon:'/nav_bridge.png'               },
  { id:'Swap',    label:'Swap',    icon:'/nav_swap.png'                  },
  { id:'Send',    label:'Send',    icon:'/home/icon_action_send.png'     },
  { id:'Receive', label:'Receive', icon:'/home/icon_action_receive.png'  },
]

export default function ActivityScreen() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => TRANSACTIONS.filter(tx => {
    const mf = filter === 'All' || tx.type.toLowerCase() === filter.toLowerCase()
    const ms = !search || tx.label.toLowerCase().includes(search.toLowerCase())
    return mf && ms
  }), [filter, search])

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', background:'#0d0d14' }}>

      {/* TOP NAV */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px 0', flexShrink:0 }}>
        <img src="/logo_nv_orange.png" alt="NV" style={{ width:36, height:24, objectFit:'contain' }}/>
        <div style={{ fontFamily:'Syne,sans-serif', fontSize:17, fontWeight:700, color:'#fff' }}>Activity</div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity:0.55 }}>
            <path d="M17 5C17 2.8 13.9 1 10 1C6.1 1 3 2.8 3 5C3 9 1 11 1 11H19C19 11 17 9 17 5Z" stroke="rgba(255,255,255,0.8)" strokeWidth="1.4" fill="none"/>
            <path d="M11.7 15C11.4 15.6 10.8 16 10 16C9.2 16 8.6 15.6 8.3 15" stroke="rgba(255,255,255,0.8)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <img src="/home/avatar.png" alt="" style={{ width:32, height:32, borderRadius:'50%', objectFit:'cover', border:'2px solid rgba(255,122,47,0.45)' }}/>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div style={{ margin:'12px 16px 0', display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
        <div style={{ flex:1, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, padding:'10px 14px', display:'flex', alignItems:'center', gap:10 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4"/>
            <path d="M11.5 11.5L14 14" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <input
            style={{ flex:1, background:'transparent', border:'none', outline:'none', color:'#fff', fontFamily:'DM Sans,sans-serif', fontSize:13 }}
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ cursor:'pointer', opacity:0.4 }} onClick={() => setSearch('')}>
              <path d="M2 2L10 10M10 2L2 10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </div>

        {/* Filter button — orange circle, icon fits perfectly */}
        <div style={{
          width:42, height:42, borderRadius:'50%',
          background:'linear-gradient(135deg,#ff7a2f,#e05500)',
          display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'pointer', flexShrink:0,
          boxShadow:'0 4px 14px rgba(255,122,47,0.4)',
        }}>
          <img
            src="/icon_filter.png"
            alt="Filter"
            style={{ width:22, height:22, objectFit:'contain' }}
          />
        </div>
      </div>

      {/* FILTER TABS */}
      <div style={{ display:'flex', gap:8, padding:'10px 16px 0', overflowX:'auto', scrollbarWidth:'none', flexShrink:0 }}>
        {FILTERS.map(f => {
          const active = filter === f.id
          return (
            <div key={f.id} onClick={() => setFilter(f.id)} style={{
              display:'flex', alignItems:'center', gap:5,
              padding: f.id === 'All' ? '6px 18px' : '6px 12px',
              borderRadius:20, fontSize:13, fontWeight:600,
              cursor:'pointer', whiteSpace:'nowrap', flexShrink:0, transition:'all 0.2s',
              background: active ? '#ff7a2f' : 'transparent',
              color: active ? '#fff' : 'rgba(255,255,255,0.5)',
              border:`1px solid ${active ? '#ff7a2f' : 'rgba(255,255,255,0.1)'}`,
            }}>
              {f.icon && (
                <img src={f.icon} alt="" style={{
                  width:13, height:13, objectFit:'contain',
                  filter: active ? 'invert(1) brightness(2)' : 'invert(1) opacity(0.5)',
                }}/>
              )}
              {f.label}
            </div>
          )
        })}
      </div>

      {/* TX LIST */}
      <div className="scroll-body" style={{ padding:'10px 16px' }}>
        {filtered.map((tx, i) => {
          const st = STATUS[tx.status] || STATUS.completed
          const isPos = tx.amount.startsWith('+')
          const typeIcon = TYPE_NAV_ICON[tx.type]

          return (
            <div key={tx.id} style={{
              display:'flex', alignItems:'center', gap:12, padding:'12px 14px',
              background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)',
              borderRadius:14, marginBottom:8, cursor:'pointer', transition:'background 0.15s',
              animation:`fadeUp 0.22s ${i*0.04}s ease both`,
            }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.055)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.03)'}
            >
              {/* Type icon — dark circle with nav icon inside */}
              <div style={{
                width:42, height:42, borderRadius:'50%',
                background:'rgba(255,255,255,0.07)',
                border:'1px solid rgba(255,255,255,0.09)',
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0,
              }}>
                {typeIcon && (
                  <img src={typeIcon} alt={tx.type} style={{
                    width:18, height:18, objectFit:'contain',
                    filter:'invert(1) opacity(0.75)',
                  }}/>
                )}
              </div>

              {/* Label + date */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:14, fontWeight:600, color:'#fff', fontFamily:'DM Sans,sans-serif', marginBottom:3 }}>{tx.label}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', fontFamily:'DM Sans,sans-serif' }}>{tx.date}</div>
              </div>

              {/* Amount + status */}
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:4, marginBottom:5 }}>
                  {TOKEN_IMG[tx.token] && (
                    <img src={TOKEN_IMG[tx.token]} alt="" style={{ width:16, height:16, borderRadius:'50%' }}/>
                  )}
                  {tx.token2 && TOKEN_IMG[tx.token2] && (
                    <img src={TOKEN_IMG[tx.token2]} alt="" style={{ width:16, height:16, borderRadius:'50%', marginLeft:-6 }}/>
                  )}
                  <span style={{ fontSize:12, fontWeight:700, color: isPos ? '#1fd090' : '#fff', fontFamily:'DM Sans,sans-serif' }}>
                    {tx.amount}
                  </span>
                </div>
                <div style={{
                  display:'inline-flex', alignItems:'center', padding:'2px 8px',
                  borderRadius:8, background:st.bg, color:st.color,
                  fontSize:10, fontWeight:700, fontFamily:'DM Sans,sans-serif',
                }}>
                  {st.label}
                </div>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'32px 0', color:'rgba(255,255,255,0.2)' }}>
            <div style={{ fontSize:28, marginBottom:8 }}>🔍</div>
            <div style={{ fontSize:13 }}>No transactions found</div>
          </div>
        )}
        <div style={{ height:16 }}/>
      </div>
    </div>
  )
}
