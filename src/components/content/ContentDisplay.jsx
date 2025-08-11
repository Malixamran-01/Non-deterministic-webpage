import React from 'react'

// Product display component
// eslint-disable-next-line no-unused-vars
function ProductCard({ content, spec, rng }) {
  const { title, description, price, image, category, rating } = content.data
  
  return (
    <div className={`${spec.cornerRadius} overflow-hidden transition-all hover:shadow-lg`} style={{backgroundColor: spec.palette[2]}}>
      {image && (
        <div className="relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 object-cover"
            onError={(e) => e.target.style.display = 'none'}
          />
          <div className="absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full" style={{backgroundColor: spec.palette[3], color: spec.palette[0]}}>
            ${price}
          </div>
        </div>
      )}
      <div className="p-4">
        <div className="text-xs opacity-70 mb-2 uppercase tracking-wide">{category}</div>
        <h3 className="font-bold mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm opacity-80 mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({length: 5}).map((_, i) => (
              <span key={i} style={{color: i < Math.floor(rating) ? spec.palette[3] : spec.palette[1]}}>
                ★
              </span>
            ))}
            <span className="text-xs ml-1 opacity-70">({rating})</span>
          </div>
          <button className={`px-3 py-1 text-sm ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[3], color: spec.palette[0]}}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

// Quote display component
function QuoteDisplay({ content, spec }) {
  const { content: quoteText, author, tags } = content.data
  
  return (
    <div className={`text-center p-8 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[2]}}>
      <div className="text-4xl mb-4 opacity-20" style={{color: spec.palette[3]}}>"</div>
      <blockquote className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
        {quoteText}
      </blockquote>
      <div className="text-lg opacity-80">— {author}</div>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {tags.slice(0, 5).map((tag, i) => (
            <span key={i} className={`px-2 py-1 text-xs ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1], color: spec.palette[0]}}>
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// Wikipedia article display
function WikipediaDisplay({ content, spec }) {
  const { title, description, image, url } = content.data
  
  return (
    <div className={`${spec.cornerRadius} overflow-hidden`} style={{backgroundColor: spec.palette[2]}}>
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-sm leading-relaxed opacity-90 mb-4">{description}</p>
        {url && (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 ${spec.cornerRadius}`}
            style={{backgroundColor: spec.palette[3], color: spec.palette[0]}}
          >
            Read More →
          </a>
        )}
      </div>
    </div>
  )
}

// Country information display
function CountryDisplay({ content, spec }) {
  const { name, capital, region, population, flag, languages } = content.data
  
  return (
    <div className={`${spec.cornerRadius} overflow-hidden`} style={{backgroundColor: spec.palette[2]}}>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          {flag && (
            <img 
              src={flag} 
              alt={`Flag of ${name}`} 
              className="w-16 h-12 object-cover rounded"
              onError={(e) => e.target.style.display = 'none'}
            />
          )}
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm opacity-70">{region}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="opacity-70">Capital:</span>
            <div className="font-medium">{capital}</div>
          </div>
          <div>
            <span className="opacity-70">Population:</span>
            <div className="font-medium">{population?.toLocaleString() || 'N/A'}</div>
          </div>
        </div>
        
        {languages && languages.length > 0 && (
          <div className="mt-4">
            <span className="text-sm opacity-70">Languages:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {languages.slice(0, 3).map((lang, i) => (
                <span key={i} className={`px-2 py-1 text-xs ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[1], color: spec.palette[0]}}>
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Joke display component
function JokeDisplay({ content, spec }) {
  const { setup, delivery, joke, category } = content.data
  
  return (
    <div className={`text-center p-6 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[2]}}>
      <div className="text-sm opacity-70 mb-3 uppercase tracking-wide">{category}</div>
      {joke ? (
        <p className="text-lg font-medium mb-4">{joke}</p>
      ) : (
        <>
          <p className="text-lg font-medium mb-3">{setup}</p>
          <p className="text-xl font-bold" style={{color: spec.palette[3]}}>{delivery}</p>
        </>
      )}
      <div className="mt-4 text-2xl">😄</div>
    </div>
  )
}

// Meme display component
function MemeDisplay({ content, spec }) {
  const { title, image, subreddit, author } = content.data
  
  return (
    <div className={`${spec.cornerRadius} overflow-hidden`} style={{backgroundColor: spec.palette[2]}}>
      {image && (
        <img 
          src={image} 
          alt={title} 
          className="w-full h-auto"
          onError={(e) => e.target.style.display = 'none'}
        />
      )}
      <div className="p-4">
        <h3 className="font-bold mb-2">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-70">
          <span>r/{subreddit}</span>
          <span>by {author}</span>
        </div>
      </div>
    </div>
  )
}

// News article display
function NewsDisplay({ content, spec }) {
  const { title, summary, image, url, published } = content.data
  
  return (
    <div className={`${spec.cornerRadius} overflow-hidden`} style={{backgroundColor: spec.palette[2]}}>
      {image && (
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
          onError={(e) => e.target.style.display = 'none'}
        />
      )}
      <div className="p-4">
        <h3 className="font-bold mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm opacity-80 mb-3 line-clamp-3">{summary}</p>
        <div className="flex items-center justify-between text-xs opacity-70">
          <span>{published ? new Date(published).toLocaleDateString() : 'Recent'}</span>
          {url && (
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Read More
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// Random image display
function RandomImageDisplay({ content, spec }) {
  const { image, alt } = content.data
  
  return (
    <div className={`${spec.cornerRadius} overflow-hidden`} style={{backgroundColor: spec.palette[2]}}>
      <img 
        src={image} 
        alt={alt} 
        className="w-full h-auto"
        onError={(e) => e.target.style.display = 'none'}
      />
    </div>
  )
}

// Number fact display
function NumberFactDisplay({ content, spec }) {
  const { fact, number } = content.data
  
  return (
    <div className={`text-center p-6 ${spec.cornerRadius}`} style={{backgroundColor: spec.palette[2]}}>
      <div className="text-4xl font-bold mb-4" style={{color: spec.palette[3]}}>{number}</div>
      <p className="text-lg leading-relaxed">{fact}</p>
    </div>
  )
}

// Main content display component
export default function ContentDisplay({ content, spec, rng }) {
  if (!content || !content.data) return null
  
  const { type } = content.data
  
  // Map content types to display components
  const contentComponents = {
    'product': ProductCard,
    'food_product': ProductCard,
    'quote': QuoteDisplay,
    'wikipedia': WikipediaDisplay,
    'country': CountryDisplay,
    'joke': JokeDisplay,
    'meme': MemeDisplay,
    'space_news': NewsDisplay,
    'dev_article': NewsDisplay,
    'random_image': RandomImageDisplay,
    'number_fact': NumberFactDisplay
  }
  
  const Component = contentComponents[type] || QuoteDisplay
  
  return (
    <div className="mb-6">
      <div className="text-xs opacity-60 mb-2 text-center">
        Powered by {content.source} • {content.category}
      </div>
      <Component content={content} spec={spec} rng={rng} />
    </div>
  )
}

// Grid layout for multiple content items
export function ContentGrid({ contentItems, spec, rng, columns = 2 }) {
  if (!contentItems || contentItems.length === 0) return null
  
  return (
    <div className={`grid gap-6 ${columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
      {contentItems.map((content, index) => (
        <ContentDisplay 
          key={`${content.source}-${index}`} 
          content={content} 
          spec={spec} 
          rng={rng} 
        />
      ))}
    </div>
  )
}
