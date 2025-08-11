import React from 'react'

export default function StackOverflowLike({spec, rng}){
  const questions = Array.from({length: 8}).map((_,i)=>({
    id: i,
    title: [
      'How to implement infinite scroll in React?',
      'Best practices for API error handling',
      'CSS Grid vs Flexbox: When to use which?',
      'Optimizing database queries for performance',
      'Setting up CI/CD pipeline with GitHub Actions',
      'Understanding JavaScript closures and scope',
      'Design patterns for microservices architecture',
      'Troubleshooting Docker container issues'
    ][i],
    votes: Math.floor(rng()*100) + 5,
    answers: Math.floor(rng()*20) + 1,
    views: Math.floor(rng()*10000) + 100,
    tags: [
      ['react', 'javascript', 'frontend'],
      ['api', 'error-handling', 'best-practices'],
      ['css', 'grid', 'flexbox'],
      ['database', 'sql', 'performance'],
      ['ci-cd', 'github', 'devops'],
      ['javascript', 'closures', 'scope'],
      ['architecture', 'microservices', 'design-patterns'],
      ['docker', 'containers', 'devops']
    ][i],
    author: `user_${Math.floor(rng()*10000)}`,
    timeAgo: ['2h ago', '5h ago', '1d ago', '2d ago', '3d ago', '1w ago', '2w ago', '1mo ago'][Math.floor(rng()*8)],
    isAnswered: rng() < 0.7,
    isHot: rng() < 0.3
  }))
  
  const tags = [
    { name: 'javascript', count: 1234567, color: '#f7df1e' },
    { name: 'python', count: 987654, color: '#3776ab' },
    { name: 'java', count: 876543, color: '#ed8b00' },
    { name: 'react', count: 654321, color: '#61dafb' },
    { name: 'node.js', count: 543210, color: '#339933' },
    { name: 'sql', count: 432109, color: '#e48e00' },
    { name: 'css', count: 321098, color: '#1572b6' },
    { name: 'docker', count: 210987, color: '#2496ed' }
  ]
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className={`p-4 mb-6 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1]}}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold" style={{color: spec.palette[4]}}>Stack Overflow</h1>
            <div className="flex gap-2">
              <button className={`px-3 py-1 ${spec.cornerRadius} text-sm font-medium`} style={{backgroundColor: spec.palette[3], color: spec.palette[0]}}>
                Questions
              </button>
              <button className={`px-3 py-1 ${spec.cornerRadius} text-sm font-medium`} style={{color: spec.palette[4]}}>
                Tags
              </button>
              <button className={`px-3 py-1 ${spec.cornerRadius} text-sm font-medium`} style={{color: spec.palette[4]}}>
                Users
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className={`px-4 py-2 ${spec.cornerRadius} font-medium`} style={{backgroundColor: spec.palette[3], color: spec.palette[0]}}>
              Ask Question
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        {/* Main Content */}
        <div className="space-y-4">
          {/* Questions List */}
          {questions.map(question => (
            <div key={question.id} className={`p-4 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1]}}>
              <div className="flex gap-4">
                {/* Stats */}
                <div className="flex flex-col items-center gap-1 min-w-[60px]">
                  <div className="text-center">
                    <div className="text-lg font-semibold" style={{color: question.isAnswered ? '#5fba7d' : spec.palette[4]}}>
                      {question.votes}
                    </div>
                    <div className="text-xs opacity-70" style={{color: spec.palette[4]}}>votes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold" style={{color: question.isAnswered ? '#5fba7d' : spec.palette[4]}}>
                      {question.answers}
                    </div>
                    <div className="text-xs opacity-70" style={{color: spec.palette[4]}}>answers</div>
                  </div>
                  <div className="text-xs opacity-50" style={{color: spec.palette[4]}}>
                    {question.views} views
                  </div>
                </div>
                
                {/* Question Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-medium hover:text-blue-600 cursor-pointer" style={{color: spec.palette[4]}}>
                      {question.title}
                    </h3>
                    {question.isHot && (
                      <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded">
                        Hot
                      </span>
                    )}
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {question.tags.map(tag => (
                      <span 
                        key={tag}
                        className={`px-2 py-1 text-xs font-medium ${spec.cornerRadius} cursor-pointer hover:bg-opacity-80 transition-colors`}
                        style={{backgroundColor: spec.palette[2], color: spec.palette[4]}}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="opacity-70" style={{color: spec.palette[4]}}>asked {question.timeAgo} by</span>
                      <span className="text-blue-600 hover:underline cursor-pointer">{question.author}</span>
                    </div>
                    {question.isAnswered && (
                      <div className="flex items-center gap-1 text-green-600">
                        <span>✓</span>
                        <span>Answered</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Popular Tags */}
          <div className={`p-4 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1]}}>
            <h3 className="font-semibold mb-3" style={{color: spec.palette[4]}}>Popular Tags</h3>
            <div className="space-y-2">
              {tags.map(tag => (
                <div key={tag.name} className="flex items-center justify-between">
                  <span 
                    className={`px-2 py-1 text-xs font-medium ${spec.cornerRadius} cursor-pointer`}
                    style={{backgroundColor: tag.color, color: '#000'}}
                  >
                    {tag.name}
                  </span>
                  <span className="text-xs opacity-70" style={{color: spec.palette[4]}}>
                    {tag.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full text-center text-sm mt-3 py-2 hover:bg-opacity-10 transition-colors" style={{color: spec.palette[3]}}>
              View all tags
            </button>
          </div>
          
          {/* Hot Questions */}
          <div className={`p-4 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1]}}>
            <h3 className="font-semibold mb-3" style={{color: spec.palette[4]}}>Hot Questions</h3>
            <div className="space-y-2">
              {questions.filter(q => q.isHot).slice(0, 5).map(question => (
                <div key={question.id} className="text-sm">
                  <div className="font-medium hover:text-blue-600 cursor-pointer" style={{color: spec.palette[4]}}>
                    {question.title}
                  </div>
                  <div className="text-xs opacity-70" style={{color: spec.palette[4]}}>
                    {question.votes} votes • {question.answers} answers
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Stats */}
          <div className={`p-4 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1]}}>
            <h3 className="font-semibold mb-3" style={{color: spec.palette[4]}}>Community Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{color: spec.palette[4]}}>Questions</span>
                <span className="font-semibold" style={{color: spec.palette[4]}}>23.4M</span>
              </div>
              <div className="flex justify-between">
                <span style={{color: spec.palette[4]}}>Answers</span>
                <span className="font-semibold" style={{color: spec.palette[4]}}>42.1M</span>
              </div>
              <div className="flex justify-between">
                <span style={{color: spec.palette[4]}}>Users</span>
                <span className="font-semibold" style={{color: spec.palette[4]}}>8.9M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
