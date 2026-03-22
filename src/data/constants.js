// ═══════════════════════════════════════════
//   NUVRA WALLET — SHARED DATA & CONSTANTS
// ═══════════════════════════════════════════

export const TOKENS = [
  { symbol: 'BTC',  name: 'Bitcoin',       icon: '₿', color: '#f7931a', bg: 'rgba(247,147,26,0.18)',  balance: '0.042', fiat: '$2,841', rate: 51814.766129 },
  { symbol: 'ARCH', name: 'Arch Network',  icon: '⬡', color: '#ff7a2f', bg: 'rgba(255,122,47,0.18)',  balance: '1,250', fiat: '$1,850', rate: 0.0000193    },
  { symbol: 'ETH',  name: 'Ethereum',      icon: 'Ξ', color: '#627eea', bg: 'rgba(98,126,234,0.18)',  balance: '0.5',   fiat: '$1,612', rate: 3142.5        },
  { symbol: 'USDC', name: 'USD Coin',      icon: '$', color: '#2775ca', bg: 'rgba(39,117,202,0.18)',  balance: '250',   fiat: '$250',   rate: 1             },
]

export const ASSETS = [
  { symbol: 'BTC',  name: 'Bitcoin',      icon: '₿', color: '#f7931a', bg: 'rgba(247,147,26,0.15)', balance: '0.042 BTC',  fiat: '$2,841.20', change: '+2.4%',  up: true  },
  { symbol: 'ARCH', name: 'Arch Network', icon: '⬡', color: '#ff7a2f', bg: 'rgba(255,122,47,0.15)', balance: '1,250 ARCH', fiat: '$1,850.00', change: '+5.1%',  up: true  },
  { symbol: 'ETH',  name: 'Ethereum',     icon: 'Ξ', color: '#627eea', bg: 'rgba(98,126,234,0.15)', balance: '0.5 ETH',   fiat: '$1,612.50', change: '-1.2%',  up: false },
  { symbol: 'USDC', name: 'USD Coin',     icon: '$', color: '#2775ca', bg: 'rgba(39,117,202,0.15)', balance: '250 USDC',  fiat: '$250.00',   change: '0.0%',   up: true  },
  { symbol: 'SOL',  name: 'Solana',       icon: '◎', color: '#9945ff', bg: 'rgba(153,69,255,0.15)', balance: '1.8 SOL',   fiat: '$169.87',   change: '+3.8%',  up: true  },
]

