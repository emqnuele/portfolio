import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import './App.css'
import BlurText from './components/BlurText'
import TextType from './components/TextType'
import GradualBlur from './components/GradualBlur'
import TargetCursor from './components/TargetCursor'
import ContactBubble from './components/ContactBubble'
import projectIllustration from './assets/undraw_programming_j1zw.svg'
import aboutIllustration from './assets/undraw_working-at-home_pxaa.svg'
import AboutPage from './pages/AboutPage'

type Project = {
  name: string
  role: string
  url: string
}

const projects: Project[] = [
  { name: 'Flux Layers', role: 'design system minimale', url: 'https://fluxlayers.dev' },
  { name: 'Ivy Console', role: 'control room climatica', url: 'https://ivyconsole.app' },
  { name: 'Linea Atelier', role: 'story e-commerce', url: 'https://lineaatelier.studio' }
]

const heroLines = ['Emanuele', 'Faraci']
const heroRoles = ['software developer', 'Python Developer', 'Chatbot Developer', 'Frontend Developer', 'AI Enthusiast', 'AI Workflow Designer', 'Web App Engineer', 'Indie Builder', 'Computer Science Student']

type FocusCard = {
  id: string
  label: string
  title: string
  meta: string[]
  tiltClass: string
  accent: string
  illustration: string
}

const focusCards: FocusCard[] = [
  {
    id: 'projects',
    label: 'case study · work',
    title: 'projects',
    meta: ['frontend', 'python', 'AI'],
    tiltClass: 'split-card--projects',
    accent: '117, 198, 255',
    illustration: projectIllustration
  },
  {
    id: 'about',
    label: 'backstage · story',
    title: 'about me',
    meta: ['profile', 'timeline', 'schools'],
    tiltClass: 'split-card--about',
    accent: '220, 174, 255',
    illustration: aboutIllustration
  }
]

function MagneticButton({ children, href, sublabel }: { children: ReactNode; href: string; sublabel: string }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    const bounds = event.currentTarget.getBoundingClientRect()
    setCoords({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top
    })
  }

  const style = {
    '--orbit-x': `${coords.x}px`,
    '--orbit-y': `${coords.y}px`
  } as CSSProperties

  return (
    <a className="magnetic-button" href={href} onMouseMove={handleMove} style={style}>
      <span className="magnetic-label">{children}</span>
      <span className="magnetic-sub">{sublabel}</span>
      <span className="magnetic-glow" aria-hidden="true" />
    </a>
  )
}



