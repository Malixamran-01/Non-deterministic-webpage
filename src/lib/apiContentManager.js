// API Content Manager for Random Internet Content
import { createRng } from './seededRng'

// Enhanced API endpoints with more sources and better categorization
export const API_ENDPOINTS = {
  ecommerce_products: [
    {
      name: 'Fake Store API',
      url: 'https://fakestoreapi.com/products',
      transform: (data) => {
        if (Array.isArray(data)) {
          const randomProduct = data[Math.floor(Math.random() * data.length)]
          return {
            type: 'product',
            title: randomProduct.title,
            description: randomProduct.description,
            price: randomProduct.price,
            image: randomProduct.image,
            category: randomProduct.category,
            rating: randomProduct.rating?.rate || 0
          }
        }
        return null
      },
      weight: 25,
      auth: 'none'
    },
    {
      name: 'OpenFoodFacts API',
      url: 'https://world.openfoodfacts.org/cgi/search.pl?search_terms=random&search_simple=1&action=process&json=1&page_size=1',
      transform: (data) => {
        if (data.products && data.products.length > 0) {
          const product = data.products[0]
          return {
            type: 'food_product',
            title: product.product_name || 'Random Food Product',
            description: product.generic_name || 'A delicious food item',
            image: product.image_front_url || null,
            category: product.categories_tags?.[0] || 'food',
            nutrition: product.nutriments
          }
        }
        return null
      },
      weight: 20,
      auth: 'none'
    }
  ],
  general_info: [
    {
      name: 'Wikipedia Random Article',
      url: 'https://en.wikipedia.org/api/rest_v1/page/random/summary',
      transform: (data) => ({
        type: 'wikipedia',
        title: data.title,
        description: data.extract,
        image: data.thumbnail?.source || null,
        url: data.content_urls?.desktop?.page || null
      }),
      weight: 20,
      auth: 'none'
    },
    {
      name: 'RestCountries API',
      url: 'https://restcountries.com/v3.1/all',
      transform: (data) => {
        const randomCountry = data[Math.floor(Math.random() * data.length)]
        return {
          type: 'country',
          name: randomCountry.name.common,
          capital: randomCountry.capital?.[0] || 'N/A',
          region: randomCountry.region,
          population: randomCountry.population,
          flag: randomCountry.flags.svg,
          languages: Object.values(randomCountry.languages || {})
        }
      },
      weight: 15,
      auth: 'none'
    },
    {
      name: 'Numbers API',
      url: 'http://numbersapi.com/random/trivia',
      transform: (data) => ({
        type: 'number_fact',
        fact: data,
        number: data.match(/\d+/)?.[0] || 'random'
      }),
      weight: 15,
      auth: 'none'
    }
  ],
  quotes_motivation: [
    {
      name: 'Quotable API',
      url: 'https://api.quotable.io/random',
      transform: (data) => ({
        type: 'quote',
        content: data.content,
        author: data.author,
        tags: data.tags || [],
        length: data.length
      }),
      weight: 25,
      auth: 'none'
    },
    {
      name: 'Advice Slip API',
      url: 'https://api.adviceslip.com/advice',
      transform: (data) => ({
        type: 'advice',
        content: data.slip?.advice || 'Stay curious!',
        id: data.slip?.id || 0
      }),
      weight: 20,
      auth: 'none'
    }
  ],
  tech_news: [
    {
      name: 'Hacker News API',
      url: 'https://hacker-news.firebaseio.com/v0/topstories.json',
      transform: async (data) => {
        if (Array.isArray(data) && data.length > 0) {
          const randomId = data[Math.floor(Math.random() * Math.min(data.length, 10))]
          const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${randomId}.json`)
          const story = await storyResponse.json()
          return {
            type: 'hacker_news',
            title: story.title,
            url: story.url,
            score: story.score,
            author: story.by,
            time: story.time
          }
        }
        return null
      },
      weight: 20,
      auth: 'none'
    },
    {
      name: 'GitHub Trending',
      url: 'https://api.github.com/repositories',
      transform: (data) => {
        if (Array.isArray(data) && data.length > 0) {
          const randomRepo = data[Math.floor(Math.random() * Math.min(data.length, 30))]
          return {
            type: 'github_repo',
            name: randomRepo.name,
            full_name: randomRepo.full_name,
            description: randomRepo.description,
            language: randomRepo.language,
            stars: randomRepo.stargazers_count,
            url: randomRepo.html_url
          }
        }
        return null
      },
      weight: 15,
      auth: 'none'
    },
    {
      name: 'Stack Overflow Questions',
      url: 'https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow&pagesize=10',
      transform: (data) => {
        if (data.items && data.items.length > 0) {
          const randomQuestion = data.items[Math.floor(Math.random() * data.items.length)]
          return {
            type: 'stackoverflow',
            title: randomQuestion.title,
            tags: randomQuestion.tags || [],
            score: randomQuestion.score,
            answers: randomQuestion.answer_count,
            author: randomQuestion.owner?.display_name,
            url: randomQuestion.link
          }
        }
        return null
      },
      weight: 15,
      auth: 'none'
    }
  ],
  entertainment: [
    {
      name: 'Joke API',
      url: 'https://v2.jokeapi.dev/joke/Any?safe-mode',
      transform: (data) => ({
        type: 'joke',
        setup: data.setup,
        delivery: data.delivery,
        category: data.category,
        flags: data.flags
      }),
      weight: 20,
      auth: 'none'
    },
    {
      name: 'Dog Facts API',
      url: 'https://dog-api.kinduff.com/api/facts',
      transform: (data) => ({
        type: 'dog_fact',
        fact: data.facts?.[0] || 'Dogs are amazing!',
        count: data.facts?.length || 1
      }),
      weight: 15,
      auth: 'none'
    }
  ],
  images_media: [
    {
      name: 'Unsplash Random',
      url: 'https://api.unsplash.com/photos/random',
      transform: (data) => ({
        type: 'unsplash_photo',
        title: data.description || data.alt_description || 'Beautiful Photo',
        image: data.urls?.regular || data.urls?.small,
        photographer: data.user?.name,
        likes: data.likes,
        url: data.links?.html
      }),
      weight: 20,
      auth: 'unsplash'
    },
    {
      name: 'Giphy Random',
      url: 'https://api.giphy.com/v1/gifs/random',
      transform: (data) => ({
        type: 'unsplash_photo',
        title: data.data?.title || 'Random GIF',
        image: data.data?.images?.downsized?.url,
        gif_url: data.data?.url,
        rating: data.data?.rating
      }),
      weight: 15,
      auth: 'giphy'
    }
  ],
  // New categories from the specification
  social_media: [
    {
      name: 'Reddit Random',
      url: 'https://www.reddit.com/r/random.json',
      transform: (data) => ({
        type: 'reddit_post',
        title: data.data?.children?.[0]?.data?.title || 'Random Reddit Post',
        subreddit: data.data?.children?.[0]?.data?.subreddit || 'random',
        author: data.data?.children?.[0]?.data?.author || 'unknown',
        score: data.data?.children?.[0]?.data?.score || 0,
        url: `https://reddit.com${data.data?.children?.[0]?.data?.permalink || ''}`
      }),
      weight: 20,
      auth: 'none'
    },
    {
      name: 'News API',
      url: 'https://newsapi.org/v2/top-headlines?country=us&pageSize=10',
      transform: (data) => {
        if (data.articles && data.articles.length > 0) {
          const randomArticle = data.articles[Math.floor(Math.random() * data.articles.length)]
          return {
            type: 'news_article',
            title: randomArticle.title,
            description: randomArticle.description,
            source: randomArticle.source?.name,
            publishedAt: randomArticle.publishedAt,
            url: randomArticle.url,
            image: randomArticle.urlToImage
          }
        }
        return null
      },
      weight: 15,
      auth: 'newsapi'
    }
  ],
  design_inspiration: [
    {
      name: 'Dribbble Popular',
      url: 'https://api.dribbble.com/v2/shots?per_page=20',
      transform: (data) => {
        if (data && data.length > 0) {
          const randomShot = data[Math.floor(Math.random() * data.length)]
          return {
            type: 'dribbble_shot',
            title: randomShot.title,
            description: randomShot.description,
            image: randomShot.images?.normal || randomShot.images?.hidpi,
            author: randomShot.user?.name,
            likes: randomShot.likes_count,
            url: randomShot.html_url
          }
        }
        return null
      },
      weight: 15,
      auth: 'dribbble'
    }
  ]
}

