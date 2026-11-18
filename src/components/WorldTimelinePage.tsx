import { useEffect } from 'react'
import Timeline from './ui/timeline'
import { HaldenHeader } from './HaldenHeader'

export function WorldTimelinePage(){
  useEffect(()=>{document.title='The World of Angel — The Billion Group'},[])
  return <main className="world-story"><HaldenHeader /><section className="world-intro"><p>THE WORLD OF ANGEL</p><h1>Vision becomes legacy,<br/>one chapter at a time.</h1><span>Keep scrolling ↓</span></section><Timeline title="Our Storyline" periodLabel="2005 — 2026" imageAlt="The World of Angel team at work" duration={1.4}/><section className="world-outro">From one defining idea to a world of opportunity.</section></main>
}
