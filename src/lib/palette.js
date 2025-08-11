// Curated palettes: [bg, surface, card, primary, text]
export const PALETTES = { 
  pastel: ['#FFF7F9','#E9FBF7','#FFFBEA','#EEF3FF','#111827'],
  neon: ['#0B0B11','#191B2A','#1F2238','#FF3CAC','#F5F7FF'],
  muted: ['#F7F7F7','#E9EEF2','#D7E0E6','#7F8A92','#111827'],
  dark: ['#0E0F14','#141824','#1A2233','#4F46E5','#E5E7EB'],
  mono: ['#FFFFFF','#F3F4F6','#E5E7EB','#111827','#111827'],
  ocean: ['#F4FBFF','#E6F7FF','#CCEFFF','#06B6D4','#0F172A'],
  forest: ['#F7FFF9','#E9F8EE','#DDF3E3','#16A34A','#0A0F0C'],
  sunset: ['#FFF8F3','#FFEDE5','#FFE1D6','#FB7185','#111827'],
  lavender: ['#FCF8FF','#F3EDFF','#E7DBFF','#8B5CF6','#111827'],
  solar: ['#FFFCF5','#FFF6DE','#FFEDB5','#F59E0B','#111827'],
  berry: ['#FFF7FB','#FDEBF6','#F8D8EB','#EC4899','#111827'],
  sky: ['#F7FBFF','#EAF4FF','#D7E9FF','#3B82F6','#0F172A'],
  lime: ['#FCFFF7','#F1FDE6','#E3FBCF','#65A30D','#111827'],
  clay: ['#FFFBF7','#F8EFE8','#EADDD2','#D97706','#0F172A'],
  cobalt: ['#F6FAFF','#EBF3FF','#D6E8FF','#2563EB','#0F172A'],
  rose: ['#FFF7FA','#FDE9EF','#F9D7E0','#E11D48','#111827'],
  teal: ['#F6FFFD','#E6FBF7','#D1F7EE','#0D9488','#0F172A'],
  plum: ['#FCF7FF','#F3E9FF','#E2D0FF','#7C3AED','#111827'],
  slate: ['#F8FAFC','#F1F5F9','#E2E8F0','#334155','#0F172A'],
  amber: ['#FFFCF2','#FFF6DB','#FDECB2','#D97706','#111827'],
  coral: ['#FFF7F7','#FFE9E8','#FFD7D4','#F97316','#111827'],
  mint: ['#F6FFFB','#E7FBF4','#D3F7EA','#10B981','#0F172A'],
  steel: ['#F7FAFF','#ECF2FF','#DEE7FF','#475569','#0F172A'],
  ink: ['#0B0C10','#10131B','#161B26','#22D3EE','#E5E7EB'],
  velvet: ['#0F0B16','#171225','#221737','#A78BFA','#E5E7EB'],
  magma: ['#0F0A09','#1A1210','#251916','#EF4444','#F9FAFB'],
  aurora: ['#0B1220','#0F172A','#13213B','#22C55E','#E5E7EB'],
  dawn: ['#FFFDF9','#FFF6EC','#FEECD9','#EA580C','#0F172A'],
  dusk: ['#0E0B1A','#141029','#1C163D','#60A5FA','#E5E7EB'],
  sand: ['#FFFCF7','#F7F0E5','#EADFCC','#CA8A04','#111827'],
  candy: ['#FFF8FF','#FFEAFE','#FFD7FB','#F472B6','#111827'],
  wave: ['#F5FBFF','#E7F4FF','#D3EAFF','#38BDF8','#0F172A'],
  jade: ['#F5FFFB','#E7FBF5','#D0F7EB','#34D399','#0F172A'],
  noir: ['#0A0A0A','#121212','#1A1A1A','#4F46E5','#F9FAFB'],
  paper: ['#FFFFFF','#FAFAFA','#F4F4F5','#0F172A','#0F172A'],
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = x => Math.round(255 * x).toString(16).padStart(2, '0')
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`
}

function relativeLuminance(hex) {
  const c = hex.replace('#','')
  const r = parseInt(c.slice(0,2),16)/255
  const g = parseInt(c.slice(2,4),16)/255
  const b = parseInt(c.slice(4,6),16)/255
  const lin = (u)=> (u <= 0.03928 ? u/12.92 : Math.pow((u+0.055)/1.055, 2.4))
  const L = 0.2126*lin(r) + 0.7152*lin(g) + 0.0722*lin(b)
  return L
}

function pickTextForBackground(bgHex){
  return relativeLuminance(bgHex) > 0.5 ? '#0F172A' : '#F9FAFB'
}

export function generateAlgorithmicPalette(rng) {
  const baseHue = Math.floor(rng()*360)
  const scheme = ['analogous','triadic','complementary','tetradic','split','mono'][Math.floor(rng()*6)]
  const mode = rng() < 0.5 ? 'light' : 'dark'
  const satBase = mode === 'light' ? 18 + rng()*14 : 12 + rng()*12
  const lightBase = mode === 'light' ? 98 - rng()*6 : 10 + rng()*6

  const hueOffsets = {
    analogous: [0, 18, -18, 36],
    triadic: [0, 120, -120, 60],
    complementary: [0, 180, 30, -30],
    tetradic: [0, 90, 180, 270],
    split: [0, 150, -150, 30],
    mono: [0, 0, 0, 0],
  }[scheme]

  const bg = hslToHex((baseHue)%360, satBase, lightBase)
  const surface = hslToHex((baseHue+ (mode==='light'?2:-2))%360, satBase+6, mode==='light'? lightBase-6 : lightBase+6)
  const card = hslToHex((baseHue+ (mode==='light'?4:-4))%360, satBase+10, mode==='light'? lightBase-12 : lightBase+10)
  const primaryHue = (baseHue + hueOffsets[Math.floor(rng()*hueOffsets.length)])%360
  const primary = hslToHex(primaryHue, 68 + rng()*18, mode==='light' ? 50 + rng()*8 : 58 + rng()*10)
  const text = pickTextForBackground(bg)
  return [bg, surface, card, primary, text]
}

export function selectPalette(rng) {
  // 65% algorithmic, 35% curated to balance novelty and stability
  if (rng() < 0.65) {
    const palette = generateAlgorithmicPalette(rng)
    const key = `algo-${Math.random().toString(36).slice(2,8)}`
    return { key, palette }
  }
  const keys = Object.keys(PALETTES)
  const k = keys[Math.floor(rng()*keys.length)]
  return { key: k, palette: PALETTES[k] }
}

export function pickPalette(rng, name) {
  // Backwards-compatible helper
  if (name && PALETTES[name]) return PALETTES[name]
  return selectPalette(rng).palette
}

