import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { BillionWordmark } from './BillionWordmark'
import { sitePath } from '@/lib/site-path'

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Our story', href: '/world-of-angel' },
  { label: 'Founder', href: '/founder' },
  { label: 'Team', href: '/team' },
  { label: 'Properties', href: '/sam-barkley/properties' },
]

const company = [
  { label: 'Hotels & Resorts', href: '/hotels' },
  { label: 'Shop', href: '/shop' },
  { label: 'Sam Barkley', href: '/sam-barkley' },
]

function SocialIcon({ label, href, children }: { label: string; href: string; children: ReactNode }) {
  return <a className="billion-social-icon" href={href} target="_blank" rel="noreferrer" aria-label={label}>{children}</a>
}

export function BillionFooter() {
  const textRef = useRef<SVGTextElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [subscribed, setSubscribed] = useState(false)

  useLayoutEffect(() => {
    const fit = () => {
      if (!textRef.current || !svgRef.current) return
      const box = textRef.current.getBBox()
      svgRef.current.setAttribute('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`)
    }
    document.fonts?.ready.then(fit)
    window.addEventListener('resize', fit)
    fit()
    return () => window.removeEventListener('resize', fit)
  }, [])

  return <footer className="billion-footer-section">
    <div className="billion-footer-wrapper">
      <section className="billion-footer-left">
        <video className="billion-footer-video" autoPlay muted loop playsInline preload="metadata">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4" type="video/mp4" />
        </video>
        <a className="billion-footer-logo" href={sitePath()} aria-label="The Billion Group home">
          <BillionWordmark />
        </a>
        <p className="billion-footer-tagline">Building ambitious ideas into<br /><span>enduring global ventures.</span></p>
        <div className="billion-footer-social-row">
          <span>Stay in touch!</span>
          <div className="billion-footer-socials">
            <SocialIcon label="Uebert Angel Jr on Instagram" href="https://www.instagram.com/uebertangeljr/"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg></SocialIcon>
            <SocialIcon label="Uebert Angel Jr on X" href="https://x.com/uebertangeljr"><svg viewBox="0 0 24 24"><path d="M5 4l14 16M19 4L5 20"/></svg></SocialIcon>
            <SocialIcon label="Uebert Angel Jr on YouTube" href="https://www.youtube.com/@uebertangeljr"><svg viewBox="0 0 24 24"><path d="M21 12c0 3.5-.4 5.5-1 6.2-1 1-15 1-16 0C3.4 17.5 3 15.5 3 12s.4-5.5 1-6.2c1-1 15-1 16 0 .6.7 1 2.7 1 6.2Z"/><path d="m10 9 5 3-5 3Z"/></svg></SocialIcon>
          </div>
        </div>
      </section>

      <section className="billion-footer-right">
        <div className="billion-lucky-graphic" aria-hidden="true">
          <div className="billion-lucky-cube"><img src={sitePath('/brand/billion-mark.png')} alt="" /></div>
          <div className="billion-lucky-text"><svg viewBox="0 0 24 24"><path d="M3 20C6 14 10 9 18 5M18 5h-6M18 5v6" /></svg><span>Explore more</span></div>
        </div>
        <div className="billion-footer-nav">
          <div><h3>Navigation</h3>{navigation.map((item) => <a href={sitePath(item.href)} key={item.label}>{item.label}</a>)}</div>
          <div><h3>Company</h3>{company.map((item) => <a href={sitePath(item.href)} key={item.label}>{item.label}</a>)}</div>
        </div>
        <div className="billion-footer-bottom">
          <p>© {new Date().getFullYear()} The Billion Group.<br />All rights reserved.</p>
          <form className="billion-footer-cta" onSubmit={(event) => { event.preventDefault(); setSubscribed(true) }}>
            <h4>Vision moves fast.<strong>Stay close to what comes next.</strong></h4>
            <div className="billion-subscribe-row">
              <input type="email" required aria-label="Email address" placeholder={subscribed ? 'Thank you for subscribing' : 'Enter email address'} disabled={subscribed} />
              <button type="submit" disabled={subscribed}>{subscribed ? 'Joined' : 'Subscribe'}</button>
            </div>
          </form>
        </div>
      </section>
    </div>
    <div className="billion-footer-watermark" aria-hidden="true">
      <svg ref={svgRef} viewBox="0 0 1000 220" preserveAspectRatio="xMidYMid meet"><text ref={textRef} x="500" y="190" textAnchor="middle" fontSize="250">Billion</text></svg>
    </div>
  </footer>
}
