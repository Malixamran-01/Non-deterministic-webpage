// Style Reference Pool and mapping helpers

export const STYLE_REFERENCES = [
  { name: 'Apple', elements: ['Minimal navbar','Large hero banners','Smooth fade animations','Center-aligned text'], font: 'display', paletteHint: 'paper', navbar: 'centered', cards: 'soft', button: 'outline', animation: 'fade', archetypeHint: 'glass-landing' },
  { name: 'Reddit', elements: ['Compact top navbar','Card-based feed','Upvote/downvote buttons','Muted color scheme'], font: 'system', paletteHint: 'muted', navbar: 'top', cards: 'bordered', button: 'ghost', animation: 'slide', archetypeHint: 'reddit', api: 'https://www.reddit.com/r/random.json' },
  { name: 'Pinterest', elements: ['Masonry grid layout','Hover zoom on images','Soft pastel backgrounds'], font: 'system', paletteHint: 'pastel', navbar: 'centered', cards: 'soft', button: 'ghost', animation: 'zoom', archetypeHint: 'pinterest', api: 'https://api.pinterest.com/v1/boards/random' },
  { name: 'Netflix', elements: ['Dark theme','Full-width image carousels','Bold typography','Hover video previews'], font: 'display', paletteHint: 'noir', navbar: 'top', cards: 'elevated', button: 'solid', animation: 'fade', archetypeHint: 'youtube' },
  { name: 'Spotify', elements: ['Dark theme with neon accents','Rounded buttons','Floating play buttons'], font: 'system', paletteHint: 'mint', navbar: 'top', cards: 'elevated', button: 'solid', animation: 'float', archetypeHint: 'glass-landing', api: 'https://api.spotify.com/v1/recommendations?seed_genres=random' },
  { name: 'YouTube', elements: ['Sticky top navbar','Video grid layout','Red and white theme','Hover shadows on thumbnails'], font: 'system', paletteHint: 'coral', navbar: 'top', cards: 'elevated', button: 'solid', animation: 'slide', archetypeHint: 'youtube', randomLink: 'https://www.youtube.com/watch?v={RANDOM_ID}' },
  { name: 'Twitter/X', elements: ['Minimal side navbar','Feed layout','Rounded avatar icons','Infinite scroll'], font: 'system', paletteHint: 'sky', navbar: 'side', cards: 'soft', button: 'outline', animation: 'slide', archetypeHint: 'twitter', api: 'https://api.twitter.com/2/tweets/sample/stream' },
  { name: 'Instagram', elements: ['Image-first layout','Story circles','Grid profile view','Gradient highlights'], font: 'system', paletteHint: 'candy', navbar: 'centered', cards: 'elevated', button: 'gradient', animation: 'zoom', archetypeHint: 'pinterest', randomLink: 'https://www.instagram.com/explore/tags/random/' },
  { name: 'Amazon', elements: ['Product grid','Card shadows','Bright CTA buttons','Dense navigation menus'], font: 'system', paletteHint: 'amber', navbar: 'top', cards: 'elevated', button: 'solid', animation: 'slide', archetypeHint: 'youtube', randomLink: 'https://www.amazon.com/dp/{RANDOM_ASIN}' },
  { name: 'eBay', elements: ['Auction card style','Search bar design','Bidding interface'], font: 'system', paletteHint: 'amber', navbar: 'top', cards: 'elevated', button: 'solid', animation: 'slide', archetypeHint: 'youtube', api: 'https://api.ebay.com/buy/browse/v1/item_summary/search?q=random' },
  { name: 'Dribbble', elements: ['Card grid','Hover lifts','Soft shadows','Muted pastel palette'], font: 'display', paletteHint: 'pastel', navbar: 'centered', cards: 'elevated', button: 'outline', animation: 'zoom', archetypeHint: 'pinterest', randomLink: 'https://dribbble.com/shots/popular' },
  { name: 'Behance', elements: ['Large project cards','Minimal text overlay','Hover zooms','Clean typography'], font: 'display', paletteHint: 'slate', navbar: 'top', cards: 'elevated', button: 'ghost', animation: 'zoom', archetypeHint: 'notion', randomLink: 'https://www.behance.net/search/projects?search=random' },
  { name: 'GitHub', elements: ['Dark/light toggle','Simple navbar','Code blocks','Monospace fonts'], font: 'mono', paletteHint: 'slate', navbar: 'top', cards: 'bordered', button: 'outline', animation: 'fade', archetypeHint: 'terminal', api: 'https://api.github.com/repositories' },
  { name: 'Medium', elements: ['Serif fonts','Minimal design','Large headings','Smooth fade animations'], font: 'serif', paletteHint: 'paper', navbar: 'centered', cards: 'soft', button: 'ghost', animation: 'fade', archetypeHint: 'notion', randomLink: 'https://medium.com/tag/random' },
  { name: 'BBC News', elements: ['Headline-focused layout','Grid news cards','Strong typography','Red accents'], font: 'serif', paletteHint: 'coral', navbar: 'top', cards: 'bordered', button: 'solid', animation: 'slide', archetypeHint: 'wikipedia' },
  { name: 'NYTimes', elements: ['Classic serif typography','Text-heavy','Minimalist black and white'], font: 'serif', paletteHint: 'paper', navbar: 'centered', cards: 'bordered', button: 'outline', animation: 'fade', archetypeHint: 'wikipedia' },
  { name: 'Quora', elements: ['Q&A style cards','Minimal sidebars','Soft background colors'], font: 'serif', paletteHint: 'paper', navbar: 'top', cards: 'soft', button: 'ghost', animation: 'fade', archetypeHint: 'reddit', randomLink: 'https://www.quora.com/topic/Random' },
  { name: 'StackOverflow', elements: ['Q&A grid','Tag system','Light background with orange accents'], font: 'system', paletteHint: 'amber', navbar: 'top', cards: 'bordered', button: 'outline', animation: 'slide', archetypeHint: 'reddit', api: 'https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow' },
  { name: 'Airbnb', elements: ['Rounded cards','Large hero search bar','Pastel colors','Friendly font'], font: 'system', paletteHint: 'rose', navbar: 'centered', cards: 'soft', button: 'solid', animation: 'fade', archetypeHint: 'glass-landing' },
  { name: 'Notion', elements: ['Minimalist blocks','Soft shadows','Neutral colors','Smooth animations'], font: 'system', paletteHint: 'paper', navbar: 'centered', cards: 'soft', button: 'outline', animation: 'fade', archetypeHint: 'notion' },
  { name: 'Trello', elements: ['Card columns','Drag-and-drop','Bright color labels'], font: 'system', paletteHint: 'sky', navbar: 'top', cards: 'elevated', button: 'solid', animation: 'slide', archetypeHint: 'notion' },
  { name: 'Figma', elements: ['Minimal UI','Color-coded elements','Vector iconography'], font: 'system', paletteHint: 'slate', navbar: 'top', cards: 'bordered', button: 'outline', animation: 'fade', archetypeHint: 'notion' },
  { name: 'LinkedIn', elements: ['Professional layout','Blue/white palette','Feed with cards'], font: 'system', paletteHint: 'sky', navbar: 'top', cards: 'soft', button: 'solid', animation: 'fade', archetypeHint: 'facebook', randomLink: 'https://www.linkedin.com/jobs/search?keywords=random' },
  { name: 'Facebook', elements: ['Side navigation','Feed cards','Blue theme','Rounded profile pictures'], font: 'system', paletteHint: 'sky', navbar: 'side', cards: 'soft', button: 'solid', animation: 'fade', archetypeHint: 'facebook' },
  { name: 'Discord', elements: ['Dark theme','Side server list','Pop-out panels','Rounded avatars'], font: 'system', paletteHint: 'velvet', navbar: 'side', cards: 'elevated', button: 'solid', animation: 'fade', archetypeHint: 'twitter' },
  { name: 'Twitch', elements: ['Dark purple theme','Video-first layout','Live indicator badges'], font: 'system', paletteHint: 'velvet', navbar: 'top', cards: 'elevated', button: 'solid', animation: 'zoom', archetypeHint: 'youtube' },
  { name: 'Product Hunt', elements: ['Card feed','Upvote buttons','Minimal white/orange palette'], font: 'system', paletteHint: 'amber', navbar: 'top', cards: 'bordered', button: 'outline', animation: 'slide', archetypeHint: 'reddit', api: 'https://api.producthunt.com/v2/api/graphql' },
  { name: 'Canva', elements: ['Vibrant gradients','Rounded buttons','Drag-and-drop interface'], font: 'display', paletteHint: 'candy', navbar: 'centered', cards: 'elevated', button: 'gradient', animation: 'zoom', archetypeHint: 'glass-landing' },
  { name: 'Shopify', elements: ['Minimal product showcases','Pastel greens','Clean icons'], font: 'system', paletteHint: 'forest', navbar: 'centered', cards: 'soft', button: 'solid', animation: 'fade', archetypeHint: 'glass-landing' },
  { name: 'Etsy', elements: ['Handmade aesthetic','Warm tones','Card grids'], font: 'serif', paletteHint: 'clay', navbar: 'top', cards: 'bordered', button: 'solid', animation: 'fade', archetypeHint: 'pinterest' },
  { name: 'Hacker News', elements: ['Text-first layout','Orange header','Minimalist tables'], font: 'mono', paletteHint: 'paper', navbar: 'top', cards: 'bordered', button: 'outline', animation: 'fade', archetypeHint: 'terminal', api: 'https://hacker-news.firebaseio.com/v0/topstories.json' },
  { name: 'Wikipedia', elements: ['Content layout','Header style','Link styling'], font: 'serif', paletteHint: 'paper', navbar: 'top', cards: 'bordered', button: 'outline', animation: 'fade', archetypeHint: 'wikipedia' },
  { name: 'NewsAPI', elements: ['News card','Headline ticker','Breaking news layout'], font: 'serif', paletteHint: 'coral', navbar: 'top', cards: 'bordered', button: 'solid', animation: 'slide', archetypeHint: 'wikipedia', api: 'https://newsapi.org/v2/top-headlines?country=us' },
  { name: 'Unsplash', elements: ['Photo card','Fullscreen background','Minimal overlay text'], font: 'system', paletteHint: 'paper', navbar: 'centered', cards: 'elevated', button: 'ghost', animation: 'fade', archetypeHint: 'pinterest', api: 'https://api.unsplash.com/photos/random' },
  { name: 'Giphy', elements: ['GIF card','Animated background','Play button overlay'], font: 'system', paletteHint: 'candy', navbar: 'centered', cards: 'elevated', button: 'gradient', animation: 'zoom', archetypeHint: 'pinterest', api: 'https://api.giphy.com/v1/gifs/random' },
  { name: 'DeviantArt', elements: ['Art card','Gallery grid','Artist profile'], font: 'system', paletteHint: 'pastel', navbar: 'centered', cards: 'elevated', button: 'outline', animation: 'zoom', archetypeHint: 'pinterest', randomLink: 'https://www.deviantart.com/random/deviation' },
]

