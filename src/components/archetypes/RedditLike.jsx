import React from 'react'

export default function RedditLike({spec, rng}){
  const posts = Array.from({length: 6}).map((_,i)=>({
    id: i,
    title: `Look what the seed rolled: ${spec.seed}-${i}`,
    subreddit: ['r/web','r/design','r/javascript','r/react','r/technology'][Math.floor(rng()*5)],
    votes: Math.floor(rng()*5000),
    comments: Math.floor(rng()*400),
    img: `https://picsum.photos/seed/${spec.seed}-${i}/600/400`
  }))
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_300px]">
      <div className="space-y-4">
        {posts.map(p=> (
          <article key={p.id} className={`flex gap-4 p-4 ${spec.cornerRadius} bg-white/70`} style={{backgroundColor: spec.palette[2]}}>
            <div className="flex flex-col items-center w-10">
              <div style={{color: spec.palette[3]}}>▲</div>
              <div className="font-bold">{p.votes}</div>
              <div>▼</div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{p.title}</h3>
              <div className="text-sm opacity-80 mb-2">{p.subreddit} • {p.comments} comments</div>
              <img src={p.img} alt="post" className={`${spec.cornerRadius} w-full h-56 object-cover`} />
            </div>
          </article>
        ))}
      </div>
      <aside className={`p-4 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1], color: spec.palette[0]}}>
        <h4 className="font-bold mb-2">Trending</h4>
        <ul className="space-y-2 text-sm">
          {Array.from({length:6}).map((_,i)=> (
            <li key={i} className="flex items-center gap-2">
              <span>💬</span>
              <span>Seed thread {i+1}</span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}


