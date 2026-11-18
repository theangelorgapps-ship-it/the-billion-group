import { useEffect, useState } from 'react'
import { BillionWordmark } from './BillionWordmark'
import LiquidWaveSpinner from './ui/spinner-10'

export function SitePreloader() {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.classList.add('is-preloading')
    const leaveTimer = window.setTimeout(() => setLeaving(true), reducedMotion ? 250 : 1700)
    const removeTimer = window.setTimeout(() => {
      setVisible(false)
      document.body.classList.remove('is-preloading')
    }, reducedMotion ? 500 : 2200)
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
        <LiquidWaveSpinner size="lg" />
        <BillionWordmark className="site-preloader-wordmark" />
      </div>
    </div>
  )
}