export const TRANSACTIONS = [
  { id: 1,  type: 'bridge', asset: 'BTC',  icon: '₿', color: '#f7931a', bg: 'rgba(247,147,26,0.15)', amount: '-12,223 BTC', fiat: '$826,180', date: '2026-01-28', time: '09:00', status: 'confirmed', to: 'Ethereum Network',     hash: '0x4f8a...9c3d', fee: '0.002 BTC',  block: '#4,821,093', network: 'Arch → ETH'   },
  { id: 2,  type: 'swap',   asset: 'ARCH', icon: '⬡', color: '#ff7a2f', bg: 'rgba(255,122,47,0.15)', amount: '+1,222 ARCH', fiat: '$1,813',   date: '2026-01-28', time: '09:07', status: 'confirmed', to: 'Self',                hash: '0x8b2c...1e4f', fee: '0.001 ARCH', block: '#4,821,099', network: 'Arch Network' },
  { id: 3,  type: 'send',   asset: 'ARCH', icon: '⬡', color: '#ff7a2f', bg: 'rgba(255,122,47,0.15)', amount: '-100 ARCH',  fiat: '$148',     date: '2026-01-28', time: '09:07', status: 'confirmed', to: 'arch1q3x...a1f2',     hash: '0x3d9e...7a5b', fee: '0.001 ARCH', block: '#4,821,100', network: 'Arch Network' },
  { id: 4,  type: 'receive',asset: 'BTC',  icon: '₿', color: '#f7931a', bg: 'rgba(247,147,26,0.15)', amount: '+0.01 BTC',  fiat: '$676',     date: '2026-01-28', time: '09:07', status: 'confirmed', to: 'From: arch1z9k...c5d1',hash: '0x7c1b...3f8a', fee: '0.0005 BTC', block: '#4,821,102', network: 'Bitcoin'      },
  { id: 5,  type: 'swap',   asset: 'ETH',  icon: 'Ξ', color: '#627eea', bg: 'rgba(98,126,234,0.15)', amount: '-0.1 ETH',   fiat: '$314',     date: '2026-01-28', time: '09:07', status: 'confirmed', to: 'Self',                hash: '0x2e5d...8c9a', fee: '0.002 ETH',  block: '#4,821,105', network: 'Ethereum'     },
  { id: 6,  type: 'bridge', asset: 'BTC',  icon: '₿', color: '#f7931a', bg: 'rgba(247,147,26,0.15)', amount: '-12,223 BTC',fiat: '$826,180', date: '2026-01-28', time: '09:07', status: 'pending',   to: 'Polygon Network',      hash: '0x5a7f...2d1e', fee: '0.003 BTC',  block: 'Pending',     network: 'Arch → MATIC' },
  { id: 7,  type: 'receive',asset: 'USDC', icon: '$', color: '#2775ca', bg: 'rgba(39,117,202,0.15)', amount: '+250 USDC',  fiat: '$250',     date: '2026-01-25', time: '14:22', status: 'confirmed', to: 'From: arch1m7p...b3e9',hash: '0x9d4c...6e2b', fee: '$0.01',      block: '#4,818,440', network: 'Arch Network' },
  { id: 8,  type: 'send',   asset: 'ETH',  icon: 'Ξ', color: '#627eea', bg: 'rgba(98,126,234,0.15)', amount: '-0.05 ETH',  fiat: '$157',     date: '2026-01-25', time: '11:05', status: 'confirmed', to: 'arch1r2n...d7f4',     hash: '0x1b8e...4a7c', fee: '0.001 ETH',  block: '#4,818,200', network: 'Ethereum'     },
  { id: 9,  type: 'swap',   asset: 'BTC',  icon: '₿', color: '#f7931a', bg: 'rgba(247,147,26,0.15)', amount: '+0.002 BTC', fiat: '$135',     date: '2026-01-20', time: '16:48', status: 'confirmed', to: 'Self',                hash: '0x6c3a...5b9d', fee: '0.002 ARCH', block: '#4,810,001', network: 'Arch Network' },
  { id: 10, type: 'bridge', asset: 'ETH',  icon: 'Ξ', color: '#627eea', bg: 'rgba(98,126,234,0.15)', amount: '-0.2 ETH',   fiat: '$628',     date: '2026-01-18', time: '08:30', status: 'failed',    to: 'BSC Network',          hash: '0xf2a1...0e8c', fee: 'Refunded',   block: 'Failed',      network: 'ETH → BSC'    },
]

export const PROJECTS = [
  { id: 1, name: 'Autara',    icon: '🏦', color: '#1fd090', bg: 'rgba(31,208,144,0.12)',  desc: 'The premier Bitcoin money market. Deposit BTC and earn competitive yield with full transparency.',    tags: ['DeFi','Lending','BTC'],    verified: true,  tvl: '$42M',  change: '+18.4%' },
  { id: 2, name: 'Wasabi',    icon: '🌊', color: '#6c5ce7', bg: 'rgba(108,92,231,0.12)',  desc: 'Perps trading for runes, ordinals, and UTXO-based assets on Arch Network.',                            tags: ['Perps','Trading','Runes'], verified: true,  tvl: '$18M',  change: '+9.2%'  },
  { id: 3, name: 'SIGNAL',    icon: '📡', color: '#ff7a2f', bg: 'rgba(255,122,47,0.12)',  desc: 'The BTC growth engine. Stake ARCH and SIGNAL tokens to earn boosted protocol rewards.',                tags: ['Staking','Yield','ARCH'],  verified: true,  tvl: '$9M',   change: '+31.7%' },
  { id: 4, name: 'Pups.fun',  icon: '🐾', color: '#fd79a8', bg: 'rgba(253,121,168,0.12)', desc: 'The pups community hub. Risk it all by stacking pups — the OG Bitcoin memecoin.',                     tags: ['Meme','NFT','Community'],  verified: false, tvl: '$2M',   change: '+22.8%' },
  { id: 5, name: 'Anchorage', icon: '⚓', color: '#0984e3', bg: 'rgba(9,132,227,0.12)',   desc: 'Trusted crypto platform for innovators — institutional custody and financial services for Bitcoin.',    tags: ['Custody','Institutional'], verified: true,  tvl: '$220M', change: '+5.1%'  },
  { id: 6, name: 'Bitflow',   icon: '💧', color: '#00b894', bg: 'rgba(0,184,148,0.12)',   desc: 'Bitcoin-native liquidity protocol. Provide liquidity and earn fees across the Arch ecosystem.',        tags: ['DEX','Liquidity','BTC'],   verified: true,  tvl: '$7M',   change: '+12.3%' },
]

