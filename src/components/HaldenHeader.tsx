import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { BillionWordmark } from './BillionWordmark'
import { sitePath } from '@/lib/site-path'

type MenuId = 'about' | 'properties'

const menuOrder: MenuId[] = ['about', 'properties']

const aboutItems = [
  { label: 'Our Story', href: '/world-of-angel', description: 'The milestones behind the organisation.', image: 'https://theangelorganisation.com/wp-content/uploads/2023/05/pexels-drew-williams-3483968-scaled.jpg' },
  { label: 'Founder', href: '/founder', description: 'Ideas, leadership and the next chapter.', image: '/founder/uebert-angel.webp', imagePosition: '50% 30%' },
  { label: 'Team', href: '/team', description: 'The people delivering work worldwide.', image: '/team/uebert-angel-jr-seated-clean.webp', imagePosition: '50% 18%' },
]

const propertyItems = [
  { label: 'America', href: '/sam-barkley/properties?region=america', description: 'New York Fraser Hall', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=82' },
  { label: 'Africa', href: '/sam-barkley/properties?region=africa', description: 'Cities, venues and hospitality', image: '/properties/fort-moriah-city.webp' },
  { label: 'Asia', href: '/sam-barkley/properties?region=asia', description: 'Project Mall Manila', image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=82' },
  { label: 'Middle East', href: '/sam-barkley/properties?region=middle-east', description: 'Dubai and the Iconium', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=82' },
  { label: 'South America', href: '/sam-barkley/properties?region=south-america', description: 'São Paulo and Brazil', image: 'https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=900&q=82' },
]

function Chevron() {
  return <svg className="header-chevron" width="8" height="5" viewBox="0 0 8 5" aria-hidden="true"><path d="M1 1l3 3 3-3" /></svg>
}

export function HaldenHeader() {
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const ddRef = useRef<HTMLDivElement>(null)
  const triggerRefs = useRef<Record<MenuId, HTMLButtonElement | null>>({ about: null, properties: null })
  const panelRefs = useRef<Record<MenuId, HTMLDivElement | null>>({ about: null, properties: null })
  const currentRef = useRef<MenuId | null>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const [current, setCurrent] = useState<MenuId | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<'about' | 'properties' | 'explore' | null>(null)

  const clearClose = () => window.clearTimeout(closeTimer.current)

  const place = (id: MenuId) => {
    const header = headerRef.current
    const dd = ddRef.current
    const trigger = triggerRefs.current[id]
    const panel = panelRefs.current[id]
    if (!header || !dd || !trigger || !panel) return
    const panelWidth = panel.offsetWidth
    const panelHeight = panel.offsetHeight
    const triggerRect = trigger.getBoundingClientRect()
    const headerRect = header.getBoundingClientRect()
    const parentRect = (dd.offsetParent || header).getBoundingClientRect()
    const viewportX = Math.max(headerRect.left + 12, Math.min(triggerRect.left - 20, headerRect.right - panelWidth - 12))
    dd.style.setProperty('--x', `${viewportX - parentRect.left}px`)
    dd.style.setProperty('--w', `${panelWidth}px`)
    dd.style.setProperty('--h', `${panelHeight}px`)
  }

  const setExpanded = (id: MenuId | null) => {
    menuOrder.forEach((menu) => triggerRefs.current[menu]?.setAttribute('aria-expanded', String(menu === id)))
  }

  const close = () => {
    clearClose()
    const active = currentRef.current
    ddRef.current?.classList.remove('open')
    if (active) panelRefs.current[active]?.removeAttribute('data-state')
    currentRef.current = null
    setCurrent(null)
    setExpanded(null)
  }

  const scheduleClose = (delay = 140) => {
    clearClose()
    closeTimer.current = window.setTimeout(close, delay)
  }

  const open = (id: MenuId) => {
    clearClose()
    const dd = ddRef.current
    const nextPanel = panelRefs.current[id]
    const previous = currentRef.current
    if (!dd || !nextPanel || previous === id) return

    if (!previous) {
      dd.classList.add('instant', 'snap')
      menuOrder.forEach((menu) => {
        panelRefs.current[menu]?.classList.add('snap')
        panelRefs.current[menu]?.removeAttribute('data-state')
      })
      place(id)
      void dd.offsetWidth
      dd.classList.remove('snap')
      menuOrder.forEach((menu) => panelRefs.current[menu]?.classList.remove('snap'))
      nextPanel.setAttribute('data-state', 'active')
      dd.classList.add('open')
      requestAnimationFrame(() => dd.classList.remove('instant'))
    } else {
      const direction = menuOrder.indexOf(id) > menuOrder.indexOf(previous) ? 1 : -1
      panelRefs.current[previous]?.setAttribute('data-state', direction > 0 ? 'exit-left' : 'exit-right')
      nextPanel.classList.add('snap')
      nextPanel.setAttribute('data-state', direction > 0 ? 'exit-right' : 'exit-left')
      void nextPanel.offsetWidth
      nextPanel.classList.remove('snap')
      place(id)
      nextPanel.setAttribute('data-state', 'active')
    }

    currentRef.current = id
    setCurrent(id)
    setExpanded(id)
  }

  const pointerOpen = (id: MenuId) => (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse') open(id)
  }

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) close()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      const active = currentRef.current
      close()
      setSheetOpen(false)
      if (active) triggerRefs.current[active]?.focus()
    }
    const onResize = () => { if (currentRef.current) place(currentRef.current) }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
      clearClose()
    }
  }, [])

  const mobileLink = (label: string, href: string) => <a href={sitePath(href)} onClick={() => setSheetOpen(false)}>{label}</a>

  return (
    <header className="halden-header" id="header" ref={headerRef}>
      <div className="halden-bar">
        <a className="halden-logo" href={sitePath()} aria-label="The Billion Group home">
          <BillionWordmark />
        </a>

        <nav className="desktop-nav" id="nav" aria-label="Main" ref={navRef} onPointerEnter={clearClose} onPointerLeave={(event) => { if (event.pointerType === 'mouse') scheduleClose() }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) scheduleClose(0) }}>
          <ul className="header-links">
            <li><a className="plain-link" href={sitePath()}>Home</a></li>
            {menuOrder.map((id) => (
              <li key={id}>
                <button className="header-trigger" data-menu={id} aria-expanded={current === id} ref={(node) => { triggerRefs.current[id] = node }} onPointerEnter={pointerOpen(id)} onClick={() => currentRef.current === id ? close() : open(id)}>
                  {id[0].toUpperCase() + id.slice(1)} <Chevron />
                </button>
              </li>
            ))}
            <li><a className="plain-link" href={sitePath('/hotels')} onPointerEnter={(event) => { if (event.pointerType === 'mouse') scheduleClose(60) }}>Hotels &amp; Resorts</a></li>
          </ul>

          <div className="header-dd" id="dd" ref={ddRef}>
            <div className="header-panel site-menu-panel mega-menu-panel about-mega-panel" data-panel="about" ref={(node) => { panelRefs.current.about = node }}>
              <p className="site-menu-label">About The Billion Group</p>
              <div className="mega-menu-grid">
                {aboutItems.map((item) => <a href={sitePath(item.href)} key={item.label} className="mega-menu-card"><img src={sitePath(item.image)} alt="" style={{ objectPosition: item.imagePosition ?? 'center' }} /><span className="mega-menu-shade" /><strong>{item.label}</strong><small>{item.description}</small></a>)}
              </div>
            </div>
            <div className="header-panel site-menu-panel mega-menu-panel properties-menu-panel" data-panel="properties" ref={(node) => { panelRefs.current.properties = node }}>
              <p className="site-menu-label">Properties by region</p>
              <div className="mega-menu-grid property-mega-grid">
                {propertyItems.map((item) => <a href={sitePath(item.href)} key={item.label} className="mega-menu-card"><img src={sitePath(item.image)} alt="" /><span className="mega-menu-shade" /><strong>{item.label}</strong><small>{item.description}</small></a>)}
              </div>
            </div>
          </div>
        </nav>

        <div className="header-actions">
          <a className="header-cta" href={sitePath('/shop')}>Shop</a>
          <button className="menu-btn" type="button" aria-label="Open menu" aria-expanded={sheetOpen} onClick={() => setSheetOpen((value) => !value)}>
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 5.5h12M2 10.5h12" /></svg>
          </button>
        </div>
      </div>

      <div className={`mobile-sheet${sheetOpen ? ' open' : ''}`} id="sheet">
        <a className="mobile-home-link" href={sitePath()} onClick={() => setSheetOpen(false)}>Home</a>
        <button className="mobile-menu-expander" type="button" aria-expanded={mobileSection === 'about'} onClick={() => setMobileSection((value) => value === 'about' ? null : 'about')}><span>About</span><Chevron /></button>
        <div className={`mobile-submenu${mobileSection === 'about' ? ' open' : ''}`}><div className="mobile-mega-grid">{aboutItems.map((item) => <a href={sitePath(item.href)} key={item.label} onClick={() => setSheetOpen(false)}><img src={sitePath(item.image)} alt="" style={{ objectPosition: item.imagePosition ?? 'center' }} /><span>{item.label}</span></a>)}</div></div>
        <button className="mobile-menu-expander" type="button" aria-expanded={mobileSection === 'properties'} onClick={() => setMobileSection((value) => value === 'properties' ? null : 'properties')}><span>Properties</span><Chevron /></button>
        <div className={`mobile-submenu${mobileSection === 'properties' ? ' open' : ''}`}><div className="mobile-mega-grid">{propertyItems.map((item) => <a href={sitePath(item.href)} key={item.label} onClick={() => setSheetOpen(false)}><img src={sitePath(item.image)} alt=""/><span>{item.label}</span></a>)}</div></div>
        <button className="mobile-menu-expander" type="button" aria-expanded={mobileSection === 'explore'} onClick={() => setMobileSection((value) => value === 'explore' ? null : 'explore')}><span>Explore</span><Chevron /></button>
        <div className={`mobile-submenu mobile-submenu-links${mobileSection === 'explore' ? ' open' : ''}`}><span>{mobileLink('Hotels & Resorts', '/hotels')}</span><span>{mobileLink('Shop', '/shop')}</span></div>
      </div>
    </header>
  )
}
