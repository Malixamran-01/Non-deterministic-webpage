import React from 'react'

export default function LinkedInLike({ spec, rng }) {
  const generateRandomText = (length = 100) => {
    const words = ['professional', 'network', 'career', 'business', 'opportunity', 'growth', 'development', 'leadership', 'innovation', 'strategy', 'collaboration', 'expertise', 'experience', 'achievement', 'success', 'partnership', 'community', 'industry', 'expert', 'consultant', 'entrepreneur', 'executive', 'manager', 'director', 'specialist', 'analyst', 'coordinator', 'associate', 'senior', 'principal', 'lead']
    let text = ''
    for(let i = 0; i < length; i++) {
      text += words[Math.floor(rng() * words.length)] + ' '
    }
    return text.trim()
  }

  const generateRandomCompany = () => {
    const companies = ['TechCorp', 'InnovateLab', 'Global Solutions', 'Future Systems', 'Digital Dynamics', 'Creative Agency', 'Strategic Partners', 'NextGen Tech', 'Smart Solutions', 'Elite Consulting']
    return companies[Math.floor(rng() * companies.length)]
  }

  const generateRandomJob = () => {
    const jobs = ['Senior Software Engineer', 'Product Manager', 'UX Designer', 'Data Scientist', 'Marketing Director', 'Sales Executive', 'Project Manager', 'Business Analyst', 'DevOps Engineer', 'Content Strategist']
    return jobs[Math.floor(rng() * jobs.length)]
  }

  const generateRandomName = () => {
    const firstNames = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Quinn', 'Avery', 'Blake', 'Drew']
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
    return `${firstNames[Math.floor(rng() * firstNames.length)]} ${lastNames[Math.floor(rng() * lastNames.length)]}`
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className={`mb-6 p-6 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1]}}>
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden" style={{backgroundColor: spec.palette[3]}}>
            <div className="w-full h-full flex items-center justify-center text-3xl text-white">
              {generateRandomName().split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2" style={{color: spec.palette[0]}}>
              {generateRandomName()}
            </h1>
            <p className="text-lg mb-2 opacity-80" style={{color: spec.palette[0]}}>
              {generateRandomJob()} at {generateRandomCompany()}
            </p>
            <p className="text-sm opacity-70 mb-3" style={{color: spec.palette[0]}}>
              {generateRandomText(15)}
            </p>
            <div className="flex gap-3">
              <button className={`px-4 py-2 rounded-full text-sm font-medium`} style={{backgroundColor: spec.palette[3], color: spec.palette[0]}}>
                Connect
              </button>
              <button className={`px-4 py-2 rounded-full text-sm font-medium border`} style={{borderColor: spec.palette[3], color: spec.palette[3]}}>
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Sidebar */}
        <div className="space-y-4">
          {/* About */}
          <div className={`p-4 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1]}}>
            <h3 className="font-semibold mb-3" style={{color: spec.palette[0]}}>About</h3>
            <p className="text-sm opacity-80" style={{color: spec.palette[0]}}>
              {generateRandomText(25)}
            </p>
          </div>

          {/* Experience */}
          <div className={`p-4 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1]}}>
            <h3 className="font-semibold mb-3" style={{color: spec.palette[0]}}>Experience</h3>
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="border-l-2 pl-3" style={{borderColor: spec.palette[3]}}>
                  <p className="font-medium text-sm" style={{color: spec.palette[0]}}>
                    {generateRandomJob()}
                  </p>
                  <p className="text-xs opacity-70" style={{color: spec.palette[0]}}>
                    {generateRandomCompany()}
                  </p>
                  <p className="text-xs opacity-60" style={{color: spec.palette[0]}}>
                    202{Math.floor(rng() * 4)} - Present
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className={`p-4 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1]}}>
            <h3 className="font-semibold mb-3" style={{color: spec.palette[0]}}>Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['Leadership', 'Strategy', 'Innovation', 'Collaboration', 'Analytics', 'Communication'].map(skill => (
                <span key={skill} className={`px-2 py-1 text-xs rounded-full`} style={{backgroundColor: spec.palette[2], color: spec.palette[0]}}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="md:col-span-2 space-y-4">
          {/* Create Post */}
          <div className={`p-4 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1]}}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full" style={{backgroundColor: spec.palette[3]}}></div>
              <button className={`flex-1 text-left px-4 py-2 rounded-full text-sm opacity-70`} style={{backgroundColor: spec.palette[2], color: spec.palette[0]}}>
                Start a post...
              </button>
            </div>
            <div className="flex gap-2">
              <button className={`flex-1 py-2 text-sm rounded-md flex items-center justify-center gap-2`} style={{backgroundColor: spec.palette[2], color: spec.palette[0]}}>
                📷 Photo
              </button>
              <button className={`flex-1 py-2 text-sm rounded-md flex items-center justify-center gap-2`} style={{backgroundColor: spec.palette[2], color: spec.palette[0]}}>
                🎥 Video
              </button>
              <button className={`flex-1 py-2 text-sm rounded-md flex items-center justify-center gap-2`} style={{backgroundColor: spec.palette[2], color: spec.palette[0]}}>
                📊 Poll
              </button>
            </div>
          </div>

          {/* Feed Posts */}
          {[1, 2, 3].map(i => (
            <div key={i} className={`p-4 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1]}}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full" style={{backgroundColor: spec.palette[3]}}></div>
                <div className="flex-1">
                  <p className="font-medium text-sm" style={{color: spec.palette[0]}}>
                    {generateRandomName()}
                  </p>
                  <p className="text-xs opacity-70" style={{color: spec.palette[0]}}>
                    {generateRandomJob()} • {Math.floor(rng() * 24) + 1}h ago
                  </p>
                </div>
              </div>
              <p className="text-sm mb-3 opacity-80" style={{color: spec.palette[0]}}>
                {generateRandomText(30)}
              </p>
              <div className="flex gap-4 text-sm opacity-70" style={{color: spec.palette[0]}}>
                <button className="flex items-center gap-1 hover:opacity-100 transition-opacity">
                  👍 Like
                </button>
                <button className="flex items-center gap-1 hover:opacity-100 transition-opacity">
                  💬 Comment
                </button>
                <button className="flex items-center gap-1 hover:opacity-100 transition-opacity">
                  🔄 Repost
                </button>
                <button className="flex items-center gap-1 hover:opacity-100 transition-opacity">
                  📤 Send
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
