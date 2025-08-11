import React from 'react'

export default function TwitterLike({ rng }) {
  const generateTweets = () => {
    const tweets = []
    for (let i = 0; i < 15; i++) {
      tweets.push({
        id: i,
        username: `user${i + 1}`,
        handle: `@user${i + 1}`,
        content: `This is tweet number ${i + 1} with some random content that might be longer or shorter depending on the random number generator. ${i % 3 === 0 ? 'Sometimes we add hashtags #random #content #generator' : ''}`,
        time: `${Math.floor(rng() * 60)}m`,
        likes: Math.floor(rng() * 1000),
        retweets: Math.floor(rng() * 500),
        replies: Math.floor(rng() * 200),
        avatar: `https://picsum.photos/40/40?random=${i}`
      })
    }
    return tweets
  }

  const tweets = generateTweets()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex max-w-6xl mx-auto">
        {/* Left Sidebar */}
        <aside className="w-64 p-4 space-y-6">
          <div className="text-2xl font-bold">𝕏</div>
          
          <nav className="space-y-2">
            <button className="w-full text-left p-3 hover:bg-gray-900 rounded-full flex items-center space-x-4 text-xl">
              🏠 <span>Home</span>
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-900 rounded-full flex items-center space-x-4 text-xl">
              🔍 <span>Explore</span>
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-900 rounded-full flex items-center space-x-4 text-xl">
              🔔 <span>Notifications</span>
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-900 rounded-full flex items-center space-x-4 text-xl">
              ✉️ <span>Messages</span>
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-900 rounded-full flex items-center space-x-4 text-xl">
              👤 <span>Profile</span>
            </button>
          </nav>
          
          <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-full font-bold hover:bg-blue-600 transition-colors">
            Post
          </button>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 border-x border-gray-800">
          {/* Header */}
          <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-sm border-b border-gray-800 p-4">
            <h1 className="text-xl font-bold">Home</h1>
          </div>

          {/* Tweet Input */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex space-x-3">
              <img
                src="https://picsum.photos/40/40?random=999"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  placeholder="What's happening?"
                  className="w-full bg-transparent text-white text-xl outline-none resize-none"
                  rows="3"
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex space-x-4 text-blue-500">
                    <button className="hover:text-blue-400">📷</button>
                    <button className="hover:text-blue-400">🎥</button>
                    <button className="hover:text-blue-400">📊</button>
                    <button className="hover:text-blue-400">😊</button>
                  </div>
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 transition-colors">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tweets */}
          <div className="divide-y divide-gray-800">
            {tweets.map((tweet) => (
              <article key={tweet.id} className="p-4 hover:bg-gray-900 transition-colors cursor-pointer">
                <div className="flex space-x-3">
                  <img
                    src={tweet.avatar}
                    alt={tweet.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-bold">{tweet.username}</span>
                      <span className="text-gray-500">{tweet.handle}</span>
                      <span className="text-gray-500">·</span>
                      <span className="text-gray-500">{tweet.time}</span>
                    </div>
                    <p className="text-white mb-3 leading-relaxed">{tweet.content}</p>
                    <div className="flex items-center justify-between max-w-md">
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                        💬 <span>{tweet.replies}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                        🔄 <span>{tweet.retweets}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                        ❤️ <span>{tweet.likes}</span>
                      </button>
                      <button className="text-gray-500 hover:text-blue-500 transition-colors">
                        📤
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 p-4 space-y-6">
          <div className="bg-gray-900 rounded-xl p-4">
            <h3 className="text-xl font-bold mb-4">Trends for you</h3>
            <div className="space-y-4">
              {['#RandomContent', '#WebRoulette', '#ProceduralUI', '#CreativeDesign'].map((trend, i) => (
                <div key={i} className="cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors">
                  <p className="text-sm text-gray-500">Trending</p>
                  <p className="font-bold">{trend}</p>
                  <p className="text-sm text-gray-500">{Math.floor(rng() * 10000) + 1000} posts</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
