import { useMemo, type CSSProperties } from 'react'

type BlurTextProps = {
  text: string
  delay?: number
  animateBy?: 'letters' | 'words'
  direction?: 'top' | 'bottom'
  className?: string
  onAnimationComplete?: () => void
  duration?: number
}

const BlurText = ({
  text,
  delay = 100,
  animateBy = 'letters',
  direction = 'bottom',
  className,
  onAnimationComplete,
  duration = 450
}: BlurTextProps) => {
  const items = useMemo(() => {
    if (animateBy === 'words') {
      return text.split(' ').map((word) => `${word} `)
    }
    return text.split('')
  }, [text, animateBy])

  return (
    <span className={`blur-text ${className ?? ''}`}>
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className={`blur-text__item blur-text__item--${direction}`}
          style={
            {
              animationDelay: `${index * delay}ms`,
              animationDuration: `${duration}ms`
            } as CSSProperties
          }
          onAnimationEnd={index === items.length - 1 ? onAnimationComplete : undefined}
        >
          {item}
        </span>
      ))}
    </span>
  )
}

export default BlurText
