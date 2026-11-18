import { createFileRoute } from '@tanstack/react-router'
import { TeamPage } from '../components/TeamPage'

export const Route = createFileRoute('/team')({ component: TeamPage })