function LandingPage() {
  const [typingReady, setTypingReady] = useState(false)
  const heroRef = useRef<HTMLElement | null>(null)
  const spotlightRef = useRef<HTMLElement | null>(null)
  const autoScrollLockRef = useRef(false)
  const [cursorZoneActive, setCursorZoneActive] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const setViewportUnits = () => {
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight
      document.documentElement.style.setProperty('--vh', `${viewportHeight * 0.01}px`)
    }

    setViewportUnits()
    window.addEventListener('resize', setViewportUnits)
    window.visualViewport?.addEventListener('resize', setViewportUnits)
    return () => {
      window.removeEventListener('resize', setViewportUnits)
      window.visualViewport?.removeEventListener('resize', setViewportUnits)
    }
  }, [])

  useEffect(() => {
    if (typingReady) return
    const timer = window.setTimeout(() => setTypingReady(true), 600)
    return () => window.clearTimeout(timer)
  }, [typingReady])

  const scrollToSpotlight = useCallback(() => {
    if (!spotlightRef.current) return
    spotlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleCardNavigate = useCallback(
    (targetId: string) => {
      if (targetId === 'about') {
        navigate('/about')
        return
      }

      const target = document.getElementById(targetId)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      if (window.location.hash !== `#${targetId}`) {
        window.location.hash = targetId
      }
    },
    [navigate]
  )

  useEffect(() => {
    document.body.classList.toggle('cursor-zone-active', cursorZoneActive)
    return () => {
      document.body.classList.remove('cursor-zone-active')
    }
  }, [cursorZoneActive])

  useEffect(() => {
    const section = spotlightRef.current
    if (!section || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCursorZoneActive(entry.isIntersecting && entry.intersectionRatio > 0.3)
      },
      { threshold: [0.2, 0.35, 0.5] }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const releaseLock = () => {
      window.setTimeout(() => {
        autoScrollLockRef.current = false
      }, 900)
    }

    const shouldSnapFromHero = () => {
      if (!heroRef.current) return false
      const heroHeight = heroRef.current.offsetHeight || window.innerHeight
      return window.scrollY < heroHeight - 32
    }

    const shouldSnapFromSpotlight = () => {
      if (!spotlightRef.current) return false
      const spotlightTop = spotlightRef.current.offsetTop
      return window.scrollY > spotlightTop - 32
    }

    const triggerSnapDown = () => {
      if (autoScrollLockRef.current) return
      autoScrollLockRef.current = true
      scrollToSpotlight()
      releaseLock()
    }

    const triggerSnapUp = () => {
      if (autoScrollLockRef.current) return
      autoScrollLockRef.current = true
      heroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      releaseLock()
    }

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        if (!shouldSnapFromHero()) return
        event.preventDefault()
        triggerSnapDown()
      } else if (event.deltaY < 0) {
        if (!shouldSnapFromSpotlight()) return
        event.preventDefault()
        triggerSnapUp()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ' || event.key === 'Spacebar') {
        if (!shouldSnapFromHero()) return
        event.preventDefault()
        triggerSnapDown()
      }
      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        if (!shouldSnapFromSpotlight()) return
        event.preventDefault()
        triggerSnapUp()
      }
    }

    let touchStartY = 0

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return
      touchStartY = event.touches[0].clientY
    }

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? 0
      const delta = touchStartY - currentY
      if (delta > 24 && shouldSnapFromHero()) {
        event.preventDefault()
        triggerSnapDown()
      } else if (delta < -24 && shouldSnapFromSpotlight()) {
        event.preventDefault()
        triggerSnapUp()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [scrollToSpotlight])

  return (
    <div className="page page-ready">
      {/* <TargetCursor
        targetSelector=".cursor-target-active"
        spinDuration={2}
        hideDefaultCursor={cursorZoneActive}
        parallaxOn
      /> */}
      <main>
        <section className="blur-section">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="blur-content">
            <section className="hero-panel" id="top" ref={heroRef}>
              <p className="hero-kicker">who am i?</p>
              <div className="hero-name" aria-label="Emanuele Faraci">
                {heroLines.map((line) => (
                  <BlurText
                    key={line}
                    text={line}
                    delay={120}
                    animateBy="letters"
                    direction="top"
                    className="hero-blur"
                  />
                ))}
              </div>
              <p className="hero-note">
                <span className="hero-note-plain">I'm a</span>
                {typingReady ? (
                  <TextType
                    texts={heroRoles}
                    typingSpeed={90}
                    pauseDuration={1300}
                    className="hero-roles"
                    cursorClassName="hero-roles__cursor"
                    showCursor
                    initialIndex={0}
                    initialChars={heroRoles[0].length}
                    startDeleting
                  />
                ) : (
                  <span className="hero-role-static" onAnimationEnd={() => setTypingReady(true)}>
                    {heroRoles[0]}
                  </span>
                )}
              </p>
              <div className="scroll-indicator">
                <button type="button" onClick={scrollToSpotlight} aria-label="Scroll to spotlight section">
                  <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
                    <path
                      d="M12 4v16m0 0-6-6m6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </section>


          </div>

          <GradualBlur
            target="parent"
            position="bottom"
            height="12rem"
            strength={3.5}
            divCount={8}
            curve="bezier"
            exponential
            opacity={1}
            animated="scroll"
            responsive
            mobileHeight="6rem"
            tabletHeight="9rem"
            desktopHeight="12rem"
            zIndex={1}
            className="hero-blur"
          />
        </section>

        <section className="split-section" id="spotlight" ref={spotlightRef}>
          <div className="split-section__hint">focus areas</div>
          <div className="split-section__grid">
            {focusCards.map((card) => (
              <button
                key={card.id}
                type="button"
                className={`split-card ${card.tiltClass} ${cursorZoneActive ? 'cursor-target-active' : ''}`}
                onClick={() => handleCardNavigate(card.id)}
                aria-label={`Vai alla sezione ${card.title}`}
                style={{ '--card-accent': card.accent } as CSSProperties}
              >
                <span className="split-card__halo" aria-hidden="true" />
                <span className="split-card__shine" aria-hidden="true" />
                <span className="split-card__illustration" aria-hidden="true">
                  <img src={card.illustration} alt="" loading="lazy" />
                </span>
                <div className="split-card__content">
                  <span className="split-card__label">{card.label}</span>
                  <h2>{card.title}</h2>
                  {card.meta.length > 0 && (
                    <div className="split-card__meta">
                      {card.meta.map((tag) => (
                        <span key={tag} className="split-card__meta-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="split-card__footer" aria-hidden="true">
                  <span className="split-card__footer-line" />
                  <span className="split-card__arrow">›</span>
                </div>
              </button>
            ))}
          </div>
        </section>

      </main>

      <footer>
        <p>emanuelefaraci.dev · crafted with pedro</p>
      </footer>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ContactBubble />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
