import React from 'react'

export default function YouTubeLike({ rng }) {
  const generateVideos = () => {
    const videos = []
    for (let i = 0; i < 20; i++) {
      videos.push({
        id: i,
        title: `Amazing Video Title ${i + 1} That's Long Enough to Test Layout`,
        channel: `Channel Name ${i + 1}`,
        views: Math.floor(rng() * 1000000) + 1000,
        time: Math.floor(rng() * 24) + 1,
        duration: `${Math.floor(rng() * 10) + 1}:${Math.floor(rng() * 60).toString().padStart(2, '0')}`,
        thumbnail: `https://picsum.photos/320/180?random=${i}`
      })
    }
    return videos
  }

  const videos = generateVideos()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Top Navbar */}
      <nav className="sticky top-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              ☰
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📺</span>
              <span className="text-xl font-bold text-red-600">YouView</span>
            </div>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                🔍
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">📹</button>
            <button className="p-2 hover:bg-gray-100 rounded-full">🔔</button>
            <button className="p-2 hover:bg-gray-100 rounded-full">👤</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white min-h-screen p-4 space-y-2">
          <div className="space-y-1">
            <button className="w-full text-left p-3 hover:bg-gray-100 rounded-lg flex items-center space-x-3">
              🏠 <span>Home</span>
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-100 rounded-lg flex items-center space-x-3">
              🔥 <span>Trending</span>
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-100 rounded-lg flex items-center space-x-3">
              📺 <span>Subscriptions</span>
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-100 rounded-lg flex items-center space-x-3">
              📚 <span>Library</span>
            </button>
          </div>
        </aside>

        {/* Video Grid */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-6">Recommended Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2">{video.title}</h3>
                  <p className="text-xs text-gray-600 mb-1">{video.channel}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{video.views.toLocaleString()} views</span>
                    <span>•</span>
                    <span>{video.time}h ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
