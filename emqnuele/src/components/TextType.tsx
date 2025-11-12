import { useEffect, useMemo, useState } from 'react'

type TextTypeProps = {
  texts: string[]
  typingSpeed?: number
  pauseDuration?: number
  className?: string
  cursorClassName?: string
  showCursor?: boolean
  initialIndex?: number
  initialChars?: number
  startDeleting?: boolean
}

function TextType({
  texts,
  typingSpeed = 80,
  pauseDuration = 1300,
  className,
  cursorClassName,
  showCursor = true,
  initialIndex = 0,
  initialChars = 0,
  startDeleting = false
}: TextTypeProps) {
  const entries = useMemo(() => (texts.length ? texts : ['']), [texts])
  const safeInitialIndex = Math.min(initialIndex, entries.length - 1)
  const [textIndex, setTextIndex] = useState(safeInitialIndex)
  const [chars, setChars] = useState(initialChars)
  const [isDeleting, setIsDeleting] = useState(startDeleting)

  useEffect(() => {
    setTextIndex(Math.min(initialIndex, entries.length - 1))
    setChars(initialChars)
    setIsDeleting(startDeleting)
  }, [entries, initialChars, initialIndex, startDeleting])

  useEffect(() => {
    const current = entries[textIndex]
    let timeout = typingSpeed

    if (!isDeleting && chars < current.length) {
      timeout = typingSpeed
      const timer = setTimeout(() => setChars((prev) => prev + 1), timeout)
      return () => clearTimeout(timer)
    }

    if (!isDeleting && chars === current.length) {
      timeout = pauseDuration
      const timer = setTimeout(() => setIsDeleting(true), timeout)
      return () => clearTimeout(timer)
    }

    if (isDeleting && chars > 0) {
      timeout = typingSpeed / 1.5
      const timer = setTimeout(() => setChars((prev) => prev - 1), timeout)
      return () => clearTimeout(timer)
    }

    if (isDeleting && chars === 0) {
      const timer = setTimeout(() => {
        setIsDeleting(false)
        setTextIndex((prev) => (prev + 1) % entries.length)
      }, typingSpeed)
      return () => clearTimeout(timer)
    }
  }, [chars, entries, isDeleting, pauseDuration, textIndex, typingSpeed])

  const currentText = entries[textIndex].slice(0, chars)

  return (
    <span className={`text-type-inline ${className ?? ''}`}>
      <span>{currentText}</span>
      {showCursor ? <span className={`text-type-inline__cursor ${cursorClassName ?? ''}`} /> : null}
    </span>
  )
}

export default TextType
