import React, { useState, useEffect, useCallback } from 'react'
import { createRng } from '../lib/seededRng'
import { createAPIContentManager } from '../lib/apiContentManager'
import ContentDisplay, { ContentGrid } from './content/ContentDisplay'
import ContentRefreshButton from './content/ContentRefreshButton'
import RandomLinkDisplay from './content/RandomLinkDisplay'
import RedditLike from './archetypes/RedditLike'
import FacebookLike from './archetypes/FacebookLike'
import WikipediaLike from './archetypes/WikipediaLike'
import GlassLanding from './archetypes/GlassLanding'
import Terminal from './archetypes/Terminal'
import PinterestLike from './archetypes/PinterestLike'
import YouTubeLike from './archetypes/YouTubeLike'
import TwitterLike from './archetypes/TwitterLike'
import NotionLike from './archetypes/NotionLike'
import LinkedInLike from './archetypes/LinkedInLike'
import InstagramLike from './archetypes/InstagramLike'
import StackOverflowLike from './archetypes/StackOverflowLike'

export default function GeneratorUI({spec, regenerate}){
  // Enhanced API content fetching with multiple sources
  const [apiContent, setApiContent] = useState(null)
  const [contentLoading, setContentLoading] = useState(true)
  const [apiError, setApiError] = useState(null)
  const [remote, setRemote] = useState(null)
  
  const fetchAPIContent = useCallback(async () => {
    if (!spec) return
    setContentLoading(true)
    setApiError(null)
    try {
      const contentManager = createAPIContentManager(spec.seed + '_api')
      const content = await contentManager.getContentForArchetype(spec.uiArchetype, 2)
      setApiContent(content)
    } catch (error) {
      console.warn('Failed to fetch API content:', error)
      setApiError(error.message || 'Failed to fetch content')
      setApiContent(null)
    } finally {
      setContentLoading(false)
    }
  }, [spec?.seed, spec?.uiArchetype])
  
  // Legacy remote content (keeping for backward compatibility)
  useEffect(()=>{
    if (spec) {
      const sources = [
        // { key: 'quote', url: 'https://api.quotable.io/random' },
        { key: 'fact', url: 'https://uselessfacts.jsph.pl/random.json?language=en' },
      ]
      const chosen = sources[Math.floor(rng()*sources.length)]
      fetch(chosen.url)
        .then(r=>r.json())
        .then(data=> setRemote({ key: chosen.key, data }))
        .catch(()=> setRemote(null))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spec?.seed])
  
  // Early return if spec is not available
  if(!spec) return <div className="p-8">Loading...</div>
  
  // Generate some random content based on the spec
  const { rng } = createRng(spec.seed + '_content')
  
  const generateRandomText = (length = 100) => {
    const words = [
      'amazing', 'incredible', 'fantastic', 'wonderful', 'brilliant', 'spectacular', 'magnificent', 'extraordinary', 'remarkable', 'outstanding', 
      'exceptional', 'phenomenal', 'marvelous', 'superb', 'excellent', 'perfect', 'beautiful', 'stunning', 'gorgeous', 'elegant', 
      'chaotic', 'serendipitous', 'whimsical', 'luminous', 'granular', 'ephemeral', 'procedural', 'polymorphic', 'kaleidoscopic',
      'innovative', 'revolutionary', 'groundbreaking', 'cutting-edge', 'state-of-the-art', 'next-generation', 'future-forward', 'visionary',
      'harmonious', 'symphonic', 'orchestral', 'melodic', 'rhythmic', 'flowing', 'organic', 'natural', 'authentic', 'genuine',
      'dynamic', 'energetic', 'vibrant', 'lively', 'spirited', 'enthusiastic', 'passionate', 'inspired', 'motivated', 'driven'
    ]
    let text = ''
    for(let i = 0; i < length; i++) {
      text += words[Math.floor(rng() * words.length)] + ' '
    }
    return text.trim()
  }
  
  const generateRandomImage = () => {
    const imageId = Math.floor(rng() * 1000)
    return `https://picsum.photos/400/300?random=${imageId}`
  }
  
  const generateRandomEmoji = () => {
    const emojis = ['✨', '🚀', '💡', '🎨', '🌟', '🔥', '💎', '🎯', '⚡', '🌈', '🎭', '🎪', '🎨', '🎬', '🎵', '🎮', '🎲', '🎭', '🎪', '🎨', '🎬', '🎵', '🎮', '🎲']
    return emojis[Math.floor(rng() * emojis.length)]
  }
  
  const fontClass = {
    system: 'font-sans',
    serif: 'font-serif', 
    display: 'font-sans',
    mono: 'font-mono'
  }[spec.fontChoice] || 'font-sans'
  
  const animationClass = {
    fade: 'animate-pulse',
    slide: 'transform transition-transform hover:translate-x-2',
    bounce: 'animate-bounce',
    zoom: 'transform transition-transform hover:scale-105',
    tilt: 'animate-tilt',
    float: 'animate-float',
    spin: 'animate-spin-slow',
    'pulse-glow': 'animate-pulse-glow',
    'slide-in-left': 'animate-slide-in-left',
    'slide-in-right': 'animate-slide-in-right',
    'fade-in-up': 'animate-fade-in-up',
    'bounce-gentle': 'animate-bounce-gentle',
    shimmer: 'animate-shimmer'
  }[spec.animation] || ''
  
  const buttonBase = `inline-flex items-center justify-center font-medium transition-all ${spec.cornerRadius}`
  const buttonClass = {
    solid: `${buttonBase} shadow-sm hover:shadow-md` ,
    outline: `${buttonBase} border-2 hover:-translate-y-0.5`,
    ghost: `${buttonBase} hover:bg-opacity-10`,
    gradient: `${buttonBase} shadow-lg hover:shadow-xl`,
    neumorphic: `${buttonBase} shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.7),inset_2px_2px_4px_rgba(70,70,70,0.12)] hover:shadow-[inset_-1px_-1px_2px_rgba(255,255,255,0.7),inset_1px_1px_2px_rgba(70,70,70,0.12)]`,
    glass: `${buttonBase} backdrop-blur border border-white/30 shadow-sm hover:shadow-md`,
  }[spec.buttonStyle]
  
  const buttonStyle = (invert=false)=> {
    const bg = spec.buttonStyle === 'gradient'
      ? `linear-gradient(135deg, ${spec.palette[3]} 0%, ${spec.palette[4]} 100%)`
      : spec.palette[3]
    return {
      background: invert ? 'transparent' : bg,
      color: invert ? spec.palette[3] : spec.palette[0],
      borderColor: spec.palette[3]
    }
  }
  
  const cardBase = `${spec.cornerRadius} overflow-hidden transition-all`
  const cardClass = {
    soft: `${cardBase} shadow hover:shadow-lg`,
    glass: `${cardBase} backdrop-blur border border-white/30 shadow-sm`,
    elevated: `${cardBase} shadow-lg hover:-translate-y-1`,
    bordered: `${cardBase} border`,
    neumorphic: `${cardBase} shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.7),inset_4px_4px_8px_rgba(70,70,70,0.12)]`,
    gradient: `${cardBase} bg-gradient-to-br`,
  }[spec.cardStyle]
  
  // Put this near the top of your component, before the return()
const safePalette = Array.isArray(spec?.palette) && spec.palette.length >= 5
? spec.palette
: ['#ffffff', '#eeeeee', '#cccccc', '#999999', '#000000'];

return (
<div
  className={`relative p-6 max-w-6xl mx-auto ${fontClass}`}
  style={{
    backgroundColor: safePalette[0],
    color: safePalette[4],
  }}
>
  {/* Background blobs */}
  {spec?.showBackgroundBlobs && (
    <>
      <div
        className="absolute -top-10 -left-10 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ background: safePalette[3] }}
      />
      <div
        className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ background: safePalette[2] }}
      />
    </>
  )}
</div>
);

  return (
    <div className={`relative p-6 max-w-6xl mx-auto ${fontClass}`} style={{backgroundColor: spec.palette[0], color: spec.palette[4]}}>
      {/* Background blobs */}
      {spec.showBackgroundBlobs && (
        <>
          <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full blur-3xl opacity-20" style={{background: spec.palette[3]}}/>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full blur-3xl opacity-20" style={{background: spec.palette[2]}}/>
        </>
      )}
      
      {/* Grid pattern background */}
      {spec.showGridPattern && (
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(${spec.palette[3]} 1px, transparent 1px), linear-gradient(90deg, ${spec.palette[3]} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}/>
      )}
      
      {/* Floating elements */}
      {spec.showFloatingElements && (
        <>
          <div className="absolute top-20 right-20 w-8 h-8 rounded-full animate-float opacity-30" style={{background: spec.palette[4]}}/>
          <div className="absolute bottom-32 left-32 w-6 h-6 rounded-full animate-bounce-gentle opacity-40" style={{background: spec.palette[2]}}/>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full animate-tilt opacity-25" style={{background: spec.palette[3]}}/>
        </>
      )}
      {/* Navbar */}
      {spec.navbarStyle !== 'none' && (
        <nav className={`mb-8 p-4 ${spec.cornerRadius} ${spec.navVariant==='floating' ? 'shadow-xl' : ''} ${spec.navVariant==='glass' ? 'backdrop-blur bg-white/20' : ''} ${spec.navVariant==='pill' ? 'rounded-full' : ''} ${spec.navVariant==='bordered' ? 'border' : ''} ${spec.navVariant==='shadowless' ? 'shadow-none' : ''} ${spec.navVariant==='sticky' ? 'sticky top-4 z-10' : ''} ${spec.navVariant==='gradient' ? 'bg-gradient-to-r' : ''} ${spec.navVariant==='minimal' ? 'bg-transparent border-b' : ''}`} style={{
          backgroundColor: spec.navVariant==='glass' ? 'transparent' : 
                          spec.navVariant==='gradient' ? 'transparent' :
                          spec.navVariant==='minimal' ? 'transparent' : spec.palette[1],
          backgroundImage: spec.navVariant==='gradient' ? `linear-gradient(90deg, ${spec.palette[1]}, ${spec.palette[2]})` : 'none',
          borderColor: spec.navVariant==='minimal' ? spec.palette[3] : 'transparent'
        }}>
          {spec.navbarStyle === 'centered' && (
            <div className="flex justify-center items-center gap-6">
              <h1 className="text-2xl font-bold" style={{color: spec.palette[0]}}>{spec.pagePurpose.toUpperCase()} SITE</h1>
              <div className="hidden md:flex gap-6">
                {['Home','About','Contact'].map(item => (
                  <a key={item} href="#" className="hover:underline" style={{color: spec.palette[0]}}>{item}</a>
                ))}
              </div>
            </div>
          )}
          {spec.navbarStyle === 'top' && (
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold" style={{color: spec.palette[0]}}>{spec.pagePurpose.toUpperCase()} SITE</h1>
              <div className="flex gap-4">
                {['Home','About','Contact'].map(item => (
                  <a key={item} href="#" className="hover:underline" style={{color: spec.palette[0]}}>{item}</a>
                ))}
              </div>
            </div>
          )}
          {spec.navbarStyle === 'split' && (
            <div className="grid grid-cols-3 items-center">
              <div className="hidden md:flex gap-4">
                {['Home','About'].map(item => (
                  <a key={item} href="#" className="hover:underline" style={{color: spec.palette[0]}}>{item}</a>
                ))}
              </div>
              <div className="justify-self-center">
                <h1 className="text-xl md:text-2xl font-bold" style={{color: spec.palette[0]}}>{spec.pagePurpose.toUpperCase()}</h1>
              </div>
              <div className="justify-self-end">
                <button className={`${buttonClass} px-4 py-2`} style={buttonStyle()}>
                  Get Started
                </button>
              </div>
            </div>
          )}
        </nav>
      )}
      
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className={`text-4xl md:text-5xl font-bold mb-3 ${animationClass} ${spec.headerTracking==='wide' ? 'tracking-wider' : ''} ${spec.headerTracking==='tight' ? '-tracking-tight' : ''}`} style={{fontFamily: `var(--font-heading), ${fontClass}`, textTransform: spec.headerCase==='upper' ? 'uppercase' : 'none'}}>
          {spec.pagePurpose === 'landing' && 'Discover Wild, Procedural Web Art'}
          {spec.pagePurpose === 'blog' && 'Stories From the Random Web'}
          {spec.pagePurpose === 'product' && 'Aesthetic Chaos, Generatively Yours'}
          {spec.pagePurpose === 'meme' && 'The Web Rolled A Natural 20'}
          {spec.pagePurpose === 'fact' && 'Unexpected Facts, Beautifully Rendered'}
        </h1>
        {spec.headerStyle === 'gradient' && (
          <div className="h-1 w-40 mx-auto mb-4 rounded-full" style={{background: `linear-gradient(90deg, ${spec.palette[3]}, ${spec.palette[4]})`}}/>
        )}
        {spec.headerStyle === 'glow' && (
          <div className="h-1 w-40 mx-auto mb-4 rounded-full shadow-[0_0_30px]" style={{background: spec.palette[3], boxShadow: `0 0 30px ${spec.palette[3]}`}}/>
        )}
        {spec.headerStyle === 'animated' && (
          <div className="h-1 w-40 mx-auto mb-4 rounded-full animate-pulse-glow" style={{background: spec.palette[3]}}/>
        )}
        <p className="text-base md:text-lg opacity-80">
          Seed {spec.seed} • Palette {spec.paletteKey} • Animation {spec.animation} • Layout {spec.contentType}
        </p>
      </header>
      
      {/* Main Content */}
      <main className="mb-12">
        {spec.uiArchetype === 'reddit' && (
          <>
            <RedditLike spec={spec} rng={rng} />
            {/* API Content for Reddit */}
            {apiContent && apiContent.content && apiContent.content.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold opacity-80">Random Content</h3>
                  <ContentRefreshButton 
                    onRefresh={fetchAPIContent}
                    loading={contentLoading}
                    spec={spec}
                  />
                </div>
                <ContentGrid 
                  contentItems={apiContent.content} 
                  spec={spec} 
                  rng={rng} 
                  columns={1} 
                />
              </div>
            )}
          </>
        )}
        
        {spec.uiArchetype === 'facebook' && (
          <>
            <FacebookLike spec={spec} rng={rng} />
            {/* API Content for Facebook */}
            {apiContent && apiContent.content && apiContent.content.length > 0 && (
              <div className="mt-8">
                <ContentGrid 
                  contentItems={apiContent.content} 
                  spec={spec} 
                  rng={rng} 
                  columns={1} 
                />
              </div>
            )}
          </>
        )}
        
        {spec.uiArchetype === 'wikipedia' && (
          <>
            <WikipediaLike spec={spec} rng={rng} />
            {/* API Content for Wikipedia */}
            {apiContent && apiContent.content && apiContent.content.length > 0 && (
              <div className="mt-8">
                <ContentGrid 
                  contentItems={apiContent.content} 
                  spec={spec} 
                  rng={rng} 
                  columns={1} 
                />
              </div>
            )}
          </>
        )}
        
        {spec.uiArchetype === 'glass-landing' && (
          <>
            <GlassLanding spec={spec} />
            {/* API Content for Glass Landing */}
            {apiContent && apiContent.content && apiContent.content.length > 0 && (
              <div className="mt-8">
                <ContentGrid 
                  contentItems={apiContent.content} 
                  spec={spec} 
                  rng={rng} 
                  columns={1} 
                />
              </div>
            )}
          </>
        )}
        
        {spec.uiArchetype === 'terminal' && (
          <>
            <Terminal spec={spec} rng={rng} />
            {/* API Content for Terminal */}
            {apiContent && apiContent.content && apiContent.content.length > 0 && (
              <div className="mt-8">
                <ContentGrid 
                  contentItems={apiContent.content} 
                  spec={spec} 
                  rng={rng} 
                  columns={1} 
                />
              </div>
            )}
          </>
        )}
        
        {spec.uiArchetype === 'pinterest' && (
          <>
            <PinterestLike spec={spec} rng={rng} />
            {/* API Content for Pinterest */}
            {apiContent && apiContent.content && apiContent.content.length > 0 && (
              <div className="mt-8">
                <ContentGrid 
                  contentItems={apiContent.content} 
                  spec={spec} 
                  rng={rng} 
                  columns={2} 
                />
              </div>
            )}
          </>
        )}
        
        {spec.uiArchetype === 'youtube' && (
          <>
            <YouTubeLike spec={spec} rng={rng} />
            {/* API Content for YouTube */}
            {apiContent && apiContent.content && apiContent.content.length > 0 && (
              <div className="mt-8">
                <ContentGrid 
                  contentItems={apiContent.content} 
                  spec={spec} 
                  rng={rng} 
                  columns={1} 
                />
              </div>
            )}
          </>
        )}
        
        {spec.uiArchetype === 'twitter' && (
          <>
            <TwitterLike spec={spec} rng={rng} />
            {/* API Content for Twitter */}
            {apiContent && apiContent.content && apiContent.content.length > 0 && (
              <div className="mt-8">
                <ContentGrid 
                  contentItems={apiContent.content} 
                  spec={spec} 
                  rng={rng} 
                  columns={1} 
                />
              </div>
            )}
          </>
        )}
        
        {spec.uiArchetype === 'notion' && (
          <>
            <NotionLike spec={spec} rng={rng} />
            {/* API Content for Notion */}
            {apiContent && apiContent.content && apiContent.content.length > 0 && (
              <div className="mt-8">
                <ContentGrid 
                  contentItems={apiContent.content} 
                  spec={spec} 
                  rng={rng} 
                  columns={1} 
                />
              </div>
            )}
          </>
        )}
        
        {spec.uiArchetype === 'linkedin' && (
          <>
            <LinkedInLike spec={spec} rng={rng} />
            {/* API Content for LinkedIn */}
            {apiContent && apiContent.content && apiContent.content.length > 0 && (
              <div className="mt-8">
                <ContentGrid 
                  contentItems={apiContent.content} 
                  spec={spec} 
                  rng={rng} 
                  columns={1} 
                />
              </div>
            )}
          </>
        )}
        
        {spec.uiArchetype === 'instagram' && (
          <>
            <InstagramLike spec={spec} rng={rng} />
            {/* API Content for Instagram */}
            {apiContent && apiContent.content && apiContent.content.length > 0 && (
              <div className="mt-8">
                <ContentGrid 
                  contentItems={apiContent.content} 
                  spec={spec} 
                  rng={rng} 
                  columns={2} 
                />
              </div>
            )}
          </>
        )}
        
        {spec.uiArchetype === 'stackoverflow' && (
          <>
            <StackOverflowLike spec={spec} rng={rng} />
            {/* API Content for StackOverflow */}
            {apiContent && apiContent.content && apiContent.content.length > 0 && (
              <div className="mt-8">
                <ContentGrid 
                  contentItems={apiContent.content} 
                  spec={spec} 
                  rng={rng} 
                  columns={1} 
                />
              </div>
            )}
          </>
        )}
        
        {spec.uiArchetype === 'classic' && (
          <>
            {/* API Content Section */}
            {apiContent && apiContent.content && apiContent.content.length > 0 && (
              <section className={`mb-8 p-6 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1]}}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold" style={{color: spec.palette[0]}}>
                    🌐 Random Internet Content
                  </h2>
                  <ContentRefreshButton 
                    onRefresh={fetchAPIContent}
                    loading={contentLoading}
                    spec={spec}
                  />
                </div>
                <div className="text-sm text-center mb-4 opacity-70" style={{color: spec.palette[0]}}>
                  Powered by {apiContent.content.map(c => c.source).join(', ')}
                </div>
                <ContentGrid 
                  contentItems={apiContent.content} 
                  spec={spec} 
                  rng={rng} 
                  columns={apiContent.content.length > 1 ? 2 : 1} 
                />
              </section>
            )}
            
            {/* Error state for API content */}
            {apiError && (
              <section className={`mb-8 p-4 ${spec.cornerRadius} text-center`} style={{backgroundColor: spec.palette[2]}}>
                <div className="text-red-500 mb-2">⚠️</div>
                <p className="text-sm opacity-80">Failed to load content: {apiError}</p>
                <button 
                  onClick={fetchAPIContent}
                  className={`mt-2 px-4 py-2 ${buttonClass} text-sm`} 
                  style={buttonStyle()}
                >
                  Try Again
                </button>
              </section>
            )}
            
            {/* Loading state for API content */}
            {contentLoading && (
              <section className={`mb-8 p-6 ${spec.cornerRadius} text-center`} style={{backgroundColor: spec.palette[2]}}>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="animate-spin w-6 h-6 border-2 border-current border-t-transparent rounded-full" style={{color: spec.palette[3]}}></div>
                  <div className="animate-pulse text-sm opacity-70">Loading...</div>
                </div>
                <p className="text-sm opacity-80">Fetching random content from the internet...</p>
                <div className="mt-3 flex justify-center space-x-1">
                  {[0, 1, 2].map(i => (
                    <div key={i} className={`w-2 h-2 rounded-full animate-bounce`} style={{
                      backgroundColor: spec.palette[3],
                      animationDelay: `${i * 0.1}s`
                    }}></div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Random Links Display - shown when no API content or as supplement */}
            {(!apiContent || apiContent.content.length === 0) && (
              <RandomLinkDisplay 
                spec={spec} 
                rng={rng} 
                onRefresh={() => {
                  // Generate new random links
                  window.location.reload()
                }}
              />
            )}
            
            {/* Legacy content types */}
            {spec.contentType === 'fact' && (
          <div className={`text-center p-10 ${spec.cornerRadius} ${animationClass}`} style={{backgroundColor: spec.palette[2]}}>
            <h2 className="text-2xl font-bold mb-4">Random Fact</h2>
            <p className="text-lg">
              Did you know? {generateRandomText(20)}
            </p>
          </div>
        )}
        
        {spec.contentType === 'image+text' && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className={`${animationClass}`}>
              <img 
                src={generateRandomImage()} 
                alt="Random" 
                className={`w-full h-64 object-cover ${spec.cornerRadius}`}
              />
            </div>
            <div className={`p-6 ${spec.cornerRadius} ${animationClass}`} style={{backgroundColor: spec.palette[2]}}>
              <h2 className="text-xl font-bold mb-4">Meme Content</h2>
              <p>{generateRandomText(30)}</p>
            </div>
          </div>
        )}
        
        {spec.contentType === 'text+cards' && (
          <div className="grid gap-6 md:grid-cols-3">
            {[1,2,3].map(i => (
              <div key={i} className={`p-6 ${cardClass} ${animationClass}`} style={{backgroundColor: spec.palette[2]}}>
                <h3 className="text-lg font-bold mb-3">Card {i}</h3>
                <p className="mb-4">{generateRandomText(15)}</p>
                <button className={`${buttonClass} px-4 py-2`} style={buttonStyle()}>
                  Learn More
                </button>
              </div>
            ))}
          </div>
        )}
        
        {spec.contentType === 'gallery' && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({length: 6}).map((_,i)=> (
              <div key={i} className={`${cardClass}`} style={{backgroundColor: spec.palette[2]}}>
                <img src={generateRandomImage()} alt="Random" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Gallery Item {i+1}</h3>
                  <p className="text-sm opacity-80">{generateRandomText(10)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {spec.contentType === 'feature-grid' && (
          <section className="grid gap-6 md:grid-cols-3">
            {['Lightning Fast','Beautiful UI','Infinite Themes'].map((t)=> (
              <div key={t} className={`p-6 ${cardClass}`} style={{backgroundColor: spec.palette[2]}}>
                <div className="text-3xl mb-3">{generateRandomEmoji()}</div>
                <h3 className="font-bold mb-2">{t}</h3>
                <p className="opacity-80">{generateRandomText(16)}</p>
              </div>
            ))}
          </section>
        )}
        
        {spec.showTagCloud && (
          <section className={`mt-10 ${spec.cornerRadius} p-6`} style={{backgroundColor: spec.palette[2]}}>
            <h3 className="text-xl font-bold mb-4 text-center">Trending Tags</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {Array.from({length: 20}).map((_,i)=> (
                <span key={i} className={`px-3 py-1 ${spec.cornerRadius} hover:scale-105 transition-transform cursor-pointer`} style={{
                  backgroundColor: spec.palette[1], 
                  color: spec.palette[0],
                  fontSize: `${0.8 + (rng() * 0.4)}rem`
                }}>
                  #{generateRandomText(1)}
                </span>
              ))}
            </div>
          </section>
        )}
        
        {spec.showStats && (
          <section className="mt-10 grid gap-6 sm:grid-cols-4">
            {[
              {label: 'Seeds', icon: '🎲', value: Math.floor(rng()*1000) + 111},
              {label: 'Palettes', icon: '🎨', value: Math.floor(rng()*100) + 25},
              {label: 'Layouts', icon: '📐', value: Math.floor(rng()*50) + 15},
              {label: 'Archetypes', icon: '🏗️', value: Math.floor(rng()*20) + 8}
            ].map((stat)=> (
              <div key={stat.label} className={`p-6 text-center ${cardClass} ${animationClass}`} style={{backgroundColor: spec.palette[2]}}>
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold" style={{color: spec.palette[3]}}>
                  {stat.value}
                </div>
                <div className="opacity-80">{stat.label}</div>
              </div>
            ))}
          </section>
        )}
        
        {remote && (
          <section className={`mt-8 p-6 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[2]}}>
            {remote.key === 'quote' && (
              <blockquote className="italic">
                “{remote.data.content}” — {remote.data.author}
              </blockquote>
            )}
            {remote.key === 'fact' && (
              <div>
                <h3 className="font-semibold mb-2">Random Fact</h3>
                <p>{remote.data.text}</p>
              </div>
            )}
          </section>
        )}
        
        {spec.contentType === 'cta-hero' && (
          <section className={`p-10 ${spec.cornerRadius} text-center`} style={{backgroundColor: spec.palette[2]}}>
            <h2 className="text-3xl font-bold mb-4">Make Something Procedurally Beautiful</h2>
            <p className="mb-6 opacity-90">{generateRandomText(22)}</p>
            <div className="flex gap-4 justify-center">
              <button className={`${buttonClass} px-6 py-3`} style={buttonStyle()}>
                Get Started
              </button>
              <button className={`${buttonClass} px-6 py-3`} style={buttonStyle(true)}>
                Learn More
              </button>
            </div>
          </section>
        )}
        
        {spec.contentType === 'timeline' && (
          <section className={`p-8 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[2]}}>
            <h2 className="text-2xl font-bold mb-6 text-center">Procedural Timeline</h2>
            <div className="space-y-6">
              {Array.from({length: 4}).map((_, i) => (
                <div key={i} className={`flex items-center ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-4 h-4 rounded-full ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[3]}}></div>
                  <div className={`flex-1 mx-4 p-4 ${cardClass}`} style={{backgroundColor: spec.palette[1]}}>
                    <h3 className="font-semibold mb-2">Event {i + 1}</h3>
                    <p className="text-sm opacity-80">{generateRandomText(12)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {spec.contentType === 'testimonials' && (
          <section className={`p-8 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[2]}}>
            <h2 className="text-2xl font-bold mb-6 text-center">User Testimonials</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({length: 4}).map((_, i) => (
                <div key={i} className={`p-6 ${cardClass} text-center`} style={{backgroundColor: spec.palette[1]}}>
                  <div className="text-4xl mb-4">{generateRandomEmoji()}</div>
                  <p className="mb-4 italic">"{generateRandomText(25)}"</p>
                  <div className="font-semibold">- User {i + 1}</div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {spec.contentType === 'pricing' && (
          <section className={`p-8 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[2]}}>
            <h2 className="text-2xl font-bold mb-6 text-center">Pricing Plans</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {['Basic', 'Pro', 'Enterprise'].map((plan, idx) => (
                <div key={plan} className={`p-6 ${cardClass} text-center ${idx === 1 ? 'ring-2' : ''}`} style={{backgroundColor: spec.palette[1], borderColor: idx === 1 ? spec.palette[3] : 'transparent'}}>
                  <h3 className="text-xl font-bold mb-2">{plan}</h3>
                  <div className="text-3xl font-bold mb-4" style={{color: spec.palette[3]}}>${(idx + 1) * 9}</div>
                  <ul className="text-sm space-y-2 mb-6">
                    {Array.from({length: 3}).map((_, i) => (
                      <li key={i}>✓ {generateRandomText(3)}</li>
                    ))}
                  </ul>
                  <button className={`${buttonClass} w-full`} style={buttonStyle()}>
                    Choose {plan}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {spec.contentType === 'faq' && (
          <section className={`p-8 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[2]}}>
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {Array.from({length: 5}).map((_, i) => (
                <div key={i} className={`p-4 ${cardClass}`} style={{backgroundColor: spec.palette[1]}}>
                  <h3 className="font-semibold mb-2">Q: {generateRandomText(8)}?</h3>
                  <p className="text-sm opacity-80">A: {generateRandomText(15)}</p>
                </div>
              ))}
            </div>
          </section>
        )}
          </>
        )}
      </main>
      
      {/* Footer Controls */}
      <footer className={`flex flex-wrap gap-4 items-center justify-center p-6 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1]}}>
        <div className="flex flex-wrap gap-3 items-center justify-center">
          <button 
            onClick={regenerate}
            className={`px-6 py-3 ${buttonClass} ${animationClass} ${spec.cornerRadius} font-bold`}
            style={{backgroundColor: spec.palette[2], color: spec.palette[0]}}
          >
            🎲 Generate New Page
          </button>
          
          <button 
            onClick={() => {
              const newSeed = Math.random().toString(36).substring(2, 10)
              window.location.href = `?seed=${newSeed}`
            }}
            className={`px-4 py-3 ${buttonClass} ${spec.cornerRadius} font-medium`}
            style={{backgroundColor: spec.palette[3], color: spec.palette[0]}}
          >
            🔄 Random Seed
          </button>
          
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              // You could add a toast notification here
            }}
            className={`px-4 py-3 ${buttonClass} ${spec.cornerRadius} font-medium`}
            style={{backgroundColor: spec.palette[4], color: spec.palette[0]}}
          >
            📋 Copy URL
          </button>
        </div>
        
        {/* Inspiration Credits */}
        {spec.styleReferences && spec.styleReferences.length > 0 && (
          <div className="text-center text-sm opacity-75" style={{color: spec.palette[0]}}>
            <p>✨ Inspired by: {spec.styleReferences.map(ref => ref.name).join(', ')}</p>
            <p className="text-xs mt-1">
              {spec.mixingMode === 'coherent' ? '🎨 Coherent mix' : '🎭 Chaotic fusion'}
            </p>
          </div>
        )}
        
        {/* Mixed Components Display */}
        {spec.mixedComponents && Object.keys(spec.mixedComponents).length > 0 && (
          <div className="text-center text-sm opacity-75" style={{color: spec.palette[0]}}>
            <p>🔀 Mixed Components:</p>
            <div className="flex flex-wrap gap-2 justify-center mt-1">
              {Object.entries(spec.mixedComponents).map(([component, archetype]) => (
                <span key={component} className="px-2 py-1 rounded text-xs" style={{backgroundColor: spec.palette[2]}}>
                  {component}: {archetype}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-center text-xs opacity-60" style={{color: spec.palette[0]}}>
          <p>Seed: {spec.seed}</p>
          <p>Archetype: {spec.uiArchetype}</p>
          <p>Palette: {spec.paletteKey} • Font: {spec.fontChoice}</p>
          <p>Animation: {spec.animation} • Layout: {spec.contentType}</p>
        </div>
      </footer>
    </div>
  )
}

