import { useMemo, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import quickresourcepack from '../assets/quick-resource-pack.png'
import scraper from '../assets/scraper.png'
import aibot from '../assets/aibot.png'
import converter from '../assets/converter.png'
import minesweeper from '../assets/minesweeper.png'
import portfolio from '../assets/portfolio.png'
import SiteFooter from '../components/SiteFooter'

type ProjectLink = {
  label: string
  href: string
}

type ProjectCard = {
  slug: string
  title: string
  tagline: string
  image: string
  status: string
  stack: string[]
  links: ProjectLink[]
  accent: string
}

const terminalLines = [
  { prompt: 'ema@portfolio', command: 'cd ~/projects' },
  { prompt: 'ema@projects', command: 'ls', output: 'webscraper  neutrum  pedro  bea-LLM' },
  { prompt: 'ema@projects', command: './show --minimal', output: '[rendering cards...]' }
]

const projects: ProjectCard[] = [
    {
    slug: 'humanlike-telegram-bot',
    title: 'Humanlike telegram bot',
    tagline: 'A highly realistic AI Telegram bot powered by Google GenAI api. It mimics human texting with natural message splitting, dynamic typing delays, and fully customizable behavior.',
    image: aibot,
    status: 'live / 2025',
    stack: ['Python', 'Telegram API', 'Google GenAI'],
    links: [{ label: 'github', href: 'https://github.com/emqnuele/humanlike-telegram-bot' }],
    accent: '255, 143, 178'
  },
      {
    slug: 'project-bea',
    title: 'Porject BEA',
    tagline: 'Turn your Instagram DMs into an autonomous AI persona. Mimics human behavior with realistic delays, typing simulation, and a custom deepfake persona.',
    image: aibot,
    status: 'prod / 2025',
    stack: ['Python', 'instagrapi', 'Google GenAI'],
    links: [{ label: 'github', href: 'https://github.com/emqnuele/project-bea' }],
    accent: '255, 122, 214'
  },
    {
    slug: 'web-scraper',
    title: 'Simple Web Scraper',
    tagline: 'Modular Python web scraper for automatic content extraction. Supports batch scraping, extracts articles with full metadata, media and structure. Structured JSON output.',
    image: scraper,
    status: 'beta / 2025',
    stack: ['Python','BeautifulSoup','Requests'],
    links: [
      { label: 'github', href: 'https://github.com/emqnuele/webscraper' },
    ],
    accent: '125, 255, 199'
  },
  {
    slug: 'minesweeper',
    title: 'Minesweeper',
    tagline: 'A minesweeper game with cheats, because why not?',
    image: minesweeper,
    status: 'prod / 2025',
    stack: ['React', 'TypeScript', 'Vite'],
    links: [
      { label: 'github', href: 'https://github.com/emqnuele/Minesweeper' },
      { label: 'live', href: 'https://minesweeper.emanuelefaraci.com/' }
    ],
    accent: '115, 242, 255'
  },
    {
    slug: 'all-converter',
    title: 'AllConverter',
    tagline: 'AllConverter is a web application for converting files between various formats—all locally on your PC. It supports image, audio, video, and document conversions with advanced options such as resizing, rotating, filtering, and quality adjustments.',
    image: converter,
    status: 'prod / 2024',
    stack: ['Python', 'Flask', 'FFmpeg', 'Pillow', 'PyPDF2'],
    links: [
      { label: 'github', href: 'https://github.com/emqnuele/AllConverter' },
    ],
    accent: '255, 196, 122'
  },
  {
    slug: 'portfolio',
    title: 'Portfolio Website',
    tagline: 'This very portfolio website you are browsing! Built with React and Vite, it showcases my projects, skills, and contact information in a beautiful, modern design.',
    image: portfolio,
    status: 'live on google',
    stack: ['React', 'Vite', 'CSS', 'TypeScript'],
    links: [
      { label: 'github', href: 'https://github.com/emqnuele/portfolio' },
    ],
    accent: '220, 174, 255'
  },
    {
    slug: 'quick-resource-pack',
    title: 'Quick ResourcePack Mod',
    tagline: 'a simple fabric mod for minecraft 1.21.x that lets you set a keybind to switch on/off a specific texture pack you choose.',
    image: quickresourcepack,
    status: 'live on modrinth',
    stack: ['Java', 'Minecraft', 'Fabric'],
    links: [
      { label: 'github', href: 'https://github.com/emqnuele/quick-resource-pack' },
      { label: 'live', href: 'https://modrinth.com/mod/quick-resource-pack' }
    ],
    accent: '255, 122, 122'
  },

]

export default function ProjectsPage() {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? '')
  const activeProject = useMemo(() => projects.find((project) => project.slug === activeSlug) ?? projects[0], [activeSlug])
  const githubLink = activeProject?.links.find((link) => link.label.toLowerCase().includes('git'))
  const liveLink = activeProject?.links.find((link) => !link.label.toLowerCase().includes('git'))

  return (
    <div className="page page-ready about-page about-page--aura projects-page">
      <main className="about-main about-main--flow projects-main">
        <header className="projects-cover">
          <div className="projects-intro">
            <Link to="/" className="projects-back">
              ↩ home
            </Link>
            <p className="projects-eyebrow">~/projects</p>
            <h1>
              Projects<span> log</span>
            </h1>
            <p className="projects-lead">
              Here is a selection of my recent project work, showcased through a live interface. Each project card highlights the core of the project,
              tech stack, status, and links to the code repository or live demo.
            </p>
            <dl className="projects-meta">
              <div>
                <dt>core stack</dt>
                <dd>React · Vite · Python · FastAPI · AI agents</dd>
              </div>
              <div>
                <dt>status</dt>
                <dd>Shipping indie builds · Freelance collab</dd>
              </div>
              <div>
                <dt>links</dt>
                <dd>github.com/emqnuele · t.me/emqnuele</dd>
              </div>
            </dl>
          </div>
          <div className="projects-cover__terminal">
            <div className="projects-terminal" aria-live="polite">
              <div className="projects-terminal__bar">
                <div className="projects-terminal__leds" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <p>~/projects — minimal log</p>
              </div>
              <div className="projects-terminal__screen" role="log">
                {terminalLines.map((line) => (
                  <div key={line.command} className="projects-terminal__line">
                    <div className="projects-terminal__command-line">
                      <span className="projects-terminal__prompt">{line.prompt}</span>
                      <span className="projects-terminal__command">{line.command}</span>
                    </div>
                    {line.output && <span className="projects-terminal__output">{line.output}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <section className="projects-stripe projects-lab" aria-label="Project workbench">
          <div className="projects-lab__heading">
            <p className="projects-eyebrow">sessions</p>
            <h2>My work</h2>
          </div>
          <div className="projects-lab__grid">
            <div className="projects-lab__queue" role="listbox" aria-label="Project queue">
              <p className="projects-lab__queue-label">project queue</p>
              <div className="projects-lab__selector">
                <label htmlFor="projects-queue-select">Choose project</label>
                <select id="projects-queue-select" value={activeSlug} onChange={(event) => setActiveSlug(event.target.value)}>
                  {projects.map((project) => (
                    <option key={project.slug} value={project.slug}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>
              <ul>
                {projects.map((project) => {
                  const isActive = project.slug === activeProject?.slug
                  return (
                    <li key={project.slug}>
                      <button
                        type="button"
                        className={`projects-lab__project ${isActive ? 'is-active' : ''}`}
                        onClick={() => setActiveSlug(project.slug)}
                        style={{ '--project-accent': project.accent } as CSSProperties}
                        aria-pressed={isActive}
                      >
                        <span className="projects-lab__project-led" aria-hidden="true" />
                        <div className="projects-lab__project-copy">
                          <span className="projects-lab__project-title">{project.title}</span>
                        </div>
                        <span className="projects-lab__project-stack">{project.stack.slice(0, 3).join(' · ')}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            {activeProject && (
              <article className="projects-lab__detail" style={{ '--project-accent': activeProject.accent } as CSSProperties} aria-live="polite">
                <div className="projects-lab__top">
                  <header>
                    <p className="projects-lab__eyebrow">active session</p>
                    <h3>{activeProject.title}</h3>
                    <p>{activeProject.tagline}</p>
                  </header>
                  {(githubLink || liveLink) && (
                    <div className="projects-lab__actions">
                      {githubLink && (
                        <a className="projects-lab__action projects-lab__github" href={githubLink.href} target="_blank" rel="noreferrer">
                          <span className="projects-lab__github-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                              <path
                                fill="currentColor"
                                d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.8-1.4-3.8-1.4-.6-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.7 2.1 2.9 1.5.1-.8.4-1.3.8-1.7-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.4 1.2a11.6 11.6 0 0 1 6.2 0C19 4 20 4.4 20 4.4c.6 1.6.2 2.8.1 3.2a5 5 0 0 1 1.2 3.3c0 4.6-2.8 5.6-5.4 5.9.4.3.8 1 .8 2v2.9c0 .3.1.7.8.6a11.5 11.5 0 0 0 7.9-10.9C23.5 5.6 18.4.5 12 .5Z"
                              />
                            </svg>
                          </span>
                          <span className="projects-lab__github-label">{githubLink.label}</span>
                          <span className="projects-lab__github-arrow" aria-hidden="true">
                            ↗
                          </span>
                        </a>
                      )}
                      {liveLink && (
                        <a className="projects-lab__action projects-lab__primary" href={liveLink.href} target="_blank" rel="noreferrer">
                          {liveLink.label}
                          <span className="projects-lab__github-arrow" aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <figure className="projects-lab__figure">
                  <img src={activeProject.image} alt={`preview of ${activeProject.title}`} loading="lazy" />
                  <figcaption className="projects-lab__status">
                    <span>status:</span>
                    <strong>{activeProject.status}</strong>
                  </figcaption>
                </figure>
                <div className="projects-lab__stack">
                  {activeProject.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <p className="projects-lab__stack-inline">{activeProject.stack.join(' · ')}</p>
              </article>
            )}
          </div>
        </section>

        <section className="projects-stripe projects-stripe--cta" aria-label="contact">
          <p className="projects-eyebrow">last command</p>
          <h2>open to collab & cs adventures</h2>
          <div className="projects-footer__links">
            <a href="mailto:hey@emanuelefaraci.com">email</a>
            <a href="https://t.me/emqnuele" target="_blank" rel="noreferrer">
              telegram
            </a>
            <a href="https://github.com/emqnuele" target="_blank" rel="noreferrer">
              github
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
