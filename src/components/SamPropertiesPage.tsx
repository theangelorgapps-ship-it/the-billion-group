import { useEffect } from 'react'
import { HaldenHeader } from './HaldenHeader'
import { ProjectShowcase } from './ui/project-showcase'

export function SamPropertiesPage() {
  useEffect(() => { document.title = 'Sam Barkley Properties — The Billion Group' }, [])
  return <main className="sam-properties-page"><HaldenHeader /><div className="sam-properties-intro"><p>Sam Barkley Constructions</p><h1>Property work<br />across continents.</h1></div><ProjectShowcase /></main>
}
