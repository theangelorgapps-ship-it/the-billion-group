import { createFileRoute } from '@tanstack/react-router'
import { ShopPage } from '../components/ShopPage'

export const Route = createFileRoute('/shop')({ component: ShopPage })
