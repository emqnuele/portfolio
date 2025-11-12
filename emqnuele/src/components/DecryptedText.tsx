import { useEffect, useRef, useState } from 'react'

type RevealDirection = 'left' | 'center'

type DecryptedTextProps = {
  text: string
  speed?: number
  maxIterations?: number
  characters?: string
  animateOn?: 'hover' | 'view'
  revealDirection?: RevealDirection
  className?: string
  parentClassName?: string
  encryptedClassName?: string
}

const DEFAULT_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!$%&?'

function generateScramble(target: string, revealCount: number, characters: string) {
  return target
    .split('')
    .map((char, index) => {
      if (char === ' ') return ' '
      if (index < revealCount) return target[index]
      return characters[Math.floor(Math.random() * characters.length)]
    })
    .join('')
}

function getRevealCount(iteration: number, maxIterations: number, length: number, direction: RevealDirection) {
  const progress = Math.min(1, iteration / maxIterations)
  if (direction === 'center') {
    const half = Math.floor(length / 2)
    const revealed = Math.floor(progress * half)
    return half + revealed >= length ? length : half + revealed
  }

  return Math.floor(progress * length)
}

function useInView(ref: React.RefObject<HTMLElement>, once = true) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, once])

  return inView
}

function DecryptedText({
  text,
  speed = 70,
  maxIterations = 18,
  characters = DEFAULT_CHARACTERS,
  animateOn = 'hover',
  revealDirection = 'left',
  className,
  parentClassName,
  encryptedClassName
}: DecryptedTextProps) {
  const [display, setDisplay] = useState(text)
  const [iteration, setIteration] = useState(0)
  const [isRunning, setIsRunning] = useState(animateOn === 'view')
  const frame = useRef<number>()
  const containerRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(containerRef, true)

  useEffect(() => {
    if (animateOn === 'view' && inView) {
      startScramble()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateOn, inView])

  useEffect(() => {
    if (!isRunning) return

    const loop = () => {
      setIteration((prev) => {
        const nextIteration = prev + 1
        const revealCount = getRevealCount(nextIteration, maxIterations, text.length, revealDirection)
        const scrambled = generateScramble(text, revealCount, characters)
        setDisplay(scrambled)

        if (nextIteration >= maxIterations) {
          setDisplay(text)
          setIsRunning(false)
          return 0
        }
        return nextIteration
      })
      frame.current = window.setTimeout(loop, speed)
    }

    frame.current = window.setTimeout(loop, speed)

    return () => {
      if (frame.current) {
        clearTimeout(frame.current)
      }
    }
  }, [isRunning, speed, maxIterations, text, characters, revealDirection])

  function startScramble() {
    if (isRunning) return
    setIteration(0)
    setIsRunning(true)
  }

  function handleMouseEnter() {
    if (animateOn === 'hover') {
      startScramble()
    }
  }

  return (
    <span className={parentClassName} ref={containerRef}>
      <span className={`${className ?? ''} ${isRunning ? encryptedClassName ?? 'encrypted' : ''}`} onMouseEnter={handleMouseEnter}>
        {display}
      </span>
    </span>
  )
}

export default DecryptedText
