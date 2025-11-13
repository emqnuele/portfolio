import { useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import portrait from '../assets/ema.avif'
import deepwork from '../assets/deepwork.svg'
import CircularGallery, { type CircularGalleryItem } from '../components/CircularGallery'
import SiteFooter from '../components/SiteFooter'
import '../App.css'

const quickStats = [
  { label: 'base', value: 'Modena · IT' },
  { label: 'response time', value: '2 hours' },
  { label: 'status', value: 'CS Student' },
  { label: 'languages', value: 'English - Italian'}
]

const journey = [
  {
    period: '2020 → 2025',
    title: 'High School · Human Science',
    details: ['Psychology, pedagogy, sociology and anthropology', 'Learning how people think and interact']
  },
  {
    period: '2022 → now',
    title: 'Indie builder · freelance',
    details: ['Landing pages & design systems', 'Telegram bots, chatbots, automations', 'AI finetuning & agents']
  },
  {
    period: '2025 → ∞',
    title: 'UNIMORE · Computer Science',
    details: ['Software eng & distributed systems', 'AI & machine learning']
  }
]

const skillSpotlights = [
  {
    eyebrow: 'web apps',
    title: 'Python + React builds',
    description: 'Pairing React/Vite frontends with Python backends to deliver full webapps and landing pages.',
    bullets: ['Responsive interfaces crafted with clean HTML/CSS and modern JS patterns', 'APIs stitched with Python + FastAPI so front and back ship together'],
    badges: ['React', 'Vite', 'Python', 'HTML · CSS']
  },
  {
    eyebrow: 'bots',
    title: 'Telegram & Discord automations',
    description: 'Custom bots that answer, notify, and moderate without forcing people into new tools.',
    bullets: ['Slash commands, inline keyboards, and cron jobs tailored to each server', 'Bridges to spreadsheets, Notion or webhooks to keep teams informed'],
    badges: ['Telegram bots', 'Discord bots', 'JavaScript', 'Python']
  },
  {
    eyebrow: 'ai automations',
    title: 'AI workflows & finetuning',
    description: 'Automations that call, tune, and monitor models so output stays on-brief.',
    bullets: ['OpenAI-powered assistants with guardrails and context injection', 'Lightweight finetuning + eval loops for niche datasets and ML basics'],
    badges: ['AI automations', 'AI finetuning', 'Machine learning basics', 'OpenAI']
  },
  {
    eyebrow: 'frontend ops',
    title: 'Frontend stack',
    description: 'React/Vite webapps with accessible HTML + CSS foundations, shipped through Vercel.',
    bullets: ['Component systems built with semantic HTML/CSS and token-driven patterns', 'Vite + Vercel pipeline that ships previews and CI-friendly deploys'],
    badges: ['React', 'Vite', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'Vercel']
  },
  {
    eyebrow: 'automation layer',
    title: 'Python automation core',
    description: 'Python services and bots that plug into Telegram, Discord, and lightweight webhooks.',
    bullets: ['Bots wired with slash commands, cron jobs, and inline keyboards', 'FastAPI services that bridge REST hooks, spreadsheets, and chat surfaces'],
    badges: ['Python', 'FastAPI', 'Telegram API', 'Discord.js', 'Cron jobs', 'REST APIs']
  },
  {
    eyebrow: 'ai workflow',
    title: 'Model ops & eval',
    description: 'Model calls, finetuning runs, and eval dashboards that stay understandable.',
    bullets: ['LangChain + OpenAI flows monitored with readable eval dashboards', 'Hugging Face datasets + GitHub automations to keep experiments organized'],
    badges: ['OpenAI', 'LangChain', 'Hugging Face', 'Datasets', 'Notion', 'GitHub']
  }
]

const ritualSignals = [
  { label: 'prototype latency', value: '< 48h' },
  { label: 'preferred sync', value: 'Telegram or email check-ins' },
  { label: 'quality gates', value: 'Manual review + smoke tests before ship' }
]



const shuffleItems = <T,>(items: T[]): T[] => {
  const list = [...items]
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = list[i]
    list[i] = list[j]
    list[j] = temp
  }
  return list
}

