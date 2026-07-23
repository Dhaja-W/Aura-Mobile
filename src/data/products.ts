import { PhoneModel, Accessory, PressAward, Review } from '../types';

export const PHONE_COLORS_16PRO_MAX = [
  {
    id: 'natural' as const,
    name: 'Natural Titanium',
    hex: '#8e8b85',
    badge: 'Popular',
    imageAngleFront: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1000&auto=format&fit=crop',
    imageAngleSide: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop',
    imageAngleBack: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1000&auto=format&fit=crop',
    imageAngle3D: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'space-black' as const,
    name: 'Space Black',
    hex: '#232528',
    imageAngleFront: 'https://images.unsplash.com/photo-1550029402-226115b7c579?q=80&w=1000&auto=format&fit=crop',
    imageAngleSide: 'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?q=80&w=1000&auto=format&fit=crop',
    imageAngleBack: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=1000&auto=format&fit=crop',
    imageAngle3D: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'desert-gold' as const,
    name: 'Desert Gold Titanium',
    hex: '#cbb399',
    badge: 'New Finish',
    imageAngleFront: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop',
    imageAngleSide: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1000&auto=format&fit=crop',
    imageAngleBack: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=1000&auto=format&fit=crop',
    imageAngle3D: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'alpine-white' as const,
    name: 'Alpine White',
    hex: '#e2e4e6',
    imageAngleFront: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop',
    imageAngleSide: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=1000&auto=format&fit=crop',
    imageAngleBack: 'https://images.unsplash.com/photo-1573148195900-7845dcb9b127?q=80&w=1000&auto=format&fit=crop',
    imageAngle3D: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1000&auto=format&fit=crop',
  },
];