export const TRENDING = [
  { rank: 1, name: 'ARCH', sym: 'Arch Network',  icon: '⬡', color: '#ff7a2f', bg: 'rgba(255,122,47,0.15)',  price: '$1.48',   change: '+5.1%',  up: true,  hot: true  },
  { rank: 2, name: 'BTC',  sym: 'Bitcoin',        icon: '₿', color: '#f7931a', bg: 'rgba(247,147,26,0.15)',  price: '$67,542', change: '+2.4%',  up: true,  hot: false },
  { rank: 3, name: 'RUNE', sym: 'Rune Protocol',  icon: 'ᚱ', color: '#e84393', bg: 'rgba(232,67,147,0.15)', price: '$0.842',  change: '+14.2%', up: true,  hot: true  },
  { rank: 4, name: 'ETH',  sym: 'Ethereum',        icon: 'Ξ', color: '#627eea', bg: 'rgba(98,126,234,0.15)', price: '$3,142',  change: '-1.2%',  up: false, hot: false },
  { rank: 5, name: 'PUPS', sym: 'Pups.fun',        icon: '🐾',color: '#fd79a8', bg: 'rgba(253,121,168,0.15)',price: '$0.031',  change: '+22.8%', up: true,  hot: true  },
]

export const ABOUT_TEXTS = {
  'Autara':    'Autara is the first Bitcoin-native money market, allowing users to deposit BTC and earn real yield. Built on Arch Network, Autara brings institutional-grade DeFi primitives to the Bitcoin ecosystem.',
  'Wasabi':    'Wasabi enables leveraged perpetual trading on Bitcoin-native assets including runes, ordinals, and BRC-20 tokens. Trade with up to 20x leverage on the most liquid Bitcoin markets.',
  'SIGNAL':    'SIGNAL is the core yield and governance token of the Arch Network ecosystem. Stake your ARCH and SIGNAL holdings to earn boosted rewards from protocol fees and emissions.',
  'Pups.fun':  'Pups.fun is the official community hub for the Pups memecoin — the original Bitcoin-native dog coin. Stack pups, earn rewards, and participate in the wildest community in crypto.',
  'Anchorage': 'Anchorage Digital is the most trusted crypto platform for institutional investors. Offering custody, trading, lending, and staking for Bitcoin and other digital assets.',
  'Bitflow':   'Bitflow is a Bitcoin-native AMM and liquidity protocol. Provide liquidity to trading pairs and earn swap fees while keeping your assets secure on Arch Network.',
}

export const TX_BADGE_COLORS = {
  send:    '#ff7a2f',
  receive: '#1fd090',
  swap:    '#6c5ce7',
  bridge:  '#0984e3',
}

export const RECENTS = [
  { name: 'Alice', initials: 'AL', color: 'linear-gradient(135deg,#ff7a2f,#ff5500)', addr: 'arch1q3x...a1f2' },
  { name: 'Bob',   initials: 'BO', color: 'linear-gradient(135deg,#6c5ce7,#4834d4)', addr: 'arch1m7p...b3e9' },
  { name: 'Carol', initials: 'CA', color: 'linear-gradient(135deg,#1fd090,#0cb877)', addr: 'arch1z9k...c5d1' },
  { name: 'Dave',  initials: 'DA', color: 'linear-gradient(135deg,#fd79a8,#e84393)', addr: 'arch1r2n...d7f4' },
]