export default function AboutPage() {
  const coverRef = useRef<HTMLElement | null>(null)
  const journeyRef = useRef<HTMLElement | null>(null)
  const skillsRef = useRef<HTMLElement | null>(null)
  const contactRef = useRef<HTMLElement | null>(null)
  const galleryItems = useMemo<CircularGalleryItem[]>(() => {
    const spotlightCards: CircularGalleryItem[] = skillSpotlights.map((spotlight) => ({
      id: `spotlight-${spotlight.title.toLowerCase().replace(/\s+/g, '-')}`,
      element: (
        <article className="about-skill-story">
          <p className="about-skill-story__eyebrow">{spotlight.eyebrow}</p>
          <h3>{spotlight.title}</h3>
          <p className="about-skill-story__description">{spotlight.description}</p>
          <ul>
            {spotlight.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <div className="about-skill-story__badges">
            {spotlight.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </article>
      )
    }))

    return shuffleItems(spotlightCards)
  }, [])
  return (
    <div className="page page-ready about-page about-page--aura">
      <main className="about-main about-main--flow">
        <header className="about-cover" ref={coverRef}>
          <div className="about-cover__text">
            <Link to="/" className="about-cover__back">
              ↩ home
            </Link>
            <p className="about-eyebrow">about me</p>
            <h1>
              Emanuele <span>Faraci</span>
            </h1>
            <figure className="about-cover__portrait about-cover__portrait--mobile">
              <img src={portrait} alt="ema" loading="lazy" />
              
            </figure>
            <p className="about-cover__lead">
              CS student in the morning, product and automation builder by sunset. I move across React, agents, and python to give
              pace to small teams without drowning them in calls.
            </p>
            <dl className="about-cover__stats">
              {quickStats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="about-cover__portrait about-cover__portrait--desktop">
            <img src={portrait} alt="ema" loading="lazy" />
            
          </figure>
        </header>

        <section className="about-stripe about-stripe--journey" aria-label="Journey" ref={journeyRef}>
          <div className="about-stripe__heading">
            <p className="about-eyebrow">journey</p>
            <h2>My career</h2>
          </div>
          <div className="about-journey-grid">
            <ol className="about-timeline">
              {journey.map((item) => (
                <li key={item.title}>
                  <span className="about-timeline__period">{item.period}</span>
                  <h3>{item.title}</h3>
                  <ul>
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <figure className="about-journey-art">
              <img src={deepwork} alt="Illustration representing deep work focus" loading="lazy" />
              <figcaption>is this good enough sir ...?</figcaption>
            </figure>
          </div>
        </section>

        <section className="about-stripe about-stripe--skills" aria-label="Skills" ref={skillsRef}>
          <div className="about-skill-shell">
            <div className="about-skill-gallery">
              <div className="about-skill-gallery__inner">
                <div className="about-skill-gallery__heading about-stripe__heading">
                  <p className="about-eyebrow">WHAT I CAN DO</p>
                  <h2>My skills</h2>
                  <p className="about-skill__lead">From expressive UI to shipping agents that sync backends, this is what I’m fastest at.</p>
                </div>
                <CircularGallery items={galleryItems} />
              </div>
            </div>
            <dl className="about-rituals">
              {ritualSignals.map((signal) => (
                <div key={signal.label}>
                  <dt>{signal.label}</dt>
                  <dd>{signal.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="about-stripe about-stripe--contact" aria-label="Contact" ref={contactRef}>
          <div className="about-contact">
            <p className="about-eyebrow">contact</p>
            <h2>Drop me the essentials—brief, a snippet, or even a quick note.</h2>
            <p className="about-contact__lead">I reply within a few hours and can spin up a small prototype immediately if that unblocks you.</p>
            
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
