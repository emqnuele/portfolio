import { Link } from 'react-router-dom'

type ChannelId = 'github' | 'telegram' | 'email'

const contactChannels: Array<{
  id: ChannelId
  label: string
  handle: string
  href: string
  description: string
}> = [
  {
    id: 'github',
    label: 'github',
    handle: '@emqnuele',
    href: 'https://github.com/emqnuele',
    description: 'ship logs · source of truth'
  },
  {
    id: 'telegram',
    label: 'telegram',
    handle: 't.me/emqnuele',
    href: 'https://t.me/emqnuele',
    description: 'quick async sync · instant replies'
  },
  {
    id: 'email',
    label: 'email',
    handle: 'hey@emanuele.dev',
    href: 'mailto:hey@emanuele.dev',
    description: 'dossiers · briefs · attachments'
  }
]

const quickStats = [
  { label: 'base', value: 'Modena · IT' },
  { label: 'response time', value: '2h avg' },
  { label: 'status', value: 'CS student · indie builder' }
]

const navLinks = [
  { label: 'home', to: '/' },
  { label: 'about', to: '/about' },
  { label: 'projects', to: '/projects' }
]

const stackBadges = ['React', 'Vite', 'Python', 'FastAPI', 'AI agents']

const renderChannelIcon = (type: ChannelId) => {
  switch (type) {
    case 'github':
      return (
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.8-1.4-3.8-1.4-.6-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.7 2.1 2.9 1.5.1-.8.4-1.3.8-1.7-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.4 1.2a11.6 11.6 0 0 1 6.2 0C19 4 20 4.4 20 4.4c.6 1.6.2 2.8.1 3.2a5 5 0 0 1 1.2 3.3c0 4.6-2.8 5.6-5.4 5.9.4.3.8 1 .8 2v2.9c0 .3.1.7.8.6a11.5 11.5 0 0 0 7.9-10.9C23.5 5.6 18.4.5 12 .5Z"
          />
        </svg>
      )
    case 'telegram':
      return (
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path
            fill="currentColor"
            d="M22.8 2.2 1.5 9.9c-1 .4-1 1.5-.2 1.8l5.4 1.7 13.4-8.4c.3-.2.6.2.3.4l-10.8 9.8-.4 5.7c.7 0 1-.3 1.4-.7l2.6-2.5 5.4 4c1 .5 1.7.2 1.9-.9l3.4-17.8c.2-.9-.3-1.4-1.1-1.2Z"
          />
        </svg>
      )
    case 'email':
    default:
      return (
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path
            fill="currentColor"
            d="M3 5c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h18c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H3Zm1.7 2h14.6L12 12.7 4.7 7ZM4 8.7l7.6 5.5c.2.1.6.1.8 0L20 8.7V18H4V8.7Z"
          />
        </svg>
      )
  }
}

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <p className="site-footer__eyebrow">closing tag</p>
          <h2>Ready for async-friendly builds?</h2>
          <p className="site-footer__lead">
            I&apos;m Emanuele Faraci from Modena. I ship React/Vite frontends backed by Python + FastAPI automations so project briefs become working
            demos without the wait.
          </p>
          <div className="site-footer__badges" aria-label="core stack">
            {stackBadges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
          
        </div>

        <div className="site-footer__panels">
          <div className="site-footer__panel">
            <p className="site-footer__panel-label">channels</p>
            <ul className="site-footer__channels">
              {contactChannels.map((channel) => (
                <li key={channel.label}>
                  <a
                    className="site-footer__channel"
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    <span className="site-footer__channel-icon">{renderChannelIcon(channel.id)}</span>
                    <div className="site-footer__channel-copy">
                      <span className="site-footer__channel-label">{channel.label}</span>
                      <p className="site-footer__channel-desc">{channel.description}</p>
                    </div>
                    <span className="site-footer__channel-handle">
                      {channel.handle}
                      <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__panel site-footer__panel--compact">
            <div>
              <p className="site-footer__panel-label">quick nav</p>
              <ul className="site-footer__nav">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="site-footer__panel-label">signals</p>
              <dl className="site-footer__stats">
                {quickStats.map((stat) => (
                  <div key={stat.label}>
                    <dt>{stat.label}</dt>
                    <dd>{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© {year} Emanuele Faraci · async-first builds</p>
        <p>github · telegram · email always on</p>
      </div>
    </footer>
  )
}
