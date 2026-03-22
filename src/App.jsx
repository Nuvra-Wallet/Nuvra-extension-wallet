import React, { useState } from 'react'
import BottomNav from './components/BottomNav'

// Screens
import OnboardingScreen from './screens/OnboardingScreen'
import SignUpScreen     from './screens/SignUpScreen'
import PinScreen        from './screens/PinScreen'
import HomeScreen       from './screens/HomeScreen'
import SendScreen       from './screens/SendScreen'
import SwapScreen       from './screens/SwapScreen'
import BridgeScreen     from './screens/BridgeScreen'
import DiscoverScreen   from './screens/DiscoverScreen'
import ActivityScreen   from './screens/ActivityScreen'

// Pages that show bottom nav
const MAIN_PAGES = ['home', 'swap', 'bridge', 'discover', 'activity']

export default function App() {
  const [page,   setPage]   = useState('onboarding')
  const [navTab, setNavTab] = useState('home')
  // Track previous page for back navigation on sub-flows
  const [prevPage, setPrevPage] = useState(null)

  const navigate = (dest) => {
    setPrevPage(page)
    setPage(dest)
    if (MAIN_PAGES.includes(dest)) setNavTab(dest)
  }

  const goBack = () => {
    if (prevPage) { setPage(prevPage); setPrevPage(null) }
    else navigate('home')
  }

  const showBottomNav = MAIN_PAGES.includes(page) || page === 'send'

  return (
    <div className="app-shell">

      {/* ── Page area ── */}
      <div className="page-container">

        {/* Onboarding */}
        {page === 'onboarding' && (
          <div className="screen active" style={{ background: '#0d0d14' }}>
            <OnboardingScreen onDone={() => navigate('signup')}/>
          </div>
        )}

        {/* Sign Up */}
        {page === 'signup' && (
          <div className="screen active" style={{ background: '#0d0d14' }}>
            <SignUpScreen
              onDone={() => navigate('pin')}
              onBack={() => navigate('onboarding')}
            />
          </div>
        )}

        {/* PIN */}
        {page === 'pin' && (
          <div className="screen active" style={{ background: '#0d0d14' }}>
            <PinScreen onDone={() => navigate('home')}/>
          </div>
        )}

        {/* Home */}
        {page === 'home' && (
          <div className="screen active" style={{ background: '#0d0d14' }}>
            <HomeScreen onNav={navigate}/>
          </div>
        )}

        {/* Send */}
        {page === 'send' && (
          <div className="screen active" style={{ background: '#0d0d14' }}>
            <SendScreen onBack={() => navigate('home')}/>
          </div>
        )}

        {/* Swap */}
        {page === 'swap' && (
          <div className="screen active" style={{ background: '#0d0d14' }}>
            <SwapScreen onBack={() => navigate('home')}/>
          </div>
        )}

        {/* Bridge */}
        {page === 'bridge' && (
          <div className="screen active" style={{ background: '#0d0d14' }}>
            <BridgeScreen/>
          </div>
        )}

        {/* Discover */}
        {page === 'discover' && (
          <div className="screen active" style={{ background: '#0d0d14' }}>
            <DiscoverScreen/>
          </div>
        )}

        {/* Activity */}
        {page === 'activity' && (
          <div className="screen active" style={{ background: '#0d0d14' }}>
            <ActivityScreen/>
          </div>
        )}

      </div>

      {/* ── Bottom Navigation — shown on all main pages ── */}
      {showBottomNav && (
        <BottomNav
          active={navTab}
          onNav={(id) => {
            setNavTab(id)
            navigate(id)
          }}
        />
      )}

    </div>
  )
}
