import React, { useState, useEffect } from 'react'
import { generate } from './lib/generator'
import ThemeProvider from './components/ThemeProvider'
import GeneratorUI from './components/GeneratorUI'
import { buildGoogleFontsHref } from './lib/fonts'

export default function App(){
  const urlSeed = (new URLSearchParams(window.location.search)).get('seed')
  const [spec, setSpec] = useState(null)
  
  const gen = (seed) => {
    const newSpec = generate(seed)
    setSpec(newSpec)
    
    // Update URL without page reload
    const newUrl = seed ? `${window.location.pathname}?seed=${newSpec.seed}` : window.location.pathname
    window.history.replaceState({}, '', newUrl)
  }
  
  useEffect(() => { 
    gen(urlSeed) 
  }, [urlSeed])
  
  const regenerate = () => { 
    gen(null) 
  }
  
  return (
    <ThemeProvider theme={spec}>
      <>
        {spec?.fonts && (
          <link rel="stylesheet" href={buildGoogleFontsHref(spec.fonts)} />
        )}
        <GeneratorUI spec={spec} regenerate={regenerate} />
      </>
    </ThemeProvider>
  )
}

