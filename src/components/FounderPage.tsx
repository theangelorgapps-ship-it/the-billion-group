import { useEffect } from 'react'
import { HaldenHeader } from './HaldenHeader'
import { sitePath } from '@/lib/site-path'

export function FounderPage() {
  useEffect(() => {
    document.title = 'H.E. Ambassador Uebert Angel — The Billion Group'
  }, [])

  return <main className="react-founder-page" id="founder">
    <div className="react-founder-bg" aria-hidden="true" />
    <img className="react-founder-portrait" src={sitePath('/founder/uebert-angel.webp')} alt="H.E. Ambassador Uebert Angel" />
    <div className="react-founder-scrim" aria-hidden="true" />
    <HaldenHeader />
    <div className="react-founder-content">
      <div className="react-founder-copy">
        <div className="react-founder-tags"><span>Founder</span></div>
        <h1><span>H.E. Ambassador</span><br />Uebert Angel</h1>
        <p className="react-founder-sub">H.E. Ambassador Uebert Angel is the Founder of The Billion Group, a global portfolio spanning property, hospitality, education, media and philanthropy. An international entrepreneur, property investor and motivational speaker, he also leads Sam Barkley Construction while developing new entrepreneurs and supporting communities worldwide.</p>
      </div>
    </div>
  </main>
}
