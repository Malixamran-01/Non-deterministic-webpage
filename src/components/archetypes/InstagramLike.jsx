import React from 'react'

export default function InstagramLike({spec, rng}){
  const stories = Array.from({length: 8}).map((_,i)=>({
    id: i,
    username: `user_${Math.floor(rng()*1000)}`,
    avatar: `https://picsum.photos/seed/${spec.seed}-story-${i}/60/60`,
    hasStory: rng() < 0.7
  }))
  
  const posts = Array.from({length: 12}).map((_,i)=>({
    id: i,
    username: `user_${Math.floor(rng()*1000)}`,
    avatar: `https://picsum.photos/seed/${spec.seed}-avatar-${i}/40/40`,
    location: ['New York, NY', 'Los Angeles, CA', 'San Francisco, CA', 'Miami, FL', 'Chicago, IL'][Math.floor(rng()*5)],
    image: `https://picsum.photos/seed/${spec.seed}-post-${i}/400/400`,
    likes: Math.floor(rng()*5000),
    caption: `Amazing ${['design', 'art', 'photography', 'architecture', 'nature', 'food', 'travel', 'fashion'][Math.floor(rng()*8)]} moment! ✨`,
    comments: Math.floor(rng()*200),
    timeAgo: ['2h', '5h', '1d', '2d', '3d'][Math.floor(rng()*5)]
  }))
  
  return (
    <div className="max-w-2xl mx-auto">
      {/* Stories Row */}
      <div className={`mb-6 p-4 ${spec.cornerRadius} overflow-x-auto`} style={{backgroundColor: spec.palette[1]}}>
        <div className="flex gap-4">
          {stories.map(story => (
            <div key={story.id} className="flex flex-col items-center gap-2 min-w-[60px]">
              <div className={`relative w-16 h-16 ${spec.cornerRadius} overflow-hidden ${story.hasStory ? 'ring-2 ring-pink-500' : ''}`}>
                <img 
                  src={story.avatar} 
                  alt={story.username}
                  className="w-full h-full object-cover"
                />
                {story.hasStory && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-500 opacity-20" />
                )}
              </div>
              <span className="text-xs truncate w-full text-center" style={{color: spec.palette[4]}}>
                {story.username}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1">
        {posts.map(post => (
          <div key={post.id} className="aspect-square group relative overflow-hidden">
            <img 
              src={post.image} 
              alt="post"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                <div className="flex items-center gap-2 mb-2">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Featured Post */}
      <div className={`mt-6 p-4 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1]}}>
        <div className="flex items-center gap-3 mb-3">
          <img 
            src={posts[0].avatar} 
            alt="avatar"
            className={`w-10 h-10 ${spec.cornerRadius} object-cover`}
          />
          <div className="flex-1">
            <div className="font-semibold" style={{color: spec.palette[4]}}>{posts[0].username}</div>
            <div className="text-sm opacity-70" style={{color: spec.palette[4]}}>{posts[0].location}</div>
          </div>
          <button className="text-sm font-semibold" style={{color: spec.palette[3]}}>Follow</button>
        </div>
        
        <img 
          src={posts[0].image} 
          alt="featured post"
          className={`w-full h-80 object-cover mb-3 ${spec.cornerRadius}`}
        />
        
        <div className="flex items-center gap-4 mb-3">
          <button className="text-2xl">❤️</button>
          <button className="text-2xl">💬</button>
          <button className="text-2xl">📤</button>
          <button className="text-2xl ml-auto">🔖</button>
        </div>
        
        <div className="font-semibold mb-1" style={{color: spec.palette[4]}}>{posts[0].likes} likes</div>
        <div className="text-sm" style={{color: spec.palette[4]}}>
          <span className="font-semibold">{posts[0].username}</span> {posts[0].caption}
        </div>
        <div className="text-sm opacity-70 mt-2" style={{color: spec.palette[4]}}>
          View all {posts[0].comments} comments • {posts[0].timeAgo}
        </div>
      </div>
    </div>
  )
}
