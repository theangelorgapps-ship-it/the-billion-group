import { useEffect } from 'react'
import { HaldenHeader } from './HaldenHeader'
import { ProductCard } from './ui/product-card'
import { sitePath } from '@/lib/site-path'

const products = [
  {
    title: 'Money Secrets From My Jewish Rabbi',
    type: 'Book',
    image: '/shop/money-secrets-from-my-jewish-rabbi.avif',
    href: 'https://uebertangel.org/product/money-secrets-from-my-jewish-rabbi/',
    action: 'Get now',
  },
  {
    title: 'Becoming a Millionaire in Real Estate',
    type: 'Book',
    image: '/shop/becoming-a-millionaire-in-real-estate.avif',
    href: 'https://uebertangel.org/product/becoming-a-millionaire-in-real-estate/',
    action: 'Get now',
  },
  {
    title: 'The Money Is Coming',
    type: 'Book',
    image: '/shop/the-money-is-coming.avif',
    href: 'https://uebertangel.org/product/the-money-is-coming/',
    action: 'Get now',
  },
  {
    title: 'The Millionaire Academy',
    type: 'Programme',
    image: '/shop/the-millionaire-academy.jpeg',
    href: 'https://programs.uebertangel.org/product/the-millionaire-academy/',
    action: 'Register now',
  },
]

export function ShopPage() {
  useEffect(() => { document.title = 'Shop — The Billion Group' }, [])

  return <main className="angel-shop-page">
    <HaldenHeader />
    <section className="shop-intro" aria-labelledby="shop-title">
      <p>The Billion Group</p>
      <h1 id="shop-title">Books and programmes<br />for building wealth.</h1>
    </section>
    <section className="shop-products" aria-label="Books and programmes">
      {products.map((product, index) => <ProductCard key={product.title} title={product.title} merchant="Uebert Angel" badge={product.type} image={sitePath(product.image)} href={product.href} action={product.action} priority={index < 2} />)}
    </section>
  </main>
}
