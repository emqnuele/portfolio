import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import './App.css'
import BlurText from './components/BlurText'
import TextType from './components/TextType'
import ContactBubble from './components/ContactBubble'
import projectIllustration from './assets/undraw_programming_j1zw.svg'
import aboutIllustration from './assets/undraw_working-at-home_pxaa.svg'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import SiteFooter from './components/SiteFooter'


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

const scrollIntoViewSafely = (element: HTMLElement | null, block: ScrollLogicalPosition = 'start') => {
  if (!element) {
    return
  }
  const canUseSmoothBehavior =
    typeof document !== 'undefined' && 'scrollBehavior' in document.documentElement.style
  if (canUseSmoothBehavior) {
    element.scrollIntoView({ behavior: 'smooth', block })
    return
  }
  element.scrollIntoView(block === 'end' ? false : true)
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
    scrollIntoViewSafely(spotlightRef.current)
  }, [])

  const handleCardNavigate = useCallback(
    (targetId: string) => {
      if (targetId === 'about') {
        navigate('/about')
        return
      }
      if (targetId === 'projects') {
        navigate('/projects')
        return
      }

      const target = document.getElementById(targetId)
      if (target) {
        scrollIntoViewSafely(target)
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
    if (typeof window === 'undefined') {
      return
    }

    const pointerQuery = window.matchMedia('(pointer: fine)')
    if (!pointerQuery.matches) {
      return
    }

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
      const { offsetTop, offsetHeight } = spotlightRef.current
      const spotlightBottom = offsetTop + offsetHeight
      const scrollY = window.scrollY
      return scrollY > offsetTop - 32 && scrollY < spotlightBottom - 32
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
      scrollIntoViewSafely(heroRef.current)
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

      <SiteFooter />
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
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
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
