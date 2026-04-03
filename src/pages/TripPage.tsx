import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getTripById } from '../data/trips'
import { Lightbox } from '../ui/Lightbox'

export function TripPage() {
  const { id } = useParams()
  const trip = useMemo(() => (id ? getTripById(id) : undefined), [id])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  if (!trip) {
    return <Navigate to="/" replace />
  }

  const openImage = (index: number) => setActiveIndex(index)
  const closeImage = () => setActiveIndex(null)
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
    </>
  )
}
