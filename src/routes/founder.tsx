import { createFileRoute } from '@tanstack/react-router'
import { FounderPage } from '../components/FounderPage'

export const Route = createFileRoute('/founder')({ component: FounderPage })
