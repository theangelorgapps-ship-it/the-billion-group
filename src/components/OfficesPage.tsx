import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { HaldenHeader } from './HaldenHeader'
import { sitePath } from '@/lib/site-path'

const hotels = [
  { id:1, label:'Amalfi Coast · Italy', text:'Casa Aurelia Amalfi — cliffside suites shaped by Mediterranean light, sea and stone.', image:'/hotels/casa-aurelia-amalfi.webp' },
  { id:2, label:'Florida · United States', text:'Azure Key Florida — a sunlit waterfront retreat made for effortless coastal living.', image:'/hotels/azure-key-florida.webp' },
  { id:3, label:'Phu Quoc · Vietnam', text:'Pearl Bay Phu Quoc — private tropical villas immersed in gardens and calm water.', image:'/hotels/pearl-bay-phu-quoc.webp' },
  { id:4, label:'Osaka · Japan', text:'Kanso Osaka — contemporary hospitality balancing the city’s energy with quiet craft.', image:'/hotels/kanso-osaka.webp' },
  { id:5, label:'Harare · Zimbabwe', text:'Picasso Harare — art-led African luxury with warm interiors and exceptional service.', image:'/hotels/picasso-harare.webp' },
]

const transition = { duration:.7, ease:[.32,.72,0,1] as [number,number,number,number], opacity:{duration:.5} }

export function OfficesPage() {
  const [currentIndex,setCurrentIndex]=useState(0)
  const [direction,setDirection]=useState(1)
  const sectionRef=useRef<HTMLElement>(null)
  const isInView=useInView(sectionRef,{once:true})
  const move=useCallback((amount:number)=>{setDirection(amount>0?1:-1);setCurrentIndex(index=>(index+amount+hotels.length)%hotels.length)},[])
  useEffect(()=>{document.title='Picasso Hotels & Resorts — The Billion Group'},[])
  useEffect(()=>{const timer=window.setInterval(()=>move(1),4000);return()=>window.clearInterval(timer)},[move])
  const visible=[0,1,2].map(offset=>hotels[(currentIndex+offset)%hotels.length])
  return <main className="hotel-carousel-page"><HaldenHeader /><motion.section ref={sectionRef} className="hotel-carousel" initial="hidden" animate={isInView?'visible':'hidden'} variants={{hidden:{},visible:{transition:{staggerChildren:.1}}}}>
    <motion.header variants={{hidden:{opacity:0,y:18},visible:{opacity:1,y:0,transition:{type:'spring',stiffness:110,damping:18}}}}><div><small>THE ANGEL ORGANISATION</small><h1>Picasso Hotels & Resorts</h1></div><div className="hotel-controls"><button onClick={()=>move(-1)} aria-label="Previous hotel"><ChevronLeft/></button><button onClick={()=>move(1)} aria-label="Next hotel"><ChevronRight/></button></div></motion.header>
    <motion.div className="hotel-grid" variants={{hidden:{opacity:0,y:18},visible:{opacity:1,y:0,transition:{type:'spring',stiffness:110,damping:18}}}}><AnimatePresence mode="popLayout" initial={false}>{visible.map((hotel,index)=><motion.article layout key={`${hotel.id}-${currentIndex}-${index}`} className="hotel-card" initial={{opacity:0,x:direction>0?100:-100,scale:.95}} animate={{opacity:1,x:0,scale:1}} exit={{opacity:0,x:direction>0?-100:100,scale:.95}} transition={transition}><div className="hotel-image" style={{backgroundImage:`url("${sitePath(hotel.image)}")`}}/><div className="hotel-gradient"/><div className="hotel-card-copy"><span>{hotel.label}</span><p>{hotel.text}</p></div></motion.article>)}</AnimatePresence></motion.div>
  </motion.section></main>
}