// Enhanced random link generators matching the specification
export const RANDOM_LINK_GENERATORS = {
  youtube: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
    let result = ''
    for (let i = 0; i < 11; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `https://www.youtube.com/watch?v=${result}`
  },
  amazon: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `https://www.amazon.com/dp/${result}`
  },
  ebay: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `https://www.ebay.com/itm/${result}`
  },
  instagram: () => {
    const tags = ['art', 'design', 'photography', 'travel', 'food', 'fashion', 'nature', 'architecture', 'minimal', 'vintage', 'modern', 'creative', 'inspiration', 'beautiful', 'amazing', 'wow', 'love', 'life', 'style', 'cool']
    const randomTag = tags[Math.floor(Math.random() * tags.length)]
    return `https://www.instagram.com/explore/tags/${randomTag}/`
  },
  medium: () => {
    const topics = ['technology', 'design', 'productivity', 'creativity', 'business', 'startup', 'writing', 'art', 'science', 'philosophy', 'psychology', 'health', 'travel', 'food', 'culture', 'politics', 'environment', 'education', 'innovation', 'future']
    const randomTopic = topics[Math.floor(Math.random() * topics.length)]
    return `https://medium.com/tag/${randomTopic}`
  },
  dribbble: () => {
    return 'https://dribbble.com/shots/popular'
  },
  behance: () => {
    const categories = ['graphic-design', 'illustration', 'web-design', 'mobile-design', 'typography', 'branding', 'photography', '3d-art', 'ui-ux', 'motion-graphics', 'industrial-design', 'architecture', 'fashion', 'fine-art', 'advertising']
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    return `https://www.behance.net/search/projects?search=${randomCategory}`
  },
  linkedin: () => {
    const keywords = ['software engineer', 'designer', 'product manager', 'marketing', 'sales', 'data scientist', 'developer', 'consultant', 'entrepreneur', 'researcher', 'teacher', 'writer', 'artist', 'musician', 'chef', 'doctor', 'lawyer', 'architect', 'photographer', 'filmmaker']
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)]
    return `https://www.linkedin.com/jobs/search?keywords=${encodeURIComponent(randomKeyword)}`
  },
  quora: () => {
    const topics = ['Technology', 'Science', 'Business', 'Health', 'Education', 'Travel', 'Food', 'Sports', 'Entertainment', 'Politics', 'Philosophy', 'Psychology', 'History', 'Art', 'Music', 'Literature', 'Mathematics', 'Engineering', 'Medicine', 'Law']
    const randomTopic = topics[Math.floor(Math.random() * topics.length)]
    return `https://www.quora.com/topic/${encodeURIComponent(randomTopic)}`
  },
  deviantart: () => {
    return 'https://www.deviantart.com/random/deviation'
  },
  spotify: () => {
    const genres = ['pop', 'rock', 'hip-hop', 'electronic', 'jazz', 'classical', 'country', 'r&b', 'indie', 'alternative', 'metal', 'folk', 'blues', 'reggae', 'punk', 'soul', 'funk', 'disco', 'house', 'techno']
    const randomGenre = genres[Math.floor(Math.random() * genres.length)]
    return `https://open.spotify.com/genre/${randomGenre}`
  },
  github: () => {
    const languages = ['javascript', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'typescript', 'dart', 'scala', 'elixir', 'clojure', 'haskell', 'erlang', 'f#', 'ocaml']
    const randomLang = languages[Math.floor(Math.random() * languages.length)]
    return `https://github.com/topics/${randomLang}`
  }
}

