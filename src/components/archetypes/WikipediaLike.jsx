import React from 'react'

export default function WikipediaLike({spec, rng}){
  const sections = ['Overview','History','Design','References']
  return (
    <article className="prose max-w-none">
      <h1 style={{color: spec.palette[4]}}>Procedural Web Roulette</h1>
      <p><em>Seed {spec.seed}.</em> This article is about a generator that assembles random UI patterns and content.</p>
      {sections.map((s, i)=> (
        <section key={s} className="mt-6">
          <h2>{s}</h2>
          <p>
            {Array.from({length: 60}).map((_,j)=> (
              <span key={j}>{['The','A','An','This','It'][Math.floor(rng()*5)]} {['system','layout','palette','archetype','pattern'][Math.floor(rng()*5)]} {['enables','yields','explores','synthesizes','renders'][Math.floor(rng()*5)]} {['novel','unexpected','minimal','expressive','playful'][Math.floor(rng()*5)]} {['interfaces','results','themes','shapes','stories'][Math.floor(rng()*5)]}. </span>
            ))}
          </p>
          <ul>
            {Array.from({length: 3}).map((_,k)=> (
              <li key={k}>Reference {i+1}.{k+1} — seed {spec.seed}-{i}{k}</li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  )
}


