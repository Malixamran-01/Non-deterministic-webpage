import { createRng, pickWeighted } from './seededRng'
import { selectPalette, PALETTES } from './palette'
import { pickRandomFonts } from './fonts'
import { pickReferences, deriveFromReferences } from './styleReferences'

export function generate(seed) {
  const { rng, seed: usedSeed } = createRng(seed)
  
  // weights example (can be externalized)
  const pagePurpose = pickWeighted(rng, [
    {item:'blog',weight:30},
    {item:'landing',weight:20},
    {item:'product',weight:10},
    {item:'meme',weight:15},
    {item:'fact',weight:25}
  ])
  
  let navbarStyle = pickWeighted(rng, [
    {item:'top',weight:35},
    {item:'centered',weight:25},
    {item:'side',weight:20},
    {item:'split',weight:10},
    {item:'none',weight:10}
  ])
  
  let { key: paletteKey, palette } = selectPalette(rng)
  
  let fontChoice = pickWeighted(rng, [
    {item:'system',weight:40},
    {item:'serif',weight:15},
    {item:'display',weight:25},
    {item:'mono',weight:20}
  ])
  
  const animations = ['fade','slide','bounce','zoom','tilt','float','spin','pulse-glow','slide-in-left','slide-in-right','fade-in-up','bounce-gentle','shimmer']
  let animation = animations[Math.floor(rng()*animations.length)]
  
  const contentType = pickWeighted(rng, [
    {item:'fact', weight: pagePurpose==='fact' ? 60 : 10},
    {item:'image+text', weight: pagePurpose==='meme' ? 55 : 25},
    {item:'text+cards', weight: 30},
    {item:'gallery', weight: 20},
    {item:'feature-grid', weight: 25},
    {item:'cta-hero', weight: 20},
    {item:'timeline', weight: 15},
    {item:'testimonials', weight: 18},
    {item:'pricing', weight: 12},
    {item:'faq', weight: 16},
  ])
  
  let buttonStyle = pickWeighted(rng, [
    {item:'solid', weight: 40},
    {item:'outline', weight: 25},
    {item:'ghost', weight: 20},
    {item:'gradient', weight: 10},
    {item:'neumorphic', weight: 8},
    {item:'glass', weight: 7},
  ])
  
  let cardStyle = pickWeighted(rng, [
    {item:'soft', weight: 40},
    {item:'glass', weight: 20},
    {item:'elevated', weight: 25},
    {item:'bordered', weight: 10},
    {item:'neumorphic', weight: 8},
    {item:'gradient', weight: 7},
  ])
  
  const cornerRadius = pickWeighted(rng, [
    {item:'rounded-md', weight: 25},
    {item:'rounded-lg', weight: 40},
    {item:'rounded-xl', weight: 25},
    {item:'rounded-2xl', weight: 10},
  ])
  
  let navVariant = pickWeighted(rng, [
    {item:'floating', weight: 25},
    {item:'glass', weight: 20},
    {item:'pill', weight: 15},
    {item:'bordered', weight: 15},
    {item:'sticky', weight: 15},
    {item:'shadowless', weight: 10},
    {item:'gradient', weight: 12},
    {item:'minimal', weight: 8},
  ])
  
  let headerStyle = pickWeighted(rng, [
    {item:'gradient', weight: 40},
    {item:'glow', weight: 30},
    {item:'plain', weight: 20},
    {item:'animated', weight: 10},
  ])
  
  let headerCase = pickWeighted(rng, [
    {item:'normal', weight: 40},
    {item:'upper', weight: 35},
    {item:'title', weight: 25},
  ])
  
  let headerTracking = pickWeighted(rng, [
    {item:'normal', weight: 50},
    {item:'wide', weight: 30},
    {item:'tight', weight: 20},
  ])
  
  const showTagCloud = rng() < 0.55
  const showStats = rng() < 0.6
  const showBackgroundBlobs = rng() < 0.5
  const showGridPattern = rng() < 0.3
  const showFloatingElements = rng() < 0.4
  
  let uiArchetype = pickWeighted(rng, [
    {item:'reddit', weight: 15},
    {item:'facebook', weight: 15},
    {item:'wikipedia', weight: 12},
    {item:'glass-landing', weight: 15},
    {item:'terminal', weight: 10},
    {item:'pinterest', weight: 12},
    {item:'youtube', weight: 12},
    {item:'twitter', weight: 12},
    {item:'notion', weight: 10},
    {item:'linkedin', weight: 10},
    {item:'instagram', weight: 12},
    {item:'stackoverflow', weight: 10},
    {item:'classic', weight: 12},
  ])

  // Style Reference Pool mixing
  const mixingMode = rng() < 0.4 ? 'coherent' : 'chaotic'
  const references = pickReferences(rng, 3)
  const mixed = deriveFromReferences(rng, references, mixingMode)
  
  // Enhanced mixing: sometimes override archetype with reference influence
  if (rng() < 0.3 && mixed.archetypeHint) {
    // 30% chance to use archetype hint from style references
    uiArchetype = mixed.archetypeHint
  } else if (rng() < 0.2 && mixed.navbarStyle) {
    // 20% chance to force a specific archetype based on navbar style
    if (mixed.navbarStyle === 'side' && rng() < 0.7) {
      uiArchetype = 'twitter' // Side navbar often means Twitter-like
    } else if (mixed.navbarStyle === 'centered' && rng() < 0.6) {
      uiArchetype = 'pinterest' // Centered often means Pinterest-like
    }
  }
  
  // Component Mixing Logic - Mix UI elements from different archetypes
  const componentMixing = {
    navbar: ['amazon', 'ebay', 'facebook', 'linkedin', 'github'],
    sidebar: ['reddit', 'linkedin', 'quora', 'twitter', 'notion'],
    mainContent: ['wikipedia', 'medium', 'stackoverflow', 'youtube', 'reddit'],
    footer: ['github', 'dribbble', 'spotify', 'behance', 'deviantart'],
    animations: ['pinterest', 'giphy', 'unsplash', 'glass-landing']
  }
  
  // Select random components from different archetypes
  const mixedComponents = {}
  for (const [component, archetypes] of Object.entries(componentMixing)) {
    if (rng() < 0.4) { // 40% chance to mix components
      const randomArchetype = archetypes[Math.floor(rng() * archetypes.length)]
      mixedComponents[component] = randomArchetype
    }
  }
  
  // Enhanced mixing: sometimes override archetype with reference influence
  if (rng() < 0.3 && mixed.archetypeHint) {
    // 30% chance to use archetype hint from style references
    uiArchetype = mixed.archetypeHint
  } else if (rng() < 0.2 && mixed.navbarStyle) {
    // 20% chance to force a specific archetype based on navbar style
    if (mixed.navbarStyle === 'side' && rng() < 0.7) {
      uiArchetype = 'twitter' // Side navbar often means Twitter-like
    } else if (mixed.navbarStyle === 'centered' && rng() < 0.6) {
      uiArchetype = 'pinterest' // Centered often means Pinterest-like
    }
  }
  
  // Apply mixed attributes where appropriate
  if (mixed.buttonStyle) buttonStyle = mixed.buttonStyle
  if (mixed.cardStyle) cardStyle = mixed.cardStyle
  if (mixed.animation) animation = mixed.animation
  if (mixed.fontChoice) fontChoice = mixed.fontChoice
  if (mixed.navbarStyle) navbarStyle = mixed.navbarStyle
  if (mixed.paletteHint && PALETTES[mixed.paletteHint]) {
    paletteKey = mixed.paletteHint
    palette = PALETTES[mixed.paletteKey]
  }
  
  const result = { 
    seed: usedSeed, 
    pagePurpose, 
    navbarStyle, 
    paletteKey, 
    palette, 
    fontChoice, 
    animation, 
    contentType,
    buttonStyle,
    cardStyle,
    cornerRadius,
    fonts: pickRandomFonts(rng),
    navVariant,
    headerStyle,
    headerCase,
    headerTracking,
    showTagCloud,
    showStats,
    showBackgroundBlobs,
    showGridPattern,
    showFloatingElements,
    uiArchetype,
    styleReferences: references,
    mixingMode,
    mixedComponents, // Add the mixed components
  }
  
  return result
}

