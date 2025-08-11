// Example Vercel function to safely fetch external HTML/JSON, with simple sanitization idea
// /api/proxy?url=https://example.com&key=YOUR_API_PROXY_KEY
import fetch from 'node-fetch'

export default async function handler(req, res){
  const { url, key } = req.query
  if(!url) return res.status(400).json({error:'url required'})
  // eslint-disable-next-line no-undef
  if(key !== process.env.API_PROXY_KEY) return res.status(403).json({error:'bad key'})
  
  try{
    const allowed = ['https://uselessfacts.jsph.pl','https://api.quotable.io','https://picsum.photos']
    if(!allowed.some(a=>url.startsWith(a))) return res.status(403).json({error:'domain not allowed'})
    
    const r = await fetch(url)
    const text = await r.text()
    // If you will accept HTML, sanitize here (html-sanitizer library recommended)
    return res.status(200).send(text)
  }catch(e){
    return res.status(500).json({error:e.message})
  }
}