// Weighted selection of API categories
const CATEGORY_WEIGHTS = {
  ecommerce_products: 18,
  general_info: 15,
  quotes_motivation: 15,
  tech_news: 15,
  entertainment: 10,
  images_media: 10,
  social_media: 12,
  design_inspiration: 5
}

export class APIContentManager {
  constructor(seed) {
    this.rng = createRng(seed).rng
    this.failedAPIs = new Set()
  }

  // Select random categories based on weights
  selectCategories(maxCategories = 3) {
    const categories = Object.keys(CATEGORY_WEIGHTS)
    const selected = []
    
    for (let i = 0; i < maxCategories && selected.length < maxCategories; i++) {
      const available = categories.filter(cat => !selected.includes(cat))
      if (available.length === 0) break
      
      const weights = available.map(cat => CATEGORY_WEIGHTS[cat])
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
      let random = this.rng() * totalWeight
      
      for (let j = 0; j < available.length; j++) {
        random -= weights[j]
        if (random <= 0) {
          selected.push(available[j])
          break
        }
      }
    }
    
    return selected
  }

  // Select random API endpoint from a category
  selectAPIEndpoint(category) {
    const endpoints = API_ENDPOINTS[category]
    if (!endpoints) return null
    
    const available = endpoints.filter(ep => !this.failedAPIs.has(`${category}:${ep.name}`))
    if (available.length === 0) return null
    
    const weights = available.map(ep => ep.weight)
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
    let random = this.rng() * totalWeight
    
    for (let i = 0; i < available.length; i++) {
      random -= weights[i]
      if (random <= 0) {
        return available[i]
      }
    }
    
    return available[0]
  }