export const PHONE_MODELS: PhoneModel[] = [
  {
    id: 'aura-16-pro-max',
    name: 'Aura 16 Pro Max',
    tagline: 'The pinnacle of titanium architecture.',
    startingPrice: 1199,
    monthlyPrice: 49.95,
    rating: 4.9,
    reviewsCount: 384,
    displaySize: '6.9" Super Retina XDR OLED (120Hz ProMotion)',
    chip: 'Quantum X1 Pro 3nm (24-core Neural Engine)',
    camera: '48MP Triple Lens System with 5x Optical Telephoto Zoom',
    batteryLife: 'Up to 33 hrs video playback',
    weight: '221g Grade 5 Titanium Body',
    finishes: PHONE_COLORS_16PRO_MAX,
    badge: 'Flagship',
    description: 'Forged in Grade 5 Titanium with a micro-blasted finish. Featuring our most advanced Quantum X1 silicon and continuous 8K HDR spatial cinema recording.',
    storageOptions: [
      { size: '256GB', priceDelta: 0, description: 'Standard high-speed UFS 4.0 storage' },
      { size: '512GB', priceDelta: 200, description: 'Ideal for 4K video recording & spatial assets' },
      { size: '1TB', priceDelta: 400, description: 'Maximum capacity for creative professionals' },
      { size: '2TB', priceDelta: 700, description: 'Ultimate storage for lossless ProRES video' }
    ]
  },
  {
    id: 'aura-16-pro',
    name: 'Aura 16 Pro',
    tagline: 'Pro performance in a compact titanium body.',
    startingPrice: 999,
    monthlyPrice: 41.62,
    rating: 4.8,
    reviewsCount: 219,
    displaySize: '6.3" Super Retina XDR OLED (120Hz ProMotion)',
    chip: 'Quantum X1 3nm (16-core Neural Engine)',
    camera: '48MP Triple Camera System with 3x Optical Zoom',
    batteryLife: 'Up to 29 hrs video playback',
    weight: '187g Grade 5 Titanium Body',
    finishes: PHONE_COLORS_16PRO_MAX,
    badge: 'Best Value',
    description: 'Designed for effortless one-handed use without sacrificing raw performance. Includes custom programmable Action Button.',
    storageOptions: [
      { size: '128GB', priceDelta: -100, description: 'Essential daily storage' },
      { size: '256GB', priceDelta: 0, description: 'Standard high-speed UFS 4.0 storage' },
      { size: '512GB', priceDelta: 200, description: 'Ideal for 4K recording & spatial assets' },
      { size: '1TB', priceDelta: 400, description: 'Pro storage space' }
    ]
  },
  {
    id: 'aura-fold-ultra',
    name: 'Aura Fold Ultra',
    tagline: 'Infinite canvas folded in titanium precision.',
    startingPrice: 1799,
    monthlyPrice: 74.95,
    rating: 4.9,
    reviewsCount: 152,
    displaySize: '8.0" Inner Flexible Dynamic OLED + 6.5" Outer Screen',
    chip: 'Quantum X1 Max (32-core GPU)',
    camera: '50MP Quad Spatial Camera with Periscope Prism',
    batteryLife: 'Up to 26 hrs video playback',
    weight: '239g Titanium Fluid Hinge Enclosure',
    finishes: PHONE_COLORS_16PRO_MAX.slice(0, 3),
    badge: 'Revolutionary',
    description: 'Zero-gap titanium fluid hinge with anti-reflective glass. Multi-window desktop productivity in your palm.',
    storageOptions: [
      { size: '512GB', priceDelta: 0, description: 'Base configuration for Fold Ultra' },
      { size: '1TB', priceDelta: 300, description: 'Professional workstation capacity' }
    ]
  },
  {
    id: 'aura-studio-ceramic',
    name: 'Aura Studio Edition',
    tagline: 'Hand-finished obsidian ceramic & matte titanium.',
    startingPrice: 1499,
    monthlyPrice: 62.45,
    rating: 5.0,
    reviewsCount: 89,
    displaySize: '6.7" Super Retina XDR with Sapphire Crystal Cover',
    chip: 'Quantum X1 Pro Custom Unlocked',
    camera: '48MP Hasselblad Co-Engineered Studio Optics',
    batteryLife: 'Up to 31 hrs video playback',
    weight: '210g Sapphire Ceramic Hybrid',
    finishes: [PHONE_COLORS_16PRO_MAX[1], PHONE_COLORS_16PRO_MAX[3]],
    badge: 'Limited Craft',
    description: 'Individually numbered craft release. Features sapphire crystal glass front and back with laser-etched serial plate.',
    storageOptions: [
      { size: '512GB', priceDelta: 0, description: 'Standard Studio release' },
      { size: '1TB', priceDelta: 250, description: 'Expanded Studio release' }
    ]
  }
];

