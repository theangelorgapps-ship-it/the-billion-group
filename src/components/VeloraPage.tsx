import { useEffect, useState, type CSSProperties } from 'react'
import { HaldenHeader } from './HaldenHeader'
import { sitePath } from '@/lib/site-path'

const galleryImages = [
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_211418_dbb8d807-3cfb-4c26-b1df-02fb0c23cc7d.png&w=1280&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_211445_ba965dcd-97d6-4644-b390-d4744078ec6c.png&w=1280&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_212326_f5e78786-d7bb-40c5-abac-cd3c0be37d90.png&w=1280&q=85',
]

const clamp = (n: number) => Math.max(0, Math.min(1, n))
const phase = (p: number, from: number, to: number) => clamp((p - from) / (to - from))

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [fading, setFading] = useState(false)
  const finish = () => {
    if (fading) return
    setFading(true)
    window.setTimeout(onComplete, 800)
  }
  return (
    <div className={`velora-splash${fading ? ' is-fading' : ''}`}>
      <video autoPlay muted playsInline onEnded={finish} onError={finish}>
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260624_205729_0e6fae4e-5fc0-42d0-b49a-b88d85ede0b2.mp4" type="video/mp4" />
      </video>
      <strong>SAM BARKLEY</strong>
      <button type="button" onClick={finish}>Skip intro</button>
    </div>
  )
}

function ScrollGallery({ progress }: { progress: number }) {
  const line = phase(progress, 0, .06)
  const expandRaw = phase(progress, .06, .16)
  const eased = expandRaw < .5 ? 4 * expandRaw ** 3 : 1 - ((-2 * expandRaw + 2) ** 3) / 2
  const width = progress < .06 ? line * 50 : 50 + eased * (window.innerWidth - 50)
  const imagePhases = [[.16, .34], [.34, .50], [.50, .64]] as const
  const textIn = phase(progress, .64, .78)
  const morph = phase(progress, .78, .90)
  const finalIn = phase(progress, .90, 1)
  const screenStyle = { width: `${width}px`, backgroundColor: `rgb(${Math.round(morph * 255)},${Math.round(morph * 255)},${Math.round(morph * 255)})` }
  return (
    <div className="velora-gallery" aria-hidden="true">
      <div className="velora-gallery-screen" style={screenStyle}>
        {galleryImages.map((url, index) => {
          const p = phase(progress, imagePhases[index][0], imagePhases[index][1])
          return <img key={url} src={url} alt="" style={{ opacity: Math.min(1, p * 4), transform: `scale(${.2 + p * .8})` }} />
        })}
        <div className="velora-message velora-message-dark" style={{ opacity: textIn * (1 - morph), transform: `scale(${.2 + textIn * .8})` }}>
          Access exceptional real estate opportunities <em>worldwide.</em>
        </div>
        <div className="velora-message velora-message-light" style={{ opacity: finalIn }}>
          Built on trust and <em>expertise.</em>
        </div>
      </div>
    </div>
  )
}

export function VeloraPage() {
  const [splash, setSplash] = useState(true)
  const [menu, setMenu] = useState(false)
  const [closing, setClosing] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    document.title = 'Sam Barkley — The Billion Group'
    const update = () => setProgress(clamp(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)))
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])

  const closeMenu = () => {
    setClosing(true)
    window.setTimeout(() => { setMenu(false); setClosing(false) }, 300)
  }

  return (
    <main className="velora-page">
      {splash && <SplashScreen onComplete={() => setSplash(false)} />}
      <section className="velora-hero">
        <video className="velora-bg-video" autoPlay muted loop playsInline>
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260624_210218_173f8eba-17ff-4e27-972b-d128af25bf49.mp4" type="video/mp4" />
        </video>
        <div className="velora-shade" />
        <HaldenHeader />
        <div className="velora-heading"><h1>PREMIUM REAL ESTATE FOR<br />INVESTORS BEYOND OWNERSHIP</h1></div>
        <div className="velora-bottom">
          <button className={`velora-dock${menu ? ' is-open' : ''}`} onClick={() => menu ? closeMenu() : setMenu(true)} aria-label={menu ? 'Close menu' : 'Open menu'}>
            {menu ? <span className="velora-x" /> : <><b>SAM BARKLEY</b><span className="velora-burger" /></>}
          </button>
        </div>
      </section>
      {menu && <>
        <button className={`velora-overlay ${closing ? 'menu-overlay-close' : 'menu-overlay-open'}`} onClick={closeMenu} aria-label="Close menu" />
        <aside className={`velora-menu ${closing ? 'menu-close' : 'menu-open'}`}>
          <small>MENU</small>
          <nav>{[
            { label: 'About', href: '#about' },
            { label: 'Properties', href: '/sam-barkley/properties' },
          ].map((item, i) => <a href={sitePath(item.href)} key={item.label} className="menu-item-enter" style={{ '--delay': `${i * 60 + 100}ms` } as CSSProperties}>{item.label}</a>)}</nav>
        </aside>
      </>}
      <ScrollGallery progress={progress} />
    </main>
  )
}