  // Fetch content from API with error handling
  async fetchContent(endpoint) {
    try {
      const response = await fetch(endpoint.url)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      const data = await response.json()
      const transformed = endpoint.transform(data)
      
      if (transformed) {
        return {
          success: true,
          data: transformed,
          source: endpoint.name,
          category: this.getCategoryFromEndpoint(endpoint)
        }
      } else {
        throw new Error('Transform returned null')
      }
    } catch (error) {
      console.warn(`Failed to fetch from ${endpoint.name}:`, error.message)
      this.failedAPIs.add(`${this.getCategoryFromEndpoint(endpoint)}:${endpoint.name}`)
      return {
        success: false,
        error: error.message,
        source: endpoint.name
      }
    }
  }

  // Get category from endpoint
  getCategoryFromEndpoint(endpoint) {
    for (const [category, endpoints] of Object.entries(API_ENDPOINTS)) {
      if (endpoints.includes(endpoint)) {
        return category
      }
    }
    return 'unknown'
  }

  // Generate random link content for sites without APIs
  generateRandomLinkContent() {
    const generators = Object.keys(RANDOM_LINK_GENERATORS)
    const randomGenerator = generators[Math.floor(this.rng() * generators.length)]
    const generator = RANDOM_LINK_GENERATORS[randomGenerator]
    
    if (generator) {
      const url = generator()
      return {
        success: true,
        data: {
          type: 'random_link',
          title: `Random ${randomGenerator.charAt(0).toUpperCase() + randomGenerator.slice(1)} Content`,
          description: `Discover something new on ${randomGenerator}`,
          url: url,
          source: randomGenerator,
          category: 'random_links'
        },
        source: randomGenerator,
        category: 'random_links'
      }
    }
    
    return null
  }

  // Main method to get random content
  async getRandomContent(maxCategories = 3) {
    const categories = this.selectCategories(maxCategories)
    const results = []
    
    for (const category of categories) {
      const endpoint = this.selectAPIEndpoint(category)
      if (endpoint) {
        const result = await this.fetchContent(endpoint)
        if (result.success) {
          results.push(result)
        }
      }
    }
    
    // If no API content, generate random links
    if (results.length === 0) {
      const randomLinkContent = this.generateRandomLinkContent()
      if (randomLinkContent) {
        results.push(randomLinkContent)
      }
    }
    
    return {
      content: results,
      categories: categories,
      totalSources: results.length
    }
  }

  // Get content specifically for UI archetypes
  async getContentForArchetype(archetype, maxCategories = 2) {
    // Archetype-specific content selection
    const archetypePreferences = {
      reddit: ['tech_news', 'entertainment'],
      facebook: ['general_info', 'entertainment'],
      wikipedia: ['general_info', 'tech_news'],
      'glass-landing': ['quotes_motivation', 'images_media'],
      terminal: ['tech_news', 'general_info'],
      pinterest: ['images_media', 'ecommerce_products'],
      youtube: ['entertainment', 'images_media'],
      twitter: ['quotes_motivation', 'tech_news'],
      notion: ['quotes_motivation', 'general_info'],
      classic: ['general_info', 'quotes_motivation']
    }
    
    const preferredCategories = archetypePreferences[archetype] || ['general_info', 'quotes_motivation']
    const results = []
    
    // Try preferred categories first
    for (const category of preferredCategories.slice(0, maxCategories)) {
      const endpoint = this.selectAPIEndpoint(category)
      if (endpoint) {
        const result = await this.fetchContent(endpoint)
        if (result.success) {
          results.push(result)
        }
      }
    }
    
    // Fill remaining slots with random content
    if (results.length < maxCategories) {
      const remainingCategories = Object.keys(CATEGORY_WEIGHTS).filter(cat => !preferredCategories.includes(cat))
      const additionalCategories = remainingCategories.slice(0, maxCategories - results.length)
      
      for (const category of additionalCategories) {
        const endpoint = this.selectAPIEndpoint(category)
        if (endpoint) {
          const result = await this.fetchContent(endpoint)
          if (result.success) {
            results.push(result)
          }
        }
      }
    }
    
    // If still no content, generate random links
    if (results.length === 0) {
      const randomLinkContent = this.generateRandomLinkContent()
      if (randomLinkContent) {
        results.push(randomLinkContent)
      }
    }
    
    return {
      content: results,
      archetype: archetype,
      preferredCategories: preferredCategories,
      totalSources: results.length
    }
  }
}

export function createAPIContentManager(seed) {
  return new APIContentManager(seed)
}
