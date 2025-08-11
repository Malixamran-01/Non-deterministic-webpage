import React from 'react'
import { RANDOM_LINK_GENERATORS } from '../../lib/apiContentManager'

export default function RandomLinkDisplay({ spec, rng, onRefresh }) {
  const generateRandomLinks = () => {
    const generators = Object.keys(RANDOM_LINK_GENERATORS)
    const selectedGenerators = []
    
    // Select 2-4 random generators
    const numGenerators = Math.floor(rng() * 3) + 2
    for (let i = 0; i < numGenerators; i++) {
      const available = generators.filter(g => !selectedGenerators.includes(g))
      if (available.length === 0) break
      const randomGen = available[Math.floor(rng() * available.length)]
      selectedGenerators.push(randomGen)
    }
    
    return selectedGenerators.map(generator => {
      const url = RANDOM_LINK_GENERATORS[generator]()
      return {
        type: 'random_link',
        title: `Random ${generator.charAt(0).toUpperCase() + generator.slice(1)} Content`,
        description: `Discover something new on ${generator}`,
        url: url,
        source: generator,
        category: 'random_links',
        icon: getIconForSource(generator)
      }
    })
  }
  
  const getIconForSource = (source) => {
    const icons = {
      youtube: '🎥',
      amazon: '📦',
      ebay: '🏷️',
      instagram: '📸',
      medium: '✍️',
      dribbble: '🎨',
      behance: '💼',
      linkedin: '💼',
      quora: '❓',
      deviantart: '🎭',
      spotify: '🎵',
      github: '💻'
    }
    return icons[source] || '🔗'
  }
  
  const randomLinks = generateRandomLinks()
  
  return (
    <section className={`mb-8 p-6 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[2]}}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold" style={{color: spec.palette[0]}}>
          🌐 Random Internet Destinations
        </h2>
        <button 
          onClick={onRefresh}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all hover:scale-105`}
          style={{backgroundColor: spec.palette[3], color: spec.palette[0]}}
        >
          🔄 New Links
        </button>
      </div>
      
      <div className="text-sm text-center mb-4 opacity-70" style={{color: spec.palette[0]}}>
        Discover random content from across the web
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {randomLinks.map((link, index) => (
          <div 
            key={index}
            className={`p-4 ${spec.cornerRadius} transition-all hover:scale-105 cursor-pointer`}
            style={{backgroundColor: spec.palette[1]}}
            onClick={() => window.open(link.url, '_blank')}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{link.icon}</span>
              <div>
                <h3 className="font-semibold text-sm" style={{color: spec.palette[0]}}>
                  {link.title}
                </h3>
                <p className="text-xs opacity-70" style={{color: spec.palette[0]}}>
                  {link.source}
                </p>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-3" style={{color: spec.palette[0]}}>
              {link.description}
            </p>
            <div className="text-xs opacity-60" style={{color: spec.palette[0]}}>
              Click to visit →
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
