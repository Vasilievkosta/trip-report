import { useEffect } from 'react'

type LightboxProps = {
  images: {
    thumb: string
    full: string
  }[]
  currentIndex: number
  title: string
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function Lightbox({
  images,
  currentIndex,
  title,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
      if (event.key === 'ArrowRight') {
        onNext()
      }
      if (event.key === 'ArrowLeft') {
        onPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onNext, onPrev])

  const activeImage = images[currentIndex]

  return (
    <div
      className="lightbox"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <button
        className="lightbox__close"
        type="button"
        onClick={onClose}
        aria-label="Закрыть просмотр"
      >
        Закрыть
      </button>
      <button
        className="lightbox__nav lightbox__nav--prev"
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onPrev()
        }}
        aria-label="Предыдущее фото"
      >
        Назад
      </button>
      <figure
        className="lightbox__figure"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          className="lightbox__image"
          src={activeImage.full}
          alt={`${title} — кадр ${currentIndex + 1}`}
        />
        <figcaption className="lightbox__caption">
          {title} · {currentIndex + 1}/{images.length}
        </figcaption>
      </figure>
      <button
        className="lightbox__nav lightbox__nav--next"
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onNext()
        }}
        aria-label="Следующее фото"
      >
        Вперед
      </button>
    </div>
  )
}
