import { createFileRoute } from '@tanstack/react-router'
import { AngelHero } from '../components/AngelHero'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main>
      <AngelHero />
    </main>
  )
}
