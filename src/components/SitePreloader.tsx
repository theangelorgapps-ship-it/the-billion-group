import { useEffect, useState } from 'react'
import { BillionWordmark } from './BillionWordmark'
import { MercuryRailLoader } from './ui/mercury-rail-loader'

export function SitePreloader() {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.classList.add('is-preloading')
    const leaveTimer = window.setTimeout(() => setLeaving(true), reducedMotion ? 250 : 1250)
    const removeTimer = window.setTimeout(() => {
      setVisible(false)
      document.body.classList.remove('is-preloading')
    }, reducedMotion ? 500 : 1750)
    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(removeTimer)
      document.body.classList.remove('is-preloading')
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`site-preloader${leaving ? ' is-leaving' : ''}`} role="status" aria-label="The Billion Group is loading">
      <div className="site-preloader-inner">
        <BillionWordmark className="site-preloader-wordmark" />
        <MercuryRailLoader label="The Billion Group" width={240} speed={1800} accent="#ffffff" />
      </div>
    </div>
  )
}