export const ACCESSORIES: Accessory[] = [
  {
    id: 'spatial-earbuds-pro',
    name: 'Aura Spatial Audio Pro',
    tagline: 'Lossless spatial audio with adaptive ANC and titanium hinges.',
    category: 'audio',
    price: 299,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop',
    colors: [
      { name: 'Matte Titanium', hex: '#8e8b85' },
      { name: 'Onyx Black', hex: '#1a1a1a' },
      { name: 'Silver Frost', hex: '#e5e7eb' }
    ],
    isNew: true,
    compatibilities: ['Aura 16 Pro Max', 'Aura 16 Pro', 'Aura Fold Ultra']
  },
  {
    id: 'titanium-magsafe-case',
    name: 'Grade 5 Titanium MagSafe Case',
    tagline: 'Ultra-slim protective shell with anodized titanium rim.',
    category: 'cases',
    price: 89,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?q=80&w=800&auto=format&fit=crop',
    colors: [
      { name: 'Natural Titanium', hex: '#8e8b85' },
      { name: 'Deep Slate', hex: '#232528' },
      { name: 'Desert Bronze', hex: '#cbb399' }
    ],
    isNew: false,
    compatibilities: ['Aura 16 Pro Max', 'Aura 16 Pro']
  },
  {
    id: 'wireless-charging-stand',
    name: 'Obsidian MagSafe Duo Stand',
    tagline: 'Heavy CNC aluminium base with 25W fast wireless charging.',
    category: 'power',
    price: 129,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1622445268465-843836406857?q=80&w=800&auto=format&fit=crop',
    colors: [
      { name: 'Space Gray', hex: '#232528' },
      { name: 'Silver Ceramic', hex: '#f3f4f6' }
    ],
    isNew: true,
    compatibilities: ['All Qi2 and MagSafe Devices']
  },
  {
    id: 'leather-magsafe-wallet',
    name: 'Full-Grain Italian Leather Wallet',
    tagline: 'Hand-stitched leather with integrated Apple Find My tracking.',
    category: 'cases',
    price: 69,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop',
    colors: [
      { name: 'Cognac Brown', hex: '#8B4513' },
      { name: 'Midnight Blue', hex: '#191970' },
      { name: 'Charcoal Black', hex: '#2f2f2f' }
    ],
    isNew: false,
    compatibilities: ['Aura 16 Pro Max', 'Aura 16 Pro', 'Aura Fold Ultra']
  },
  {
    id: 'titanium-mesh-strap',
    name: 'Titanium Milanese Mesh Band',
    tagline: 'Custom magnetic clasp crafted for Aura Watch & Studio accessories.',
    category: 'straps',
    price: 149,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    colors: [
      { name: 'Natural Titanium', hex: '#8e8b85' },
      { name: 'Space Black', hex: '#232528' }
    ],
    isNew: true,
    compatibilities: ['Aura Watch Ultra', 'Aura Accessories']
  },
  {
    id: 'sapphire-lens-system',
    name: 'Pro Cinema Lens Filter Attachment',
    tagline: 'Magnetic anamorphic lens and ND filter for mobile filmmakers.',
    category: 'lenses',
    price: 199,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop',
    colors: [
      { name: 'Black Anodized', hex: '#111827' }
    ],
    isNew: true,
    compatibilities: ['Aura 16 Pro Max', 'Aura 16 Pro']
  }
];

export const PRESS_AWARDS: PressAward[] = [
  {
    id: 'red-dot',
    publication: 'Red Dot Design Award',
    award: 'Best of the Best 2026',
    quote: 'Aura 16 Pro Max sets a benchmark in industrial titanium design, seamlessly blending monolithic minimalism with peak ergonomic feel.',
    year: '2026'
  },
  {
    id: 'i-f-design',
    publication: 'iF DESIGN GOLD',
    award: 'Product Design Gold Winner',
    quote: 'The elimination of visible seams combined with custom sapphire camera housing makes Aura the most visually refined smartphone to date.',
    year: '2026'
  },
  {
    id: 'wired',
    publication: 'WIRED Magazine',
    award: 'Editor’s Choice 10/10',
    quote: 'The Quantum X1 processor delivers unparalleled efficiency, while the Grade 5 titanium chassis feels weightless in hand.',
    year: '2026'
  },
  {
    id: 'wallpaper',
    publication: 'Wallpaper* Design Awards',
    award: 'Design Object of the Year',
    quote: 'Refining luxury mobile tech into pure sculpture. Negative space and optical glass executed flawlessly.',
    year: '2026'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Alexander Wright',
    role: 'Creative Director at Studio Arch',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: 'July 18, 2026',
    title: 'The tactile experience is unmatched',
    comment: 'Having used flagship devices from every major brand for over a decade, holding the Natural Titanium Aura 16 Pro Max is a revelation. The weight distribution, micro-blasted tactile texture, and screen clarity are perfection.',
    verified: true,
    productName: 'Aura 16 Pro Max'
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    role: 'Architect & Industrial Designer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: 'July 12, 2026',
    title: 'Minimalism executed at 8k fidelity',
    comment: 'The customizer live engraving feature was flawless. My initials look as though they were factory-etched by hand. The battery easily lasts two full days of heavy drafting and camera usage.',
    verified: true,
    productName: 'Aura 16 Pro'
  },
  {
    id: 'rev-3',
    author: 'Marcus Vance',
    role: 'Cinematographer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: 'July 5, 2026',
    title: 'The Cinema 8K spatial video changed my workflow',
    comment: 'Pairing the Aura 16 Pro Max with the Sapphire Cinema lens kit allows me to shoot location B-roll that seamlessly cuts into Arri Alexa footage.',
    verified: true,
    productName: 'Aura 16 Pro Max'
  }
];