export function pickReferences(rng, max = 3) {
  const count = 1 + Math.floor(rng() * max)
  const pool = [...STYLE_REFERENCES]
  const chosen = []
  for(let i=0;i<count;i++){
    const idx = Math.floor(rng()*pool.length)
    chosen.push(pool.splice(idx,1)[0])
  }
  return chosen
}

export function deriveFromReferences(rng, references, mode='coherent'){
  const pickFrom = (key)=> references[Math.floor(rng()*references.length)][key]
  const merged = {
    navbarStyle: pickFrom('navbar'),
    cardStyle: pickFrom('cards'),
    buttonStyle: pickFrom('button'),
    fontChoice: pickFrom('font'),
    paletteHint: pickFrom('paletteHint'),
    animation: pickFrom('animation'),
    archetypeHint: pickFrom('archetypeHint'),
  }
  if(mode === 'chaotic'){
    // Re-pick each independently for extra chaos
    merged.navbarStyle = pickFrom('navbar')
    merged.cardStyle = pickFrom('cards')
    merged.buttonStyle = pickFrom('button')
    merged.fontChoice = pickFrom('font')
    merged.paletteHint = pickFrom('paletteHint')
    merged.animation = pickFrom('animation')
    merged.archetypeHint = pickFrom('archetypeHint')
  }
  return merged
}


