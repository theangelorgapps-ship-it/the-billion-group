import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsPanel, TabsTab } from './tabs'
import { sitePath } from '@/lib/site-path'

interface ShowcaseProject {
  title: string
  location: string
  description: string
  year: string
  image: string
  supportingImage?: string
}

interface PropertyRegion {
  id: string
  label: string
  summary: string
  projects: ShowcaseProject[]
}

const regions: PropertyRegion[] = [
  {
    id: 'africa',
    label: 'Africa',
    summary: 'Four property programmes at different stages of delivery.',
    projects: [
      { title: 'Fort Moriah City', location: 'Zimbabwe', description: 'A planned municipality organised around housing, civic buildings, commerce and public landscape.', year: 'Target 2026', image: '/properties/fort-moriah-city.webp' },
      { title: 'Harare Hippodrome', location: 'Harare, Zimbabwe', description: 'The completed venue combines event halls, hospitality spaces and landscaped grounds in one campus.', year: 'Completed 2023', image: '/properties/harare-hippodrome.webp', supportingImage: '/properties/harare-hippodrome-detail.jpeg' },
      { title: 'Johannesburg Hippodrome', location: 'Johannesburg, South Africa', description: 'A racecourse and events concept combining grandstand hospitality with public-facing terraces.', year: 'In development', image: '/properties/johannesburg-hippodrome.webp' },
      { title: 'Beverly Hotel', location: 'Africa', description: 'A hotel programme bringing guest rooms, dining, landscape and shared social spaces into one site.', year: 'Target 2026', image: '/properties/beverly-hotel.webp' },
    ],
  },
  {
    id: 'america',
    label: 'America',
    summary: 'A New York base for commercial and residential property work.',
    projects: [
      { title: 'New York Fraser Hall', location: 'New York, United States', description: 'A metropolitan mixed-use address planned around flexible workspaces, residences and street-level amenity.', year: 'United States', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=88' },
    ],
  },
  {
    id: 'europe',
    label: 'Europe',
    summary: 'Two European projects with distinct urban and community programmes.',
    projects: [
      { title: 'Barkley Views', location: 'United Kingdom', description: 'An urban residential scheme pairing private homes with carefully proportioned shared spaces.', year: 'United Kingdom', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1800&q=88' },
      { title: 'Pace di Comunità', location: 'Italy', description: 'A community-led development shaped by landscape, public gathering and a clear civic centre.', year: 'Italy', image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1800&q=88' },
    ],
  },
  {
    id: 'asia',
    label: 'Asia',
    summary: 'Commercial work developed for one of Southeast Asia’s most active cities.',
    projects: [
      { title: 'Project Mall Manila', location: 'Manila, Philippines', description: 'A retail and leisure destination planned around shaded routes, dining terraces and all-day activity.', year: 'Started 2025', image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=88' },
    ],
  },
  {
    id: 'middle-east',
    label: 'Middle East',
    summary: 'Landmark projects in the Gulf spanning hospitality and mixed-use development.',
    projects: [
      { title: 'The Wonder, Dubai', location: 'Dubai, United Arab Emirates', description: 'A high-rise hospitality and residential concept positioned for long views across the city.', year: 'United Arab Emirates', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=88' },
      { title: 'Iconium', location: 'United Arab Emirates', description: 'A vertical mixed-use development bringing residences, hospitality and commercial space into one address.', year: 'Started 2025', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1800&q=88' },
    ],
  },
  {
    id: 'south-america',
    label: 'South America',
    summary: 'Commercial projects centred on São Paulo and the wider Brazilian market.',
    projects: [
      { title: 'Lux Plaza São Paulo', location: 'São Paulo, Brazil', description: 'A city-centre commercial destination combining retail, food, workplaces and evening use.', year: 'Started 2025', image: 'https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1800&q=88' },
      { title: 'The Cube', location: 'Brazil', description: 'A compact contemporary building designed for flexible commercial occupation and a strong street presence.', year: 'Brazil', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=88' },
    ],
  },
]

const validRegion = (value: string | null) => regions.some((region) => region.id === value) ? value! : 'africa'

export function ProjectShowcase() {
  const reducedMotion = useReducedMotion()
  const [activeRegion, setActiveRegion] = useState('africa')

  useEffect(() => {
    const syncFromUrl = () => setActiveRegion(validRegion(new URLSearchParams(window.location.search).get('region')))
    syncFromUrl()
    window.addEventListener('popstate', syncFromUrl)
    return () => window.removeEventListener('popstate', syncFromUrl)
  }, [])

  const chooseRegion = (value: string) => {
    setActiveRegion(value)
    const url = new URL(window.location.href)
    url.searchParams.set('region', value)
    window.history.replaceState({}, '', url)
  }

  const region = regions.find((item) => item.id === activeRegion) ?? regions[0]

  return <section className="property-showcase" aria-labelledby="regional-properties">
    <div className="property-tabs-heading">
      <p id="regional-properties">Explore by region</p>
      <Tabs value={activeRegion} onValueChange={chooseRegion}>
        <TabsList variant="underline" aria-label="Property regions">
          {regions.map((item) => <TabsTab value={item.id} key={item.id}>{item.label}</TabsTab>)}
        </TabsList>
        <AnimatePresence mode="wait" initial={false}>
          <TabsPanel value={activeRegion} key={activeRegion}>
            <motion.div
              className="property-region-view"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: reducedMotion ? 0 : 0.46, ease: [0.4, 0, 0.2, 1] }}
            >
              <header className="property-showcase-head"><h2>{region.label}</h2><p>{region.summary}</p></header>
              <div className="property-list">
                {region.projects.map((project, index) => <motion.article
                  key={project.title}
                  className="property-row"
                  initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.52, delay: reducedMotion ? 0 : Math.min(index * 0.06, 0.18), ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.figure className="property-media" initial={reducedMotion ? false : { scale: 0.985 }} animate={{ scale: 1 }} transition={{ duration: reducedMotion ? 0 : 0.62, ease: [0.4, 0, 0.2, 1] }}>
                    <img src={sitePath(project.image)} alt={`${project.title}, ${project.location}`} loading="lazy" />
                    {project.supportingImage && <img className="property-supporting" src={sitePath(project.supportingImage)} alt={`Alternate architectural view of ${project.title}`} loading="lazy" />}
                  </motion.figure>
                  <div className="property-row-copy"><div className="property-meta"><span>{String(index + 1).padStart(2, '0')}</span><span>{project.year}</span></div><h3>{project.title}</h3><p className="property-location">{project.location}</p><p className="property-description">{project.description}</p></div>
                </motion.article>)}
              </div>
            </motion.div>
          </TabsPanel>
        </AnimatePresence>
      </Tabs>
    </div>
  </section>
}
