import { useEffect } from 'react'
import { AtSign, Globe2, MessageCircle, Video } from 'lucide-react'
import { motion } from 'framer-motion'
import { HaldenHeader } from './HaldenHeader'
import { sitePath } from '@/lib/site-path'

const team = [
  {
    name: 'Uebert Angel Jr',
    role: 'CEO',
    image: '/team/uebert-angel-jr-seated-clean.webp',
    socials: [
      { label: 'Official website', href: 'https://uebertangeljr.com/', Icon: Globe2 },
      { label: 'Instagram', href: 'https://www.instagram.com/uebertangeljr/', Icon: AtSign },
      { label: 'X', href: 'https://x.com/uebertangeljr', Icon: MessageCircle },
      { label: 'YouTube', href: 'https://www.youtube.com/@uebertangeljr', Icon: Video },
    ],
  },
  {
    name: 'Ray Loughton',
    role: 'CFO',
    image: '/team/ray-loughton.webp',
    socials: [],
  },
  {
    name: 'Lang Jasmine Chang',
    role: 'Director of Operations',
    image: '/team/lang-jasmine-chang.webp',
    socials: [],
  },
  {
    name: 'Justus Baldr',
    role: 'Director of Sales and Marketing',
    image: '/team/justus-baldr.webp',
    socials: [],
  },
  {
    name: 'Shinoy Benjamin',
    role: 'Director of Technology',
    image: '/team/shinoy-benjamin.webp',
    socials: [],
  },
  {
    name: 'Ruth Grocetti',
    role: 'Creative Head',
    image: '/team/ruth-grocetti.webp',
    socials: [],
  },
]

export function TeamPage() {
  useEffect(() => {
    document.title = 'Our Team — The Billion Group'
  }, [])

  return <main className="angel-team-page">
    <HaldenHeader />
    <section className="angel-team-section" id="team">
      <motion.div
        className="angel-team-intro"
        initial={{ y: -28, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: .72, ease: [.21, .47, .32, .98] }}
      >
        <span>Team</span>
        <h1>Meet our team</h1>
        <p>The people behind The Billion Group bring together strategy, creativity and global experience to turn ambitious ideas into enduring work.</p>
      </motion.div>

      <div className="angel-team-grid">
        {team.map((member, index) => <motion.article
          className="angel-team-card"
          key={member.name}
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: .72, delay: index * .09, ease: [.21, .47, .32, .98] }}
        >
          <div className="angel-team-media">
            <img src={sitePath(member.image)} alt={member.name} loading="lazy" />
            {member.socials.length > 0 && <div className="angel-team-socials">
              {member.socials.map(({ label, href, Icon }) => <a href={href} target="_blank" rel="noreferrer" aria-label={`${member.name} — ${label}`} key={label}><Icon size={17} strokeWidth={1.7} /></a>)}
            </div>}
          </div>
          <div className="angel-team-details">
            <h2>{member.name}</h2>
            <p>{member.role}</p>
          </div>
        </motion.article>)}
      </div>
    </section>
  </main>
}
