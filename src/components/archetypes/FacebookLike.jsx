import React from 'react'
import { Heart, MessageCircle, Share2 } from 'lucide-react'

export default function FacebookLike({spec, rng}){
  const posts = Array.from({length: 4}).map((_,i)=>({
    id: i,
    author: ['Alex','Sam','Priya','Chen','Maya'][Math.floor(rng()*5)],
    text: 'Feeling ' + ['awesome','curious','inspired','chaotic'][Math.floor(rng()*4)] + ' today with seed ' + spec.seed,
    img: Math.random() < 0.6 ? `https://picsum.photos/seed/${spec.seed}-fb-${i}/800/500` : null,
    likes: Math.floor(rng()*2000),
    comments: Math.floor(rng()*400),
    shares: Math.floor(rng()*80)
  }))
  return (
    <div className="grid gap-6 md:grid-cols-[240px_1fr]">
      <aside className={`hidden md:block p-4 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1], color: spec.palette[0]}}>
        <div className="font-semibold mb-2">Shortcuts</div>
        <ul className="space-y-1 text-sm opacity-90">
          <li>Friends</li>
          <li>Groups</li>
          <li>Marketplace</li>
          <li>Seeds</li>
        </ul>
      </aside>
      <div className="space-y-4">
        {posts.map(p => (
          <article key={p.id} className={`p-4 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[2]}}>
            <div className="font-semibold mb-2">{p.author}</div>
            <div className="mb-3">{p.text}</div>
            {p.img && <img src={p.img} alt="post" className={`${spec.cornerRadius} w-full h-64 object-cover mb-3`} />}
            <div className="flex gap-6 text-sm opacity-80">
              <span className="flex items-center gap-1"><Heart size={16} /> {p.likes}</span>
              <span className="flex items-center gap-1"><MessageCircle size={16} /> {p.comments}</span>
              <span className="flex items-center gap-1"><Share2 size={16} /> {p.shares}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}


