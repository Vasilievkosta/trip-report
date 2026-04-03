import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

type DiaryModalProps = {
  title: string
  content: string | null
  isLoading: boolean
  error: string | null
  onClose: () => void
}

export function DiaryModal({
  title,
  content,
  isLoading,
  error,
  onClose,
}: DiaryModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="diary-modal" aria-modal="true" role="dialog" onClick={onClose}>
      <div className="diary-modal__panel" onClick={(event) => event.stopPropagation()}>
        <div className="diary-modal__header">
          <div>
            <p className="diary-modal__eyebrow">Дневник похода</p>
            <h2>{title}</h2>
          </div>
          <button
            className="diary-modal__close"
            type="button"
            onClick={onClose}
            aria-label="Закрыть дневник"
          >
            Закрыть
          </button>
        </div>

        <div className="diary-modal__content">
          {isLoading ? (
            <div className="diary-skeleton" aria-live="polite">
              <span className="diary-skeleton__line" />
              <span className="diary-skeleton__line diary-skeleton__line--short" />
              <span className="diary-skeleton__line" />
              <span className="diary-skeleton__line" />
              <span className="diary-skeleton__line diary-skeleton__line--medium" />
            </div>
          ) : null}

          {!isLoading && error ? (
            <div className="diary-state">
              <p>{error}</p>
            </div>
          ) : null}

          {!isLoading && !error && content ? (
            <article className="diary-markdown">
              <ReactMarkdown>{content}</ReactMarkdown>
            </article>
          ) : null}
        </div>
      </div>
    </div>
  )
}
