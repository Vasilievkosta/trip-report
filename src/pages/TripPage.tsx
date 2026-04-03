import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { readDiary, preloadDiary } from '../data/diary'
import { getTripById } from '../data/trips'
import { Lightbox } from '../ui/Lightbox'
import { DiaryModal } from '../ui/DiaryModal'

type DiaryStatus = 'idle' | 'loading' | 'ready' | 'error'

export function TripPage() {
  const { id } = useParams()
  const trip = useMemo(() => (id ? getTripById(id) : undefined), [id])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isDiaryOpen, setIsDiaryOpen] = useState(false)
  const [diaryContent, setDiaryContent] = useState<string | null>(null)
  const [diaryStatus, setDiaryStatus] = useState<DiaryStatus>('idle')
  const [diaryError, setDiaryError] = useState<string | null>(null)

  useEffect(() => {
    if (!trip) {
      return
    }

    let isActive = true
    setDiaryStatus('loading')
    setDiaryError(null)

    preloadDiary(trip.diary)
      .then((content) => {
        if (!isActive) {
          return
        }

        setDiaryContent(content)
        setDiaryStatus('ready')
      })
      .catch(() => {
        if (!isActive) {
          return
        }

        setDiaryError('Не удалось открыть дневник. Попробуйте ещё раз чуть позже.')
        setDiaryStatus('error')
      })

    return () => {
      isActive = false
    }
  }, [trip])

  if (!trip) {
    return <Navigate to="/" replace />
  }

  const openImage = (index: number) => setActiveIndex(index)
  const closeImage = () => setActiveIndex(null)

  const openDiary = () => {
    setIsDiaryOpen(true)

    if (diaryStatus === 'idle') {
      setDiaryStatus('loading')
      readDiary(trip.diary)
        .then((content) => {
          setDiaryContent(content)
          setDiaryStatus('ready')
        })
        .catch(() => {
          setDiaryError('Не удалось открыть дневник. Попробуйте ещё раз чуть позже.')
          setDiaryStatus('error')
        })
    }
  }

  const closeDiary = () => setIsDiaryOpen(false)

  const showNext = () => {
    setActiveIndex((current) => {
      if (current === null) {
        return 0
      }
      return (current + 1) % trip.images.length
    })
  }

  const showPrev = () => {
    setActiveIndex((current) => {
      if (current === null) {
        return trip.images.length - 1
      }
      return (current - 1 + trip.images.length) % trip.images.length
    })
  }

  return (
    <>
      <div className="trip-page">
        <div className="trip-page__intro">
          <Link className="back-link" to="/">
            Все походы
          </Link>
          <p className="trip-page__eyebrow">{trip.year}</p>
          <h1>{trip.title}</h1>
          <p className="trip-page__description">{trip.description}</p>
          <div className="trip-page__actions">
            <button className="diary-button" type="button" onClick={openDiary}>
              Дневник похода
            </button>
            <p className="trip-page__hint">
              Полный текст откроется в отдельном окне и останется рядом с фотографиями.
            </p>
          </div>
        </div>

        <section className="gallery" aria-label={`Галерея похода ${trip.title}`}>
          {trip.images.map((image, index) => (
            <button
              key={image.full}
              className="gallery__item"
              type="button"
              onClick={() => openImage(index)}
            >
              <img
                className="gallery__image"
                src={image.thumb}
                alt={`${trip.title} — превью ${index + 1}`}
                loading="lazy"
              />
            </button>
          ))}
        </section>
      </div>

      {activeIndex !== null ? (
        <Lightbox
          images={trip.images}
          currentIndex={activeIndex}
          title={trip.title}
          onClose={closeImage}
          onNext={showNext}
          onPrev={showPrev}
        />
      ) : null}

      {isDiaryOpen ? (
        <DiaryModal
          title={trip.title}
          content={diaryContent}
          isLoading={diaryStatus === 'loading'}
          error={diaryError}
          onClose={closeDiary}
        />
      ) : null}
    </>
  )
}
