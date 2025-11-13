import { useMemo, useState, type ReactNode } from 'react'
import clsx from 'clsx'
import './CircularGallery.css'

export type CircularGalleryItem = {
  id: string
  element: ReactNode
}

interface CircularGalleryProps {
  items: CircularGalleryItem[]
  className?: string
}

const wrapIndex = (value: number, total: number) => {
  if (total === 0) return value
  const next = value % total
  return next < 0 ? next + total : next
}

const relativeDistance = (index: number, current: number, total: number) => {
  if (!total) return 0
  let diff = index - current
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total
  return diff
}

export default function CircularGallery({ items, className }: CircularGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = items.length

  const orderedItems = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        relative: relativeDistance(index, activeIndex, total)
      })),
    [items, activeIndex, total]
  )

  const handleStep = (direction: -1 | 1) => {
    if (!total) return
    setActiveIndex((prev) => wrapIndex(prev + direction, total))
  }

  if (!total) {
    return null
  }

  return (
    <div className={clsx('skill-carousel', className)}>
      <div className="skill-carousel__viewport">
        {orderedItems.map(({ id, element, relative }) => {
          if (Math.abs(relative) > 2) return null
          const distance = Math.abs(relative)
          const translateX = relative * 220
          const translateY = distance * 12
          const scale = 1 - distance * 0.08
          const opacity = 1 - distance * 0.28
          const zIndex = 5 - distance
          const isActive = relative === 0

          return (
            <div
              key={id}
              className={clsx('skill-carousel__item', isActive && 'skill-carousel__item--active')}
              data-depth={distance}
              style={{
                zIndex,
                transform: `translateX(-50%) translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                opacity
              }}
            >
              <div className="skill-carousel__card">{element}</div>
            </div>
          )
        })}
      </div>
      {total > 1 && (
        <div className="skill-carousel__controls">
          <button
            type="button"
            className="skill-carousel__button"
            aria-label="Previous skill"
            onClick={() => handleStep(-1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M14.5 6.5 9 12l5.5 5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="skill-carousel__button"
            aria-label="Next skill"
            onClick={() => handleStep(1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M9.5 6.5 15 12l-5.5 5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
