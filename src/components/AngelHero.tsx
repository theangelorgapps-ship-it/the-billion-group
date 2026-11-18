import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { HaldenHeader } from './HaldenHeader'
import { sitePath } from '@/lib/site-path'

const slides = [
  {
    title: 'The World of Angel',
    description: 'Experience the incredible world of Angel. Learn about our history & more.',
    image: 'https://theangelorganisation.com/wp-content/uploads/2023/05/pexels-drew-williams-3483968-scaled.jpg',
    href: '/world-of-angel',
  },
  {
    title: 'Sam Barkley Constructions',
    description: 'Property development and construction.',
    image: 'https://theangelorganisation.com/wp-content/uploads/2023/05/pexels-nana-lapushkina-12066792-scaled.webp',
    href: '/sam-barkley',
  },
  {
    title: 'Hotels',
    description: 'Introducing Picasso Hotels: a fusion of art, luxury, and hospitality by TAO.',
    image: 'https://theangelorganisation.com/wp-content/uploads/2023/05/pexels-vincent-rivaud-2363808-scaled.webp',
    href: '/hotels',
  },
  {
    title: 'Shop',
    description: 'Books, apparel & more.',
    image: 'https://theangelorganisation.com/wp-content/uploads/2023/05/Mockup-2-1-2048x1365-1.webp',
    href: '/shop',
  },
]

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  const points = direction === 'left' ? '15 18 9 12 15 6' : '9 6 15 12 9 18'
  return <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points={points} /></svg>
}

export function AngelHero() {
  const [active, setActive] = useState(0)
  const [introduced, setIntroduced] = useState(false)
  const [transition, setTransition] = useState<{ from: number; to: number; direction: 'next' | 'prev' } | null>(null)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const transitionTimer = useRef<number | undefined>(undefined)

  const visibleFor = (start: number) => Array.from({ length: slides.length }, (_, offset) => slides[(start + offset) % slides.length])
  const visible = visibleFor(active)
  const goTo = (next: number, direction: 'next' | 'prev') => {
    const target = (next + slides.length) % slides.length
    if (target === active || transition) return
    if (reducedMotion) { setActive(target); return }
    window.clearTimeout(transitionTimer.current)
    setTransition({ from: active, to: target, direction })
    setActive(target)
    transitionTimer.current = window.setTimeout(() => setTransition(null), 760)
  }
  const move = (amount: number) => goTo(active + amount, amount < 0 ? 'prev' : 'next')

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion || transition) return
    const timer = window.setTimeout(() => move(1), 8000)
    return () => window.clearTimeout(timer)
  }, [active, paused, reducedMotion, transition])

  useEffect(() => () => window.clearTimeout(transitionTimer.current), [])
  useEffect(() => {
    const timer = window.setTimeout(() => setIntroduced(true), 850)
    return () => window.clearTimeout(timer)
  }, [])

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
  }

  return (
    <section
      className="angel-hero"
      aria-label="The Billion Group featured destinations"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false) }}
      onTouchStart={(event) => {
        const touch = event.touches[0]
        touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null
        setPaused(true)
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current
        const touch = event.changedTouches[0]
        touchStart.current = null
        setPaused(false)
        if (!start || !touch) return
        const dx = touch.clientX - start.x
        const dy = touch.clientY - start.y
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) move(dx < 0 ? 1 : -1)
      }}
    >
      <HaldenHeader />
      <div className="angel-stage">
        {transition && (
          <div className={`angel-grid angel-grid-exit is-${transition.direction}`} aria-hidden="true">
            {visibleFor(transition.from).map((slide, index) => (
              <article className={`angel-card angel-card-${index + 1}`} key={`exit-${slide.title}`}>
                <a className="angel-card-link" href={sitePath(slide.href)} tabIndex={-1}>
                  <img src={sitePath(slide.image)} alt="" />
                  <span className="angel-card-gradient" aria-hidden="true" />
                  <span className="angel-copy">
                    {index === 0 ? <h1>{slide.title}</h1> : <h2>{slide.title}</h2>}
                    <span className="angel-description">{slide.description}</span>
                  </span>
                </a>
              </article>
            ))}
          </div>
        )}
        <div className={`angel-grid${transition ? ` angel-grid-enter is-${transition.direction}` : introduced ? ' angel-grid-settled' : ' angel-grid-initial'}`} key={active}>
          {visible.map((slide, index) => (
          <article className={`angel-card angel-card-${index + 1}`} key={slide.title}>
            <a className="angel-card-link" href={sitePath(slide.href)} aria-label={`${slide.title}: ${slide.description}`}>
              <img src={sitePath(slide.image)} alt="" fetchPriority={index === 0 ? 'high' : 'auto'} loading={index === 0 ? 'eager' : 'lazy'} />
              <span className="angel-card-gradient" aria-hidden="true" />
              <span className="angel-copy">
                {index === 0 ? <h1>{slide.title}</h1> : <h2>{slide.title}</h2>}
                <span className="angel-description">{slide.description}</span>
              </span>
            </a>
          </article>
          ))}
        </div>
      </div>

      <button type="button" className="angel-arrow angel-arrow-prev" aria-label="Previous featured destinations" onClick={() => move(-1)}>
        <Chevron direction="left" />
      </button>
      <button type="button" className="angel-arrow angel-arrow-next" aria-label="Next featured destinations" onClick={() => move(1)}>
        <Chevron direction="right" />
      </button>

      <div className="angel-dots" aria-label="Choose a featured destination">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            className={index === active ? 'is-active' : ''}
            aria-label={`Show ${slide.title}`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => goTo(index, index < active ? 'prev' : 'next')}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">Showing {visible[0].title}, item {active + 1} of {slides.length}</p>
    </section>
  )
}
