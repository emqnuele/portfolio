import clsx from 'clsx'
import GlareHover from './GlareHover'
import msgIcon from '../assets/msg.avif'

type ContactBubbleProps = {
  href?: string
  label?: string
  className?: string
}

export default function ContactBubble({
  href = 'mailto:hey@emanuelefaraci.com',
  label = 'Contact me',
  className
}: ContactBubbleProps) {
  return (
    <div className="contact-bubble-fixed">
      <GlareHover
        className={clsx('contact-bubble-shell', className)}
        width="auto"
        height="auto"
        background="rgba(4, 4, 9, 0.75)"
        borderRadius="999px"
        borderColor="transparent"
        glareColor="#f7f8fc"
        glareOpacity={0.55}
        glareAngle={-25}
        glareSize={280}
        transitionDuration={900}
        playOnce={false}
      >
        <a className="contact-bubble" href={href} aria-label={label}>
          <span className="contact-bubble__icon" aria-hidden="true">
            <img src={msgIcon} alt="" loading="lazy" />
          </span>
          <span className="contact-bubble__label">{label}</span>
          <span className="contact-bubble__chevron" aria-hidden="true">
            ↗
          </span>
        </a>
      </GlareHover>
    </div>
  )
}
