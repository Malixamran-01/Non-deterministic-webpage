import seedrandom from 'seedrandom'

export function createRng(seed) {
  const s = seed || Math.floor(Math.random() * 1e9).toString(16).slice(0,8)
  const rng = seedrandom(s)
  return { rng, seed: s }
}

export function pickWeighted(rng, options) {
  // options: [{item, weight}]
  const total = options.reduce((a,b)=>a+b.weight,0)
  let r = rng() * total
  for(const opt of options){
    r -= opt.weight
    if(r <= 0) return opt.item
  }
  return options[options.length-1].item
}

