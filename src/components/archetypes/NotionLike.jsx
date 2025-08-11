import React from 'react'

export default function NotionLike({ rng }) {
  const generateBlocks = () => {
    const blocks = []
    const blockTypes = ['text', 'heading', 'list', 'quote', 'code', 'image']
    
    for (let i = 0; i < 8; i++) {
      const type = blockTypes[Math.floor(rng() * blockTypes.length)]
      blocks.push({
        id: i,
        type,
        content: generateBlockContent(type, i, rng)
      })
    }
    return blocks
  }

  const generateBlockContent = (type, index, rng) => {
    switch (type) {
      case 'heading':
        return `Section ${index + 1}: ${['Creative Ideas', 'Project Notes', 'Important Thoughts', 'Random Inspiration'][Math.floor(rng() * 4)]}`
      case 'text':
        return `This is a paragraph of text that demonstrates the minimalist design approach. It's clean, readable, and focuses on content without distractions. ${index % 2 === 0 ? 'Sometimes we add a bit more content to show how the layout handles longer text blocks.' : ''}`
      case 'list':
        return ['First item in the list', 'Second item with some additional text', 'Third item', 'Fourth and final item'].slice(0, Math.floor(rng() * 4) + 1)
      case 'quote':
        return `"${['Design is not just what it looks like and feels like. Design is how it works.', 'Simplicity is the ultimate sophistication.', 'Good design is obvious. Great design is transparent.', 'Design creates culture. Culture shapes values. Values determine the future.'][Math.floor(rng() * 4)]}"`
      case 'code':
        return `function generate${['Block', 'Content', 'Design', 'Layout'][Math.floor(rng() * 4)]}() {\n  return "Hello, World!";\n}`
      case 'image':
        return `https://picsum.photos/600/300?random=${index}`
      default:
        return 'Default content'
    }
  }

  const blocks = generateBlocks()

  const renderBlock = (block) => {
    switch (block.type) {
      case 'heading':
        return (
          <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-8 first:mt-0">
            {block.content}
          </h2>
        )
      case 'text':
        return (
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {block.content}
          </p>
        )
      case 'list':
        return (
          <ul className="list-disc list-inside text-lg text-gray-700 mb-6 space-y-2">
            {block.content.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )
      case 'quote':
        return (
          <blockquote className="border-l-4 border-gray-300 pl-6 py-4 mb-6 bg-gray-50 rounded-r-lg">
            <p className="text-xl text-gray-700 italic">"{block.content}"</p>
          </blockquote>
        )
      case 'code':
        return (
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6 overflow-x-auto">
            <code>{block.content}</code>
          </pre>
        )
      case 'image':
        return (
          <div className="mb-6">
            <img
              src={block.content}
              alt="Random image"
              className="w-full h-auto rounded-lg shadow-sm hover:shadow-md transition-shadow"
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                ☰
              </button>
              <h1 className="text-xl font-semibold text-gray-800">My Workspace</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                🔍
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                👤
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                ⚙️
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-gray-50 min-h-screen p-6 border-r border-gray-200">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Pages</h3>
              <button className="w-full text-left p-3 hover:bg-white rounded-lg transition-colors text-gray-700">
                📄 Welcome
              </button>
              <button className="w-full text-left p-3 hover:bg-white rounded-lg transition-colors text-gray-700">
                📄 Project Ideas
              </button>
              <button className="w-full text-left p-3 hover:bg-white rounded-lg transition-colors text-gray-700">
                📄 Notes
              </button>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Templates</h3>
              <button className="w-full text-left p-3 hover:bg-white rounded-lg transition-colors text-gray-700">
                📋 Meeting Notes
              </button>
              <button className="w-full text-left p-3 hover:bg-white rounded-lg transition-colors text-gray-700">
                📋 Project Plan
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-12">
          <div className="max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Creative Workspace
              </h1>
              <p className="text-xl text-gray-600">
                A place for ideas, inspiration, and creative exploration
              </p>
            </div>

            {/* Content Blocks */}
            <div className="space-y-2">
              {blocks.map((block) => (
                <div
                  key={block.id}
                  className="group hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
                >
                  {renderBlock(block)}
                </div>
              ))}
            </div>

            {/* Add Block Button */}
            <div className="mt-12 text-center">
              <button className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <span>+</span>
                <span>Add a block</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
