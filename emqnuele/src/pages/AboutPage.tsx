import { useRef } from 'react'
import { Link } from 'react-router-dom'
import portrait from '../assets/ema.avif'
import deepwork from '../assets/deepwork.svg'
import '../App.css'

const quickStats = [
  { label: 'base', value: 'Modena · IT' },
  { label: 'ping', value: '2 hours' },
  { label: 'status', value: 'CS BSc · UNIMORE' },
  { label: 'english', value: 'Cambridge C1 · 2025' }
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
  }
]

const skillStacks = [
  {
    title: 'Frontend stack',
    description: 'React/Vite webapps with accessible HTML + CSS foundations, shipped through Vercel.',
    tools: ['React', 'Vite', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'Vercel']
  },
  {
    title: 'Automation layer',
    description: 'Python services and bots that plug into Telegram, Discord, and lightweight webhooks.',
    tools: ['Python', 'FastAPI', 'Telegram API', 'Discord.js', 'Cron jobs', 'REST APIs']
  },
  {
    title: 'AI workflow',
    description: 'Model calls, finetuning runs, and eval dashboards that stay understandable.',
    tools: ['OpenAI', 'LangChain', 'Hugging Face', 'Datasets', 'Notion', 'GitHub']
  }
]

const ritualSignals = [
  { label: 'prototype latency', value: '< 48h' },
  { label: 'preferred sync', value: '30s Loom + Notion hub' },
  { label: 'quality gates', value: 'Visual + e2e suite on every deploy' }
]

const contactLinks = [
  { label: 'email', href: 'mailto:hey@emanuele.dev' },
  { label: 'telegram', href: 'https://t.me/emqnuele' },
  { label: 'github', href: 'https://github.com/emqnuele' }
]

export default function AboutPage() {
  const coverRef = useRef<HTMLElement | null>(null)
  const journeyRef = useRef<HTMLElement | null>(null)
  const skillsRef = useRef<HTMLElement | null>(null)
  const contactRef = useRef<HTMLElement | null>(null)
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
            <p className="about-cover__lead">
              CS student in the morning, product and automation builder by sunset. I move across React, agents, and motion design to give
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
          <figure className="about-cover__portrait">
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
          <div className="about-stripe__heading">
            <p className="about-eyebrow">skills</p>
            <h2>Stacks and rituals I lean on every week.</h2>
            <p className="about-skill__lead">From expressive UI to shipping agents that sync backends, this is what I’m fastest at.</p>
          </div>
          <div className="about-skill-shell">
            <div className="about-skill-stories">
              {skillSpotlights.map((spotlight) => (
                <article key={spotlight.title} className="about-skill-story">
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
              ))}
            </div>
            <div className="about-stack-columns">
              {skillStacks.map((stack) => (
                <article key={stack.title} className="about-stack-card">
                  <header>
                    <p className="about-stack-card__label">stack</p>
                    <h3>{stack.title}</h3>
                  </header>
                  <p className="about-stack-card__description">{stack.description}</p>
                  <ul>
                    {stack.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </article>
              ))}
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
            <h2>Send me quick briefs, a 30s Loom, or a Notion voice note.</h2>
            <p className="about-contact__lead">I reply within 24h and can ship a micro prototype right away if helpful.</p>
            <div className="about-contact__links">
              {contactLinks.map((link) => (
                <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {link.label}
                </a>
              ))}
              <Link to="/" className="about-contact__links-ghost">
                back to landing
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
