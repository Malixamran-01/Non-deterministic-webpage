import React from 'react'

export default function PinterestLike({ rng }) {
  const generatePins = () => {
    const pins = []
    for (let i = 0; i < 12; i++) {
      const height = 150 + Math.floor(rng() * 200)
      pins.push({
        id: i,
        height,
        title: `Creative Pin ${i + 1}`,
        description: `Beautiful design inspiration from around the web`,
        image: `https://picsum.photos/300/${height}?random=${i}`
      })
    }
    return pins
  }

  const pins = generatePins()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Discover Amazing Ideas
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Get inspired by the world's most creative designs
        </p>
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search for inspiration..."
            className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-300 focus:border-purple-500 focus:outline-none shadow-lg"
          />
          <button className="absolute right-2 top-2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
            🔍
          </button>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="px-4 pb-16">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {pins.map((pin) => (
            <div
              key={pin.id}
              className="break-inside-avoid bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={pin.image}
                  alt={pin.title}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{pin.title}</h3>
                <p className="text-sm text-gray-600">{pin.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      ❤️
                    </button>
                    <button className="text-gray-400 hover:text-blue-500 transition-colors">
                      💬
                    </button>
                  </div>
                  <button className="text-gray-400 hover:text-purple-500 transition-colors">
                    📌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
