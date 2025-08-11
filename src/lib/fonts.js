// Curated Google Fonts lists
export const SANS_FONTS = [
  'Inter', 'Work Sans', 'Rubik', 'Poppins', 'Montserrat', 'Outfit', 'Manrope', 'Nunito', 'Mulish', 'Urbanist', 'Karla', 'Source Sans Pro', 'Hind', 'Quicksand', 'DM Sans'
]

export const SERIF_FONTS = [
  'Merriweather', 'Playfair Display', 'Lora', 'Cormorant Garamond', 'DM Serif Display', 'Bitter', 'Crimson Pro', 'Prata', 'Spectral', 'Noto Serif'
]

export const DISPLAY_FONTS = [
  'Bebas Neue', 'Abril Fatface', 'Oswald', 'Anton', 'Bungee', 'Lobster', 'Righteous', 'Staatliches', 'Teko', 'Alfa Slab One', 'Koulen', 'Russo One'
]

export const MONO_FONTS = [
  'IBM Plex Mono', 'Fira Mono', 'Space Mono', 'JetBrains Mono', 'Inconsolata', 'Source Code Pro', 'Anonymous Pro'
]

export function pickRandomFonts(rng){
  const pick = (arr)=> arr[Math.floor(rng()*arr.length)]
  const body = pick(SANS_FONTS)
  const heading = rng() < 0.5 ? pick(DISPLAY_FONTS) : pick(SERIF_FONTS)
  const mono = pick(MONO_FONTS)
  return { body, heading, mono }
}

export function buildGoogleFontsHref(families){
  const q = Object.values(families)
    .map(f => `family=${encodeURIComponent(f)}:wght@400;700`)
    .join('&')
  return `https://fonts.googleapis.com/css2?${q}&display=swap`
}


