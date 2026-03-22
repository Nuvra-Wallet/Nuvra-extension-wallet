import React, { useState, useEffect } from 'react'

/* ─── keyframe styles injected once ──────────────────────────────────────── */
const STYLES = `
  @keyframes ob_float {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-13px); }
  }
  @keyframes ob_float_sm {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50%      { transform: translateY(-8px) rotate(6deg); }
  }
  @keyframes ob_fade_slide {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ob_glow_pulse {
    0%,100% { opacity: 0.55; transform: scale(1); }
    50%      { opacity: 0.8;  transform: scale(1.06); }
  }
`

/* ─── Slide 1: NUVRA coin with orbiting small coins ─────────────────────── */
function Slide1Illus() {
  return (
    <div style={{ position:'relative', width:280, height:290,
      display:'flex', alignItems:'center', justifyContent:'center' }}>

      {/* soft orange glow behind coin */}
      <div style={{ position:'absolute', width:200, height:200, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(255,122,47,0.35) 0%, rgba(255,122,47,0.08) 55%, transparent 75%)',
        animation:'ob_glow_pulse 3s ease-in-out infinite',
        pointerEvents:'none' }}/>

      {/* Main NUVRA coin */}
      <img src="/onboarding/nuvra_coin.png" alt="NUVRA"
        style={{ width:170, height:170, objectFit:'contain', position:'relative', zIndex:3,
          animation:'ob_float 3.8s ease-in-out infinite',
          filter:'drop-shadow(0 18px 36px rgba(255,122,47,0.5))' }}/>

      {/* BTC — top right */}
      <img src="/onboarding/btc.png" alt="BTC"
        style={{ position:'absolute', width:42, height:42, top:16, right:28, zIndex:4,
          animation:'ob_float_sm 4.2s 0.3s ease-in-out infinite',
          filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}/>

      {/* ARCH — top left */}
      <img src="/onboarding/arch.png" alt="ARCH"
        style={{ position:'absolute', width:36, height:36, top:54, left:20, zIndex:4,
          animation:'ob_float_sm 5s 0.7s ease-in-out infinite',
          filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}/>

      {/* USDC — bottom right */}
      <img src="/onboarding/usdc.png" alt="USDC"
        style={{ position:'absolute', width:32, height:32, bottom:44, right:24, zIndex:4,
          animation:'ob_float_sm 4.7s 1.1s ease-in-out infinite',
          filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}/>

      {/* small dot particle - top center */}
      <div style={{ position:'absolute', width:7, height:7, borderRadius:'50%',
        background:'rgba(255,180,100,0.5)', top:38, left:'52%', zIndex:2,
        animation:'ob_float_sm 6s 0.2s ease-in-out infinite' }}/>
      {/* small dot - left middle */}
      <div style={{ position:'absolute', width:5, height:5, borderRadius:'50%',
        background:'rgba(255,150,80,0.4)', top:'48%', left:6, zIndex:2,
        animation:'ob_float_sm 5.5s 1.4s ease-in-out infinite' }}/>
      {/* small dot - bottom left */}
      <div style={{ position:'absolute', width:6, height:6, borderRadius:'50%',
        background:'rgba(255,160,60,0.45)', bottom:32, left:44, zIndex:2,
        animation:'ob_float_sm 4.8s 0.9s ease-in-out infinite' }}/>
    </div>
  )
}

/* ─── Slide 2: Box with floating coin icons ──────────────────────────────── */
function Slide2Illus() {
  return (
    <div style={{ position:'relative', width:290, height:290,
      display:'flex', alignItems:'center', justifyContent:'center' }}>

      {/* Main box */}
      <img src="/onboarding/box.png" alt="Box"
        style={{ width:210, height:178, objectFit:'contain', position:'relative', zIndex:3,
          marginTop:20,
          animation:'ob_float 4s ease-in-out infinite',
          filter:'drop-shadow(0 16px 32px rgba(255,122,47,0.3))' }}/>

      {/* BTC flying top right */}
      <img src="/onboarding/btc.png" alt="BTC"
        style={{ position:'absolute', width:46, height:46, top:8, right:20, zIndex:5,
          animation:'ob_float_sm 3.8s 0.2s ease-in-out infinite',
          filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}/>

      {/* ARCH — top left floating */}
      <img src="/onboarding/arch.png" alt="ARCH"
        style={{ position:'absolute', width:36, height:36, top:50, left:18, zIndex:5,
          animation:'ob_float_sm 4.5s 0.6s ease-in-out infinite',
          filter:'drop-shadow(0 4px 10px rgba(0,0,0,0.3))' }}/>

      {/* USDC — left lower */}
      <img src="/onboarding/usdc.png" alt="USDC"
        style={{ position:'absolute', width:38, height:38, top:'42%', left:4, zIndex:5,
          animation:'ob_float_sm 5s 1s ease-in-out infinite',
          filter:'drop-shadow(0 4px 10px rgba(0,0,0,0.3))' }}/>

      {/* small dots */}
      <div style={{ position:'absolute', width:7, height:7, borderRadius:'50%',
        background:'rgba(255,200,80,0.5)', top:24, left:'55%', zIndex:2,
        animation:'ob_float_sm 6s 0.3s ease-in-out infinite' }}/>
      <div style={{ position:'absolute', width:5, height:5, borderRadius:'50%',
        background:'rgba(255,140,60,0.4)', bottom:40, right:30, zIndex:2,
        animation:'ob_float_sm 5s 1.2s ease-in-out infinite' }}/>
      <div style={{ position:'absolute', width:6, height:6, borderRadius:'50%',
        background:'rgba(255,180,100,0.45)', bottom:20, left:60, zIndex:2,
        animation:'ob_float_sm 4.5s 0.8s ease-in-out infinite' }}/>
    </div>
  )
}

/* ─── Slide 3: Lock with coin icons ─────────────────────────────────────── */
function Slide3Illus() {
  return (
    <div style={{ position:'relative', width:290, height:290,
      display:'flex', alignItems:'center', justifyContent:'center' }}>

      {/* Main lock */}
      <img src="/onboarding/lock.png" alt="Lock"
        style={{ width:220, height:136, objectFit:'contain', position:'relative', zIndex:3,
          animation:'ob_float 3.6s ease-in-out infinite',
          filter:'drop-shadow(0 12px 28px rgba(255,122,47,0.28))' }}/>

      {/* BTC — top right */}
      <img src="/onboarding/btc.png" alt="BTC"
        style={{ position:'absolute', width:40, height:40, top:18, right:22, zIndex:5,
          animation:'ob_float_sm 4s 0.2s ease-in-out infinite',
          filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}/>

      {/* ARCH — right center */}
      <img src="/onboarding/arch.png" alt="ARCH"
        style={{ position:'absolute', width:32, height:32, top:'34%', right:10, zIndex:5,
          animation:'ob_float_sm 5.2s 0.8s ease-in-out infinite',
          filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}/>

      {/* USDC — bottom right */}
      <img src="/onboarding/usdc.png" alt="USDC"
        style={{ position:'absolute', width:30, height:30, bottom:44, right:36, zIndex:5,
          animation:'ob_float_sm 4.6s 1.3s ease-in-out infinite',
          filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}/>

      {/* ARCH small left */}
      <img src="/onboarding/arch.png" alt="ARCH"
        style={{ position:'absolute', width:26, height:26, bottom:56, left:28, zIndex:5,
          animation:'ob_float_sm 4.8s 0.5s ease-in-out infinite',
          filter:'drop-shadow(0 3px 6px rgba(0,0,0,0.3))' }}/>

      {/* dots */}
      <div style={{ position:'absolute', width:7, height:7, borderRadius:'50%',
        background:'rgba(255,180,100,0.5)', top:30, left:'46%', zIndex:2,
        animation:'ob_float_sm 5.8s 0.1s ease-in-out infinite' }}/>
      <div style={{ position:'absolute', width:5, height:5, borderRadius:'50%',
        background:'rgba(255,140,60,0.4)', top:'28%', left:14, zIndex:2,
        animation:'ob_float_sm 5s 1.5s ease-in-out infinite' }}/>
      <div style={{ position:'absolute', width:6, height:6, borderRadius:'50%',
        background:'rgba(255,200,80,0.45)', bottom:24, left:'50%', zIndex:2,
        animation:'ob_float_sm 4.2s 0.7s ease-in-out infinite' }}/>
    </div>
  )
}

const SLIDES = [
  { IllusComp: Slide1Illus,
    headline: 'Welcome to Nuvra',
    sub: 'Access Layer for the Next Billion Bitcoin Users.' },
  { IllusComp: Slide2Illus,
    headline: 'The Bitcoin-aligned',
    sub: 'gateway to the Arch Network ecosystem.' },
  { IllusComp: Slide3Illus,
    headline: 'The Bitcoin-aligned',
    sub: 'gateway to the Arch Network ecosystem.' },
]

export default function OnboardingScreen({ onDone }) {
  const [slide,    setSlide]    = useState(0)
  const [animKey,  setAnimKey]  = useState(0)

  /* auto-advance every 3 s */
  useEffect(() => {
    const t = setInterval(() => {
      setSlide(s => { const n=(s+1)%SLIDES.length; setAnimKey(k=>k+1); return n })
    }, 3000)
    return () => clearInterval(t)
  }, [])

  const goTo = idx => { setSlide(idx); setAnimKey(k=>k+1) }

  const { IllusComp, headline, sub } = SLIDES[slide]

  return (
    <>
      <style>{STYLES}</style>

      <div style={{ flex:1, display:'flex', flexDirection:'column',
        background:'#0d0d14', position:'relative', overflow:'hidden' }}>

        {/* ── very subtle radial bg glow ── */}
        <div style={{ position:'absolute', top:'8%', left:'50%', transform:'translateX(-50%)',
          width:340, height:340, borderRadius:'50%', pointerEvents:'none', zIndex:0,
          background:'radial-gradient(circle, rgba(255,95,0,0.13) 0%, rgba(255,95,0,0.04) 50%, transparent 72%)' }}/>

        {/* ── TOP ROW: dots (left) + NEXT (right) ── */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'18px 20px 0', flexShrink:0, position:'relative', zIndex:5 }}>

          {/* 3 progress dots */}
          <div style={{ display:'flex', gap:6, alignItems:'center' }}>
            {SLIDES.map((_,i) => (
              <div key={i} onClick={() => goTo(i)}
                style={{ cursor:'pointer', height:6, borderRadius:3,
                  background: i===slide ? '#ff7a2f' : 'rgba(255,255,255,0.2)',
                  width: i===slide ? 22 : 6,
                  transition:'all 0.35s ease' }}/>
            ))}
          </div>

          {/* Next button */}
          <button onClick={() => { const n=(slide+1)%SLIDES.length; goTo(n); if(slide===SLIDES.length-1) onDone() }}
            style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)',
              borderRadius:20, color:'rgba(255,255,255,0.8)', fontFamily:'DM Sans,sans-serif',
              fontSize:13, fontWeight:600, padding:'6px 18px', cursor:'pointer',
              transition:'background 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.14)'}
            onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'}>
            Next
          </button>
        </div>

        {/* ── NUVRA logo lockup — icon stacked above wordmark ── */}
        <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',
          paddingTop:18, paddingBottom:0, flexShrink:0, position:'relative', zIndex:2, gap:5 }}>
          <img src="/logo_nv_orange.png" alt="NV"
            style={{ height:36, objectFit:'contain', display:'block' }}/>
          <img src="/onboarding/nuvra_wordmark.png" alt="NUVRA"
            style={{ height:16, objectFit:'contain', display:'block' }}/>
        </div>

        {/* ── Illustration — fills remaining space ── */}
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center',
          position:'relative', zIndex:1, minHeight:0 }}>
          <div key={`illus-${animKey}`}
            style={{ animation:'ob_fade_slide 0.45s ease both' }}>
            <IllusComp />
          </div>
        </div>

        {/* ── Headline + sub ── */}
        <div key={`text-${animKey}`}
          style={{ padding:'0 32px 20px', flexShrink:0, zIndex:2, position:'relative',
            animation:'ob_fade_slide 0.45s 0.07s ease both', textAlign:'center' }}>
          <div style={{ fontFamily:'Syne,sans-serif', fontSize:18, fontWeight:700,
            color:'#fff', marginBottom:8, lineHeight:1.3 }}>
            {headline}
          </div>
          <div style={{ fontSize:13, color:'rgba(255,255,255,0.42)', lineHeight:1.65 }}>
            {sub}
          </div>
        </div>

        {/* ── CTA buttons ── */}
        <div style={{ padding:'0 24px 16px', flexShrink:0, position:'relative', zIndex:2 }}>
          <button onClick={onDone}
            style={{ width:'100%', height:54, background:'linear-gradient(135deg,#ff7a2f,#e05500)',
              border:'none', borderRadius:30, color:'#fff', fontFamily:'DM Sans,sans-serif',
              fontSize:16, fontWeight:700, cursor:'pointer', marginBottom:14,
              letterSpacing:0.3, boxShadow:'0 8px 24px rgba(255,122,47,0.4)',
              transition:'transform 0.15s, box-shadow 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow='0 12px 28px rgba(255,122,47,0.5)'}}
            onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 8px 24px rgba(255,122,47,0.4)'}}>
            Get Started
          </button>

          <button onClick={onDone}
            style={{ width:'100%', background:'transparent', border:'none',
              color:'rgba(255,255,255,0.5)', fontFamily:'DM Sans,sans-serif',
              fontSize:14, cursor:'pointer', padding:'6px 0', textAlign:'center',
              transition:'color 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.8)'}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.5)'}>
            I already have a wallet
          </button>
        </div>

        {/* ── Terms ── */}
        <div style={{ fontSize:10, color:'rgba(255,255,255,0.18)', textAlign:'center',
          padding:'0 28px 28px', lineHeight:1.6, flexShrink:0, position:'relative', zIndex:2 }}>
          By continuing, you agree to apply to NUVRA's{' '}
          <span style={{ color:'rgba(255,255,255,0.36)', cursor:'pointer' }}>Terms of Service</span>
          {' '}and{' '}
          <span style={{ color:'rgba(255,255,255,0.36)', cursor:'pointer' }}>Privacy Policy</span>
        </div>

      </div>
    </>
  )
}
