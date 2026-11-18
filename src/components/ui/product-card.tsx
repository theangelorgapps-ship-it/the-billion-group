"use client"

import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export interface ProductCardProps extends HTMLAttributes<HTMLElement> {
  title: string
  merchant?: string
  href: string
  image: string
  imageAlt?: string
  badge?: string
  action?: string
  priority?: boolean
}

export function ProductCard({ title, merchant, href, image, imageAlt, badge, action = 'Get now', priority = false, className, ...props }: ProductCardProps) {
  return <article className={cn('catalog-product-card', className)} {...props}>
    <a className="catalog-product-image" href={href} aria-label={`${action}: ${title}`}>
      <img src={image} alt={imageAlt ?? title} loading={priority ? 'eager' : 'lazy'} decoding="async" />
      {badge ? <span>{badge}</span> : null}
    </a>
    <div className="catalog-product-body">
      {merchant ? <p>{merchant}</p> : null}
      <h2><a href={href}>{title}</a></h2>
      <a className="catalog-product-button" href={href}>{action}<span aria-hidden="true">↗</span></a>
    </div>
  </article>
}
