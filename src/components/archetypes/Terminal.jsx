import React from 'react'

export default function Terminal({spec, rng}){
  const lines = Array.from({length: 14}).map(()=>`> seed:${spec.seed} roll:${Math.floor(rng()*100000)} palette:${spec.paletteKey}`)
  return (
    <div className={`p-6 ${spec.cornerRadius} font-mono`} style={{backgroundColor: '#0b1020', color: '#e2f1ff'}}>
      <div className="opacity-80 mb-2">user@roulette:~$ ./generate --seed {spec.seed}</div>
      <pre className="text-sm leading-7">
{lines.join('\n')}
      </pre>
      <div className="mt-4 opacity-80">Done in {Math.floor(rng()*200)}ms</div>
    </div>
  )
}


