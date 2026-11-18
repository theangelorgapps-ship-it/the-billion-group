import type { ReactNode } from 'react'
import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from '@tanstack/react-router'
import { BillionFooter } from '../components/BillionFooter'
import { SitePreloader } from '../components/SitePreloader'
import { isHomePath, sitePath } from '../lib/site-path'
import '../tailwind.css'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'The Billion Group — Global Ventures' },
      { name: 'description', content: 'The Billion Group builds ambitious ideas across property, hospitality, media and global ventures.' },
      { property: 'og:title', content: 'The Billion Group' },
      { property: 'og:description', content: 'Building ambitious ideas into enduring global ventures.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://theangelorgapps-ship-it.github.io/the-billion-group/brand/the-billion-group-twitter.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'The Billion Group' },
      { name: 'twitter:description', content: 'Building ambitious ideas into enduring global ventures.' },
      { name: 'twitter:image', content: 'https://theangelorgapps-ship-it.github.io/the-billion-group/brand/the-billion-group-twitter.png' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  return (
    <RootDocument>
      <SitePreloader />
      <Outlet />
      {!isHomePath(pathname) && <BillionFooter />}
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/png" href={sitePath('/brand/billion-mark.png')} />
        <link href="https://db.onlinewebfonts.com/c/cc69fe194f7ed41628d4628f37a10a21?family=Haboro+Norm+Regular" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
