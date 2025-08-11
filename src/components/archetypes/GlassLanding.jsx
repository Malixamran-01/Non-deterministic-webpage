import React from 'react'

export default function GlassLanding({spec}){
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" style={{background: `radial-gradient(800px 300px at top right, ${spec.palette[3]}22, transparent)`}} />
      <div className={`relative p-12 text-center ${spec.cornerRadius} backdrop-blur bg-white/10`}>
        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{color: spec.palette[4]}}>
          Glassmorphic Chaos, Tastefully Curated
        </h2>
        <p className="max-w-2xl mx-auto opacity-80 mb-6">
          Generate surprisingly cohesive, themed experiences with a single seed. Palettes, fonts, motion, and archetypes remix on every roll.
        </p>
        <div className="flex justify-center gap-4">
          <a href="#" className={`px-6 py-3 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[3], color: spec.palette[0]}}>Try It</a>
          <a href="#" className={`px-6 py-3 border ${spec.cornerRadius}`} style={{borderColor: spec.palette[3], color: spec.palette[4]}}>Docs</a>
        </div>
      </div>
    </section>
  )
}


