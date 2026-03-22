import React from 'react'

const NAV_ITEMS = [
  { id: 'home',     label: 'Home',     img: '/nav_home.png'     },
  { id: 'swap',     label: 'Swap',     img: '/nav_swap.png'     },
  { id: 'bridge',   label: 'Bridge',   img: '/nav_bridge.png'   },
  { id: 'discover', label: 'Discover', img: '/nav_discover.png' },
  { id: 'activity', label: 'Activity', img: '/nav_activity.png' },
]

export default function BottomNav({ active, onNav }) {
  return (
    <div className="bottom-nav">
      {NAV_ITEMS.map(n => {
        const isActive = active === n.id
        return (
          <div
            key={n.id}
            className="nav-item"
            onClick={() => onNav(n.id)}
          >
            <img
              src={n.img}
              alt={n.label}
              style={{
                width: 22,
                height: 22,
                objectFit: 'contain',
                filter: isActive
                  ? 'invert(58%) sepia(90%) saturate(600%) hue-rotate(345deg) brightness(110%)'
                  : 'invert(1) opacity(0.45)',
                transition: 'filter 0.2s',
              }}
            />
            <span className={`nav-lbl ${isActive ? 'active' : ''}`}>{n.label}</span>
          </div>
        )
      })}
    </div>
  )
}
