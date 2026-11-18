import { useLayoutEffect, useRef, useSyncExternalStore, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger, SplitText)

type JourneyItem = { id:string; year:string; title:string; content:string }
const top:JourneyItem[]=[
  {id:'2005-start',year:'2005',title:'Where it all started',content:'Founded Club Millionaire Limited, providing concierge services in Britain.'},
  {id:'2008-organisation',year:'2008',title:'The Billion Group',content:'The Billion Group was founded as the parent company for a growing portfolio of business interests.'},
  {id:'2014-forbes',year:'2014',title:'Growing strong',content:'H.E. Amb. Uebert Angel was featured by Forbes as the organisation continued to expand.'},
  {id:'2024-investment',year:'2024',title:'Investing in founders',content:'Expanded angel investment in startups and spearheaded the Fort Moriah Municipality venture.'},
  {id:'2026-global',year:'2026',title:'A global production future',content:'Beverly Hotel, Fort Moriah completion, and media production studios in the UAE, Japan and New York.'},
]
const bottom:JourneyItem[]=[
  {id:'2006-property',year:'2006',title:'The real-estate beginnings',content:'Entered residential property development before expanding into commercial buildings, land and acquisitions.'},
  {id:'2008-sam-barkley',year:'2008',title:'Sam Barkley Construction',content:'Sam Barkley Construction was founded, taking the organisation into landmark development projects.'},
  {id:'2012-enterprises',year:'2012',title:'New enterprises',content:'The Millionaire Academy, Halo Chat, Halo Call and Osborn Institute of Theology joined the portfolio.'},
  {id:'2023-hippodrome',year:'2023',title:'Harare Hippodrome completed',content:'Completed the Harare Hippodrome while advancing the major Fort Moriah smart-city vision.'},
  {id:'2025-projects',year:'2025',title:'Construction accelerates',content:'Started Iconium construction, Lux Plaza in São Paulo, a Manila mall project and resort contracts with major cruise lines.'},
]
const all=[...top,...bottom].sort((a,b)=>Number(a.year)-Number(b.year)||a.id.localeCompare(b.id))
const query='(prefers-reduced-motion: reduce)'
const subscribe=(cb:()=>void)=>{if(typeof window==='undefined')return()=>{};const m=matchMedia(query);m.addEventListener('change',cb);return()=>m.removeEventListener('change',cb)}
const snapshot=()=>typeof window!=='undefined'&&matchMedia(query).matches
const mobileQuery='(max-width: 1024px)'
const subscribeMobile=(cb:()=>void)=>{if(typeof window==='undefined')return()=>{};const m=matchMedia(mobileQuery);m.addEventListener('change',cb);return()=>m.removeEventListener('change',cb)}
const mobileSnapshot=()=>typeof window!=='undefined'&&matchMedia(mobileQuery).matches

export type TimelineProps={title?:string;periodLabel?:string;textColor?:string;mutedTextColor?:string;activeColor?:string;backgroundColor?:string;imageUrl?:string;imageAlt?:string;duration?:number;scrollDuration?:number}

export default function Timeline({title='Product Storyline',periodLabel='2020 — 2026',textColor='#fff',mutedTextColor='#a1a1aa',activeColor='#ff5f00',backgroundColor='#0a0a0a',imageUrl='https://cdn.21st.dev/assets/mirror/b0/b0c41784074f76ac5fb6b447da87780c901135841317a096241371f24bc13ddd.jpg',imageAlt='Modern office workspace',duration,scrollDuration=1.2}:TimelineProps){
  const sectionRef=useRef<HTMLElement>(null), sliderRef=useRef<HTMLDivElement>(null)
  const reduced=useSyncExternalStore(subscribe,snapshot,()=>false)
  const mobile=useSyncExternalStore(subscribeMobile,mobileSnapshot,()=>false)
  const normalized=Math.max(.2,duration??scrollDuration)
  useLayoutEffect(()=>{
    const section=sectionRef.current;if(!section||mobile)return
    const ctx=gsap.context(()=>{
      gsap.timeline({scrollTrigger:{trigger:section,start:'top top',end:'92% bottom',scrub:true}}).fromTo(sliderRef.current,{xPercent:0},{xPercent:-65,ease:'none'})
      gsap.to('.journey-line',{width:'98%',ease:'none',scrollTrigger:{trigger:section,start:'top 25%',end:'92% bottom',scrub:true}})
      all.forEach((item,index)=>{
        const line=`.jl-${item.id}`,dot=`.jd-${item.id}`
        if(reduced){gsap.set([line,dot],{scale:1});return}
        gsap.set(line,{scaleY:0,transformOrigin:top.some(x=>x.id===item.id)?'bottom':'top'});gsap.set(dot,{scale:0})
        const titleSplit=new SplitText(`.title-${item.id}`,{type:'lines',mask:'lines'}),descSplit=new SplitText(`.description-${item.id}`,{type:'lines',mask:'lines'})
        const start=4+index*8
        gsap.timeline({scrollTrigger:{trigger:section,start:`${start}% 30%`,end:`${start+14}% 50%`,scrub:true}})
          .to(line,{scaleY:1,duration:normalized*.4}).to(dot,{scale:1,duration:normalized*.4},'<')
          .fromTo(titleSplit.lines,{y:100},{y:0,duration:normalized,ease:'power2.out'},'<')
          .fromTo(descSplit.lines,{y:100},{y:0,duration:normalized,ease:'power2.out'},'<')
      })
    },section)
    const resize=()=>ScrollTrigger.refresh();addEventListener('resize',resize)
    return()=>{removeEventListener('resize',resize);ctx.revert()}
  },[normalized,reduced,mobile])
  const colors={color:textColor,backgroundColor} as CSSProperties,accent={backgroundColor:activeColor},muted={color:mutedTextColor}
  const item=(x:JourneyItem,isTop:boolean)=><div key={x.id} className={`timeline-item ${isTop?'timeline-top':'timeline-bottom'}`}><div className="timeline-stem"><span className={`timeline-dot jd-${x.id}`} style={accent}/><i className={`timeline-line jl-${x.id}`} style={accent}/></div><div className="timeline-copy"><h4 className={`title-${x.id}`}><small>{x.year}</small>{x.title}</h4><p className={`description-${x.id}`} style={muted}>{x.content}</p></div></div>
  return <>
    <section ref={sectionRef} id="journey" className="timeline-section" style={colors}><div className="timeline-sticky"><div ref={sliderRef} className="timeline-slider"><div className="timeline-photo"><img src={imageUrl} alt={imageAlt}/></div><div className="timeline-board"><div className="timeline-axis"><span style={accent}/><i className="journey-line" style={accent}/><span style={accent}/></div><div className="timeline-row timeline-row-top"><h2>{title}</h2><div className="timeline-items">{top.map(x=>item(x,true))}</div></div><div className="timeline-row timeline-row-bottom"><p style={muted}>{periodLabel}</p><div className="timeline-items">{bottom.map(x=>item(x,false))}</div></div></div></div></div></section>
    <section className="timeline-mobile" style={colors}><div className="timeline-mobile-head"><img src={imageUrl} alt={imageAlt}/><h2>{title}</h2><p style={muted}>{periodLabel}</p></div><div className="timeline-mobile-list">{all.map(x=><article key={x.id} className="timeline-mobile-item"><span style={accent}/><div><small style={{color:activeColor}}>{x.year}</small><h3>{x.title}</h3><p style={muted}>{x.content}</p></div></article>)}</div></section>
  </>
}
